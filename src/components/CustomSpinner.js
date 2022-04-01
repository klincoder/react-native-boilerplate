// Import resources
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";

// Component
function CustomSpinner({ isLoading }) {
  // Return component
  return (
    <>
      <Spinner
        visible={isLoading}
        textContent={"Please wait..."}
        textStyle={tw`text-[${colors.white}]`}
        overlayColor="rgba(0, 0, 0, 0.9)"
      />
    </>
  );
}

// Export
export default CustomSpinner;
