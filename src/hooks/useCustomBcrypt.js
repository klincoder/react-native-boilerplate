// Import resources
import axios from "axios";
import bcryptjs from "bcryptjs";

// Import custom files
import { baseUrl } from "../config/data";

// Component
function useCustomBcrypt() {
  // Debug
  //console.log("Debug useCustomBcrypt:");

  // FUNCTIONS
  // HANDLE HASH CODE
  const handleHashCode = async (otpCode) => {
    // Call API
    const res = await axios({
      method: "POST",
      url: `${baseUrl}/api/app-hash-code`,
      data: { data: { code: otpCode } },
    });
    // Debug
    //console.log("Debug customBcrypt: ", res.data);
    return res.data;
  }; // close fxn

  // HANDLE VERIFY PIN
  const handleVerifyPin = (newInput, hashedVal) => {
    // If !newInput or !hashedVal, return
    if (
      !newInput ||
      typeof newInput !== "string" ||
      !hashedVal ||
      typeof hashedVal !== "string"
    )
      return false;
    // Verify password
    const result = bcryptjs.compareSync(newInput, hashedVal);
    // Return
    return result;
  }; // close fxn

  // Return component
  return { handleHashCode, handleVerifyPin }; // close return
} // close component

// Export
export default useCustomBcrypt;
