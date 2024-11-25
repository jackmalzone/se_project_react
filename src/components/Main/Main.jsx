import React, { useContext } from "react";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import TemperatureDisplay from "../TemperatureDisplay/TemperatureDisplay";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  isLoading,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

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
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={
                  item._id || item.id || Math.random().toString(36).substr(2, 9)
                }
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
