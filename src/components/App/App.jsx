import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { updateProfile, login, register } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import avatarDefault from "../../assets/avatar-placeholder.png";

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
  const navigate = useNavigate();

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

  const handleLogin = (data) => {
    setIsLoading(true);
    login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setUserName(res.name);
          setUserAvatar(res.avatar);
          closeActiveModal();
          navigate("/");
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (data) => {
    setIsLoading(true);

    // Create registration data without avatar if none provided
    const registrationData = {
      name: data.name || "",
      email: data.email || "",
      password: data.password || "",
    };

    // Only add avatar if one was provided by user
    if (data.avatar) {
      registrationData.avatar = data.avatar;
    }

    console.log("2. Processed registration data:", registrationData);

    register(registrationData)
      .then((res) => {
        console.log("3. Registration API response:", res);
        if (res && res._id) {
          return login({
            email: data.email,
            password: data.password,
          });
        }
        return Promise.reject("Registration failed - no user ID returned");
      })
      .then((loginRes) => {
        console.log("5. Login response:", loginRes);
        if (loginRes && loginRes.token) {
          localStorage.setItem("jwt", loginRes.token);
          setIsLoggedIn(true);
          setUserName(loginRes.name || data.name);
          setUserAvatar(loginRes.avatar); // Let the backend handle default avatar
          closeActiveModal();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Registration/Login error details:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
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
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
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
              <Route
                path="/login"
                element={
                  <LoginModal
                    onClose={() => navigate("/")}
                    onLogin={handleLogin}
                    isLoading={isLoading}
                    onRegisterClick={handleRegisterClick}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <RegisterModal
                    onClose={() => navigate("/")}
                    onRegister={handleRegister}
                    isLoading={isLoading}
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
          {activeModal === "login" && (
            <LoginModal
              onClose={closeActiveModal}
              onLogin={handleLogin}
              isLoading={isLoading}
              onRegisterClick={handleRegisterClick}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              onClose={closeActiveModal}
              onRegister={handleRegister}
              isLoading={isLoading}
            />
          )}
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
