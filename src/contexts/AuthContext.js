import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  currentUser: null,
  setIsLoggedIn: () => {},
  setCurrentUser: () => {},
});
