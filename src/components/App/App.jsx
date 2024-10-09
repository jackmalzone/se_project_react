import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import "../../utils/index.css";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddButtonClick = () => {
    console.log("Add button clicked, setting activeModal to 'add-garment'");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    console.log("Closing active modal");
    setActiveModal(null);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleAddItem = (item) => {
    console.log("Adding item in App:", JSON.stringify(item, null, 2));
    setIsLoading(true);
    return addItem(item)
      .then((newItem) => {
        console.log("New item added:", JSON.stringify(newItem, null, 2));
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        return newItem;
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log("App rendering, activeModal:", activeModal);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log("Filtered weather data:", filteredData);
        const tempF = filteredData.temp.F;
        const tempC = filteredData.temp.C || ((tempF - 32) * 5) / 9;
        setWeatherData({
          ...filteredData,
          temp: { F: tempF, C: tempC },
        });
        console.log("Set weather data:", {
          ...filteredData,
          temp: { F: tempF, C: tempC },
        });
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDeleteItem = (id) => {
    setIsLoading(true);
    return deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddButtonClick={handleAddButtonClick}
            weatherData={weatherData}
            avatar={userAvatar}
            username={userName}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onDeleteItem={handleDeleteItem}
                  onAddNewClick={handleAddButtonClick}
                  username={userName}
                  avatar={userAvatar}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            onClose={closeActiveModal}
            onAddItem={handleAddItem}
            isLoading={isLoading}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
            isLoading={isLoading}
          />
        )}
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
