// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormRegister from "../components/FormRegister";

// Component
function RegisterScreen() {
  // Debug
  //console.log("Debug registerScreen: ",)

  // Return component
  return (
    <CustomSafeView style={tw`px-4 pt-5`}>
      <View>
        {/** Form */}
        <FormRegister />
      </View>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default RegisterScreen;
