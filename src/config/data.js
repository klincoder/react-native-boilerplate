// Import resources
import routes from "../screens/routes";
import logoImage from "../assets/logo.png";

// BASE URL
export const baseUrl = "https://klincoder.netlify.app";
//https://klincoder.com

// CURRENCY SYMBOL
export const currSymbol = { ngn: "₦", btc: "₿", usd: "$" };

// APP COLORS
export const appColors = {
  primary: "#313BAC",
  secondary: "#F9F871",
  danger: "#ff5252",
  success: "#198754",
  error: "#dc3545",
  info: "#0dcaf0",
  warning: "#FFC107",
  white: "#ffffff",
  black: "#000000",
  lightBlack: "#333333",
  grey: "#808080",
  lightGrey: "#f5f5f5",
};

// ALERT MESSAGE
export const alertMsg = {
  generalErr: "Internal error. Please contact support.",
  generalSucc: "Action successful",
  loginSucc: "Login successful",
  loginErr: "Invalid credentials. Check & try again",
  regSucc: "Registration successful",
  isRequired: "All fields are required",
  isValidUser: "User already exist",
  inValidUser: "User not found",
  otpSent: "Otp sent successfully",
  otpErr: "Invalid code",
  profileSucc: "Profile updated",
  passRecoverySucc: "Password recovery successful",
  logoutConfirm: "Confirm logout",
  logoutSucc: "Logout successful",
  paymentSucc: "Payment successful",
  paymentErr: "Payment failed",
  emailExistErr: "Email address already exist",
  usernameExistErr: "Username not available",
};

// APP IMAGES
export const appImages = {
  logo: logoImage,
  general: "https://placehold.co/600x400.png",
  bankTransfer:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/bank-transfer.png?alt=media&token=47cb143a-8909-46d4-9123-9004eb09efbf",
  creditCard:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/credit-card.png?alt=media&token=aa6bbc9b-37ee-413d-8150-649de975edef",
  onboarding:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/app-onboarding-default.png?alt=media&token=c51ac96f-cdec-47a6-bc21-1a9b0c989fb2",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/avatar-default.png?alt=media&token=589b5b52-2bf3-42e1-994c-e89d1d203f9f",
};

// APP FONTS
export const appFonts = {
  regular: "Montserrat-Regular",
  medium: "Montserrat-Medium",
  light: "Montserrat-Light",
  thin: "Montserrat-Thin",
  regular2: "Lato-Regular",
  medium2: "Lato-Bold",
  light2: "Lato-Light",
  thin2: "Lato-Thin",
};

// GLOBAL SCREEN OPTIONS
export const globalScreenOptions = {
  headerStyle: { backgroundColor: `${appColors?.primary}` },
  headerTitleStyle: { color: "white", fontFamily: appFonts?.medium },
  headerTintColor: "white",
  headerTitleAlign: "center",
};

// PHONE REGEX - 11 DIGITS
export const phoneRegex = /^(?:\d{11})$/;

// WHOLE & DECIMAL NUMBERS ONLY
export const numberDecimalRegex = /^\d*(\.\d+)?$/;

// FIXED DECIMAL PLACES REGEX - 5
export const fixedDecimalRegex5 = /^\d*(\.\d{1,5})?$/;

// DIGITS REGEX
export const digitsOnlyRegex = /^[0-9]+$/;

// CANNOT START ZERO REGEX - BUT CAN CONTAIN 0
export const cantStartWithZeroRegex = /^(?:[1-9]\d*|0)$/;

// API ROUTES
export const apiRoutes = {
  otp: "mailjet-otp",
  welcome: "mailjet-welcome",
  login: "mailjet-login",
  newUser: "mailjet-new-user",
  passChange: "mailjet-pass-change",
  profileChange: "mailjet-profile-change",
  broadcast: "mailjet-broadcast",
  contactForm: "mailjet-contact-form",
  userTranx: "mailjet-user-tranx",
  adminTranx: "mailjet-admin-tranx",
};

// LISTS
// PROFILE LIST
export const profileList = [
  {
    id: "123",
    title: "Edit Profile",
    leftIconType: "antDesign",
    leftIconName: "edit",
    slug: "edit-profile",
    isLink: true,
    screenLink: routes.EDIT_PROFILE,
  },
  {
    id: "456",
    title: "Notifications",
    leftIconType: "feather",
    leftIconName: "bell",
    slug: "notifications",
    isSwitch: true,
  },
];
