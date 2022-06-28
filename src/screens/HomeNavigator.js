// Import resources
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Import custom files
import HomeScreen from "../screens/HomeScreen";
import ProfileNavigator from "../screens/ProfileNavigator";
import { appColors } from "../config/data";
import CustomIcon from "../components/CustomIcon";

// Create bottom nav object
const Tab = createMaterialBottomTabNavigator();

// Component
function HomeNavigator() {
  // Define tabScreenList
  const tabScreenList = [
    {
      name: "HomeScreen",
      component: HomeScreen,
      iconType: "antDesign",
      iconName: "home",
      label: "Home",
    },
    {
      name: "ProfileNavigator",
      component: ProfileNavigator,
      iconType: "antDesign",
      iconName: "user",
      label: "Profile",
    },
  ];

  // Return component
  // Screens for visible bottom tab
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      shifting={false}
      sceneAnimationEnabled={false}
      activeColor={appColors?.secondary}
      inactiveColor={appColors?.white}
      labeled={true}
      // barStyle={{
      //   color: appColors?.white,
      //   backgroundColor: appColors?.primary,
      //   borderTopWidth: 2,
      //   borderTopColor: appColors?.lightgrey,
      //   borderRadius: "50%",
      //   marginBottom: 15,
      //   marginHorizontal: 10,
      // }}
    >
      {/** Loop tabScreenList */}
      {tabScreenList?.map((item, index) => (
        <Tab.Screen
          key={`tabs-${index + 1}`}
          name={item?.name}
          component={item?.component}
          options={{
            tabBarLabel: item?.label,
            tabBarIcon: ({ focused, color }) => (
              <CustomIcon
                type={item?.iconType}
                icon={item?.iconName}
                size={24}
                color={focused ? appColors?.secondary : color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  ); // close return
} // close component

// Export component
export default HomeNavigator;
