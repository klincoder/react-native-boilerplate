// Import resources
import React from "react";
import { RadioButton } from "react-native-paper";

// Import custom files
import CustomButton from "./CustomButton";
import CustomListItem from "./CustomListItem";
import { appColors } from "../config/data";

// Component
function CustomRadio({ title, value, onValueChange, onPress, ...rest }) {
  // Debug
  //console.log("Debug customRadio: ",)

  // Return component
  return (
    <CustomButton isTouchable onPress={onPress}>
      <CustomListItem
        {...rest}
        title={title}
        rightContent={() => (
          <RadioButton
            value={value}
            onValueChange={onValueChange}
            //status={checked ? "checked" : "unchecked"}
            color={appColors?.primary}
          />
        )}
      />
    </CustomButton>
  ); // close return
} // close component

// Export
export default CustomRadio;
