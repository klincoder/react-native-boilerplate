// Import resources
import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// Component
function KeyboardAvoidWrapper({ children }) {
  // Return component
  return (
    <KeyboardAvoidingView>
      {/** Scroll view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/** Dismiss keyboard */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/** Form - children */}
            <View>{children}</View>
          </TouchableWithoutFeedback>
          {/** Bottom space */}
          <View style={{ height: 50 }} />
        </>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Export
export default KeyboardAvoidWrapper;