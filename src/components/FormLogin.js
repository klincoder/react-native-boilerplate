// Import resources
import React, { useState } from "react";
import tw from "twrnc";
import bcryptjs from "bcryptjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";

// Import custom files
import routes from "../screens/routes";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import CustomButton from "./CustomButton";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomText from "./CustomText";
import CustomSpinner from "./CustomSpinner";
import CustomAlertModal from "./CustomAlertModal";
import useLoggedInUser from "../hooks/useLoggedInUser";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import { userAtom } from "../recoil/atoms";
import { alertMsg, apiRoutes } from "../config/data";
import { handleUserEmail } from "../config/functions";

// Component
function FormLogin() {
  // Define navigation
  const navigation = useNavigation();

  // Define alert
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

  // Define atom
  const setUserAtom = useSetRecoilState(userAtom);

  // Define logged in user
  const { handleEmailExist, handleUsernameExist } = useLoggedInUser();

  // Define app settings
  const { todaysDate, todaysDateFormat1 } = useAppSettings();

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Debug
  //console.log("Debug loginForm: ");

  // FORM CONFIG
  // Initial values
  const initialValues = {
    username: "",
    pass: "",
  };

  // Validation
  const validate = Yup.object().shape({
    username: Yup.string().required("Required").max(50, "Too short"),
    pass: Yup.string().required("Required").min(5, "Too short"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Define variables
    const finalUsername = values.username?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();

    // Define email exist
    const usernameExist = handleUsernameExist(finalUsername);
    const emailExist = handleEmailExist(finalUsername);

    // Define user info
    const userInfo = usernameExist?.isValid
      ? usernameExist?.data
      : emailExist?.data;

    // If !usernameExist, return
    if (!usernameExist?.isValid && !emailExist?.isValid) {
      // Alert err
      alert.showAlert(alertMsg?.inValidUser);
      setSubmitting(false);
      return;
    } else {
      // Verify password
      const verifyPass = bcryptjs.compareSync(finalPass, userInfo?.password);

      // If !verifyPass, return
      if (!verifyPass) {
        // Alert err
        alert.showAlert(alertMsg?.loginErr);
        setSubmitting(false);
        return;
      } // close is !verifyPass

      // Set async storage value
      const storageUserVal = JSON.stringify(userInfo);
      await AsyncStorage.setItem("@loggedInUser", storageUserVal);

      // Send emails
      // Login alert to user
      await handleUserEmail(
        userInfo?.username,
        userInfo?.emailAddress,
        todaysDateFormat1,
        apiRoutes?.login
      );

      // Alert succ
      toast.success("Login successful");
      // Set submitting
      setSubmitting(false);
      // Set atom
      setUserAtom(userInfo);
    } // close if !usernameExist
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validate}
      >
        {({ values, isValid, isSubmitting, handleSubmit }) => (
          <>
            {/** Debug */}
            {/* {console.log("Debug formLoginValues: ", values)} */}

            {/** Show spinner */}
            <CustomSpinner isLoading={isSubmitting} />

            {/** Alert modal */}
            <CustomAlertModal
              visible={alert.visible}
              content={alert.message}
              hideDialog={alert.hideAlert}
              cancelAction={alert.hideAlert}
              cancelText="Close"
            />

            {/** Username */}
            <CustomTextInputForm
              name="username"
              label="Username or email"
              placeholder="Enter username or email"
              leftIconName="user"
              autoCapitalize="none"
            />

            {/** Pass */}
            <CustomTextInputForm
              isPass
              name="pass"
              label="Password"
              placeholder="Enter password"
              leftIconName="lock"
              rightIconType="feather"
              rightIconName={hidePass ? "eye" : "eye-off"}
              rightIconOnPress={() => setHidePass(!hidePass)}
              secureTextEntry={hidePass}
              autoCapitalize="none"
            />

            {/** Submit button */}
            <CustomButton
              isPaper
              onPress={handleSubmit}
              stylePaper={tw`mt-3`}
              disabled={!isValid || isSubmitting}
            >
              Login
            </CustomButton>

            {/** Other links */}
            <View style={tw`flex-row justify-between mt-4`}>
              {/** Forgot password */}
              <CustomButton
                isText
                onPress={() => navigation.navigate(routes.PASSWORD_RECOVERY)}
                styleText={tw`text-base normal-case`}
              >
                Forgot Password?
              </CustomButton>

              {/** Register */}
              <CustomButton
                isText
                onPress={() => navigation.navigate(routes.REGISTER)}
                styleText={tw`text-base normal-case`}
              >
                Register
              </CustomButton>
            </View>

            {/** TEST BUTTON */}
            {/* <CustomButton
              isPaper
              stylePaper={tw`mt-20 bg-black`}
              stylePaperLabel={tw`text-white py-2`}
              onPress={() => toast.success("Test message goes here.")}
            >
              TEST BUTTON
            </CustomButton> */}
          </>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
} // close component

// Export
export default FormLogin;
