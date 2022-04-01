// Import resources
import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

// Import custom files
import colors from "../config/colors";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";

// Component
function CustomIconMsg({
  icon,
  iconSize,
  iconColor,
  message,
  styleMsg,
  ...rest
}) {
  // Return component
  return (
    <>
      {/** Icon */}
      <CustomIcon
        icon={icon}
        size={iconSize}
        color={iconColor || colors.grey}
        {...rest}
      />

      {/** Message */}
      {message && (
        <CustomText style={[styles.msg, styleMsg]}>{message}</CustomText>
      )}
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  msg: {
    paddingTop: 5,
    fontSize: 16,
  },
});

// Export
export default CustomIconMsg;
