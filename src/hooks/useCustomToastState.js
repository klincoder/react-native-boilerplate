// Import resources
import Toast from "react-native-toast-message";

// Component
function useCustomToastState() {
  // Define toast success
  const success = (message) => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Success",
      text2: message,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 50,
    });
  };

  // Define toast error
  const error = (message) => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Error",
      text2: message,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 50,
    });
  };

  // Define toast info
  const info = (message) => {
    Toast.show({
      type: "info",
      position: "top",
      text1: "Info",
      text2: message,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 50,
    });
  };

  // Return
  return { success, error, info };
}

// Export
export default useCustomToastState;
