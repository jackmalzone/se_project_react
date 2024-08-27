import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div
      className={`item-modal ${
        activeModal === "preview" ? "item-modal__opened" : ""
      }`}
    >
      <div className="item-modal__content item-modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="item-modal__close"
          aria-label="Close modal"
        ></button>
        <img
          src={card.link}
          alt={`Image of ${card.name}`}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <h2 className="item-modal__caption">{card.name}</h2>
          <p className="item-modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
