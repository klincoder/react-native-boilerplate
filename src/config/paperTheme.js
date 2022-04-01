// Import resources
import { configureFonts, DefaultTheme } from "react-native-paper";

// Import custom files
import colors from "./colors";

// Define font config
const fontConfig = {
  ios: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    light: {
      fontFamily: "System",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "System",
      fontWeight: "100",
    },
  },
  default: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
};

// Define colors
const paperTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 2,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    notification: colors.danger,
    disabled: colors.lightblack,
    //background: colors.lightgrey,
  },
};

// Export
export default paperTheme;
