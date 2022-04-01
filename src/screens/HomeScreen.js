// Import resources
import React, { useRef } from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import CustomDivider from "../components/CustomDivider";
import useLoggedInUser from "../hooks/useLoggedInUser";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import useInternetConn from "../hooks/useInternetConn";

// Component
function HomeScreen() {
  // Define isMounted
  const isMounted = useRef(null);

  // Define user
  const { username } = useLoggedInUser();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Define internet conn
  const internetConn = useInternetConn();

  // Debug
  //console.log("Debug homeScreen: ", internetConn);

  // Return component
  return (
    <CustomSafeView>
      {/** Main container */}
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Text */}
        <CustomText>Home screen</CustomText>

        {/** Divider */}
        <CustomDivider isBold />

        {/** TEST BUTTON */}
        {/* <CustomButton
            isNormal
            style={tw`mb-3`}
            onPress={async () => {
              const flwBanks = await handleGetBanks();
              setBankList(flwBanks);
            }}
          >
            Test Button
          </CustomButton> */}
      </View>
    </CustomSafeView>
  );
}

// Export
export default HomeScreen;
