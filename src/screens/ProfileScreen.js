// Import resources
import React, { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import moment from "moment";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import { profileList } from "../config/data";
import { alertMsg } from "../config/appConfig";
import { fireDB, doc, setDoc } from "../config/firebase";
import CustomSafeView from "../components/CustomSafeView";
import CustomAvatar from "../components/CustomAvatar";
import CustomListItem from "../components/CustomListItem";
import CustomSwitch from "../components/CustomSwitch";
import Logout from "../components/Logout";
import CustomSpinner from "../components/CustomSpinner";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import useCustomToastState from "../hooks/useCustomToastState";
import useLoggedInUser from "../hooks/useLoggedInUser";

// Component
function ProfileScreen({ navigation }) {
  // Define isMounted
  const isMounted = useRef(null);

  // Define user
  const { userID, userPushStatus } = useLoggedInUser();

  // Define state
  const [toggleSwitch, setToggleSwitch] = useState(userPushStatus);

  // Define toast
  const toast = useCustomToastState();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Debug
  //console.log("Debug profileScreen: ", userPushStatus);

  // FUNCTIONS
  // HANDLE SET PUSH NOTIFICATIONS
  const handleUserPushStatus = async (val) => {
    // If !userID or !val, return
    if (!userID) return;
    // Set loading
    spinner.showLoading();
    // Set toggleSwitch
    setToggleSwitch(val);
    // Edit user push
    const pushRef = doc(fireDB, "users", `${userID}`);
    await setDoc(
      pushRef,
      {
        pushNotifications: val,
        dateUpdated: moment().format(),
      },
      { merge: true }
    );
    // Alert succ
    toast.success(alertMsg?.generalSucc);
    // Set loading
    spinner.hideLoading();
  }; // close fxn

  // SIDE EFFECTS - LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      headerRightContainer: {
        flex: 1,
        justifyContent: "flex-end",
      },
      headerRight: () => (
        <>
          <View style={tw`flex-row items-center justify-between mr-4`}>
            {/** Logout */}
            <Logout isIconButton style={tw`text-[${colors.white}]`} />
          </View>
        </>
      ),
    });
    // Clean up
    return () => (isMounted.current = false);
  }, [navigation]);

  // Return component
  return (
    <CustomSafeView>
      {/** Spinner */}
      <CustomSpinner isLoading={spinner.loading} />
      {/** Scroll view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** Main container */}
        <View>
          {/** Avatar color background */}
          <View style={tw`p-15 bg-[${colors.secondary}]`}></View>
          {/** Avatar container */}
          <View style={tw`items-center mt-[-50px]`}>
            {/** Avatar */}
            <CustomAvatar
              isNormal
              size={100}
              style={tw`bg-[${colors.white}]`}
            />
          </View>

          {/** Profile list container */}
          <View style={tw`p-4`}>
            {/** Loop list */}
            {profileList?.map((item) => {
              // If item isLink
              if (item.isLink) {
                return (
                  <CustomListItem
                    isLink
                    key={item.id}
                    title={item.title}
                    iconLeft={item.iconLeft}
                    style={tw`my-2`}
                    onPress={() => navigation.navigate(item.screenLink)}
                  />
                );
              } else {
                return (
                  <CustomSwitch
                    key={item.id}
                    style={tw`my-2`}
                    title={item.title}
                    iconLeft={item.iconLeft}
                    value={toggleSwitch}
                    color={colors.secondary}
                    onValueChange={(val) => {
                      handleUserPushStatus(val);
                      //console.log("Debug switchVal: ", val);
                    }}
                  />
                );
              } // close if isLink
            })}
          </View>
        </View>
      </ScrollView>
    </CustomSafeView>
  );
}

// Export
export default ProfileScreen;
