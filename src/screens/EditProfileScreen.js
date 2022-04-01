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
    <CustomSafeView>
      {/** Main container */}
      <View style={tw`p-4`}>
        {/** Form */}
        <FormEditProfile />
      </View>
    </CustomSafeView>
  );
}

// Export
export default EditProfileScreen;
