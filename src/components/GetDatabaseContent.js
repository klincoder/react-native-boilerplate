// Import resources
import React, { useRef, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

// Import custom files
import { appSettingsAtom, userAtom } from "../recoil/atoms";
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
  const setUserAtom = useSetRecoilState(userAtom);
  const setAppSettingsAtom = useSetRecoilState(appSettingsAtom);

  // SIDE EFFECTS
  // LISTEN TO USER DETAILS
  useEffect(() => {
    // If !userID return
    if (!userID) return;
    // Get user details from db
    const userRef = doc(fireDB, "users", `${userID}`);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const userData = snapshot.exists() ? snapshot.data() : "";
      // Set atom
      setUserAtom(userData);
    });
    // Clean up
    return () => unsubscribe();
  }, [userID, setUserAtom]);

  // SIDE EFFECTS
  // LISTEN TO DATABASE
  useEffect(() => {
    // On mount
    isMounted.current = true;

    // LISTEN TO APP GENERAL SETTINGS
    const appSettingsRef = doc(fireDB, "appSettings", "generalSettings");
    onSnapshot(appSettingsRef, (snapshot) => {
      const appSettingsData = snapshot.exists() ? snapshot.data() : "";
      // Set atom
      setAppSettingsAtom(appSettingsData);
    });
    
    // Clean up
    return () => (isMounted.current = false);
  }, [userID, setAppSettingsAtom]);

  // Return component
  return null;
}

// Export
export default GetDatabaseContent;
