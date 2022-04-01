// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import tw from "twrnc";
import { Checkbox } from "react-native-paper";

// Import custom files

// Component
function CustomFormCheckbox({ name, label, ...rest }) {
  // Destructure useFormikContext
  const { setFieldValue, values } = useFormikContext();

  // Return
  return (
    <View style={tw`mb-2`}>
      <Checkbox.Item
        {...rest}
        label={label}
        position="leading"
        status={values[name] ? "checked" : "unchecked"}
        onPress={() => setFieldValue(name, !values[name])}
        //labelStyle={{ paddingRight: 30 }}
      />

      {/* <CustomText style={tw`self-center`}>
        I accept the terms and conditions
      </CustomText> */}
    </View>
  );
}

// Export
export default CustomFormCheckbox;
