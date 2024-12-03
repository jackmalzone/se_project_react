import { useState, useRef, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/Input";
import { useFormAndValidation } from "../../hooks/useFormValidation";
import "./RegisterModal.css";
import { AppContext } from "../../contexts/AppContext";

const RegisterModal = ({ onRegister, isLoading, onLoginClick }) => {
  const { closeActiveModal } = useContext(AppContext);
  const modalRef = useRef(null);
  const { values, handleChange, errors, isValid } = useFormAndValidation(
    {
      email: "",
      password: "",
      name: "",
      avatar: "",
    },
    false
  );
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    name: false,
    avatar: false,
  });

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values).catch((error) => {
      console.log("Registration error:", error);
    });
  };

  const handleLoginClick = () => {
    closeActiveModal();
    setTimeout(onLoginClick, 300);
  };

  return (
    <>
      <ModalWithForm
        title="Sign up"
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
        buttonText={isLoading ? "Signing up..." : "Sign up"}
        isValid={isValid}
        ref={modalRef}
        extraButton={
          <div className="modal__footer">
            <span className="modal__text">or</span>
            <button
              type="button"
              className="modal__link"
              onClick={handleLoginClick}
            >
              Log in
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
        />
        <Input
          label="Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
          minLength="1"
          required
          touched={touched.name}
          error={errors.name}
        />
        <Input
          label="Avatar URL"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Avatar URL"
          required
          touched={touched.avatar}
          error={errors.avatar}
        />
      </ModalWithForm>
    </>
  );
};

export default RegisterModal;
