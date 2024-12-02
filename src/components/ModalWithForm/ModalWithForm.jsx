import React from "react";
import "./ModalWithForm.css";

const ModalWithForm = React.forwardRef(
  (
    {
      title,
      children,
      buttonText,
      onClose,
      onSubmit,
      isValid,
      isLoading,
      isOpen,
    },
    ref
  ) => {
    console.log("ModalWithForm rendering", { title, isValid });
    const modalClass = `modal modal_type_form${isValid ? " modal_opened" : ""}`;
    console.log("Modal class:", modalClass);

    return (
      <div className={modalClass} ref={ref}>
        <div className="modal__content">
          <button
            type="button"
            onClick={onClose}
            className="modal__close"
            aria-label="Close modal"
          />
          <h2 className="modal__title">{title}</h2>
          <form onSubmit={onSubmit} className="modal__form">
            {children}
            <button
              type="submit"
              className="modal__submit"
              disabled={!isValid || isLoading}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default ModalWithForm;
