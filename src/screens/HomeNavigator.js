// Import resources
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Import custom files
import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import ProfileNavigator from "../screens/ProfileNavigator";

// Create bottom nav object
const Tab = createMaterialBottomTabNavigator();

// Create stack navigation
function HomeNavigator() {
  // Return
  // Screens for visible bottom tab
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      shifting={true}
      sceneAnimationEnabled={false}
      activeColor={colors.secondary}
    >
      {/** Home tab screen */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: "home",
          tabBarLabel: "Home",
        }}
      />

      {/** ADD BOTTOM TABS WITH ITS NAVIGATOR */}
      {/** Profile tab screen */}
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: "account-settings",
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

// Export component
export default HomeNavigator;
