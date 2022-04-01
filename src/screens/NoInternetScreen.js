// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomSafeView from "../components/CustomSafeView";
import CustomIconMsg from "../components/CustomIconMsg";

// Component
function NoInternetScreen() {
  // Return component
  return (
    <CustomSafeView
      style={tw`flex-1 items-center justify-center bg-[${colors.secondary}]`}
    >
      {/** Icon msg */}
      <CustomIconMsg
        isMaterialIcon
        icon="wifi-off"
        iconSize={64}
        iconColor={colors.black}
        styleMsg={tw`max-w-xs text-center`}
        message="No Internet Connection. Connect to the internet to continue..."
      />
    </CustomSafeView>
  );
}

// Export
export default NoInternetScreen;
