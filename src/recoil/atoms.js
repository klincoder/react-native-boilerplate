// Import resources
import { atom } from "recoil";

// DEFINE ATOMS
// User atom
export const userAtom = atom({
  key: "userAtom",
  default: null,
});

// App settings atom
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: null,
});

// App onboarding atom
export const appOnboardingAtom = atom({
  key: "appOnboardingAtom",
  default: null,
});
