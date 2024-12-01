import React, { useRef } from "react";
import { useOverlayClick } from "../../hooks/useOverlayClick";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item?",
  showConfirm = true,
}) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal">
      <div className="delete-modal__content">
        <button
          className="delete-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        />
        <p className="delete-modal__message">{message}</p>
        {showConfirm ? (
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
        ) : (
          <div className="delete-modal__buttons">
            <button
              className="delete-modal__button delete-modal__button_cancel"
              onClick={onClose}
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
