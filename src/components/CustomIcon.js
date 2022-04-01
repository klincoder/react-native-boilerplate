// Import resources
import React from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

// Component
function CustomIcon({
  icon,
  isMaterialIcon,
  isAntDesign,
  isFontAwesome,
  ...rest
}) {
  // Return component
  return (
    <>
      {/** ICONS */}
      {/** MaterialIcons */}
      {isMaterialIcon && <MaterialIcons name={icon} {...rest} />}

      {/** AntDesign */}
      {isAntDesign && <AntDesign name={icon} {...rest} />}

      {/** Fontawesome */}
      {isFontAwesome && <FontAwesome name={icon} {...rest} />}
    </>
  );
}

// Export
export default CustomIcon;
