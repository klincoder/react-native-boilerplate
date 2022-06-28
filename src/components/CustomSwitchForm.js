// Import resources
import React from "react";
import { useFormikContext } from "formik";

// Import custom files
import CustomSwitch from "./CustomSwitch";
import { appStyles } from "../config/data";

// Component
function CustomSwitchForm({ name, label, value, onValueChange, ...rest }) {
  // Define formik context
  const { values, setFieldValue } = useFormikContext();

  // Debug
  //console.log("Debug customSwitchForm: ")

  // Return component
  return (
    <CustomSwitch
      {...rest}
      label={label}
      value={values[name]}
      titleStyle={appStyles?.bold}
      onValueChange={() => {
        // Set field value
        setFieldValue(name, !values[name]);
        if (onValueChange) {
          onValueChange();
        } // close if onValueChange
      }} // close onValuesChange
    />
  ); // close return
} // close component

// Export
export default CustomSwitchForm;
