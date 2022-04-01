// Import resources
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";

// Component function
function CustomSafeView({ children, style }) {
  // Return component
  return (
    <SafeAreaView style={[tw`flex-1 bg-[${colors.white}]`, style]}>
      {/** Status bar */}
      <StatusBar style="auto" backgroundColor={colors.primary} />
      {/** Children */}
      {children}
    </SafeAreaView>
  );
}

// Export component
export default CustomSafeView;
