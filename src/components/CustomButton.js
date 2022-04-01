// Import resources
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomText from "./CustomText";

// Component
function CustomButton({
  style,
  isNormal,
  isPaper,
  isIcon,
  icon,
  mode,
  children,
  styleTitle,
  styleTitleContainer,
  onPress,
  ...rest
}) {
  // Return
  return (
    <>
      {/** Normal button */}
      {isNormal && (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
          <View
            style={[
              tw`px-3 py-4 rounded-md bg-[${colors.secondary}]`,
              styleTitleContainer,
            ]}
          >
            <CustomText
              style={[
                tw`font-bold uppercase text-lg text-center text-[${colors.black}]`,
                styleTitle,
              ]}
            >
              {children}
            </CustomText>
          </View>
        </TouchableOpacity>
      )}

      {/** Paper button */}
      {isPaper && (
        <Button
          icon={icon || ""}
          mode={mode || "contained"}
          color={colors.secondary}
          labelStyle={tw`text-lg`}
          style={[tw`p-2`, style]}
          onPress={onPress}
          {...rest}
        >
          {children}
        </Button>
      )}

      {/** Icon button */}
      {isIcon && <IconButton icon={icon} {...rest} />}
    </>
  );
}

// Export
export default CustomButton;
