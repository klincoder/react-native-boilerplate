// Import resources
import React from "react";
import { StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomFormErrMsg from "./CustomFormErrMsg";
import CustomText from "./CustomText";

// Component
function CustomFormInput({
  name,
  icon,
  iconRight,
  iconOnPress,
  iconDisabled,
  formHelperText,
  ...rest
}) {
  // Define formik context
  const { values, errors, touched, setFieldTouched, handleChange } =
    useFormikContext();

  return (
    <View style={tw`mb-3`}>
      {/** Input */}
      <TextInput
        left={icon && <TextInput.Icon name={icon} />}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        selectionColor={colors.secondary}
        right={
          iconRight && (
            <TextInput.Icon
              name={iconRight}
              onPress={iconOnPress}
              color={colors.white}
              style={tw`bg-[${colors.secondary}]`}
              disabled={iconDisabled}
            />
          )
        }
        {...rest}
      />

      {/** Form helper text */}
      {formHelperText && (
        <CustomText style={tw`pt-5 text-[${colors.grey}]`}>
          {formHelperText}
        </CustomText>
      )}

      {/** Error message */}
      <CustomFormErrMsg error={errors[name]} visible={touched[name]} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  helperTextContainer: {
    paddingTop: 5,
    color: colors.grey,
  },
});

// Export
export default CustomFormInput;
