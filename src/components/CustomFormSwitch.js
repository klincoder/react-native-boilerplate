// Import resources
import React from "react";
import { View, Switch } from "react-native";
import { useFormikContext } from "formik";
import { List } from "react-native-paper";
import tw from "twrnc";

// Import custom files

// Component
function CustomFormSwitch({ name, title, iconLeft }) {
  // Destructure useFormikContext
  const { setFieldValue, values } = useFormikContext();

  // Return component
  return (
    <View style={tw`mb-3 bg-white`}>
      <List.Item
        title={title}
        left={(props) => <List.Icon {...props} icon={iconLeft} />}
        right={(props) => (
          <Switch
            {...props}
            value={values[name]}
            onValueChange={(val) => setFieldValue(name, val)}
          />
        )}
      />
    </View>
  );
}

// Export
export default CustomFormSwitch;
