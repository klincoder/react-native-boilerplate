// Import resources
import React from "react";
import { View } from "react-native";
import { Avatar, Headline, Subheading } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import { avatarPlaceholder } from "../config/appConfig";
import useLoggedInUser from "../hooks/useLoggedInUser";

// Component
function CustomAvatar({
  size,
  isNormal,
  isDetails,
  styleIsDetails,
  isInverted,
  headline,
  subHeading,
  styleSubHeading,
  styleProfileDetailsContainer,
  styleHeadline,
  ...rest
}) {
  // Define user
  const { userAvatar } = useLoggedInUser();

  // Define avatar
  const avatar = userAvatar || avatarPlaceholder;

  // Return component
  return (
    <>
      {/** Is normal */}
      {isNormal && (
        <Avatar.Image size={size} source={{ uri: avatar }} {...rest} />
      )}

      {/** Is details */}
      {isDetails && (
        <View style={[tw`flex-row`, styleIsDetails]}>
          {/** Profile image */}
          <Avatar.Image
            size={size}
            source={{ uri: avatar }}
            style={tw`mr-10`}
            {...rest}
          />

          {/** Profile details */}
          {isInverted ? (
            <View style={styleProfileDetailsContainer}>
              {/** Subheading */}
              <Subheading style={styleSubHeading}>{subHeading}</Subheading>
              {/** Headline */}
              <Headline style={styleHeadline}>{headline}</Headline>
            </View>
          ) : (
            <View style={styleProfileDetailsContainer}>
              {/** Headline */}
              <Headline style={styleHeadline}>{headline}</Headline>
              {/** Subheading */}
              <Subheading style={styleSubHeading}>{subHeading}</Subheading>
            </View>
          )}
        </View>
      )}
    </>
  );
}

// Export
export default CustomAvatar;
