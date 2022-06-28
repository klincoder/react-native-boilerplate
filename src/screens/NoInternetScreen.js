// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomIconMsg from "../components/CustomIconMsg";
import { appColors } from "../config/data";

// Component
function NoInternetScreen() {
  // Return component
  return (
    <CustomSafeView style={tw`bg-[${appColors?.lightgrey}]`}>
      {/** SECTION - ICON MESSAGE */}
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Icon msg */}
        <CustomIconMsg
          isMaterialIcon
          type="materialIcons"
          icon="wifi-off"
          size={50}
          color={appColors?.black}
          styleMsg={tw`max-w-xs text-center`}
          message="No Internet Connection"
        />
      </View>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default NoInternetScreen;
