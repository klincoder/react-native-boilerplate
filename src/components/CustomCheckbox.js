// Import resources
import React from "react";
import { Checkbox, List } from "react-native-paper";

// Component
function CustomCheckbox({ title, iconLeft, checked, onPress, ...rest }) {
  // Return component
  return (
    <List.Item
      title={title}
      right={(props) => <List.Icon {...props} icon={iconLeft} />}
      left={(props) => (
        <Checkbox
          {...props}
          status={checked ? "checked" : "unchecked"}
          onPress={onPress}
        />
      )}
      {...rest}
    />
  );
}

// Export
export default CustomCheckbox;
