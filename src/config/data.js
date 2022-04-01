// Import resources
import routes from "../screens/routes";

// DATA
// PROFILE LIST
export const profileList = [
  {
    id: "123",
    title: "Edit Profile",
    iconLeft: "account-edit",
    screenLink: routes.EDIT_PROFILE,
    slug: "edit-profile",
    isLink: true,
    isSwitch: false,
  },
  {
    id: "456",
    title: "Notifications",
    iconLeft: "bell",
    slug: "notifications",
    isLink: false,
    isSwitch: true,
  },
];
