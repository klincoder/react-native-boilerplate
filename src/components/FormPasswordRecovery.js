// Import resources
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import bcryptjs from "bcryptjs";
import moment from "moment";
import tw from "twrnc";

// Import custom files
import routes from "../screens/routes";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomSpinner from "./CustomSpinner";
import CustomAlertModal from "./CustomAlertModal";
import CustomOtpInput from "./CustomOtpInput";
import FormPasswordRecoveryDetails from "./FormPasswordRecoveryDetails";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomBcrypt from "../hooks/useCustomBcrypt";
import useLoggedInUser from "../hooks/useLoggedInUser";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextLink from "./CustomTextLink";
import CustomText from "./CustomText";
import { alertMsg, apiRoutes } from "../config/data";
import { handleGenOtpCode, handleUserEmail } from "../config/functions";
import { fireDB, doc, setDoc } from "../config/firebase";

// Component
function FormPasswordRecovery({ isChangePass }) {
  // Define otp code
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState();
  const [formVal, setFormVal] = useState();

  // Generate otp code
  const genOtpCode = handleGenOtpCode();

  // Define alert state
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

  // Define navigation
  const navigation = useNavigation();

  // Define custom bcrypt
  const { handleHashCode } = useCustomBcrypt();

  // Define app settings
  const { handleLogout, todaysDate, todaysDateFormat1 } = useAppSettings();

  // Define user
  const { handleEmailExist, userID, username, userEmail } = useLoggedInUser();

  // Debug
  //console.log("Debug formPassRecovery: ", otpCode);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: formVal ? formVal?.emailAddr : "",
    newPass: formVal ? formVal?.newPass : "",
    repeatNewPass: formVal ? formVal?.repeatNewPass : "",
    verifyCodeInput: "",
    isOtpInput: showOtpInput,
    isChangePass: isChangePass,
  };

  // Validation
  const validate = Yup.object().shape({
    isOtpInput: Yup.boolean(),
    isChangePass: Yup.boolean(),
    emailAddr: Yup.string().when("isChangePass", {
      is: false,
      then: Yup.string().required("Required").email("Invalid email address"),
    }),
    newPass: Yup.string().required("Required").min(8, "Too short"),
    repeatNewPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPass"), null], "Password must match"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalNewPass = values.newPass?.trim();
    const finalVerifyCodeInput = values.verifyCodeInput?.trim()?.toLowerCase();

    // If !finalVerifyCodeInput return
    if (!finalVerifyCodeInput) return;

    // Define email exist
    const emailExist = handleEmailExist(finalEmail);

    // Define user info
    const userInfoChangePass = {
      userID: userID,
      username: username,
      emailAddress: userEmail,
    };
    const userInfo = !isChangePass ? emailExist?.data : userInfoChangePass;

    // Hash otp code
    const hashOtpCode = await handleHashCode(otpCode);
    // Hash new password
    const hashNewPass = await handleHashCode(finalNewPass);
    // Verify code input
    const compareVerifyCode = bcryptjs.compareSync(
      finalVerifyCodeInput,
      hashOtpCode
    );

    // Debug
    // console.log("Debug submitPassRecovery: ", {
    //   hashOtpCode,
    //   hashNewPass,
    //   compareVerifyCode,
    // });

    // If compare verify code
    if (compareVerifyCode) {
      // Update user pass
      const updatePassRef = doc(fireDB, "users", `${userInfo?.userID}`);
      // Await
      await setDoc(
        updatePassRef,
        {
          password: hashNewPass,
          dateUpdated: todaysDate,
        },
        { merge: true }
      )
        .then(async () => {
          // Send emails
          // Password change email to user
          await handleUserEmail(
            userInfo?.username,
            userInfo?.emailAddress,
            todaysDateFormat1,
            apiRoutes?.passChange
          );

          // Alert succ
          toast.success(alertMsg?.passRecoverySucc);
          // Set submitting
          setSubmitting(false);
          // If isChangePass, logout user
          // Else push to login page
          {
            isChangePass ? handleLogout() : navigation.navigate(routes.LOGIN);
          }
        })
        .catch((err) => {
          // Alert err
          alert.showAlert(err.message);
          setSubmitting(false);
        });
    } else {
      // Alert err
      alert.showAlert(alertMsg?.otpErr);
      setSubmitting(false);
    } // close if compareVerifyCode
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validate}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <>
            {/** Debug */}
            {/* {console.log("Form formPassRecValues: ", values)} */}

            {/** Show spinner */}
            <CustomSpinner isLoading={isSubmitting} />

            {/** Alert modal */}
            <CustomAlertModal
              visible={alert.visible}
              hideDialog={alert.hideAlert}
              cancelAction={alert.hideAlert}
              content={<CustomText>{alert.message}</CustomText>}
            />

            {/** If showOtpInput */}
            {showOtpInput ? (
              <>
                {/** Otp input */}
                <CustomOtpInput name="verifyCodeInput" label="Enter OTP" />
                {/** Restart process */}
                <CustomTextLink
                  title="Restart Process"
                  onPress={() => {
                    setFieldValue("verifyCodeInput", "");
                    setShowOtpInput(false);
                  }}
                  styleTitle={tw`mt-10 text-center text-lg`}
                />
              </>
            ) : (
              <>
                {/** Form details */}
                <FormPasswordRecoveryDetails
                  isChangePass={isChangePass}
                  otpCode={genOtpCode}
                  setOtpCode={() => setOtpCode(genOtpCode)}
                  setShowOtpInput={() => setShowOtpInput(true)}
                  setFormVal={() => setFormVal(values)}
                />
              </>
            )}
          </>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
} // close component

// Export
export default FormPasswordRecovery;
