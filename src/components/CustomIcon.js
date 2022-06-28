// Import resources
import React from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Ionicons,
  EvilIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

// Component
function CustomIcon({ type, icon, ...rest }) {
  // Return component
  return (
    <>
      {/** ICONS */}
      {/** MaterialIcons */}
      {type === "materialIcons" && <MaterialIcons name={icon} {...rest} />}

      {/** AntDesign */}
      {type === "antDesign" && <AntDesign name={icon} {...rest} />}

      {/** FontAwesome5 */}
      {type === "fontAwesome5" && <FontAwesome5 name={icon} {...rest} />}

      {/** Entypo */}
      {type === "entypo" && <Entypo name={icon} {...rest} />}

      {/** Ionicons */}
      {type === "ionIcons" && <Ionicons name={icon} {...rest} />}

      {/** Evilicons */}
      {type === "evilIcons" && <EvilIcons name={icon} {...rest} />}

      {/** Materil community icons */}
      {type === "materialCommunityIcons" && (
        <MaterialCommunityIcons name={icon} {...rest} />
      )}

      {/** Feather */}
      {type === "feather" && <Feather name={icon} {...rest} />}
    </>
  ); // return component
} // close component

// Export
export default CustomIcon;
