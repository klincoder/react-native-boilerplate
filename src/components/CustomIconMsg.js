// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";

// Component
function CustomIconMsg({
  type,
  icon,
  size,
  color,
  message,
  styleMsg,
  ...rest
}) {
  // Return component
  return (
    <>
      {/** Icon */}
      <CustomIcon
        {...rest}
        type={type}
        icon={icon}
        size={size}
        color={color || appColors?.grey}
      />

      {/** Message */}
      {message && (
        <CustomText style={[tw`pt-2 text-lg`, styleMsg]}>{message}</CustomText>
      )}
    </>
  ); // close return
} // close component

// Export
export default CustomIconMsg;
