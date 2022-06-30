// Import resources
import React, { useRef } from "react";
import { View, FlatList } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import CustomDivider from "../components/CustomDivider";
import useLoggedInUser from "../hooks/useLoggedInUser";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import CustomButton from "../components/CustomButton";
import { appColors } from "../config/data";
import { internetConnAtom } from "../recoil/atoms";

// Component
function HomeScreen() {
  // Define isMounted
  const isMounted = useRef(null);

  // Define user
  const { username, userNetInfo } = useLoggedInUser();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Define internet conn
  const internetConn = useRecoilValue(internetConnAtom);

  // Define navigation
  const navigation = useNavigation();

  // Debug
  //console.log("Debug homeScreen: ", userNetInfo);

  // Return component
  return (
    <CustomSafeView style={tw`px-4 pt-5`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>Home Screen</CustomText>

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
  ); // close return
} // close component

// Export
export default HomeScreen;
