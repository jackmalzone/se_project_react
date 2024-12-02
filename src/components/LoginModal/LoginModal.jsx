import { useState, useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormValidation";
import { useOverlayClick } from "../../hooks/useOverlayClick";
import Input from "../Input/Input";
import "./LoginModal.css";

const LoginModal = ({ onClose, onLogin, isLoading, onRegisterClick }) => {
  const modalRef = useRef(null);
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  useOverlayClick(modalRef, onClose);

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
    });
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Logging in..." : "Log in"}
      isValid={isValid}
      ref={modalRef}
      extraButton={
        <div className="modal__footer">
          <span className="modal__text">or</span>
          <button
            type="button"
            className="modal__link"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
        </div>
      }
    >
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
        required
        touched={touched.email}
        error={errors.email}
        autoComplete="username"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
        required
        minLength="8"
        touched={touched.password}
        error={errors.password}
        autoComplete="current-password"
      />
    </ModalWithForm>
  );
};

export default LoginModal;
