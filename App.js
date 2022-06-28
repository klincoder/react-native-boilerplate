// Import resources
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

// Import custom files
import toastConfig from "./src/config/toastConfig";
import paperTheme from "./src/config/paperTheme";
import AppWrapper from "./src/components/AppWrapper";
import GetDatabaseContent from "./src/components/GetDatabaseContent";

// Export component
export default function App() {
  // Hide Async storage
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
    "Duplicate atom key 'appSettingsAtom'. This is a FATAL ERROR in production. But it is safe to ignore this warning if it occurred because ofhot module replacement.",
  ]);

  // Return component
  return (
    <RecoilRoot>
      {/** React native provider */}
      <PaperProvider theme={paperTheme}>
        {/** Navigation container */}
        <NavigationContainer theme={paperTheme}>
          {/** App wrapper */}
          <AppWrapper />

          {/** Toast notifications */}
          <Toast config={toastConfig} />

          {/** Get database content */}
          <GetDatabaseContent />
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  ); // close return
} // close component
