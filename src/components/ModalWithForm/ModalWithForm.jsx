import "./ModalWithForm.css";
import React, { useEffect, useState } from "react";

const ModalWithForm = React.forwardRef(
  ({ title, onClose, onSubmit, children, buttonText }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    const handleClose = () => {
      setIsOpen(false);
      setTimeout(onClose, 300); // Delay closing to allow for transition
    };

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
    }, [onClose, ref]);

    return (
      <div className={`modal ${isOpen ? "modal__opened" : ""}`} ref={ref}>
        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={handleClose}
            type="button"
            className="modal__close"
          ></button>
          <form className="modal__form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default ModalWithForm;
