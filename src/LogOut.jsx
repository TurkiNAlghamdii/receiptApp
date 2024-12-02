// Example: Sign Out in a component
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};
