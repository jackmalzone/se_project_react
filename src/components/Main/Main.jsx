import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import TemperatureDisplay from "../TemperatureDisplay/TemperatureDisplay";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          <TemperatureDisplay
            temp={weatherData.temp[currentTemperatureUnit]}
            unit={currentTemperatureUnit}
          />{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
