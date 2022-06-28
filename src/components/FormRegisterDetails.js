// Import resources
import React, { useState } from "react";
import tw from "twrnc";
import { View } from "react-native";
import { useFormikContext } from "formik";

// Import custom files
import CustomButton from "./CustomButton";
import CustomAlertModal from "./CustomAlertModal";
import CustomText from "./CustomText";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import useLoggedInUser from "../hooks/useLoggedInUser";
import CustomSpinner from "./CustomSpinner";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import CustomTextInputForm from "./CustomTextInputForm";
import { handleUserEmail, handleIsEmptyForm } from "../config/functions";
import { alertMsg, apiRoutes, appColors } from "../config/data";

// Component
function FormRegisterDetails({
  setShowOtpInput,
  otpCode,
  setOtpCode,
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

  // Define user
  const { handleEmailExist, handleUsernameExist } = useLoggedInUser();

  // Define isEmptyForm
  const propsToRemove = ["verifyCodeInput", "phoneNum", "isOtpInput"];
  const isEmptyForm = handleIsEmptyForm(values, propsToRemove);

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Debug
  //console.log("Debug formRegisterDetails: ", otpCode);

  // FUNCTIONS
  // HANDLE SEND OTP EMAIL
  const handleSendOtpEmail = async () => {
    // Set loading
    spinner.showLoading();
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalUsername = values.username?.trim()?.toLowerCase();
    const emailExist = handleEmailExist(finalEmail);
    const usernameExist = handleUsernameExist(finalUsername);
    // If isEmptyForm
    if (isEmptyForm) {
      // Alert err
      alert.showAlert(alertMsg?.isRequired);
      spinner.hideLoading();
      return;
    } else if (emailExist?.isValid) {
      // Alert err
      alert.showAlert(alertMsg?.emailExistErr);
      spinner.hideLoading();
      return;
    } else if (usernameExist?.isValid) {
      // Alert err
      alert.showAlert(alertMsg?.usernameExistErr);
      spinner.hideLoading();
      return;
    } else {
      // Set form val
      setFormVal();
      // Set otp code
      setOtpCode();
      // Send otp code to user
      await handleUserEmail(finalUsername, finalEmail, otpCode, apiRoutes?.otp);
      // Set submitting
      setSubmitting(false);
      // Alert succ
      toast.success(alertMsg?.otpSent);
      // Set showOtpInput to true
      setShowOtpInput();
    } // close if isEmptyForm
  }; // close fxn

  // Return component
  return (
    <>
      {/** Show spinner */}
      <CustomSpinner isLoading={spinner.loading} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        content={<CustomText>{alert.message}</CustomText>}
      />

      {/** Full name */}
      <CustomTextInputForm
        label="Legal Full Name"
        name="fullName"
        placeholder="Enter full name"
        leftIconName="user"
        autoCapitalize="words"
      />

      {/** Username */}
      <CustomTextInputForm
        name="username"
        label="Username"
        placeholder="Enter username"
        leftIconName="adduser"
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

      {/** Phone number */}
      <CustomTextInputForm
        name="phoneNum"
        label="Phone Number"
        placeholder="Enter phone number"
        leftIconType="feather"
        leftIconName="phone"
        keyboardType="numeric"
      />

      {/** Password */}
      <View style={tw`flex-row`}>
        <View style={tw`w-1/2`}>
          <CustomTextInputForm
            isPass
            name="pass"
            label="Password"
            placeholder="Enter password"
            leftIconName="lock"
            rightIconType="feather"
            rightIconName={hidePass ? "eye" : "eye-off"}
            rightIconOnPress={() => setHidePass(!hidePass)}
            secureTextEntry={hidePass}
            autoCapitalize="none"
          />
        </View>

        {/** Repeat pass */}
        <View style={tw`w-1/2`}>
          <CustomTextInputForm
            isPass
            name="repeatPass"
            label="Repeat Password"
            placeholder="Enter password"
            leftIconName="lock"
            rightIconType="feather"
            rightIconName={hidePass ? "eye" : "eye-off"}
            rightIconOnPress={() => setHidePass(!hidePass)}
            secureTextEntry={hidePass}
            autoCapitalize="none"
          />
        </View>
      </View>

      {/** Submit button */}
      <CustomButton
        isPaper
        onPress={() => handleSendOtpEmail()}
        stylePaper={tw`mt-3`}
        disabled={!isValid || isSubmitting || spinner.loading}
      >
        Create Account
      </CustomButton>

      {/** TEST BUTTON */}
      {/* <CustomButton
        isNormal
        style={tw`mt-3`}
        icon="arrow-right"
        mode="contained"
        onPress={() => {
          handleOtpEmail(
            "username",
            "chinaemeremtech@gmail.com",
            "otpCodeTest"
          );
          //setShowOtpInput();
        }}
      >
        TEST BUTTON
      </CustomButton> */}

      {/** Terms */}
      <CustomText style={tw`mt-2 text-center text-[${appColors?.grey}]`}>
        By creating an account, you agree to accept our privacy policy & terms.
      </CustomText>
    </>
  ); // close return
} // close component

// Export
export default FormRegisterDetails;
