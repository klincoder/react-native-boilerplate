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
    <CustomSafeView style={tw`px-4 pt-5`}>
      {/** SECTION - LOGIN FORM */}
      <View>
        {/** Form */}
        <FormLogin />
      </View>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default LoginScreen;
