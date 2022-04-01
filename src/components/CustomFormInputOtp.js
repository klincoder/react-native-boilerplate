// Import resources
import React, { useRef } from "react";
import { View } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import tw from "twrnc";
import { useFormikContext } from "formik";

// Import custom files
import colors from "../config/colors";
import CustomSafeView from "./CustomSafeView";
import CustomText from "./CustomText";

// Component
function CustomFormInputOtp(props) {
  // Destructure props
  const { label, name } = props;

  // Define inputRef
  const inputRef = useRef();

  // Destructure formik context
  const { values, handleSubmit, setFieldValue } = useFormikContext();

  // Debug
  //console.log("Debug customFormInputOtp: ", values.verifyCodeInput);

  // Return component
  return (
    <CustomSafeView>
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Label */}
        <CustomText style={tw`text-2xl mb-5`}>{label}</CustomText>

        {/** Input */}
        <SmoothPinCodeInput
          ref={inputRef}
          value={values.verifyCodeInput}
          onTextChange={(e) => setFieldValue("verifyCodeInput", e)}
          onFulfill={handleSubmit}
          cellStyle={tw`border-2 border-[${colors.primary}]`}
          cellStyleFocused={tw`border-[${colors.secondary}]`}
          autoFocus={true}
        />
      </View>
    </CustomSafeView>
  );
}

// Export
export default CustomFormInputOtp;
