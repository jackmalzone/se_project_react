import React from "react";
import "./AddItemModal.css";

const AddItemModal = ({ onClose, onAddItem, isOpen }) => {
  <ModalWithForm
    title="New Garment"
    buttonText="Add Garment"
    activeModal={activeModal}
    onClose={closeActiveModal}
  >
    <label htmlFor="name" className="modal__label modal__label_type_input">
      Name{" "}
      <input
        type="text"
        name="name"
        placeholder="Name"
        minLength="1"
        maxLength="30"
        aria-label="Garment name"
        required
      />
    </label>
    <label htmlFor="imageUrl" className="modal__label">
      Image{" "}
      <input
        type="url"
        name="image"
        placeholder="Image URL"
        minLength="1"
        maxLength="30"
        aria-label="Image URL"
        required
      />
    </label>

    <fieldset className="modal__radio-buttons">
      <legend className="modal__legend">Select the weather type:</legend>
      <label htmlFor="hot" className="modal__label modal__label_type_radio">
        <input
          id="hot"
          type="radio"
          className="modal__radio-input"
          value="hot"
        />{" "}
        Hot
      </label>
      <label htmlFor="warm" className="modal__label modal__label_type_radio">
        <input
          id="warm"
          type="radio"
          className="modal__radio-input"
          value="warm"
        />{" "}
        Warm
      </label>
      <label htmlFor="cold" className="modal__label modal__label_type_radio">
        <input
          id="cold"
          type="radio"
          className="modal__radio-input"
          value="cold"
        />{" "}
        Cold
      </label>
    </fieldset>
  </ModalWithForm>;
};

export default AddItemModal;
