// Import resources
import React from "react";
import { View } from "react-native";
import { Paragraph, Dialog, Portal } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import { appColors } from "../config/data";
import CustomButton from "./CustomButton";
import CustomDivider from "./CustomDivider";

// Component
function CustomAlertModal({
  title,
  visible,
  hideDialog,
  content,
  confirmAction,
  confirmText,
  cancelAction,
  cancelText,
  isDetails,
}) {
  // Return component
  return (
    <View>
      {/** Portal */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          {/** Title */}
          {title && <Dialog.Title>{title}</Dialog.Title>}

          {/** Divider */}
          <CustomDivider />

          {/** Content */}
          <Dialog.Content>
            {isDetails ? (
              <>{content}</>
            ) : (
              <Paragraph style={tw`pt-4 text-lg`}>{content}</Paragraph>
            )}
          </Dialog.Content>

          {/** Divider */}
          <CustomDivider />

          {/** Actions */}
          <Dialog.Actions style={tw`flex-row`}>
            {/** Cancel button */}
            {cancelAction && (
              <CustomButton
                isPaper
                onPress={cancelAction}
                stylePaperLabel={tw`text-[${appColors?.white}]`}
                stylePaper={[
                  tw`bg-[${appColors?.danger}]`,
                  confirmAction && tw`mr-2`,
                ]}
              >
                {cancelText || "Close"}
              </CustomButton>
            )}

            {/** Confirm button */}
            {confirmAction && (
              <CustomButton
                isPaper
                onPress={confirmAction}
                stylePaperLabel={tw`text-[${appColors?.white}]`}
                stylePaper={tw`mr-2 bg-[${appColors?.success}]`}
              >
                {confirmText || "Confirm"}
              </CustomButton>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  ); // close return
} // close component

// Export
export default CustomAlertModal;
