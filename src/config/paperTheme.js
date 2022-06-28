// Import resources
import { configureFonts, DefaultTheme } from "react-native-paper";

// Import custom files
import { appColors, appFonts } from "./data";

// Define font config
const fontConfig = {
  regular: {
    fontFamily: appFonts?.regular,
    fontWeight: "400",
  },
  medium: {
    fontFamily: appFonts?.medium,
    fontWeight: "800",
  },
  light: {
    fontFamily: appFonts?.light,
    fontWeight: "300",
  },
  thin: {
    fontFamily: appFonts?.thin,
    fontWeight: "100",
  },
};

// Define platform font
const platformFont = {
  web: fontConfig,
  android: fontConfig,
  ios: fontConfig,
};

// Define paper theme
const paperTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 2,
  fonts: configureFonts(platformFont),
  colors: {
    ...DefaultTheme.colors,
    primary: appColors?.primary,
    accent: appColors?.secondary,
    notification: appColors?.danger,
    disabled: appColors?.lightblack,
    //background: appColors?.lightgrey,
  },
};

// Export
export default paperTheme;
