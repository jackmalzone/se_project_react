import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import TemperatureDisplay from "../TemperatureDisplay/TemperatureDisplay";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);

  const temperature =
    currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  console.log("WeatherCard data:", weatherData);
  console.log("Current temperature unit:", currentTemperatureUnit);
  console.log("Temperature value:", temperature);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card" key={weatherData.temp.F}>
      <p className="weather-card__temp">
        <TemperatureDisplay
          temp={weatherData.temp[currentTemperatureUnit]}
          unit={currentTemperatureUnit}
        />
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing it is ${weatherOption?.day ? "day" : "night"} with ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
