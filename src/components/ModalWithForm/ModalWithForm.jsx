import "./ModalWithForm.css";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useEscape } from "../../hooks/useEscape";
import { useOverlayClick } from "../../hooks/useOverlayClick";

const ModalWithForm = ({
  title,
  onClose,
  onSubmit,
  children,
  buttonText,
  isValid,
  isLoading,
  extraButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid !== false) {
      onSubmit(e);
    }
  };

  useEscape(handleClose);
  useOverlayClick(modalRef, handleClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} ref={modalRef}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleClose} type="button" className="modal__close" />
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className="modal__submit"
              disabled={isLoading || isValid === false}
            >
              {buttonText}
            </button>
            {extraButton}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
