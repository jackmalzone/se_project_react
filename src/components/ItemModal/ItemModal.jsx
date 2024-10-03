import "./ItemModal.css";
import React, { useState, useEffect } from "react";

function ItemModal({ onClose, card }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Delay closing to allow for transition
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal")) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={`modal modal_type_item ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        />
        <img
          src={card.link}
          alt={`Image of ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
