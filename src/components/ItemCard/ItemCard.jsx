import React, { useState } from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image for ${item.name}.`);
    console.error(`Image URL: ${item.imageUrl}`);
    setImageError(true);
  };

  return (
    <div className="card" onClick={() => onCardClick(item)}>
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
      <h2 className="card__name">{item.name}</h2>
    </div>
  );
}

export default ItemCard;
