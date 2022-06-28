// Import resources
import React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";

// Component
function CustomSearchBar({ styleContainer, placeholder, value, onChangeText }) {
  // Debug
  //console.log("Debug customSearchBar: ",)

  // Return component
  return (
    <View style={styleContainer}>
      <Searchbar
        placeholder={placeholder || "Search..."}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  ); // close return
} // close component

// Export
export default CustomSearchBar;
