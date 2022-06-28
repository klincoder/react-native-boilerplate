// Import resources
import * as Clipboard from "expo-clipboard";

// Import custom files
import useCustomToastState from "./useCustomToastState";

// Component
function useCustomClipboard() {
  // Define toast state
  const toast = useCustomToastState();

  // Debug
  //console.log("Debug: ", address);

  // FUNCTIONS
  // Handle copy to clipboard
  const handleCopyToClipboard = (value) => {
    // If no address
    if (!value) return;
    // Copy string
    Clipboard.setString(value);
    // Alert succ
    toast.success("Copied!");
  };

  // Return component
  return { handleCopyToClipboard }; // close return
} // close component

// Export
export default useCustomClipboard;
