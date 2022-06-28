// Import resources
import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import tw from "twrnc";
import moment from "moment";

// Import custom files
import routes from "../screens/routes";
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useLoggedInUser from "../hooks/useLoggedInUser";
import CustomSpinner from "./CustomSpinner";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import CustomTextInputForm from "./CustomTextInputForm";
import useAppSettings from "../hooks/useAppSettings";
import CustomText from "./CustomText";
import { alertMsg, phoneRegex } from "../config/data";
import { fireDB, doc, setDoc } from "../config/firebase";

// Component
function FormEditProfile() {
  // Define user
  const { user, userID, userPhone } = useLoggedInUser();

  // Define navigation
  const navigation = useNavigation();

  // Define toast state
  const toast = useCustomToastState();

  // Define spinner state
  const spinner = useCustomSpinnerState();

  // Define alert state
  const alert = useCustomAlertState();

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Debug
  //console.log("Debug formEditProfile: ", );

  // FORM CONFIG
  // Define initial values
  const initialValues = {
    fullName: user ? user?.fullName : "",
    phoneNum: user ? user?.phoneNumber : "",
  };

  // Validations
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too small"),
    phoneNum: Yup.string().required("Required"),
    //.matches(phoneRegex, "Invalid phone number"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Define variables
    const finalFullName = values.fullName?.trim();
    const finalPhone = values.phoneNum?.trim();

    // Try catch
    try {
      // Update user profile
      const editUserRef = doc(fireDB, "users", `${userID}`);
      // Await
      await setDoc(
        editUserRef,
        {
          fullName: finalFullName,
          phoneNumber: finalPhone,
          dateUpdated: todaysDate,
        },
        { merge: true }
      ); // close set doc
      // Alert succ
      toast.success(alertMsg?.profileSucc);
      // Set submitting
      setSubmitting(false);
      // Push to profile
      navigation.navigate(routes.PROFILE);
    } catch (err) {
      alert.showAlert(err.message);
      //setSubmitting(false);
    } // close try catch
    // Debug
    //console.log("Debug formEditProfSubmit", values);
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validate}
        enableReinitialize
      >
        {({ values, isValid, isSubmitting, dirty, handleSubmit }) => (
          <View>
            {/** Debug */}
            {/* {console.log("Debug formEditProfValues: ", values)} */}

            {/** Show spinner */}
            <CustomSpinner isLoading={isSubmitting} />

            {/** Alert modal */}
            <CustomAlertModal
              visible={alert.visible}
              hideDialog={alert.hideAlert}
              actionCancel={alert.hideAlert}
              content={<CustomText>{alert.message}</CustomText>}
            />

            {/** Full name */}
            <CustomTextInputForm
              name="fullName"
              label="Full Name"
              placeholder="Enter full name"
              leftIconName="user"
              autoCapitalize="words"
              defaultValue={user?.fullName}
            />

            {/** Phone number */}
            <CustomTextInputForm
              name="phoneNum"
              label="Phone Number"
              placeholder="Phone Number"
              leftIconType="feather"
              leftIconName="phone"
              keyboardType="numeric"
              defaultValue={user?.phoneNumber}
            />

            {/** Email address */}
            <CustomTextInputForm
              name="emailAddr"
              label="Email Address"
              placeholder="Enter email address"
              leftIconType="feather"
              leftIconName="mail"
              autoCapitalize="none"
              keyboardType="email-address"
              defaultValue={user?.emailAddress}
              disabled
            />

            {/** Submit button */}
            <CustomButton
              isPaper
              onPress={handleSubmit}
              stylePaper={tw`mt-3`}
              disabled={!isValid || isSubmitting || !dirty}
            >
              Save Changes
            </CustomButton>
          </View>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
} // close component

// Export
export default FormEditProfile;
