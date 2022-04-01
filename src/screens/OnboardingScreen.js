// Import resources
import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import tw from "twrnc";
import { Dimensions, StatusBar, FlatList } from "react-native";

// Import custom files
import colors from "../config/colors";
import { appOnboardingAtom } from "../recoil/atoms";
import CustomSafeView from "../components/CustomSafeView";
import OnboardingItem from "../components/OnboardingItem";
import OnboardingFooter from "../components/OnboardingFooter";

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
    <CustomSafeView style={tw`flex-1 bg-[${colors.primary}]`}>
      {/** Status bar */}
      <StatusBar backgroundColor={colors.primary} />

      {/** Onboarding slides */}
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

      {/** Onboarding footer */}
      <OnboardingFooter
        height={height}
        slides={onboardingSlides}
        currSlide={currSlideIndex}
      />
    </CustomSafeView>
  );
}

// Export
export default OnboardingScreen;
