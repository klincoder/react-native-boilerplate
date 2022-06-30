// Import resources
import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import CustomHelperText from "./CustomHelperText";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import { appColors, appFonts } from "../config/data";

// Component function
function CustomSelect({
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
  helperTextMsg,
  errName,
  errTouched,
  showModal,
  hideModal,
  modalVisible,
  modalContent,
  modalContentStyle,
  headerContent,
  headerContentStyle,
  footerContent,
  footerContentStyle,
  ...rest
}) {
  // Debug
  //console.log("Debug customSelect: ",)

  // Return component
  return (
    <>
      {/** TOUCHABLE OPACITY */}
      <TouchableOpacity activeOpacity={0.5} onPress={showModal}>
        {/** LIST CONTAINER */}
        <View style={tw`mb-5`}>
          {/** Label */}
          {label && (
            <CustomText
              style={[
                tw`text-base`,
                { fontFamily: appFonts?.medium },
                labelStyle,
              ]}
            >
              {label}
            </CustomText>
          )}

          {/** Select input */}
          <View>
            <TextInput
              {...rest}
              mode={mode || "outlined"}
              style={[tw`bg-white`, style]}
              editable={false}
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
          </View>

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
      </TouchableOpacity>

      {/** Show or hide modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={hideModal}
      >
        <View style={tw`flex-1 px-4 py-2`}>
          {/**Header content */}
          {headerContent && (
            <View style={[tw`mb-3`, headerContentStyle]}>{headerContent}</View>
          )}

          {/** Modal content */}
          {modalContent}

          {/** Footer content */}
          {footerContent && (
            <View style={[tw`mt-3`, footerContentStyle]}>{footerContent}</View>
          )}
        </View>
      </Modal>
    </>
  ); // close return
} // close component

// Export
export default CustomSelect;
