// Import resources
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import CustomFormErrMsg from "./CustomFormErrMsg";
import CustomText from "./CustomText";

// Component
function CustomFormInputPass({
  label,
  name,
  icon,
  iconRight,
  iconOnPress,
  iconDisabled,
  formHelperText,
  styleContainer,
  ...rest
}) {
  // Destructure useFormContext
  const { values, errors, touched, setFieldTouched, handleChange } =
    useFormikContext();

  // Define state
  const [showPass, setShowPass] = useState(false);

  // FUNCTIONS
  // HANDLE SHOW PASS
  const handleShowPass = () => setShowPass(!showPass);

  // Return component
  return (
    <View style={styleContainer || tw`mb-3`}>
      {/** Label */}
      {label && <CustomText style={tw`p-0`}>{label}</CustomText>}

      {/** Input */}
      <TextInput
        left={icon && <TextInput.Icon name={icon} />}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        selectionColor={colors.secondary}
        autoCapitalize="none"
        secureTextEntry={showPass ? false : true}
        right={
          <TextInput.Icon
            name={showPass ? "eye-off" : "eye"}
            size={28}
            onPress={handleShowPass}
            //color={colors.white}
            //style={{ backgroundColor: colors.secondary }}
            //disabled={iconDisabled}
          />
        }
        {...rest}
      />

      {/** Form helper text */}
      {formHelperText && (
        <CustomText style={styles.helperTextContainer}>
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
export default CustomFormInputPass;
