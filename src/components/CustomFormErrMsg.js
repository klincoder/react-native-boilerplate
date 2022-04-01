// Import resources
import React from "react";
import { HelperText } from "react-native-paper";

// Component function
function CustomFormErrMsg({ error, visible }) {
  // Check if error is undefined
  if (!visible || !error) return null;

  // Debug
  // console.log("Debug customFormErrMsg: ")

  // Return component
  return (
    <HelperText type="error" visible={visible} padding="none">
      {error}
    </HelperText>
  );
}

// Export component
export default CustomFormErrMsg;
