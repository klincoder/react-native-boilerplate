// Import resources
import { useRecoilValue } from "recoil";

// Import custom files
import { appSettingsAtom } from "../recoil/atoms";

// Component
function useAppSettings() {
  // Define atom
  const appSettings = useRecoilValue(appSettingsAtom);

  // Define company info
  const companyInfo = {
    name: appSettings?.companyName,
    supportPhone: appSettings?.supportPhone,
    supportEmail: appSettings?.supportEmail,
    workHours: appSettings?.companyWorkHours,
    noreplyEmail: appSettings?.noreplyEmail,
  };

  // Debug
  //console.log("Debug appSettings: ",);

  // Return component
  return { companyInfo };
}

// Export
export default useAppSettings;
