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
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ onClose, card, onDeleteItem, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    </>
  );
}

export default ItemModal;
