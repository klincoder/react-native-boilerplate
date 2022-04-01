// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import colors from "./colors";
import CustomIcon from "../components/CustomIcon";

// VARIABLES
// BASE URL
export const baseURL = "https://klincoder.netlify.app";
// https://klincoder.com
// https://klincoder.netlify.app

// CURRENCY SYMBOL
export const currSymbol = { ngn: "₦", btc: "₿", usd: "$" };

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
  otpSucc: "We've sent your OTP code. Check your inbox or spam folder.",
  otpErr: "Invalid code",
  profileSucc: "Profile updated",
  passRecoverySucc: "Password recovery successful",
  logoutConfirm: "Are you sure you want to logout?",
  logoutSucc: "Logout successful",
};

// LOGO LINK
export const logoLink = "";

// AVATAR PLACEHOLDER
export const avatarPlaceholder =
  "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/avatar-default.png?alt=media&token=589b5b52-2bf3-42e1-994c-e89d1d203f9f";

// ONBOARDING PLACEHOLDER
export const onboardingPlaceholder =
  "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/app-onboarding-default.png?alt=media&token=c51ac96f-cdec-47a6-bc21-1a9b0c989fb2";

// GLOBAL SCREEN OPTIONS
export const globalScreenOptions = {
  headerStyle: { backgroundColor: `${colors.primary}` },
  headerTitleStyle: { color: "white" },
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
export const digitsRegex = /^[0-9]+$/;

// CANNOT START ZERO REGEX - BUT CAN CONTAIN 0
export const cantStartWithZeroRegex = /^(?:[1-9]\d*|0)$/;

// FUNCTIONS
// HANDLE SLICE STRING
export const handleSliceString = (stringInput, sliceTo) => {
  // If !stringInput or typeof != string, return
  if (!stringInput || !sliceTo || typeof stringInput != "string") return;
  return stringInput.slice(0, sliceTo) + "...";
}; // close fxn

// HANDLE UPPERCASE FIRST LETTER
export const handleUppercaseFirst = (stringInput) => {
  // If typeof stringInput != string
  if (typeof stringInput != "string") return "";
  return stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
}; // close fxn

// HANDLE FORMAT NUMBER
export const handleFormatNumber = (value, decimal) => {
  // Define formatVal
  let formatVal;
  // If value > 0
  if (value > 0) {
    formatVal = parseFloat(value)
      .toFixed(decimal)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    formatVal = 0;
  } // close if
  // Return
  return formatVal;
}; // close fxn

// HANDLE FORM VALUES CHECKER
export const handleFormValuesChecker = (obj) => {
  // if typeof !== object, return
  if (typeof obj !== "object") return;
  // Convert obj to arr
  const objArr = Object.values(obj);
  // Check if any value is empty
  const isEmpty = objArr.includes("");
  // Return
  return isEmpty;
}; // close fxn

// HANDLE TEXTAREA PHONE NUMBERS
export const handleTextareaPhoneNumbers = (values) => {
  // Define variables
  // Split textarea values to array and trim it
  const trimPhone = values?.split(/[\r?\n,]+/).map((item) => item.trim());
  // Filter empty values from keywords array
  const filterPhone = trimPhone.filter((a) => a);
  // Remove duplicates
  const uniquePhone = [...new Set(filterPhone)];
  // Define phoneArr
  const phoneArr = uniquePhone?.map((item) => item.replace("0", "+234"));
  // Finally... replace first character with 234
  const finalPhone = uniquePhone
    ?.map((item) => item.replace("0", "+234"))
    .join(", ");
  // Count phone
  const finalPhoneCount = uniquePhone?.length;
  // Check if each phoneNum === 11
  const isValidPhone = uniquePhone?.every((item) => {
    if (item?.length === 11) {
      return true;
    } else {
      return false;
    } // close if
  }); // close isValidPhone
  // Return
  return { finalPhone, finalPhoneCount, isValidPhone, phoneArr };
}; // close fxn

// GENERATE USERNAME FROM EMAIL ADDRESS
export const handleGenUsername = (email) => {
  // If data type is string
  if (typeof email === "string") {
    return email.split("@")[0];
  } else {
    return null;
  } // close if
}; // close fxn

// HANDLE GENERATE OTP CODE
export const handleGenOtpCode = () => {
  // Define code - random 4 digit numbers
  const code = Math.floor(1000 + Math.random() * 9000); //Math.floor(Math.random() * 999999 + 1);
  return code.toString();
}; // close fxn

// HANDLE FORM SELECT ITEMS - SAMPLE
export const handleFormSelectItems = (objArr) => {
  // If !obj, return
  if (!objArr || typeof objArr != "object") return;
  // Define result
  let result = [];
  // Loop objArr and generate new objArr
  objArr?.map((item) => {
    result.push({
      label: item.name,
      value: item.slug,
      image: "",
      fee: item.receiveFee,
    });
  });
  // Return
  return result;
}; // close fxn

// HANDLE GENERATE TRANX REFERENCE
export const handleGenTranxRef = (prefix) => {
  // If !prefix, return
  if (!prefix) return;
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const result =
    prefix + Math.random().toString(36).toUpperCase().slice(2, 5) + randomCode;
  return result;
};

// HANDLE TRANX STATUS COLOR
export const handleTranxStatusColor = (status) => {
  // If !status, return
  if (!status) return;
  // Format status
  const formatStatus = status.toLowerCase();
  // Define status text and color
  let text, color;
  // Switch formatStatus
  switch (formatStatus) {
    // 1
    case "completed":
      text = "completed";
      color = colors.success;
      break;
    // 2
    case "pending":
      text = "pending";
      color = colors.warning;
      break;
    // Default
    default:
      text = formatStatus;
      color = colors.danger;
      break;
  } // close switch
  // Return
  return { text, color };
}; // close fxn

// HANDLE TRANX CATEGORY ICON
export const handleTranxCategoryIcon = (category) => {
  // If no category, return
  if (!category) return;
  // Format category
  const formCategory = category.toLowerCase();
  // Switch format category
  switch (formCategory) {
    // 1
    case "receive crypto":
      return (
        <CustomIcon
          isAntDesign
          icon="arrowdown"
          size={20}
          style={tw`pr-2 text-[${colors.success}]`}
        />
      );
    // 2
    case "referral earnings":
      return (
        <CustomIcon
          isAntDesign
          icon="arrowdown"
          size={20}
          style={tw`pr-2 text-[${colors.success}]`}
        />
      );
    // Default
    default:
      return (
        <CustomIcon
          isAntDesign
          icon="arrowup"
          size={20}
          style={tw`pr-2 text-[${colors.danger}]`}
        />
      );
  } // close switch
}; // close fxn

// HANDLE SUM TRANX AMT
export const handleSumTranxAmt = (objArr, itemName) => {
  // If !objArr or objArr != object, return
  if (!itemName || !objArr || objArr != "object") return;
  // Loop objArr - convert objArr to arr
  const convertObjArrToArr = objArr?.map((obj) => {
    return obj?.itemName;
  });
  // Sum arr value
  const sumArrValue = convertObjArrToArr?.reduce((a, b) => {
    return a + b;
  }, 0);
  // Return
  return sumArrValue;
}; // close funx
