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
import { alertMsg, phoneRegex } from "../config/appConfig";
import { fireDB, doc, setDoc } from "../config/firebase";
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useLoggedInUser from "../hooks/useLoggedInUser";
import CustomSpinner from "./CustomSpinner";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomFormInput from "./CustomFormInput";
import CustomButton from "./CustomButton";

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

  // Debug
  //console.log("Debug formEditProfile: ", );

  // FORM CONFIG
  // Define initial values
  const initialValues = {
    firstName: user ? user?.firstName : "",
    lastName: user ? user?.lastName : "",
    phoneNumber: user ? user?.phoneNumber : "",
  };

  // Validations
  const validate = Yup.object().shape({
    firstName: Yup.string().required("Required").min(3, "Too small"),
    lastName: Yup.string().required("Required").min(3, "Too small"),
    // phoneNumber: Yup.string()
    //   .required("Required")
    //   .matches(phoneRegex, "Invalid phone number"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Debug
    //console.log("Debug formEditProfSubmit", values);
    // Update user profile
    const editUserRef = doc(fireDB, "users", `${userID}`);
    await setDoc(
      editUserRef,
      {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        dateUpdated: moment().format(),
      },
      { merge: true }
    );

    // Alert succ
    toast.success(alertMsg?.profileSucc);
    // Set submitting
    setSubmitting(false);
    // Navigate
    navigation.navigate(routes.PROFILE);
  }; // close submit form

  // Return component
  return (
    <>
      {/** Form */}
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

              {/** Show loading */}
              <CustomSpinner isLoading={isSubmitting} />

              {/** Alert modal */}
              <CustomAlertModal
                visible={alert.visible}
                content={alert.message}
                hideDialog={alert.hideAlert}
                actionCancel={alert.hideAlert}
              />

              {/** First name */}
              <View style={tw`flex-row`}>
                <View style={tw`w-1/2`}>
                  <CustomFormInput
                    name="firstName"
                    icon="account"
                    placeholder="First Name"
                    mode="outlined"
                    autoCapitalize="words"
                    defaultValue={user?.firstName}
                  />
                </View>

                {/** Last name */}
                <View style={tw`w-1/2`}>
                  <CustomFormInput
                    name="lastName"
                    icon="account"
                    placeholder="Last Name"
                    mode="outlined"
                    autoCapitalize="words"
                    defaultValue={user?.lastName}
                  />
                </View>
              </View>

              {/** Phone number */}
              <CustomFormInput
                name="phoneNumber"
                icon="phone"
                placeholder="Phone Number"
                mode="outlined"
                keyboardType="numeric"
                defaultValue={user?.phoneNumber}
              />

              {/** Email address */}
              <CustomFormInput
                name="emailAddr"
                icon="email"
                placeholder="Email Address"
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                disabled
                defaultValue={user?.emailAddress}
              />

              {/** Submit button */}
              <CustomButton
                isPaper
                style={tw`mt-3`}
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting || !dirty}
              >
                Update
              </CustomButton>
            </View>
          )}
        </Formik>
      </KeyboardAvoidWrapper>
    </>
  );
}

// Export
export default FormEditProfile;
