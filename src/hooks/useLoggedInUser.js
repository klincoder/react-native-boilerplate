// Import resources
import { useRecoilValue } from "recoil";

// Import custom files
import { allUsersAtom, userAtom, userInternetAtom } from "../recoil/atoms";

// Component
function useLoggedInUser() {
  // Define user
  const user = useRecoilValue(userAtom);
  const userInternet = useRecoilValue(userInternetAtom);

  // Define all users
  const allUsers = useRecoilValue(allUsersAtom);

  // Define user info
  const userID = user?.userID;
  const username = user?.username;
  const userEmail = user?.emailAddress;
  const userAvatar = user?.avatar;
  const userPhone = user?.phoneNumber;
  const userPushStatus = user?.pushNotifications;

  // Define user net info
  const userNetInfo = {
    bssID: userInternet?.details?.bssid,
    frequency: userInternet?.details?.frequency,
    ipAddress: userInternet?.details?.ipAddress,
    isConnExpensive: userInternet?.details?.isConnectionExpensive,
    strength: userInternet?.details?.strength,
    subnet: userInternet?.details?.subnet,
    isConnected: userInternet?.isConnected,
    isReachable: userInternet?.isInternetReachable,
    isWifiEnabled: userInternet?.isWifiEnabled,
    type: userInternet?.type,
  };

  // Debug
  //console.log("Debug useLoggedInUser: ", user);

  // FUNCTIONS
  // HANDLE EMAIL EXIST
  const handleEmailExist = (emailAddr) => {
    // If empty args, return
    if (!emailAddr) return;
    // Filter email addr
    const filterEmailAddr = allUsers?.filter(
      (item) => item?.emailAddress === emailAddr
    );
    // Define data
    const isValid = filterEmailAddr?.length > 0;
    const data = filterEmailAddr[0];
    // Return
    return { isValid, data };
  }; // close fxn

  // HANDLE USERNAME EXIST
  const handleUsernameExist = (username) => {
    // If empty args, return
    if (!username) return;
    // Filter username
    const filterUsername = allUsers?.filter(
      (item) => item?.username === username
    );
    // Define data
    const isValid = filterUsername?.length > 0;
    const data = filterUsername[0];
    // Return
    return { isValid, data };
  }; // close fxn

  // Return component
  return {
    user,
    userID,
    username,
    userEmail,
    userAvatar,
    userPhone,
    userPushStatus,
    userInternet,
    userNetInfo,
    handleEmailExist,
    handleUsernameExist,
  }; // close return
} // close component

// Export
export default useLoggedInUser;
