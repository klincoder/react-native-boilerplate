// Import resources
import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomFormInput from "./CustomFormInput";
import CustomButton from "./CustomButton";
import CustomAlertModal from "./CustomAlertModal";
import CustomText from "./CustomText";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useEmailSender from "../hooks/useEmailSender";
import useCustomToastState from "../hooks/useCustomToastState";
import {
  alertMsg,
  handleFormValuesChecker,
  handleGenUsername,
} from "../config/appConfig";

// Component
function FormRegisterDetails(props) {
  // Define props
  const { setShowOtpInput, otpCode, setOtpCode } = props;

  // Define formik context
  const { values, isSubmitting, isValid, setSubmitting } = useFormikContext();

  // Define formValuesToValidate
  const formValuesToValidate = {
    firstName: values.firstName,
    lastName: values.lastName,
    emailAddr: values.emailAddr,
    pass: values.pass,
    repeatPass: values.repeatPass,
  };

  // Define alert
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

  // Define email sender
  const { handleOtpEmail, handleUserEmailChecker } = useEmailSender();

  // Debug
  //console.log("Debug formRegisterDetails: ", otpCode);

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
    if (emailChecker?.isValidEmail) {
      // Alert err
      alert.showAlert(alertMsg?.isValidUser);
      setSubmitting(false);
      return;
    } // close if
    // Define username
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

      {/** First Name */}
      <View style={tw`flex-row`}>
        <View style={tw`w-1/2`}>
          <CustomFormInput
            name="firstName"
            icon="account"
            placeholder="First Name"
            mode="outlined"
            autoCapitalize="words"
          />
        </View>

        {/** Last Name */}
        <View style={tw`w-1/2`}>
          <CustomFormInput
            name="lastName"
            icon="account"
            placeholder="Last Name"
            mode="outlined"
            autoCapitalize="words"
          />
        </View>
      </View>

      {/** Email Address*/}
      <CustomFormInput
        name="emailAddr"
        icon="email"
        placeholder="Email Address"
        mode="outlined"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/** Password */}
      <View style={tw`flex-row`}>
        <View style={tw`w-1/2`}>
          <CustomFormInput
            name="pass"
            icon="lock"
            placeholder="Password"
            mode="outlined"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        {/** Repeat Password */}
        <View style={tw`w-1/2`}>
          <CustomFormInput
            name="repeatPass"
            icon="lock"
            placeholder="Repeat Password"
            mode="outlined"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
      </View>

      {/** Submit button */}
      <CustomButton
        isPaper
        style={tw`mt-3`}
        onPress={() => handleSendOtpEmail()}
        disabled={!isValid || isSubmitting}
      >
        Create Account
      </CustomButton>

      {/** TEST Button */}
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
        Test Button
      </CustomButton> */}

      {/** Terms */}
      <CustomText style={tw`mt-2 px-5 text-center text-[${colors.grey}]`}>
        By creating an account, you accept our terms and conditions. We'll never
        sell your data.
      </CustomText>
    </>
  );
}

// Export
export default FormRegisterDetails;
