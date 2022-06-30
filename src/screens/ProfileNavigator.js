// Import resources
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens or custom files
import ProfileScreen from "../screens/ProfileScreen";
import { globalScreenOptions } from "../config/data";

// Create stack navigator object
const Stack = createStackNavigator();

// Component
function ProfileNavigator() {
  // Define stackList
  const stackList = [
    {
      name: "ProfileScreen",
      component: ProfileScreen,
      options: { headerTitle: "Profile" },
    },
  ];

  // Return component
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <>
        {/** Loop stackList */}
        {stackList?.map((item, index) => (
          <Stack.Screen
            key={item?.name + index + 1}
            name={item?.name}
            component={item?.component}
            options={item?.options}
            //options={{ show }}
          />
        ))}
      </>
    </Stack.Navigator>
  ); // close return
} // close component

// Export
export default ProfileNavigator;
