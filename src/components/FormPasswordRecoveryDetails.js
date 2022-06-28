// Import resources
import React, { useState } from "react";
import { useFormikContext } from "formik";
import tw from "twrnc";

// Import custom files
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import useLoggedInUser from "../hooks/useLoggedInUser";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import CustomSpinner from "./CustomSpinner";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomText from "./CustomText";
import { alertMsg, apiRoutes } from "../config/data";
import { handleIsEmptyForm, handleUserEmail } from "../config/functions";

// Component
function FormPasswordRecoveryDetails({
  setShowOtpInput,
  otpCode,
  setOtpCode,
  isChangePass,
  setFormVal,
}) {
  // Define formik context
  const { values, isSubmitting, isValid, setSubmitting } = useFormikContext();

  // Define alert
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Define logged in user
  const { handleEmailExist, userID, username, userEmail } = useLoggedInUser();

  // Define final values
  const finalEmail = values.emailAddr?.trim()?.toLowerCase();

  // Define isEmptyForm
  const propsToRemove = [
    "emailAddr",
    "verifyCodeInput",
    "isOtpInput",
    "isChangePass",
  ];
  const isEmptyForm = handleIsEmptyForm(values, propsToRemove);

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Debug
  // console.log("Debug formPassRecDetails: ", otpCode);

  // FUNCTIONS
  // HANDLE SEND OTP EMAIL
  const handleSendOtpEmail = async () => {
    // Set loading
    spinner.showLoading();
    // Define email exist
    const emailExist = handleEmailExist(finalEmail);
    // Define user info
    const userInfoChangePass = {
      userID: userID,
      username: username,
      emailAddress: userEmail,
    };
    const userInfo = !isChangePass ? emailExist?.data : userInfoChangePass;
    // If values are empty
    if ((!isChangePass && finalEmail === "") || isEmptyForm) {
      // Alert err
      alert.showAlert(alertMsg?.isRequired);
      spinner.hideLoading();
      return;
    } else if (!isChangePass && !emailExist?.isValid) {
      // Alert err
      alert.showAlert(alertMsg?.inValidUser);
      spinner.hideLoading();
      return;
    } else {
      // Set form val
      setFormVal();
      // Set otp code
      setOtpCode();
      // Send otp code
      await handleUserEmail(
        userInfo?.username,
        userInfo?.emailAddress,
        otpCode,
        apiRoutes?.otp
      );
      // Set submitting
      setSubmitting(false);
      // Alert succ
      toast.success(alertMsg?.otpSent);
      // Set showOtpInput to true
      setShowOtpInput();
    } // close if
  }; // close fxn

  // Return component
  return (
    <>
      {/** Custom spinner */}
      <CustomSpinner isLoading={spinner.loading} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        content={<CustomText>{alert.message}</CustomText>}
      />

      {/** New password */}
      <CustomTextInputForm
        isPass
        name="newPass"
        label="New Password"
        placeholder="Enter new password"
        leftIconName="lock"
        rightIconType="feather"
        rightIconName={hidePass ? "eye" : "eye-off"}
        rightIconOnPress={() => setHidePass(!hidePass)}
        secureTextEntry={hidePass}
        autoCapitalize="none"
      />

      {/** Repeat new password */}
      <CustomTextInputForm
        isPass
        name="repeatNewPass"
        label="Repeat New Password"
        placeholder="Enter new password"
        leftIconName="lock"
        rightIconType="feather"
        rightIconName={hidePass ? "eye" : "eye-off"}
        rightIconOnPress={() => setHidePass(!hidePass)}
        secureTextEntry={hidePass}
        autoCapitalize="none"
      />

      {/** Email Address */}
      <CustomTextInputForm
        name="emailAddr"
        label="Email Address"
        placeholder="Enter email address"
        leftIconType="feather"
        leftIconName="mail"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/** Submit button */}
      <CustomButton
        isPaper
        onPress={() => handleSendOtpEmail()}
        stylePaper={tw`mt-3`}
        disabled={!isValid || isSubmitting || spinner.loading}
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
  ); // close return
} // close component

// Export
export default FormPasswordRecoveryDetails;
