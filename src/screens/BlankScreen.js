// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";

// Component
function BlankScreen() {
  // Debug
  //console.log("Debug blankScreen: ",);

  // Return component
  return (
    <CustomSafeView style={tw`px-4 pt-3`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>BlankScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default BlankScreen;
