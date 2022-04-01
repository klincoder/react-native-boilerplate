// Import resources
import React from "react";
import { Divider } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";

// Component
function CustomDivider({ isBold }) {
  // Return component
  return (
    <>
      <Divider
        style={isBold ? tw`border-2 border-[${colors.lightgrey}]` : ""}
      />
    </>
  );
}

// Export
export default CustomDivider;
