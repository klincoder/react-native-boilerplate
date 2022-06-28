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
  black: "#000000",
  lightblack: "#777777",
  white: "#ffffff",
  grey: "#808080",
  lightgrey: "#f5f5f5",
  darkgrey: "#0c0c0c",
  danger: "#ff5252",
  success: "#198754",
  error: "#dc3545",
  info: "#0dcaf0",
  warning: "#FFC107",
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

// APP STYLES
export const appStyles = {
  bold: { fontFamily: appFonts?.medium },
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

// APP FEATURES LIST
export const appFeaturesList = [
  {
    id: "123",
    title: "Image Picker",
    screenLink: routes.FEATURES_IMAGE_PICKER,
    slug: "image-picker",
  },
  {
    id: "456",
    title: "Form Inputs",
    screenLink: routes.FEATURES_FORM_INPUT,
    slug: "form",
  },
  {
    id: "789",
    title: "Internet Info",
    screenLink: routes.FEATURES_INTERNET_INFO,
    slug: "internet-info",
  },
  {
    id: "1011",
    title: "Code Scanner",
    screenLink: routes.FEATURES_CODE_SCANNER,
    slug: "code-scanner",
  },
];

// GENDER LIST
export const genderList = [
  { id: "123", key: "Male", value: "male", image: appImages?.general },
  { id: "456", key: "Female", value: "female", image: appImages?.general },
];

// BANK LIST
export const bankList = [
  {
    id: "123",
    key: "Access Bank",
    value: "access",
    image: appImages?.general,
  },
  {
    id: "456",
    key: "Zenith Bank",
    value: "zenith",
    image: appImages?.general,
  },
  {
    id: "789",
    key: "Wema Bank",
    value: "wema",
    image: appImages?.general,
  },
];

// COURSE LIST
export const courseList = [
  { id: "123", key: "HTML", value: "html", image: appImages?.general },
  { id: "456", key: "CSS", value: "css", image: appImages?.general },
  {
    id: "789",
    key: "Bootstrap",
    value: "bootstrap",
    image: appImages?.general,
  },
  {
    id: "1011",
    key: "JavaScript",
    value: "javascript",
    image: appImages?.general,
  },
  { id: "1213", key: "React", value: "react", image: appImages?.general },
  {
    id: "1415",
    key: "React Native",
    value: "react native",
    image: appImages?.general,
  },
  {
    id: "1617",
    key: "Tailwind CSS",
    value: "tailwind",
    image: appImages?.general,
  },
  {
    id: "1819",
    key: "Recoil",
    value: "recoil",
    image: appImages?.general,
  },
  {
    id: "2021",
    key: "Nextjs",
    value: "nextjs",
    image: appImages?.general,
  },
  {
    id: "2223",
    key: "Nodejs",
    value: "Nodejs",
    image: appImages?.general,
  },
];
