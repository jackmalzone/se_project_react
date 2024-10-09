import React, { useRef, useEffect } from "react";
import "./AddItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormValidation";

const AddItemModal = ({ onClose, onAddItem, isLoading }) => {
  console.log("AddItemModal rendered");

  const modalRef = useRef(null);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newItem = {
        name: values.name,
        weather: values.weather,
        imageUrl: values.imageUrl,
      };
      console.log("Submitting new item:", newItem);
      onAddItem(newItem)
        .then(() => {
          onClose();
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
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
      isValid={isValid}
      isLoading={isLoading}
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
          value={values.name || ""}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          aria-label="Garment name"
          required
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="image-input" className="modal__label">
        Image
        <input
          id="image-input"
          className="modal__input"
          type="url"
          name="imageUrl"
          value={values.imageUrl || ""}
          placeholder="Image URL"
          aria-label="Image URL"
          required
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
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
              checked={values.weather === type}
              onChange={handleChange}
              autoComplete="off"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
