// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormEditProfile from "../components/FormEditProfile";

// Component
function EditProfileScreen() {
  // Debug
  //console.log("Debug editProfScreen: ", user);

  // Return component
  return (
    <CustomSafeView style={tw`px-4 pt-5`}>
      {/** SECTION - EDIT PROFILE FORM */}
      <View>
        {/** Form */}
        <FormEditProfile />
      </View>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default EditProfileScreen;
