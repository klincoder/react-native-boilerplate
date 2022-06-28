// Import resources
import React from "react";
import { Badge } from "react-native-paper";

// Component
function CustomBadge({ children, ...rest }) {
  // Return component
  return <Badge {...rest}>{children}</Badge>;
} // close component

// Export
export default CustomBadge;
