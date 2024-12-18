import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateProfile, login, register, checkToken } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import avatarDefault from "../../assets/avatar-placeholder.png";
import { AuthContext } from "../../contexts/AuthContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useError } from "../../contexts/ErrorContext";
import { AppContext } from "../../contexts/AppContext";

function App() {
  const { showError } = useError();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userAvatar, setUserAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddButtonClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    console.log("Add button clicked, setting activeModal to 'add-garment'");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    console.log("Closing modal, current activeModal:", activeModal);
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
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred";
        showError(errorMessage);
        console.error("Operation failed:", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAddItem = (item, resetForm) => {
    const token = localStorage.getItem("jwt");
    console.log(
      "handleAddItem called with token:",
      token ? "exists" : "missing"
    );

    if (!token) {
      console.log("No token found, redirecting to login");
      setActiveModal("login");
      return;
    }

    const makeRequest = () => {
      console.log("Making add item request with data:", item);
      return addItem(item, token)
        .then((newItem) => {
          console.log("Item added successfully:", newItem);
          setClothingItems((prevItems) => [newItem, ...prevItems]);
          resetForm();
          return newItem;
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          throw error;
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

    const makeRequest = () => {
      return updateProfile({ name, avatar }, token).then((userData) => {
        setUsername(userData.name);
        setUserAvatar(userData.avatar);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: userData.name,
          avatar: userData.avatar,
        }));
        return userData;
      });
    };

    handleSubmit(makeRequest);
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
    console.log("Weather useEffect running");
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("Weather data received:", data);
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
    console.log("Fetching clothing items...");
    getItems()
      .then((data) => {
        console.log("Received clothing items:", data);
        if (Array.isArray(data)) {
          setClothingItems(data);
        } else {
          console.error("Received non-array data:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
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
    setUsername("");
    setUserAvatar(null);
  };

  const handleLoginClick = () => {
    console.log("Login button clicked, setting activeModal to login");
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    login({ email, password })
      .then((data) => {
        if (!data || !data.token) {
          throw new Error("Invalid login response");
        }
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        setUsername(userData.name);
        setUserAvatar(userData.avatar);
        closeActiveModal();
      })
      .catch((error) => {
        const errorMessage =
          error.message === "Invalid login response"
            ? "Invalid email or password"
            : error.response?.status === 401
            ? "Invalid email or password"
            : error.response?.status === 429
            ? "Too many attempts. Please try again later"
            : "Unable to log in. Please try again";

        showError(errorMessage);
        console.error("Login error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    return register({ name, avatar, email, password })
      .catch((error) => {
        setIsLoading(false);
        showError(
          "This email is already registered. Please try logging in instead."
        );
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked, setting activeModal to register");
    setActiveModal("register");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      <AppContext.Provider value={{ closeActiveModal }}>
        <CurrentTempUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            {console.log("Rendering page with activeModal:", activeModal)}
            <div className="page__content">
              <Header
                handleAddButtonClick={handleAddButtonClick}
                weatherData={weatherData}
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
              />
              {console.log("About to render Routes")}
              <Routes>
                <Route
                  path="/"
                  element={
                    isLoading ? (
                      <div>Loading...</div>
                    ) : (
                      <Main
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        isLoading={isLoading}
                        onCardLike={isLoggedIn ? handleCardLike : null}
                      />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onDeleteItem={handleDeleteItem}
                        onAddNewClick={handleAddButtonClick}
                        username={username}
                        avatar={userAvatar}
                        onEditProfile={handleEditProfile}
                        onSignOut={handleSignOut}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" replace />
                    ) : (
                      <Main
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        isLoading={isLoading}
                        onCardLike={isLoggedIn ? handleCardLike : null}
                      />
                    )
                  }
                />
                <Route
                  path="/signup"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" replace />
                    ) : (
                      <>
                        <Main
                          weatherData={weatherData}
                          handleCardClick={handleCardClick}
                          clothingItems={clothingItems}
                          isLoading={isLoading}
                          onCardLike={isLoggedIn ? handleCardLike : null}
                        />
                        <RegisterModal
                          onClose={closeActiveModal}
                          onRegister={handleRegister}
                          isLoading={isLoading}
                          onLoginClick={() => setActiveModal("login")}
                        />
                      </>
                    )
                  }
                />
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/profile" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Routes>
              <Footer />
            </div>
            {console.log("About to render modals, activeModal:", activeModal)}
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
                onRegister={handleRegister}
                isLoading={isLoading}
                onLoginClick={() => setActiveModal("login")}
              />
            )}
          </div>
        </CurrentTempUnitContext.Provider>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
