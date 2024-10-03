import "./ItemModal.css";
import React, { useState, useEffect } from "react";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function ItemModal({ onClose, card, onDeleteItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteItem(card._id);
    handleClose();
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
    <>
      <div className={`modal modal_type_item ${isOpen ? "modal__opened" : ""}`}>
        <div className="modal__content modal__content_type_image">
          <button
            onClick={handleClose}
            type="button"
            className="modal__close"
            aria-label="Close modal"
          />
          <img
            src={card.imageUrl}
            alt={`Image of ${card.name}`}
            className="modal__image"
          />
          <div className="modal__footer">
            <div className="modal__text-container">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            <button
              className="modal__delete-button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default ItemModal;
