import React, { useRef } from "react";
import { useOverlayClick } from "../../hooks/useOverlayClick";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef(null);
  useOverlayClick(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="delete-modal" ref={modalRef}>
      <div className="delete-modal__content">
        <button
          onClick={onClose}
          type="button"
          className="delete-modal__close"
          aria-label="Close modal"
        />
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
