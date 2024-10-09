import React, { useState, useEffect, useCallback } from "react";
import "./ItemModal.css";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useEscape } from "../../hooks/useEscape";

function ItemModal({ onClose, card, onDeleteItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEscape(handleClose);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteItem(card._id)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal")) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleClose]);

  return (
    <>
      <div
        className={`modal modal_type_item ${isOpen ? "modal_opened" : ""}`}
        onClick={(e) => {
          if (e.target.classList.contains("modal")) {
            handleClose();
          }
        }}
      >
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
