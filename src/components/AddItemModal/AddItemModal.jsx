import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/Input";
import { useFormAndValidation } from "../../hooks/useFormValidation";
import { AppContext } from "../../contexts/AppContext";

const AddItemModal = ({ onAddItem, isLoading }) => {
  const { closeActiveModal } = useContext(AppContext);
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [touched, setTouched] = useState({
    name: false,
    imageUrl: false,
    weather: false,
  });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(closeActiveModal, 300);
  }, [closeActiveModal]);

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItem(values, resetForm);
    }
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleClose}
      onSubmit={handleSubmit}
      ref={modalRef}
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isValid={isValid}
      isLoading={isLoading}
      isOpen={isOpen}
    >
      <Input
        label="Name"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Name"
        minLength="1"
        maxLength="30"
        required
        touched={touched.name}
        error={errors.name}
      />
      <Input
        label="Image"
        type="url"
        name="imageUrl"
        value={values.imageUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Image URL"
        required
        touched={touched.imageUrl}
        error={errors.imageUrl}
      />
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value={type}
              checked={values.weather === type}
              onChange={handleChange}
              className="modal__radio-input"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
        {touched.weather && errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
