import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={`Image of ${item.name}`}
      />
    </div>
  );
}

export default ItemCard;
