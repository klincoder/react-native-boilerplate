// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormPasswordRecovery from "../components/FormPasswordRecovery";

// Component
function PasswordRecoveryScreen() {
  // Return component
  return (
    <CustomSafeView style={tw`px-4 pt-5`}>
      {/* SECTION - PASSWORD RECOVERY FORM */}
      <View>
        {/** Form */}
        <FormPasswordRecovery />
      </View>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default PasswordRecoveryScreen;
