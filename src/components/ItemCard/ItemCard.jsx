import React, { useState, useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const [imageError, setImageError] = useState(false);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  } ${!isLoggedIn ? "card__like-button_hidden" : ""}`;

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  const handleImageError = () => {
    console.error(`Failed to load image for ${item.name}`);
    setImageError(true);
  };

  return (
    <div className="card" onClick={() => onCardClick(item)}>
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label="Like item"
        />
      </div>
      {!imageError ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="card__image"
          onError={handleImageError}
        />
      ) : (
        <div className="card__image card__image-placeholder">
          Image not available
        </div>
      )}
    </div>
  );
}

export default ItemCard;
