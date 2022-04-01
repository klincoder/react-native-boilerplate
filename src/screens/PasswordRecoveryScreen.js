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
    <CustomSafeView>
      {/* Form */}
      <View style={tw`flex-1 justify-center px-5`}>
        {/** Form */}
        <FormPasswordRecovery />
      </View>
    </CustomSafeView>
  );
}

// Export
export default PasswordRecoveryScreen;
