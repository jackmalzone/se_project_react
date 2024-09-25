import React, { useState, useEffect } from "react";
import "./TemperatureDisplay.css";

const TemperatureDisplay = ({ temp, unit }) => {
  const [displayTemp, setDisplayTemp] = useState(temp);
  const [displayUnit, setDisplayUnit] = useState(unit);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (temp !== displayTemp || unit !== displayUnit) {
      setFade(true);
      const timer = setTimeout(() => {
        setDisplayTemp(temp);
        setDisplayUnit(unit);
        setFade(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [temp, unit, displayTemp, displayUnit]);

  return (
    <span className={`temperature-display ${fade ? "fade" : ""}`}>
      {Math.round(displayTemp)}°{displayUnit}
    </span>
  );
};

export default TemperatureDisplay;
