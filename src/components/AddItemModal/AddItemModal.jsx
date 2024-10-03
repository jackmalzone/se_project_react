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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, weather, imageUrl });
    onClose();
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

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
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
