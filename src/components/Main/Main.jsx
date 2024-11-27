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

  console.log("Main component - weatherData.type:", weatherData.type);
  console.log("Main component - clothingItems:", clothingItems);
  console.log(
    "Main component - filtered items:",
    clothingItems.filter((item) => item.weather === weatherData.type)
  );

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
            .filter((item) => {
              const itemWeather = item.weather?.toLowerCase();
              const currentWeather = weatherData.type?.toLowerCase();
              console.log("Filtering item:", {
                name: item.name,
                itemWeather,
                currentWeather,
                matches: itemWeather === currentWeather,
              });
              return itemWeather === currentWeather;
            })
            .map((item) => (
              <ItemCard
                key={item._id}
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
