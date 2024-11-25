import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, clothingItems = [], onAddNewClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-button" onClick={onAddNewClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
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
