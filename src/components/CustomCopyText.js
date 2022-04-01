// Import resources
import React from "react";

// Import custom files
import useCustomClipboard from "../hooks/useCustomClipboard";
import CustomListItem from "./CustomListItem";

// Component
function CustomCopyText({ title, ...rest }) {
  // Define copy to clipboard
  const { handleCopyToClipboard } = useCustomClipboard();

  // Return component
  return (
    <>
      <CustomListItem
        title={title}
        iconLeft="content-copy"
        onPress={() => handleCopyToClipboard(title)}
        {...rest}
      />
    </>
  );
}

// Export
export default CustomCopyText;
