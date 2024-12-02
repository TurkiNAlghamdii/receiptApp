import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Retrieve user from localStorage on page load

  return { user, setUser };
};
