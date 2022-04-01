// Import resources
import React from "react";
import { useFormikContext } from "formik";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomFormInput from "./CustomFormInput";
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useEmailSender from "../hooks/useEmailSender";
import useCustomToastState from "../hooks/useCustomToastState";
import {
  alertMsg,
  handleFormValuesChecker,
  handleGenUsername,
} from "../config/appConfig";

// Component
function FormPasswordRecoveryDetails(props) {
  // Define props
  const { setShowOtpInput, otpCode, setOtpCode } = props;

  // Define formik context
  const { values, isSubmitting, isValid, setSubmitting } = useFormikContext();

  // Define formValuesToValidate
  const formValuesToValidate = {
    emailAddr: values.emailAddr,
    newPass: values.newPass,
    repeatNewPass: values.repeatNewPass,
  };

  // Define alert
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

  // Define email sender
  const { handleOtpEmail, handleUserEmailChecker } = useEmailSender();

  // Debug
  // console.log("Debug formPassRecDetails: ", otpCode);

  // FUNCTIONS
  // HANDLE SEND OTP EMAIL
  const handleSendOtpEmail = async () => {
    // Define isEmptyFormVal
    const isEmptyFormVal = handleFormValuesChecker(formValuesToValidate);
    if (isEmptyFormVal) {
      // Alert err
      alert.showAlert(alertMsg?.isRequired);
      return;
    } // close if
    // Set otp code state
    setOtpCode(otpCode);
    // Set submitting
    setSubmitting(true);
    // Check if email already exist
    const emailChecker = await handleUserEmailChecker(values.emailAddr);
    // If email address exist, return
    if (!emailChecker?.isValidEmail) {
      // Alert err
      alert.showAlert(alertMsg?.inValidUser);
      setSubmitting(false);
      return;
    } // close if
    // Get the string before @ in email
    const username = handleGenUsername(values.emailAddr);
    // Send email with otp code
    await handleOtpEmail(username, values.emailAddr, otpCode);
    // Set submitting
    setSubmitting(false);
    // Alert succ
    toast.success(alertMsg?.otpSucc);
    // Set showOtpInput to true
    setShowOtpInput();
  }; // close fxn

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

      {/** New Password */}
      <CustomFormInput
        name="newPass"
        icon="lock"
        placeholder="New Password"
        mode="outlined"
        autoCapitalize="none"
        secureTextEntry
      />

      {/** Repeat New Password */}
      <CustomFormInput
        name="repeatNewPass"
        icon="lock"
        placeholder="Repeat New Password"
        mode="outlined"
        autoCapitalize="none"
        secureTextEntry
      />

      {/** Email Address*/}
      <CustomFormInput
        name="emailAddr"
        icon="email"
        placeholder="Email Address"
        mode="outlined"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/** Submit button */}
      <CustomButton
        isPaper
        color={colors.secondary}
        style={tw`mt-3`}
        onPress={() => handleSendOtpEmail()}
        disabled={!isValid || isSubmitting}
      >
        Continue
      </CustomButton>

      {/** TEST BUTTON */}
      {/* <CustomButton
        isNormal
        style={tw`mt-3`}
        icon="arrow-right"
        mode="contained"
        onPress={() => setShowOtpInput()}
      >
        Test Button
      </CustomButton> */}
    </>
  );
}

// Export
export default FormPasswordRecoveryDetails;
