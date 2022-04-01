// Import resources
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import bcryptjs from "bcryptjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import tw from "twrnc";
import moment from "moment";

// Import custom files
import colors from "../config/colors";
import routes from "../screens/routes";
import { userAtom } from "../recoil/atoms";
import { alertMsg } from "../config/appConfig";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import useEmailSender from "../hooks/useEmailSender";
import CustomFormInput from "./CustomFormInput";
import CustomButton from "./CustomButton";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomText from "./CustomText";
import CustomSpinner from "./CustomSpinner";
import CustomAlertModal from "./CustomAlertModal";

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

  // Define email sender
  const { handleLoginEmail, handleUserEmailChecker } = useEmailSender();

  // Debug
  //console.log("Debug loginForm: ");

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
    pass: "",
  };

  // Validation
  const validate = Yup.object().shape({
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(5, "Too short"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Define user email checker
    const emailChecker = await handleUserEmailChecker(values.emailAddr);
    // Define userInfo from email checker
    const userInfo = emailChecker?.dbUser;

    // If email does not exist
    if (!emailChecker?.isValidEmail) {
      // Alert err
      alert.showAlert(alertMsg?.inValidUser);
      setSubmitting(false);
      return;
    } else {
      // Verify password
      const verifyPass = bcryptjs.compareSync(values.pass, userInfo?.password);

      // If !verifyPass, return
      if (!verifyPass) {
        // Alert err
        alert.showAlert(alertMsg?.loginErr);
        setSubmitting(false);
        return;
      } // close is !verifyPass

      // Define username
      const username = userInfo?.username;

      // Set async storage value
      const storageUserVal = JSON.stringify(userInfo);
      await AsyncStorage.setItem("@loggedInUser", storageUserVal);

      // Send login email
      await handleLoginEmail(
        username,
        values.emailAddr,
        moment().format("MMM D, YYYY [at] h:mm A")
      );

      // Alert succ
      toast.success("Login successful");
      // Set submitting
      setSubmitting(false);
      // Set atom
      setUserAtom(userInfo);
    } // close if emailChecker
  }; // close submit form

  // Return component
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        cancelText="Close"
      />

      {/** Form */}
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

              {/** Email Address*/}
              <CustomFormInput
                name="emailAddr"
                icon="email"
                placeholder="Email Address"
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/** Password */}
              <CustomFormInput
                name="pass"
                icon="lock"
                placeholder="Password"
                mode="outlined"
                secureTextEntry
              />

              {/** Submit button */}
              <CustomButton
                isPaper
                style={tw`mt-3`}
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                Login
              </CustomButton>

              {/** Other links */}
              <View style={tw`mt-4 flex-row justify-between`}>
                {/** Forgot password */}
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.PASSWORD_RECOVERY)}
                >
                  <CustomText style={tw`text-base`}>
                    Forgot Password?
                  </CustomText>
                </TouchableOpacity>

                {/** Register */}
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.REGISTER)}
                >
                  <CustomText style={tw`text-base`}>Register</CustomText>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidWrapper>
    </>
  );
}

// Export
export default FormLogin;
