// Import resources
import React from "react";
import { Image } from "react-native";

// Component
function CustomImage({ isLink, image, ...rest }) {
  // Return component
  return (
    <>
      {/** Image */}
      {isLink ? (
        <>
          <Image source={{ uri: image }} {...rest} />
        </>
      ) : (
        <>
          <Image source={image} {...rest} />
        </>
      )}
    </>
  ); // cloe return
} // close component

// Export
export default CustomImage;
