// Import resources
import React, { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import moment from "moment";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomAvatar from "../components/CustomAvatar";
import CustomListItem from "../components/CustomListItem";
import CustomSwitch from "../components/CustomSwitch";
import Logout from "../components/Logout";
import CustomSpinner from "../components/CustomSpinner";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import useCustomToastState from "../hooks/useCustomToastState";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { profileList, alertMsg, appColors } from "../config/data";
import { fireDB, doc, setDoc } from "../config/firebase";

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
      }, // close header right container
      headerRight: () => (
        <View style={tw`flex-row items-center justify-between mr-4`}>
          {/** Logout */}
          <Logout isNormal style={tw`text-[${appColors?.white}]`} />
        </View>
      ), // close header right
    }); // close navigation
    // Clean up
    return () => (isMounted.current = false);
  }, [navigation]);

  // Return component
  return (
    <CustomSafeView>
      {/** SECTION - SHOW SPINNER */}
      <CustomSpinner isLoading={spinner.loading} />

      {/** SECTION SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/** Avatar color background */}
          <View style={tw`p-15 bg-[${appColors?.secondary}]`}></View>

          {/** Avatar container */}
          <View style={tw`items-center mt-[-50px]`}>
            {/** Avatar */}
            <CustomAvatar
              isNormal
              size={100}
              style={tw`bg-[${appColors?.white}]`}
            />
          </View>

          {/** Profile list container */}
          <View style={tw`p-4`}>
            {/** Loop list */}
            {profileList?.map((item) => {
              // If item isLink
              if (item?.isLink) {
                // Return list item
                return (
                  <CustomListItem
                    isLink
                    key={item?.id}
                    title={item?.title}
                    leftIconType={item?.leftIconType}
                    leftIconName={item?.leftIconName}
                    style={tw`my-2`}
                    onPress={() => navigation.navigate(item.screenLink)}
                  />
                ); // close return
              } else {
                // Return switch
                return (
                  <CustomSwitch
                    key={item?.id}
                    label={item?.title}
                    value={toggleSwitch}
                    leftIconType={item?.leftIconType}
                    leftIconName={item?.leftIconName}
                    style={tw`my-2`}
                    onValueChange={(val) => {
                      handleUserPushStatus(val);
                      //console.log("Debug switchVal: ", val);
                    }}
                  />
                ); // close return
              } // close if isLink
            })}
          </View>
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default ProfileScreen;
