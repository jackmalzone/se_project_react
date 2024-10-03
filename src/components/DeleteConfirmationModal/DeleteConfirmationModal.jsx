import React from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal">
      <div className="delete-modal__content">
        <p className="delete-modal__message">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="delete-modal__buttons">
          <button
            className="delete-modal__button delete-modal__button_confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="delete-modal__button delete-modal__button_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;