// Import resources
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

// Import custom files
import AppNavigator from "../screens/AppNavigator";
import useInternetConn from "../hooks/useInternetConn";
import { userAtom, appOnboardingAtom } from "../recoil/atoms";
import { fireDB, doc, collection, getDoc, getDocs } from "../config/firebase";

// Export component
export default function AppWrapper() {
  // Define isMounted
  const isMounted = useRef(null);

  // Define internet conn
  const internetConn = useInternetConn();

  // Define state
  const [appIsReady, setAppIsReady] = useState(false);

  // Define user
  const user = useRecoilValue(userAtom);
  const userID = user?.userID;

  // Define atom
  const setUserAtom = useSetRecoilState(userAtom);
  const setAppOnboardingAtom = useSetRecoilState(appOnboardingAtom);

  // Debug
  //console.log("Debug appWrapper: ", user);

  // SIDE EFFECTS
  // LISTEN TO AUTH STATE FROM ASYNC STORAGE
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // If no internet conn
    if (!internetConn) return;
    // IIFE
    (async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Get storage user from AsyncStorage
        const storageUser = await AsyncStorage.getItem("@loggedInUser");
        // If storageUser !== null
        if (storageUser !== null) {
          // Set storage user atom
          const storageUserObj = JSON.parse(storageUser);
          const storageUserID = storageUserObj?.userID;
          // Get logged user from db where userID === storageUserID
          const getUserRef = doc(fireDB, "users", `${storageUserID}`);
          const getUserSnap = await getDoc(getUserRef);
          const getUserData = getUserSnap.exists ? getUserSnap.data() : null;
          setUserAtom(getUserData);
        } else {
          // Get app onboarding
          const getOnboardingRef = collection(fireDB, "appOnboarding");
          const getOnboardingSnap = await getDocs(getOnboardingRef);
          const getOnboardingData =
            getOnboardingSnap.size > 0
              ? getOnboardingSnap.docs.map((doc) => {
                  return doc.data();
                })
              : [];
          // Set atom
          setAppOnboardingAtom(getOnboardingData);
        } // close if
        // Hide splash screen
        await SplashScreen.hideAsync();
      } catch (err) {
        console.log("Error authState: ", err.message);
      } // close try catch
    })();
    // Clean up
    return () => (isMounted.current = false);
  }, [internetConn, userID]);

  // Return component
  return <AppNavigator userID={userID} />;
}
