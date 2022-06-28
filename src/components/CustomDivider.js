// Import resources
import React from "react";
import { Divider } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import { appColors } from "../config/data";

// Component
function CustomDivider({ isBold, styleBorder }) {
  // Return component
  return (
    <Divider
      style={
        isBold
          ? tw`border-2 border-[${styleBorder || appColors.lightgrey}]`
          : ""
      }
    />
  ); // close return
} // close component

// Export
export default CustomDivider;
