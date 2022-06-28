// Import resources
import React, { useRef, useState } from "react";
import { Dimensions, StatusBar, FlatList } from "react-native";
import { useRecoilValue } from "recoil";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import OnboardingItem from "../components/OnboardingItem";
import OnboardingFooter from "../components/OnboardingFooter";
import { appOnboardingAtom } from "../recoil/atoms";
import { appColors } from "../config/data";

// Define dimensions
const { width, height } = Dimensions.get("window");

// Component
function OnboardingScreen({ navigation }) {
  // Define atom
  const onboardingSlides = useRecoilValue(appOnboardingAtom);

  // Define state
  const [currSlide, setCurrSlide] = useState(0);
  const currSlideIndex = currSlide ? currSlide?.viewableItems?.[0]?.index : 0;

  // Define slidesOnViewRef
  const slidesOnViewRef = useRef((item) => {
    setCurrSlide(item);
  });

  // Define slidesViewConfigRef
  const slidesViewConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
  });

  // Debug
  //console.log("Debug onboardingScreen: ", onboardingSlides);

  // Return component
  return (
    <CustomSafeView style={tw`bg-[${appColors?.primary}]`}>
      {/** SECTION - STATUS BAR */}
      <StatusBar backgroundColor={appColors?.primary} />

      {/** SECTION - ONBOARDING SLIDES */}
      <FlatList
        data={onboardingSlides}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={slidesOnViewRef.current}
        viewabilityConfig={slidesViewConfigRef.current}
        horizontal
        pagingEnabled
        renderItem={({ item }) => (
          <OnboardingItem
            item={item}
            width={width}
            currSlide={currSlideIndex}
          />
        )}
      />

      {/** SECTION - ONBOARDING FOOTER */}
      <OnboardingFooter
        height={height}
        slides={onboardingSlides}
        currSlide={currSlideIndex}
      />
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default OnboardingScreen;
