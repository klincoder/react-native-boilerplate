// Import resources
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import CustomIcon from "./CustomIcon";
import CustomText from "./CustomText";
import { appColors, appStyles } from "../config/data";

// Component
function CustomButton({
  isPaper,
  isTouchable,
  isIcon,
  isText,
  children,
  mode,
  icon,
  iconType,
  iconName,
  onPress,
  stylePaper,
  stylePaperLabel,
  styleTouchableView,
  styleText,
  ...rest
}) {
  // Return component
  return (
    <>
      {/** isTouchable */}
      {isTouchable && (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} {...rest}>
          <View style={styleTouchableView}>{children}</View>
        </TouchableOpacity>
      )}

      {/** Paper button */}
      {isPaper && (
        <Button
          icon={icon || ""}
          mode={mode || "contained"}
          color={appColors?.secondary}
          labelStyle={stylePaperLabel || tw`text-lg`}
          style={[tw`p-2 rounded-full py-1`, stylePaper]}
          onPress={onPress}
          {...rest}
        >
          {children}
        </Button>
      )}

      {/** Icon button */}
      {isIcon && <CustomIcon type={iconType} icon={iconName} {...rest} />}

      {/** isText */}
      {isText && (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} {...rest}>
          <CustomText
            style={[
              tw`text-xl uppercase rounded-full`,
              appStyles?.bold,
              styleText,
            ]}
          >
            {children}
          </CustomText>
        </TouchableOpacity>
      )}
    </>
  ); // close return component
} // close component

// Export
export default CustomButton;
