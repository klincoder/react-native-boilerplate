// Import resources
import React, { useRef, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

// Import custom files
import { allUsersAtom, appSettingsAtom, userAtom } from "../recoil/atoms";
import {
  fireDB,
  doc,
  collection,
  getDoc,
  getDocs,
  where,
  query,
  orderBy,
  onSnapshot,
} from "../config/firebase";

// Component
function GetDatabaseContent() {
  // Define isMounted
  const isMounted = useRef(null);

  // Define user
  const user = useRecoilValue(userAtom);
  const userID = user?.userID;

  // Define atom
  const setAppSettingsAtom = useSetRecoilState(appSettingsAtom);
  const setAllUsersAtom = useSetRecoilState(allUsersAtom);
  const setUserAtom = useSetRecoilState(userAtom);

  // SIDE EFFECTS
  // LISTEN TO USER DETAILS
  useEffect(() => {
    // If !userID return
    if (!userID) return;
    // Get user details from db
    const userRef = doc(fireDB, "users", `${userID}`);
    // Snapshot
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const userData = snapshot.exists() ? snapshot.data() : "";
      // Set atom
      setUserAtom(userData);
    });
    // Clean up
    return () => unsubscribe();
  }, [userID, setUserAtom]);

  // SIDE EFFECTS
  // API CALLS
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // IIFE
    (async () => {
      // Debug
      //console.log("Debug getDatabaseContentAPI: ",);
    })(); // close fxn
    // Clean up
    return () => (isMounted.current = false);
  }, []);

  // SIDE EFFECTS
  // LISTEN TO DATABASE
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // LISTEN TO APP SETTINGS - GENERAL
    const appSettingsRef = doc(fireDB, "appSettings", "generalSettings");
    // Snapshot
    onSnapshot(appSettingsRef, (snapshot) => {
      const appSettingsData = snapshot.exists() ? snapshot.data() : "";
      // Set atom
      setAppSettingsAtom(appSettingsData);
    });

    // LISTEN TO ALL USERS
    const allUsersRef = collection(fireDB, "users");
    // Snapshot
    onSnapshot(allUsersRef, (snapshot) => {
      // Set atom
      setAllUsersAtom(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });

    // // LISTEN TO SAMPLE
    // const appOnboardingRef = collection(fireDB, "appOnboarding");
    // // Snapshot
    // onSnapshot(appOnboardingRef, (snapshot) => {
    //   // Set atom
    //   setAppOnboardingAtom(
    //     snapshot.docs.map((doc) => {
    //       return doc.data();
    //     })
    //   );
    // });

    // Clean up
    return () => (isMounted.current = false);
  }, [userID, setAppSettingsAtom, setAllUsersAtom]);

  // Return component
  return null;
} // close component

// Export
export default GetDatabaseContent;
