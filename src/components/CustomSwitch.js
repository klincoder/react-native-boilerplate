// Import resources
import React from "react";
import { Switch, View } from "react-native";
import { Divider, List, useTheme } from "react-native-paper";

// Component
function CustomSwitch({ title, iconLeft, value, onValueChange, ...rest }) {
  // Define paper useTheme
  const { colors } = useTheme();

  // Return
  return (
    <View>
      <List.Item
        title={title}
        left={(props) => <List.Icon {...props} icon={iconLeft} />}
        right={(props) => (
          <Switch
            {...props}
            value={value}
            onValueChange={onValueChange}
            trackColor={{ true: colors.accent, false: colors.disabled }}
            thumbColor={colors.accent}
            //style={{ color: colors.accent }}
          />
        )}
        {...rest}
      />
      <Divider />
    </View>
  );
}

// Export
export default CustomSwitch;
