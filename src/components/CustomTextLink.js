// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

// Component
function CustomTextLink({ title, styleTitle, onPress, ...rest }) {
  // Return component
  return (
    <CustomButton isTouchable onPress={onPress} {...rest}>
      <CustomText style={[tw`text-base underline`, styleTitle]}>
        {title}
      </CustomText>
    </CustomButton>
  ); // close return
} // close component

// Export
export default CustomTextLink;
