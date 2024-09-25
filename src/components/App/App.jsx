import { useEffect, useState } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import "../../utils/index.css";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        const tempF = filteredData.temp.F;
        const tempC = filteredData.temp.C || ((tempF - 32) * 5) / 9;
        setWeatherData({
          ...filteredData,
          temp: { F: tempF, C: tempC },
        });
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddButtonClick={handleAddButtonClick}
            weatherData={weatherData}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal activeModal={activeModal} onClose={closeActiveModal} />
        )}
        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
        )}
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
