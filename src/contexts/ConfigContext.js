import { createContext } from "react";

export const ConfigContext = createContext({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.your-domain.com"
      : "http://localhost:3001",
});
