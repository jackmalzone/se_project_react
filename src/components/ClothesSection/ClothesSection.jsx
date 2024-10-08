import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ onCardClick, clothingItems = [], onAddNewClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-button" onClick={onAddNewClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems &&
          clothingItems.map((item) => (
            <li
              key={item._id || item.id || Date.now().toString()}
              className="clothes-section__item"
            >
              <ItemCard item={item} onCardClick={onCardClick} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
