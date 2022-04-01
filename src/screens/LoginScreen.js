// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormLogin from "../components/FormLogin";

// Component
function LoginScreen() {
  // Debug
  //console.log("Debug loginScreen: ",);

  // Return component
  return (
    <CustomSafeView>
      <View style={tw`flex-1 justify-center p-5`}>
        {/* Form */}
        <FormLogin />
      </View>
    </CustomSafeView>
  );
}

// Export
export default LoginScreen;
