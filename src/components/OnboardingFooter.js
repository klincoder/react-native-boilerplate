// Import resources
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import routes from "../screens/routes";
import CustomButton from "./CustomButton";

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
      <View style={tw`flex-row justify-center mt-5`}>
        {/** Loop indicator item */}
        {slides?.length > 0 &&
          slides?.map((_, index) => (
            <View
              key={index + 1}
              style={[
                tw`h-1 w-2 mb-5 mx-1 rounded-sm bg-[${colors.lightgrey}]`,
                currSlide === index && tw`w-6 bg-[${colors.white}]`,
              ]}
            />
          ))}
      </View>

      {/** Buttons */}
      <View style={tw`mt-5 mb-20`}>
        {/** Button items */}
        <View>
          {/** Get started */}
          <CustomButton
            //isNormal
            isPaper
            color={colors.secondary}
            onPress={() => navigation.navigate(routes.LOGIN)}
          >
            Get Started
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

// Export
export default OnboardingFooter;
