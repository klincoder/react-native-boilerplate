// Import resources
import React from "react";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import CustomSelect from "./CustomSelect";

// Component function
function CustomSelectForm({
  name,
  label,
  mode,
  style,
  leftIconType,
  leftIconName,
  rightIconType,
  rightIconName,
  rightIconOnPress,
  helperTextMsg,
  errName,
  errTouched,
  modalContent,
  ...rest
}) {
  // Destructure useFormikContext
  const { values, errors, touched, handleChange, setFieldTouched } =
    useFormikContext();

  // Debug
  //console.log("Debug customSelectForm: ",)

  // Return component
  return (
    <CustomSelect
      {...rest}
      name={name}
      label={label}
      value={values[name]?.key}
      onChangeText={handleChange(name)}
      onBlur={() => setFieldTouched(name)}
      errName={errors[name]}
      errTouched={touched[name]}
      modalContent={modalContent}
    />
  ); // close return
} // close component

// Export
export default CustomSelectForm;
