// Import resources
import React, { useState } from "react";
import tw from "twrnc";
import moment from "moment";
import bcryptjs from "bcryptjs";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import routes from "../screens/routes";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomSpinner from "./CustomSpinner";
import FormRegisterDetails from "./FormRegisterDetails";
import CustomOtpInput from "./CustomOtpInput";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomBcrypt from "../hooks/useCustomBcrypt";
import CustomTextLink from "./CustomTextLink";
import useAppSettings from "../hooks/useAppSettings";
import CustomText from "./CustomText";
import {
  handleGenOtpCode,
  handleTitleCase,
  handleUserEmail,
  handleAdminEmail,
} from "../config/functions";
import {
  alertMsg,
  apiRoutes,
  appImages,
  digitsOnlyRegex,
} from "../config/data";
import {
  fireAuth,
  createUserWithEmailAndPassword,
  fireDB,
  setDoc,
  doc,
} from "../config/firebase";

// Component
function FormRegister() {
  // Define otp code
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState();
  const [formVal, setFormVal] = useState();

  // Generate otp code
  const genOtpCode = handleGenOtpCode();

  // Define alert
  const alert = useCustomAlertState();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Define toast
  const toast = useCustomToastState();

  // Define navigation
  const navigation = useNavigation();

  // Define custom bcrypt
  const { handleHashCode } = useCustomBcrypt();

  // Define app settings
  const { todaysDate, todaysDateFormat1 } = useAppSettings();

  // Debug
  //console.log("Debug formRegister: ",);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: formVal ? formVal?.fullName : "",
    username: formVal ? formVal?.username : "",
    emailAddr: formVal ? formVal?.emailAddr : "",
    phoneNum: formVal ? formVal?.phoneNum : "",
    pass: formVal ? formVal?.pass : "",
    repeatPass: formVal ? formVal?.repeatPass : "",
    verifyCodeInput: "",
    isOtpInput: showOtpInput,
  };

  // Validation
  const validate = Yup.object().shape({
    isOtpInput: Yup.boolean(),
    fullName: Yup.string().required("Required").min(3, "Too short"),
    username: Yup.string()
      .required("Required")
      .min(6, "Too short")
      .max(20, "Too long"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    phoneNum: Yup.string()
      .matches(digitsOnlyRegex, "Invalid number")
      .min(10, "Too short")
      .max(10, "Too long"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    repeatPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("pass"), null], "Password must match"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Define variables
    const finalFullName = handleTitleCase(values.fullName?.trim());
    const finalUsername = values.username?.trim()?.toLowerCase();
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();
    const finalPhoneNum = values.phoneNum?.trim();
    const finalVerifyCodeInput = values.verifyCodeInput?.trim()?.toLowerCase();

    // If !finalVerifyCodeInput return
    if (!finalVerifyCodeInput) return;

    // Hash otp code
    const hashOtpCode = await handleHashCode(otpCode);
    // Hash password
    const hashPass = await handleHashCode(finalPass);
    // Verify code input
    const compareVerifyCode = bcryptjs.compareSync(
      finalVerifyCodeInput,
      hashOtpCode
    );

    // Debug
    //console.log("Debug formRegisterSubmit: ", compareVerifyCode);

    // If compare verify code
    if (compareVerifyCode) {
      // Register user
      await createUserWithEmailAndPassword(fireAuth, finalEmail, finalPass)
        .then(async () => {
          // Define current user id
          const currentUserID = fireAuth.currentUser.uid;
          // Add user to database
          const addUserRef = doc(fireDB, "users", `${currentUserID}`);
          await setDoc(addUserRef, {
            regMethod: "app",
            userID: currentUserID,
            role: "user",
            avatar: appImages?.avatar,
            fullName: finalFullName,
            username: finalUsername,
            emailAddress: finalEmail,
            phoneNumber: finalPhoneNum,
            password: hashPass,
            emailVerified: true,
            acctStatus: "active",
            pushNotifications: true,
            dateCreated: todaysDate,
            dateUpdated: todaysDate,
          });

          // Send emails
          // Define emailMsg
          const emailMsg = {
            username: finalUsername,
            email: finalEmail,
            date: todaysDateFormat1,
          };
          // Welcome email to user
          await handleUserEmail(
            finalUsername,
            finalEmail,
            emailMsg,
            apiRoutes?.welcome
          );
          // New user email to admin
          await handleAdminEmail(emailMsg, apiRoutes?.newUser);

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

            {/** Alert modal */}
            <CustomAlertModal
              visible={alert.visible}
              hideDialog={alert.hideAlert}
              cancelAction={alert.hideAlert}
              content={<CustomText>{alert.message}</CustomText>}
            />

            {/** If showOtpInput */}
            {showOtpInput ? (
              <>
                {/** Otp input */}
                <CustomOtpInput name="verifyCodeInput" label="Enter OTP" />
                {/** Restart process */}
                <CustomTextLink
                  title="Restart Process"
                  onPress={() => setShowOtpInput(false)}
                  styleTitle={tw`mt-12 text-center`}
                />
              </>
            ) : (
              <>
                {/** Form details */}
                <FormRegisterDetails
                  otpCode={genOtpCode}
                  setOtpCode={() => setOtpCode(genOtpCode)}
                  setShowOtpInput={() => setShowOtpInput(true)}
                  setFormVal={() => setFormVal(values)}
                />
              </>
            )}
          </>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
} // close component

// Export
export default FormRegister;
