// Import resources
import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";

// Import custom file
import CustomDivider from "../components/CustomDivider";

// Component
function CustomListItem({
  isLink,
  title,
  description,
  iconLeft,
  iconRight,
  onPress,
  showDivider,
  ...rest
}) {
  // Return component
  return (
    <>
      {isLink ? (
        <View>
          {/** For items with navigation */}
          <List.Item
            title={title}
            description={description}
            left={(props) => <List.Icon {...props} icon={iconLeft} />}
            right={(props) => {
              iconRight && <List.Icon {...props} icon={iconRight} />;
            }}
            onPress={onPress}
            {...rest}
          />
          {/** Divider */}
          <CustomDivider />
        </View>
      ) : (
        <>
          {/** Fo items without navigation */}
          <List.Item
            title={title}
            description={description}
            left={(props) =>
              iconLeft && <List.Icon {...props} icon={iconLeft} />
            }
            right={(props) => {
              iconRight && <List.Icon {...props} icon={iconRight} />;
            }}
            onPress={onPress}
            {...rest}
          />
          {/** Show divider */}
          {showDivider && <CustomDivider />}
        </>
      )}
    </>
  );
}

// Export
export default CustomListItem;
