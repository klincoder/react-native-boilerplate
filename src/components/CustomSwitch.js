// Import resources
import React from "react";
import { Switch, View } from "react-native";
import { useTheme } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import CustomListItem from "./CustomListItem";

// Component
function CustomSwitch({
  label,
  leftIconType,
  leftIconName,
  value,
  onValueChange,
  style,
  ...rest
}) {
  // Define paper useTheme
  const { colors } = useTheme();

  // Debug
  //console.log("Debug customSwitch: ")

  // Return component
  return (
    <CustomListItem
      {...rest}
      title={label}
      leftIconType={leftIconType}
      leftIconName={leftIconName}
      style={[tw`mb-3`, style]}
      rightContent={() => (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ true: colors.primary, false: colors.disabled }}
          thumbColor={colors.primary}
        />
      )}
    />
  ); // close return
} // close component

// Export
export default CustomSwitch;
