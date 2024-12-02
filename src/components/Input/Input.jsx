import "./Input.css";
import "../ModalWithForm/ModalWithForm.css";

const Input = ({
  label,
  type,
  name,
  value = "",
  onChange,
  onBlur,
  placeholder,
  required,
  minLength,
  touched,
  error,
  autoComplete,
}) => {
  return (
    <label
      className={`modal__label ${touched && error ? "modal__label_error" : ""}`}
    >
      <span>
        {label}
        {required && (
          <span
            className={`modal__required ${
              touched && error ? "modal__required_error" : ""
            }`}
          >
            *
          </span>
        )}
      </span>
      <input
        className={`modal__input ${
          touched && error ? "modal__input_error" : ""
        }`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
      />
      {touched && error && <span className="modal__error">{error}</span>}
    </label>
  );
};

export default Input;
