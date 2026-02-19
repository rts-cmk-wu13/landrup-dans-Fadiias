import './HoldtypeCard.css';

function HoldtypeCard({ title, image, description }) {
  return (
    <div className="holdtype-card">
      <h3 className="holdtype-title">{title}</h3>
      <img src={image} alt={title} className="holdtype-image" />
      <p className="holdtype-description">{description}</p>
    </div>
  );
}

export default HoldtypeCard;
