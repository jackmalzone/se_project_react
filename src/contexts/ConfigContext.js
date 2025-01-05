import { createContext } from "react";

export const ConfigContext = createContext({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.wtwrwtwr.twilightparadox.com"
      : "http://localhost:3001",
});
