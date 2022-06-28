// Import resources
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens or custom files
import ProfileScreen from "../screens/ProfileScreen";
import { globalScreenOptions } from "../config/data";

// Create stack navigator object
const Stack = createStackNavigator();

// Component
function ProfileTabNavigator() {
  // Return component
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      {/** Profile screen */}
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
    </Stack.Navigator>
  ); // close return
} // close component

// Export
export default ProfileTabNavigator;
