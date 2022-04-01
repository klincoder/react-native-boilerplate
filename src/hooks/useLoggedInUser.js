// Import resources
import { useRecoilValue } from "recoil";

// Import custom files
import { userAtom } from "../recoil/atoms";

// Component
function useLoggedInUser() {
  // Define user
  const user = useRecoilValue(userAtom);
  const userID = user?.userID;
  const username = user?.username;
  const userEmail = user?.emailAddress;
  const userAvatar = user?.avatar;
  const userPhone = user?.phoneNumber;
  const userPushStatus = user?.pushNotifications;

  // Debug
  //console.log("Debug useLoggedInUser: ", user);

  // Return component
  return {
    user,
    userID,
    username,
    userEmail,
    userAvatar,
    userPhone,
    userPushStatus,
  };
}

// Export
export default useLoggedInUser;
