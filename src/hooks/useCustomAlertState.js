// Import resources
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import routes from "../screens/routes";

// Component
const useCustomAlertState = () => {
  // Define navigation
  const navigation = useNavigation();

  // Define state
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [hasError, setHasError] = useState(false);

  // Show alert
  //const showAlert = () => setVisible(true);
  // Hide alert
  const hideAlert = () => setVisible(false);

  // FUNCTIONS
  // HANDLE SHOW ALERT
  const showAlert = (msg) => {
    // Set message
    setMessage(msg);
    // Set visible
    setVisible(true);
  }; // close fxn

  // HANDLE GO TO LOGIN SCREEN
  const goToLogin = () => {
    hideAlert();
    navigation.navigate(routes.LOGIN);
  }; // close fxn

  // HANDLE GO TO PREVIOUS SCREEN
  const goBackToPrev = () => {
    hideAlert();
    navigation.goBack();
  }; // close fxn

  // HANDLE FIREBASE ERROR CODE
  const handleErrorCode = (errCode) => {
    let customErrMsg;
    // If hasError
    if (hasError) {
      // Switch error code
      switch (errCode) {
        case "auth/wrong-password":
          customErrMsg = "Wrong password";
          break;
        default:
          customErrMsg = "Unknown error occured";
          break;
      } // close switch
    } // close if hasError
    // Return
    return setMessage(customErrMsg);
  }; // close fxn

  // Return component
  return {
    visible,
    message,
    hasError,
    setMessage,
    showAlert,
    hideAlert,
    goToLogin,
    setHasError,
    handleErrorCode,
    goBackToPrev,
  }; // close retun
}; // close component

// Export
export default useCustomAlertState;
