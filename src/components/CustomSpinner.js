// Import resources
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import tw from "twrnc";

// Import custom files
import { appColors } from "../config/data";

// Component
function CustomSpinner({ isLoading, textContent }) {
  // Return component
  return (
    <Spinner
      visible={isLoading}
      textContent={textContent || "Please wait..."}
      textStyle={tw`text-[${appColors?.white}]`}
      overlayColor="rgba(0, 0, 0, 0.9)"
    />
  ); // close return
} // close component

// Export
export default CustomSpinner;
