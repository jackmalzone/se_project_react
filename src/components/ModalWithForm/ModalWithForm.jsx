import React, { useEffect } from "react";
import "./ModalWithForm.css";
import { useEscape } from "../../hooks/useEscape";
import { useOverlayClick } from "../../hooks/useOverlayClick";

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
      extraButton,
    },
    ref
  ) => {
    useEscape(onClose);
    useOverlayClick(ref, onClose);

    return (
      <div className="modal modal_type_form modal_opened" ref={ref}>
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
            <div className="modal__button-container">
              <button
                type="submit"
                className={`modal__submit ${
                  !isValid ? "modal__submit_disabled" : ""
                }`}
                disabled={!isValid}
              >
                {buttonText}
              </button>
              {extraButton}
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default ModalWithForm;
