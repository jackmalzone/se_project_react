import React, { useState, useRef, useEffect } from "react";
import "./AddItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onClose, onAddItem }) => {
  console.log("AddItemModal rendered");

  const modalRef = useRef(null);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [weatherError, setWeatherError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddItem({ name, weather, imageUrl });
      onClose();
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (name.trim().length < 1 || name.trim().length > 30) {
      setNameError("Name must be between 1 and 30 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!imageUrl.trim()) {
      setImageUrlError("Image URL is required");
      isValid = false;
    } else if (!isValidUrl(imageUrl)) {
      setImageUrlError("Please enter a valid URL");
      isValid = false;
    } else {
      setImageUrlError("");
    }

    if (!weather) {
      setWeatherError("Please select a weather type");
      isValid = false;
    } else {
      setWeatherError("");
    }

    return isValid;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) setNameError("");
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    if (imageUrlError) setImageUrlError("");
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    if (weatherError) setWeatherError("");
  };

  useEffect(() => {
    console.log("AddItemModal mounted");
    return () => {
      console.log("AddItemModal unmounted");
    };
  }, []);

  return (
    <ModalWithForm
      title="New Garment"
      onClose={onClose}
      onSubmit={handleSubmit}
      ref={modalRef}
      buttonText="Add garment"
    >
      <label
        htmlFor="name-input"
        className="modal__label modal__label_type_input"
      >
        Name
        <input
          id="name-input"
          className="modal__input"
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          aria-label="Garment name"
          required
          onChange={handleNameChange}
          autoComplete="off"
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>
      <label htmlFor="image-input" className="modal__label">
        Image
        <input
          id="image-input"
          className="modal__input"
          type="url"
          name="image"
          value={imageUrl}
          placeholder="Image URL"
          minLength="1"
          maxLength="30"
          aria-label="Image URL"
          required
          onChange={handleImageUrlChange}
          autoComplete="off"
        />
        {imageUrlError && <span className="modal__error">{imageUrlError}</span>}
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={`weather-${type}`}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={`weather-${type}`}
              className="modal__radio-input"
              type="radio"
              name="weather"
              value={type}
              checked={weather === type}
              onChange={handleWeatherChange}
              autoComplete="off"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
        {weatherError && <span className="modal__error">{weatherError}</span>}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
