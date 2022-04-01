// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import { onboardingPlaceholder } from "../config/appConfig";
import CustomText from "./CustomText";
import CustomImage from "./CustomImage";

// Component
function OnboardingItem({ item, width, currSlide }) {
  // Debug
  //console.log("Debug onboardingItem: ", item.image);

  // Return component
  return (
    <View style={tw`items-center`}>
      {/** Image */}
      <CustomImage
        isLink
        image={item?.image || onboardingPlaceholder}
        style={{ width, height: "75%", resizeMode: "contain" }}
      />
      {/** Title */}
      <CustomText
        style={tw`font-bold mt-3 text-3xl text-center text-[${colors.white}]`}
      >
        {item?.title}
      </CustomText>
      {/** Description */}
      <CustomText
        style={tw`mt-5 max-w-xs leading-3 text-base text-center text-[${colors.lightgrey}]`}
      >
        {item?.description}
      </CustomText>
    </View>
  );
}

// Export
export default OnboardingItem;
