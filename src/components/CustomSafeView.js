// Import resources
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import tw from "twrnc";

// Import custom files
import { appColors } from "../config/data";

// Component
function CustomSafeView({ children, style }) {
  // Return component
  return (
    <SafeAreaView style={[tw`flex-1 bg-[${appColors?.white}]`, style]}>
      {/** Status bar */}
      <StatusBar style="auto" backgroundColor={appColors?.primary} />
      {children}
    </SafeAreaView>
  ); // close return
} // close component

// Export
export default CustomSafeView;
