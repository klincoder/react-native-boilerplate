// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import useCustomAlertState from "../hooks/useCustomAlertState";
import CustomButton from "./CustomButton";
import CustomAlertModal from "./CustomAlertModal";
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomIcon from "./CustomIcon";
import { alertMsg, appColors } from "../config/data";

// Component
function Logout({ isNormal, isButton, ...rest }) {
  // Define alert state
  const alert = useCustomAlertState();

  // Define app settings
  const { handleLogout } = useAppSettings();

  // FUNCTIONS
  // HANDLE CONFIRM LOGOUT
  const handleConfirmLogout = () => {
    alert.showAlert(alertMsg?.logoutConfirm);
  }; // close fxn

  // Return component
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        cancelText="Cancel"
        confirmAction={() => {
          // Hide alert
          alert.hideAlert();
          // Logout
          handleLogout();
        }}
      />

      {/** isNormal */}
      {isNormal && (
        <CustomButton
          isTouchable
          onPress={handleConfirmLogout}
          styleTouchableView={tw`flex-row items-center`}
        >
          <CustomIcon
            type="materialIcons"
            icon="logout"
            size={20}
            style={tw`mr-2 text-[${appColors?.white}]`}
          />
          {/** Label */}
          <CustomText style={tw`text-white text-lg font-medium`}>
            Logout
          </CustomText>
        </CustomButton>
      )}

      {/** isButton */}
      {isButton && (
        <CustomButton isTouchable onPress={handleConfirmLogout}>
          <CustomText style={tw`text-base`}>
            <CustomIcon type="materialIcons" icon="logout" /> Logout
          </CustomText>
        </CustomButton>
      )}
    </>
  ); // close return
} // close component

// Export
export default Logout;
