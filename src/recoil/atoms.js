// Import resources
import { atom } from "recoil";

// INTERNET CONN ATOM
export const internetConnAtom = atom({
  key: "internetConnAtom",
  default: true,
});

// APP SETTINGS ATOM
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: null,
});

// ALL USERS ATOM
export const allUsersAtom = atom({
  key: "allUsersAtom",
  default: [],
});

// USER ATOM
export const userAtom = atom({
  key: "userAtom",
  default: null,
});

// USER INTERNET ATOM
export const userInternetAtom = atom({
  key: "userInternetAtom",
  default: {},
});

// APP ONBOARDING ATOM
export const appOnboardingAtom = atom({
  key: "appOnboardingAtom",
  default: null,
});
