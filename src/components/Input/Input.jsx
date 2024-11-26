import "./Input.css";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  minLength,
  touched,
  error,
}) => {
  return (
    <label
      className={`modal__label ${touched && error ? "modal__label_error" : ""}`}
    >
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
      <input
        className={`modal__input ${
          touched && error ? "modal__input_error" : ""
        }`}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
      />
      {touched && error && <span className="modal__error">{error}</span>}
    </label>
  );
};

export default Input;
