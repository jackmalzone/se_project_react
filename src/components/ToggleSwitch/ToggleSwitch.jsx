import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );

  return (
    <div className="toggle-switch">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        id="toggle-switch"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <label className="toggle-switch__label" htmlFor="toggle-switch">
        <span className="toggle-switch__button"></span>
        <span className="toggle-switch__f">F</span>
        <span className="toggle-switch__c">C</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
