// Import resources
import {
  FIREBASE_DEV_API_KEY,
  FIREBASE_DEV_AUTH_DOMAIN,
  FIREBASE_DEV_PROJECT_ID,
  FIREBASE_DEV_STORAGE_BUCKET,
  FIREBASE_DEV_MESSAGING_SENDER_ID,
  FIREBASE_DEV_APP_ID,
  FIREBASE_PROD_API_KEY,
  FIREBASE_PROD_AUTH_DOMAIN,
  FIREBASE_PROD_PROJECT_ID,
  FIREBASE_PROD_STORAGE_BUCKET,
  FIREBASE_PROD_MESSAGING_SENDER_ID,
  FIREBASE_PROD_APP_ID,
} from "@env";

// App
import { initializeApp, getApps, getApp } from "firebase/app";

// Auth
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
} from "firebase/auth";

// Firestore
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  collectionGroup,
  where,
  addDoc,
  serverTimestamp,
  deleteDoc,
  limit,
  increment,
} from "firebase/firestore";

// Storage
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// FIREBASE DEV CONFIG
const firebaseDev = {
  apiKey: FIREBASE_DEV_API_KEY,
  authDomain: FIREBASE_DEV_AUTH_DOMAIN,
  projectId: FIREBASE_DEV_PROJECT_ID,
  storageBucket: FIREBASE_DEV_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_DEV_MESSAGING_SENDER_ID,
  appId: FIREBASE_DEV_APP_ID,
};

// FIREBASE PROD CONFIG
const firebaseProd = {
  apiKey: FIREBASE_PROD_API_KEY,
  authDomain: FIREBASE_PROD_AUTH_DOMAIN,
  projectId: FIREBASE_PROD_PROJECT_ID,
  storageBucket: FIREBASE_PROD_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_PROD_MESSAGING_SENDER_ID,
  appId: FIREBASE_PROD_APP_ID,
};

// INITIALZE APP
// Check app initialzation
const app = !getApps().length ? initializeApp(firebaseDev) : getApp();

// Debug
//console.log("Firebase: ", app.options);

// DEFINE FIREBASE SERVICES
const fireDB = getFirestore(app);
const fireAuth = getAuth(app);
const fireStorage = getStorage(app);

// Export
export {
  fireDB,
  fireAuth,
  fireStorage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  collection,
  doc,
  getDoc,
  onAuthStateChanged,
  setDoc,
  updateProfile,
  sendPasswordResetEmail,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  collectionGroup,
  where,
  addDoc,
  serverTimestamp,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  deleteDoc,
  limit,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  increment,
};
