// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "../components/CustomText";

// Component
function BlankComponent() {
  // Debug
  //console.log("Debug blankComponent: ",)

  // Return component
  return (
    <View>
      <CustomText>Content goes here</CustomText>
    </View>
  ); // close return
} // close component

// Export
export default BlankComponent;
