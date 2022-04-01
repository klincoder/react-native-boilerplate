// Import resources
import React from "react";
import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useResetRecoilState } from "recoil";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import { userAtom } from "../recoil/atoms";
import { alertMsg } from "../config/appConfig";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import CustomButton from "./CustomButton";
import CustomAlertModal from "./CustomAlertModal";
import CustomText from "./CustomText";

// Component
function Logout({ mode, isButton, isIconButton, ...rest }) {
  // Define atom
  const resetUserAtom = useResetRecoilState(userAtom);

  // Define alert state
  const alert = useCustomAlertState();

  // Define toast state
  const toast = useCustomToastState();

  // Define navigation
  const navigation = useNavigation();

  // FUNCTIONS
  // HANDLE CONFIRM LOGOUT
  const handleConfirmLogout = () => {
    alert.showAlert(alertMsg?.logoutConfirm);
  };

  // HANDLE LOGOUT
  const handleLogout = async () => {
    // Set async storage to null
    await AsyncStorage.removeItem("@loggedInUser")
      .then(() => {
        // Reset user atom
        resetUserAtom();
        // Hide alert
        alert.hideAlert();
        // Toast succ
        toast.success(alertMsg?.logoutSucc);
      })
      .catch((err) => {
        // Alert err
        alert.showAlert(err.message);
        //console.log("Error logout: ", err);
      });
  };

  // Return
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        cancelText="Cancel"
        confirmAction={handleLogout}
      />

      {/** Button */}
      {isButton && (
        <CustomButton
          icon="logout"
          mode={mode}
          onPress={handleConfirmLogout}
          {...rest}
        >
          Logout
        </CustomButton>
      )}

      {/** Icon button */}
      {isIconButton && (
        <TouchableOpacity
          style={tw`flex-row`}
          onPress={handleConfirmLogout}
          activeOpacity={0.6}
        >
          {/** Icon */}
          <IconButton icon="logout" color={colors.white} size={24} {...rest} />
          {/** Label */}
          <CustomText style={tw`text-white self-center text-lg font-medium`}>
            Logout
          </CustomText>
        </TouchableOpacity>
      )}
    </>
  );
}

// Export
export default Logout;
