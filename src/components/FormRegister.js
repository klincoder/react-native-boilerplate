// Import resources
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import bcryptjs from "bcryptjs";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import routes from "../screens/routes";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomSpinner from "./CustomSpinner";
import FormRegisterDetails from "./FormRegisterDetails";
import CustomFormInputOtp from "./CustomFormInputOtp";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import useCustomToastState from "../hooks/useCustomToastState";
import useEmailSender from "../hooks/useEmailSender";
import useCustomBcrypt from "../hooks/useCustomBcrypt";
import {
  alertMsg,
  avatarPlaceholder,
  handleGenOtpCode,
  handleGenUsername,
} from "../config/appConfig";
import {
  fireAuth,
  createUserWithEmailAndPassword,
  fireDB,
  setDoc,
  doc,
  query,
  collection,
  where,
  limit,
  getDocs,
} from "../config/firebase";

// Component
function FormRegister() {
  // Define otp code
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState();
  const genOtpCode = handleGenOtpCode();

  // Define alert
  const alert = useCustomAlertState();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Define toast
  const toast = useCustomToastState();

  // Define navigation
  const navigation = useNavigation();

  // Define email sender
  const { handleWelcomeEmail, handleNewUserEmail } = useEmailSender();

  // Define custom bcrypt
  const { handleHashCode } = useCustomBcrypt();

  // Debug
  //console.log("Debug formRegisterGENOTP: ", companyInfo);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    firstName: "",
    lastName: "",
    emailAddr: "",
    pass: "",
    repeatPass: "",
    verifyCodeInput: "",
  };

  // Validation
  const validate = Yup.object({
    firstName: Yup.string()
      .required("Required")
      .min(3, "Too short")
      .max(50, "Too long"),
    lastName: Yup.string()
      .required("Required")
      .min(3, "Too short")
      .max(50, "Too long"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    repeatPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("pass"), null], "Password must match"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Debug
    // console.log("Debug formRegisterOTPCODE: ", otpCode);

    // Define username
    const username = handleGenUsername(values.emailAddr);
    // Hash otp code
    const hashOtpCode = await handleHashCode(otpCode);
    // Hash password
    const hashPass = await handleHashCode(values.pass);

    // Verify code input
    const compareVerifyCode = bcryptjs.compareSync(
      values.verifyCodeInput,
      hashOtpCode
    );

    // If compare verify code
    if (compareVerifyCode) {
      // Register user
      await createUserWithEmailAndPassword(
        fireAuth,
        values.emailAddr,
        values.pass
      )
        .then(async () => {
          // Define current user id
          const currentUserID = fireAuth.currentUser.uid;
          // Add user to database
          const addUserRef = doc(fireDB, "users", `${currentUserID}`);
          await setDoc(addUserRef, {
            regMethod: "app",
            userID: currentUserID,
            role: "user",
            avatar: avatarPlaceholder,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: "",
            emailAddress: values.emailAddr,
            password: hashPass,
            emailVerified: true,
            username: username,
            pushNotifications: true,
            dateCreated: moment().format(),
            dateUpdated: moment().format(),
          });

          // Send emails
          // Welcome email - user
          await handleWelcomeEmail(
            username,
            values.emailAddr,
            values.emailAddr
          );
          // New user email - admin
          await handleNewUserEmail(values.emailAddr);

          // Alert success
          toast.success(alertMsg?.regSucc);
          // Set submitting
          setSubmitting(false);
          // Navigate to login screen
          navigation.navigate(routes.LOGIN);
        })
        .catch((err) => {
          alert.showAlert(err.message);
          setSubmitting(false);
        });
    } else {
      // Alert error
      alert.showAlert(alertMsg?.otpErr);
      setSubmitting(false);
    } // close if compareVerifyCode
  }; // close submit form

  // Return component
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
      />

      {/** Form */}
      <KeyboardAvoidWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validate}
          enableReinitialize
        >
          {({ values, isSubmitting }) => (
            <>
              {/** Debug */}
              {/* {console.log("Debug formRegisterValues: ", values)} */}

              {/** Show spinner */}
              <CustomSpinner isLoading={spinner.loading || isSubmitting} />

              {/** If showOtpInput */}
              {showOtpInput ? (
                <>
                  {/** Otp input */}
                  <CustomFormInputOtp
                    name="verifyCodeInput"
                    label="Enter OTP"
                  />
                </>
              ) : (
                <>
                  {/** Form details */}
                  <FormRegisterDetails
                    otpCode={genOtpCode}
                    setOtpCode={() => setOtpCode(genOtpCode)}
                    setShowOtpInput={() => setShowOtpInput(true)}
                  />
                </>
              )}
            </>
          )}
        </Formik>
      </KeyboardAvoidWrapper>
    </>
  );
}

// Export
export default FormRegister;
