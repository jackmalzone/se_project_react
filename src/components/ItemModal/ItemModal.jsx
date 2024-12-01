import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import "./ItemModal.css";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useEscape } from "../../hooks/useEscape";
import { useOverlayClick } from "../../hooks/useOverlayClick";
import { AuthContext } from "../../contexts/AuthContext";

function ItemModal({ onClose, card, onDeleteItem, isLoading }) {
  const { currentUser } = useContext(AuthContext);
  const isOwn = currentUser && card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEscape(handleClose);
  useOverlayClick(modalRef, handleClose);

  const handleDeleteClick = () => {
    if (!isOwn) {
      setShowErrorModal(true);
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!isOwn) {
      console.error("Not authorized to delete this item");
      return;
    }

    onDeleteItem(card._id)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <>
      <div
        className={`modal modal_type_item ${isOpen ? "modal_opened" : ""}`}
        ref={modalRef}
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
              className={itemDeleteButtonClassName}
              onClick={handleDeleteClick}
              disabled={isLoading}
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
      <DeleteConfirmationModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message="You are not authorized to delete this item"
        showConfirm={false}
      />
    </>
  );
}

export default ItemModal;
