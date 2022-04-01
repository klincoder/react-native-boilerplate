// Import resources
import React from "react";
import { View } from "react-native";
import { Paragraph, Dialog, Portal } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomButton from "./CustomButton";
import CustomDivider from "./CustomDivider";

// Component
function CustomAlertModal({
  visible,
  hideDialog,
  content,
  confirmAction,
  confirmText,
  cancelAction,
  cancelText,
}) {
  // Return component
  return (
    <View>
      {/** Portal */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          {/** Title */}
          <Dialog.Title>Alert</Dialog.Title>

          {/** Divider */}
          <CustomDivider />

          {/** Content */}
          <Dialog.Content>
            <Paragraph style={tw`pt-2 text-base`}>{content}</Paragraph>
          </Dialog.Content>

          {/** Divider */}
          <CustomDivider />

          {/** Actions */}
          <Dialog.Actions style={tw`flex-row`}>
            {/** Cancel button */}
            {cancelAction && (
              <CustomButton
                isNormal
                onPress={cancelAction}
                styleTitle={tw`text-base text-[${colors.white}]`}
                styleTitleContainer={[
                  tw`px-4 py-3 bg-[${colors.danger}]`,
                  confirmAction && tw`mr-2`,
                ]}
              >
                {cancelText || "Close"}
              </CustomButton>
            )}

            {/** Confirm button */}
            {confirmAction && (
              <CustomButton
                isNormal
                onPress={confirmAction}
                styleTitle={tw`text-base text-[${colors.white}]`}
                styleTitleContainer={tw`mr-2 px-4 py-3 bg-[${colors.success}]`}
              >
                {confirmText || "Confirm"}
              </CustomButton>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

// Export
export default CustomAlertModal;
