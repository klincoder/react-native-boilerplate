// Import resources
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";

// Component
function CustomTextLink({ title, styleTitle, onPress }) {
  // Return component
  return (
    <>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <CustomText style={[tw`text-base underline`, styleTitle]}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </>
  );
}

// Export
export default CustomTextLink;
