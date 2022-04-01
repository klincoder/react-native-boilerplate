// Import resources
import axios from "axios";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import { baseURL } from "../config/appConfig";
import {
  fireDB,
  collection,
  getDocs,
  query,
  where,
  limit,
} from "../config/firebase";

// Component
function useEmailSender() {
  // Define app settings
  const { companyInfo } = useAppSettings();

  // Debug
  //console.log("Debug useEmailSender: ",);

  // FUNCTIONS
  // HANDLE USER EMAIL CHECKER
  const handleUserEmailChecker = async (emailAddr) => {
    // Define variables
    let isValidEmail, dbUser;
    // Get user db details
    const userDbRef = collection(fireDB, "users");
    const userDbQuery = query(
      userDbRef,
      where("emailAddress", "==", `${emailAddr}`),
      limit(1)
    );
    // Await
    await getDocs(userDbQuery)
      .then((snapshot) => {
        // Set is valid email
        isValidEmail = snapshot.size > 0;
        // Get user data
        const userDbData = snapshot.docs.map((doc) => {
          return doc.data();
        });
        // Set dbUser
        dbUser = userDbData[0];
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
    // Return
    return { isValidEmail, dbUser };
  }; // close fxn

  // HANDLE OTP EMAIL
  const handleOtpEmail = async (toName, toEmail, otpCode) => {
    // Await
    return await axios({
      method: "POST",
      url: `${baseURL}/api/mailjet-send-email`,
      data: {
        data: {
          toName: toName,
          toEmail: toEmail,
          msgSubject: `${otpCode} - Your OTP Code`,
          msgBody: `
            <h4>Hi, ${toName}</h4>
            <p>Use this code to complete the action on our website:</p>
            <h1>${otpCode}</h1>
            <br />
            <div>Best regards,</div>
            <div>${companyInfo?.name}</div>
          `,
        },
      },
    })
      .then((apiRes) => {
        // Define resData
        const resData = apiRes?.data;
        //console.log("Debug otpEmail: ", resData);
        // Return
        return resData;
      })
      .catch((err) => {
        console.log("Error otpEmail: ", err.message);
      });
  }; // close fxn

  // HANDLE WELCOME EMAIL FOR NEW USERS
  const handleWelcomeEmail = async (toName, toEmail, msg) => {
    return await axios({
      method: "POST",
      url: `${baseURL}/api/mailjet-send-email`,
      data: {
        data: {
          toName: toName,
          toEmail: toEmail,
          msgSubject: "Welcome Onboard",
          msgBody: `
            <h4>Hi, ${toName}</h4>
            <p>${msg}</p>
            <br />
            <div>Best regards,</div>
            <div>${companyInfo?.name}</div>
          `,
        },
      },
    })
      .then((apiRes) => {
        // Define resData
        const resData = apiRes?.data;
        //console.log("Debug welcomeEmail: ", resData);
        // Return
        return resData;
      })
      .catch((err) => {
        console.log("Error welcomeEmail: ", err.message);
      });
  }; // close fxn

  // HANDLE NEW USER EMAIL FOR ADMIN
  const handleNewUserEmail = async (msg) => {
    return await axios({
      method: "POST",
      url: `${baseURL}/api/mailjet-send-email`,
      data: {
        data: {
          toName: companyInfo?.name,
          toEmail: companyInfo?.emailAddress,
          msgSubject: "Congrats! New User Alert",
          msgBody: `
            <h4>Hi, Admin</h4>
            <p>${msg}</p>
            <br />
            <div>Best regards,</div>
            <div>${companyInfo?.name}</div>
          `,
        },
      },
    })
      .then((apiRes) => {
        // Define resData
        const resData = apiRes?.data;
        //console.log("Debug newUserEmail: ", resData);
        // Return
        return resData;
      })
      .catch((err) => {
        console.log("Error newUserEmail: ", err.message);
      });
  }; // close fxn

  // HANDLE PASSWORD CHANGE EMAIL
  const handlePassChangeEmail = async (toName, toEmail, msg) => {
    return await axios({
      method: "POST",
      url: `${baseURL}/api/mailjet-send-email`,
      data: {
        data: {
          toName: toName,
          toEmail: toEmail,
          msgSubject: "Password Change Alert",
          msgBody: `
            <h4>Hi, ${toName}</h4>
            <p>We noticed a password change to your account, and wanted to make sure it\'s really you.</p>
            <p>Date: ${msg}</p>
            <br />
            <div>Best regards,</div>
            <div>${companyInfo?.name}</div>
          `,
        },
      },
    })
      .then((apiRes) => {
        // Define resData
        const resData = apiRes?.data;
        //console.log("Debug passChangeEmail: ", resData);
        // Return
        return resData;
      })
      .catch((err) => {
        console.log("Error passChangeEmail: ", err.message);
      });
  }; // close fxn

  // HANDLE LOGIN EMAIL
  const handleLoginEmail = async (toName, toEmail, msg) => {
    return await axios({
      method: "POST",
      url: `${baseURL}/api/mailjet-send-email`,
      data: {
        data: {
          toName: toName,
          toEmail: toEmail,
          msgSubject: "Login Alert",
          msgBody: `
            <h4>Hi, ${toName}</h4>
            <p>We noticed a new login attempt to your account, and wanted to make sure it\'s really you.</p>
            <p>Date: ${msg}</p>
            <br />
            <div>Best regards,</div>
            <div>${companyInfo?.name}</div>
          `,
        },
      },
    })
      .then((apiRes) => {
        // Define resData
        const resData = apiRes?.data;
        //console.log("Debug loginEmail: ", resData);
        // Return
        return resData;
      })
      .catch((err) => {
        console.log("Error loginEmail: ", err.message);
      });
  }; // close fxn

  // HANDLE PROFILE CHANGE EMAIL
  const handleProfileChangeEmail = async (toName, toEmail, msg) => {
    return await axios({
      method: "POST",
      url: `${baseURL}/api/mailjet-send-email`,
      data: {
        data: {
          toName: toName,
          toEmail: toEmail,
          msgSubject: "Profile Change Alert",
          msgBody: `
            <h4>Hi, ${toName}</h4>
            <p>We noticed a profile change to your account, and wanted to make sure it\'s really you.</p>
            <p>Date: ${msg}</p>
            <br />
            <div>Best regards,</div>
            <div>${companyInfo?.name}</div>
          `,
        },
      },
    })
      .then((apiRes) => {
        // Define resData
        const resData = apiRes?.data;
        //console.log("Debug welcomeEmail: ", resData);
        // Return
        return resData;
      })
      .catch((err) => {
        console.log("Error welcomeEmail: ", err.message);
      });
  }; // close fxn

  // Return component
  return {
    handleUserEmailChecker,
    handleOtpEmail,
    handleWelcomeEmail,
    handleNewUserEmail,
    handlePassChangeEmail,
    handleLoginEmail,
    handleProfileChangeEmail,
  };
}

// Export
export default useEmailSender;
