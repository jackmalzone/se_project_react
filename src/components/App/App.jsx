import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateProfile } from "../../utils/auth";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAddItem = (item, resetForm) => {
    const makeRequest = () => {
      return addItem(item).then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        resetForm();
        return newItem;
      });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    setIsLoading(true);
    updateProfile({ name, avatar }, token)
      .then((userData) => {
        setUserName(userData.name);
        setUserAvatar(userData.avatar);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const likeRequest = isLiked ? removeCardLike : addCardLike;

    likeRequest(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
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
    return new Promise((resolve, reject) => {
      deleteItem(id)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== id)
          );
          resolve();
        })
        .catch(reject);
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserName("");
    setUserAvatar(null);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: { _id: "", name: userName, avatar: userAvatar },
        isLoggedIn,
      }}
    >
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
                    onCardLike={handleCardLike}
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
                    onEditProfile={handleEditProfile}
                    onSignOut={handleSignOut}
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
          {activeModal === "edit-profile" && (
            <EditProfileModal
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
          )}
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
