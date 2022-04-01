// Import resources
import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { RadioButton } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomFormErrMsg from "./CustomFormErrMsg";
import CustomText from "./CustomText";

// Component
function CustomFormRadio({ name, label, items, formHelperText, ...rest }) {
  // Define formik context
  const { errors, touched, values, setFieldValue } = useFormikContext();

  // Return component
  return (
    <View style={tw`mb-3`}>
      {/** Input -container */}
      {/* <RadioButton
        {...rest}
        status={values[name] ? "checked" : "unchecked"}
        onPress={() => setFieldValue(name, !values[name])}
      /> */}

      <View style={tw`p-3 bg-[${colors.lightgrey}]`}>
        {/** Label */}
        {label && <CustomText style={tw`text-base`}>{label}</CustomText>}
        {/** Input - radio group */}
        <RadioButton.Group
          {...rest}
          value={values[name]}
          onValueChange={(e) => setFieldValue(name, e)}
        >
          {/** Radio items container */}
          <View style={tw`flex-row`}>
            {/** Loop items */}
            {items?.length > 0 &&
              items?.map((item, index) => (
                <View key={index + 1} style={tw`flex-row mr-4`}>
                  {/** Radio button */}
                  <RadioButton value={item.value} />
                  {/** Radio label */}
                  <CustomText style={tw`self-center`}>{item.label}</CustomText>
                </View>
              ))}
          </View>
        </RadioButton.Group>

        {/** Form helper text */}
        {formHelperText && (
          <CustomText style={tw`pt-3 text-[${colors.grey}]`}>
            {formHelperText}
          </CustomText>
        )}
      </View>

      {/** Error message */}
      <CustomFormErrMsg error={errors[name]} visible={touched[name]} />
    </View>
  );
}

// Export
export default CustomFormRadio;
