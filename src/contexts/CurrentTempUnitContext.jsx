import React from "react";

const CurrentTempUnitContext = React.createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});

export default CurrentTempUnitContext;
