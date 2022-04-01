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
    <CustomSafeView>
      <View style={tw`flex-1 justify-center px-5`}>
        {/** Form */}
        <FormRegister />
      </View>
    </CustomSafeView>
  );
}

// Export
export default RegisterScreen;
