// Import resources
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import CustomHelperText from "./CustomHelperText";
import { appColors, appFonts } from "../config/data";

// Component
function CustomTextInput({
  name,
  label,
  labelStyle,
  mode,
  style,
  leftIconType,
  leftIconName,
  rightIconType,
  rightIconName,
  rightIconOnPress,
  errName,
  errTouched,
  helperTextMsg,
  ...rest
}) {
  // Debug
  // console.log("Debug customTextInput: ",)

  // Return component
  return (
    <View style={tw`mb-3`}>
      {/** Label */}
      {label && (
        <CustomText
          style={[tw`text-base`, { fontFamily: appFonts?.medium }, labelStyle]}
        >
          {label}
        </CustomText>
      )}

      {/** Input */}
      <TextInput
        {...rest}
        mode={mode || "outlined"}
        style={[tw`bg-white`, style]}
        selectionColor={appColors.secondary}
        left={
          leftIconName && (
            <TextInput.Icon
              name={({ size, color }) => (
                <CustomIcon
                  type={leftIconType || "antDesign"}
                  icon={leftIconName}
                  size={size}
                  color={color}
                />
              )}
            />
          )
        } // close left
        right={
          rightIconName && (
            <TextInput.Icon
              name={({ size, color }) => (
                <CustomIcon
                  type={rightIconType || "antDesign"}
                  icon={rightIconName}
                  size={size}
                  color={color}
                  onPress={rightIconOnPress}
                />
              )}
            />
          )
        } // close right
      />

      {/** Helper text msg */}
      {helperTextMsg && (
        <CustomHelperText
          title={helperTextMsg}
          visible={helperTextMsg}
          style={tw`text-[${appColors.grey}]`}
        />
      )}

      {/** Error message */}
      <CustomHelperText isError title={errName} visible={errTouched} />
    </View>
  ); // close return
} // close component

// Export
export default CustomTextInput;
