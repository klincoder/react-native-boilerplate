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
    <CustomSafeView>
      {/** CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>BlankScreen</CustomText>
      </View>
    </CustomSafeView>
  );
}

// Export
export default BlankScreen;
