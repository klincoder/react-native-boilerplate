// Import resources
import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

// Import custom files
import colors from "./colors";

// Define toast config
const toastConfig = {
  // Override success type
  success: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        backgroundColor: colors.success,
        borderLeftColor: colors.success,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        color: "white",
      }}
      text2Style={{
        fontSize: 18,
        fontWeight: "400",
        color: "white",
      }}
      text1={text1}
      text2={text2}
    />
  ),
  // Define error type
  error: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        backgroundColor: colors.danger,
        borderLeftColor: colors.danger,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 50 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        color: "white",
      }}
      text2Style={{
        fontSize: 18,
        fontWeight: "400",
        color: "white",
      }}
      text1={text1}
      text2={text2}
      text1NumberOfLines={5}
      text2NumberOfLines={5}
      leadingIconStyle={{ color: colors.white }}
    />
  ),
  // Define infotype
  info: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        backgroundColor: colors.blue,
        borderLeftColor: colors.blue,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        color: "white",
      }}
      text2Style={{
        fontSize: 18,
        fontWeight: "400",
        color: "white",
      }}
      text1={text1}
      text2={text2}
    />
  ),
};

// Export
export default toastConfig;
