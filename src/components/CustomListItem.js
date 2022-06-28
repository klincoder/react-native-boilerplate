// Import resources
import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import CustomDivider from "./CustomDivider";
import CustomIcon from "./CustomIcon";
import CustomImage from "./CustomImage";
import { appColors } from "../config/data";

// Component
function CustomListItem({
  isLink,
  isImage,
  title,
  titleStyle,
  description,
  onPress,
  showDivider,
  leftImage,
  leftIconType,
  leftIconName,
  rightContent,
  ...rest
}) {
  // Debug
  //console.log("Debug customListItem: ",)

  // Return component
  return (
    <>
      {isLink ? (
        <View>
          {/** For items with navigation */}
          <List.Item
            {...rest}
            title={title}
            titleStyle={titleStyle || tw`text-base`}
            description={description}
            onPress={onPress}
            right={rightContent}
            left={(props) => {
              // If isImage
              if (isImage) {
                return (
                  <CustomImage
                    isLink
                    image={leftImage}
                    style={[tw`mr-3`, { width: 35, height: 35 }]}
                  />
                );
              } else {
                // Return icon
                return (
                  <CustomIcon
                    type={leftIconType || "antDesign"}
                    icon={leftIconName}
                    size={28}
                    style={tw`mr-3 self-center text-[${appColors.lightblack}]`}
                  />
                );
              } // close if isImage
            }} // close left content
          />
          {/** Divider */}
          <CustomDivider />
        </View>
      ) : (
        <>
          {/** For items without navigation */}
          <List.Item
            {...rest}
            title={title}
            titleStyle={titleStyle || tw`text-base`}
            description={description}
            onPress={onPress}
            right={rightContent}
            left={(props) => {
              // If isImage
              if (isImage) {
                return (
                  <CustomImage
                    isLink
                    image={leftImage}
                    style={[tw`mr-3 rounded-full`, { width: 35, height: 35 }]}
                  />
                );
              } else {
                // Return icon
                return (
                  <CustomIcon
                    type={leftIconType || "antDesign"}
                    icon={leftIconName}
                    size={28}
                    style={tw`mr-3 self-center text-[${appColors.lightblack}]`}
                  />
                );
              } // close if isImage
            }} // close left content
          />
          {/** Show divider */}
          {showDivider && <CustomDivider />}
        </>
      )}
    </>
  ); // close return
} // close component

// Export
export default CustomListItem;
