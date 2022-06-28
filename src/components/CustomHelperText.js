// Import resources
import React from "react";
import { HelperText } from "react-native-paper";

// Component
function CustomHelperText({ title, visible, isError }) {
  // If not visible or empty title
  if (!visible || !title) return null;

  // Debug
  // console.log("Debug customHelperText: ")

  // Return component
  return (
    <HelperText
      type={isError ? "error" : "info"}
      visible={visible}
      padding="none"
    >
      {title}
    </HelperText>
  ); // close return
} // close component

// Export
export default CustomHelperText;
