// Import resources
import React from "react";
import { Text } from "react-native-paper";

// Component
function CustomText({ children, style, ...rest }) {
  // Return component
  return (
    <Text style={style} {...rest}>
      {children}
    </Text>
  );
}

// Export component
export default CustomText;
