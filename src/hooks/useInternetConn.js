// Import resources
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

// Component
const useInternetConn = () => {
  // Define state
  const [connState, setConnState] = useState(true);

  // Debug
  //console.log("Debug useInternetConn: ");

  // SIDE EFFECTS
  // LISTEN TO NETINFO
  useEffect(() => {
    // Check internet conn
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Set state
      setConnState(state.isConnected);
    });
    // Clean up
    return unsubscribe();
  }, []);

  // Return component
  return connState;
};

// Export
export default useInternetConn;
