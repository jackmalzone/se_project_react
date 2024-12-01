import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ClothesSection({
  onCardClick,
  clothingItems = [],
  onAddNewClick,
  onCardLike,
}) {
  const { currentUser } = useContext(AuthContext);

  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

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
            <ItemCard
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
