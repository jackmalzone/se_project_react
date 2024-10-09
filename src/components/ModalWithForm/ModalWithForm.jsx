import "./ModalWithForm.css";
import React, { useEffect, useState, useCallback } from "react";

const ModalWithForm = React.forwardRef(
  (
    { title, onClose, onSubmit, children, buttonText, isValid, isLoading },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setTimeout(onClose, 300);
    }, [onClose]);

    useEffect(() => {
      const handleMouseDown = (e) => {
        if (e.target.classList.contains("modal")) {
          handleClose();
        }
      };

      const modal = ref.current;
      if (modal) {
        modal.addEventListener("mousedown", handleMouseDown);

        return () => {
          modal.removeEventListener("mousedown", handleMouseDown);
        };
      }
    }, [handleClose, ref]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isValid) {
        onSubmit(e);
      }
    };

    return (
      <div className={`modal ${isOpen ? "modal_opened" : ""}`} ref={ref}>
        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={handleClose}
            type="button"
            className="modal__close"
          ></button>
          <form className="modal__form" onSubmit={handleSubmit}>
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
