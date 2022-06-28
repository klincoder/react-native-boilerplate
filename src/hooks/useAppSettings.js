// Import resources
import { useRecoilValue, useResetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

// Import custom files
import useCustomAlertState from "./useCustomAlertState";
import useCustomToastState from "./useCustomToastState";
import { appSettingsAtom, userAtom } from "../recoil/atoms";
import { handleFormatDate } from "../config/functions";
import { alertMsg } from "../config/data";

// Component
function useAppSettings() {
  // Define atom
  const appSettings = useRecoilValue(appSettingsAtom);

  // Define atom
  const resetUserAtom = useResetRecoilState(userAtom);

  // Define alert state
  const alert = useCustomAlertState();

  // Define toast state
  const toast = useCustomToastState();

  // Define company info
  const companyInfo = {
    name: appSettings?.companyName,
    supportPhone: appSettings?.supportPhone,
    supportEmail: appSettings?.supportEmail,
    workHours: appSettings?.companyWorkHours,
    noreplyEmail: appSettings?.noreplyEmail,
  };

  // Define todays date
  const todaysDate = moment.utc().format();
  const todaysDateFormat1 = handleFormatDate(todaysDate, 1);
  const todaysDateFormat2 = handleFormatDate(todaysDate, 2);

  // Debug
  //console.log("Debug appSettings: ",);

  // FUNCTIONS
  // HANDLE LOGOUT
  const handleLogout = async () => {
    // Set async storage to null
    await AsyncStorage.removeItem("@loggedInUser")
      .then(() => {
        // Hide alert
        //alert.hideAlert();
        // Reset user atom
        resetUserAtom();
        // Toast succ
        toast.success(alertMsg?.logoutSucc);
      })
      .catch((err) => {
        // Alert err
        alert.showAlert(err.message);
        //console.log("Error logout: ", err);
      });
  }; // close fxn

  // Return component
  return {
    companyInfo,
    todaysDate,
    todaysDateFormat1,
    todaysDateFormat2,
    handleLogout,
  }; // close return
} // close component

// Export
export default useAppSettings;
