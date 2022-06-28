// Import resources
import React, { useRef } from "react";
import { View } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import tw from "twrnc";
import { useFormikContext } from "formik";

// Import custom files
import CustomSafeView from "./CustomSafeView";
import CustomText from "./CustomText";
import { appColors, appStyles } from "../config/data";

// Component
function CustomOtpInput({ label, name, ...rest }) {
  // Define inputRef
  const inputRef = useRef();

  // Destructure formik context
  const { values, handleSubmit, setFieldValue } = useFormikContext();

  // Debug
  //console.log("Debug customOtpInput: ", values.verifyCodeInput);

  // Return component
  return (
    <CustomSafeView>
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Label */}
        <View style={tw`mt-3 mb-8`}>
          <CustomText style={[tw`text-2xl mb-2 text-center`, appStyles?.bold]}>
            Verification Code
          </CustomText>
          <CustomText style={tw`text-lg text-center`}>
            Enter the OTP code we sent to your email or phone. Please check your
            inbox or spam folder.
          </CustomText>
        </View>

        {/** Input */}
        <SmoothPinCodeInput
          ref={inputRef}
          autoFocus={true}
          codeLength={6}
          cellSize={45}
          cellSpacing={10}
          onFulfill={handleSubmit}
          value={values.verifyCodeInput}
          onTextChange={(e) => setFieldValue("verifyCodeInput", e)}
          cellStyleFocused={tw`border-[${appColors?.danger}]`}
          cellStyle={tw`border-2 rounded-xl border-[${appColors?.primary}]`}
        />
      </View>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default CustomOtpInput;
