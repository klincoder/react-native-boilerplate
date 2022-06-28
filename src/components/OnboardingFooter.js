// Import resources
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

// Import custom files
import routes from "../screens/routes";
import CustomButton from "./CustomButton";
import CustomTextLink from "./CustomTextLink";
import { appColors } from "../config/data";

// Component
function OnboardingFooter({ slides, height, currSlide }) {
  // Define navigation
  const navigation = useNavigation();

  // Debug
  //console.log("Debug onboardingFooter: ", currSlideIndex);

  // Return component
  return (
    <View style={[tw`px-10 justify-between`, { height: height * 0.25 }]}>
      {/** Indicator */}
      <View style={tw`flex-row justify-center mt-1`}>
        {/** Loop indicator item */}
        {slides?.length > 0 &&
          slides?.map((_, index) => (
            <View
              key={index + 1}
              style={[
                tw`h-1 w-2 mb-3 mx-1 rounded-sm bg-[${appColors?.lightgrey}]`,
                currSlide === index && tw`w-6 bg-[${appColors?.white}]`,
              ]}
            />
          ))}
      </View>

      {/** Buttons */}
      <View style={tw`mt-8 mb-20`}>
        <View>
          {/** Login */}
          <CustomButton
            isText
            onPress={() => navigation.navigate(routes.LOGIN)}
            styleText={tw`text-center p-3 bg-[${appColors?.secondary}]`}
          >
            Login
          </CustomButton>

          {/** Register */}
          <CustomTextLink
            title="Not a member? Register"
            onPress={() => navigation.navigate(routes.REGISTER)}
            styleTitle={tw`mt-3 text-white text-center text-base`}
          />
        </View>
      </View>
    </View>
  ); // close return
} // close component

// Export
export default OnboardingFooter;
