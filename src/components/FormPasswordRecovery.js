// Import resources
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import bcryptjs from "bcryptjs";
import moment from "moment";

// Import custom files
import routes from "../screens/routes";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomSpinner from "./CustomSpinner";
import CustomAlertModal from "./CustomAlertModal";
import CustomFormInputOtp from "./CustomFormInputOtp";
import FormPasswordRecoveryDetails from "./FormPasswordRecoveryDetails";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import useEmailSender from "../hooks/useEmailSender";
import useCustomBcrypt from "../hooks/useCustomBcrypt";
import { alertMsg, handleGenOtpCode } from "../config/appConfig";
import { fireDB, doc, setDoc } from "../config/firebase";

// Component
function FormPasswordRecovery() {
  // Define otp code
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState();
  const genOtpCode = handleGenOtpCode();

  // Define alert state
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

  // Define navigation
  const navigation = useNavigation();

  // Define email sender
  const { handlePassChangeEmail, handleUserEmailChecker } = useEmailSender();

  // Define custom bcrypt
  const { handleHashCode } = useCustomBcrypt();

  // Debug
  //console.log("Debug formPassRecovery: ", otpCode);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
    newPass: "",
    repeatNewPass: "",
    verifyCodeInput: "",
  };

  // Validation
  const validate = Yup.object().shape({
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    newPass: Yup.string().required("Required").min(8, "Too short"),
    repeatNewPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPass"), null], "Password must match"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Define user email checker
    const emailChecker = await handleUserEmailChecker(values.emailAddr);
    // Define userInfo from email checker
    const userInfo = emailChecker?.dbUser;

    // Define username
    const username = userInfo?.username;
    // Hash otp code
    const hashOtpCode = await handleHashCode(otpCode);
    // Hash new password
    const hashNewPass = await handleHashCode(values.newPass);

    // Verify code input
    const compareVerifyCode = bcryptjs.compareSync(
      values.verifyCodeInput,
      hashOtpCode
    );

    // If compare verify code
    if (compareVerifyCode) {
      // Update user pass
      const updatePassRef = doc(fireDB, "users", `${userInfo?.userID}`);
      await setDoc(
        updatePassRef,
        {
          password: hashNewPass,
          dateUpdated: moment().format(),
        },
        { merge: true }
      )
        .then(async () => {
          // Send password change email to user
          await handlePassChangeEmail(
            username,
            values.emailAddr,
            moment().format("MMM, D, YYYY [at] h:mm a")
          );

          // Alert succ
          toast.success(alertMsg?.passRecoverySucc);
          // Set submitting
          setSubmitting(false);
          // Navigate
          navigation.navigate(routes.LOGIN);
        })
        .catch((err) => {
          // Alert err
          alert.showAlert(err.message);
          setSubmitting(false);
        });
    } else {
      // Alert err
      alert.showAlert(alertMsg?.otpErr);
      setSubmitting(false);
    } // close if compareVerifyCode
  };

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
        >
          {({ values, isSubmitting }) => (
            <>
              {/** Debug */}
              {/* {console.log("Form formPassRecValues: ", values)} */}

              {/** Show spinner */}
              <CustomSpinner isLoading={isSubmitting} />

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
                  <FormPasswordRecoveryDetails
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
export default FormPasswordRecovery;
