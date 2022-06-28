// Import resources
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import * as Font from "expo-font";

// Import custom files
import AppNavigator from "../screens/AppNavigator";
import NoInternetScreen from "../screens/NoInternetScreen";
import {
  userAtom,
  internetConnAtom,
  userInternetAtom,
  appOnboardingAtom,
} from "../recoil/atoms";
import { fireDB, doc, collection, getDoc, getDocs } from "../config/firebase";
import CustomText from "./CustomText";

// Export component
export default function AppWrapper() {
  // Define isMounted
  const isMounted = useRef(null);

  // Define state
  const [appIsReady, setAppIsReady] = useState(false);

  // Define user
  const user = useRecoilValue(userAtom);
  const userID = user?.userID;

  // Define atom
  const [internetConn, setInternetConn] = useRecoilState(internetConnAtom);
  const setUserAtom = useSetRecoilState(userAtom);
  const setUserInternetAtom = useSetRecoilState(userInternetAtom);
  const setAppOnboardingAtom = useSetRecoilState(appOnboardingAtom);

  // Debug
  //console.log("Debug appWrapper: ", user);

  // FUNCTIONS
  // HANDLE LOAD CUSTOM FONTS
  const handleLoadCustomFonts = async () => {
    // Await
    await Font.loadAsync({
      // Load from a static resource
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
      "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
      "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
      "Lato-Medium": require("../assets/fonts/Lato-Bold.ttf"),
      "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
      "Lato-Thin": require("../assets/fonts/Lato-Thin.ttf"),
    }); // close loadSync
  }; // close fxn

  // SIDE EFFECTS
  // LISTEN TO NETINFO
  useEffect(() => {
    // Check internet conn
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Define isOnline
      const isOnline = state.isConnected && state.isInternetReachable;
      setInternetConn(isOnline);
      setUserInternetAtom(state);
      //console.log("Debug netInfoTEST 2: ", { isOnline });
    });
    // Clean up
    return () => unsubscribe();
  }, []);

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
          // Get storage user atom
          const storageUserObj = JSON.parse(storageUser);
          const storageUserID = storageUserObj?.userID;
          // Get logged user from db where userID === storageUserID
          const getUserRef = doc(fireDB, "users", `${storageUserID}`);
          const getUserSnap = await getDoc(getUserRef);
          const getUserData = getUserSnap.exists ? getUserSnap.data() : null;
          // Set atom
          setUserAtom(getUserData);
        } // close if storageUser

        // API CALLS
        // GET ONBOARDING SLIDES
        const appOnboardingRef = collection(fireDB, "appOnboarding");
        const appOnboardingSnap = await getDocs(appOnboardingRef);
        const appOnboardingSize = appOnboardingSnap.size;
        const appOnboardingData =
          appOnboardingSize > 0
            ? appOnboardingSnap.docs.map((doc) => {
                return doc.data();
              })
            : [];
        // Set atom
        setAppOnboardingAtom(appOnboardingData);

        // LOAD CUSTOM FONTS
        await handleLoadCustomFonts();
      } catch (err) {
        console.log("Error authState: ", err.message);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      } // close try catch
    })(); // close fxn
    // Clean up
    return () => (isMounted.current = false);
  }, [internetConn, userID]);

  // HIDE SPLASH SCREEN ON LAYOUT ROOT VIEW
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    } // Clsoe if
  }, [appIsReady]);

  // If !appIsReady
  if (!appIsReady) {
    return null;
  } // close if

  // Return component
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {internetConn ? <AppNavigator userID={userID} /> : <NoInternetScreen />}
    </View>
  ); // close return
} // close component
