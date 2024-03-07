import "./Card.scss";

function Card({ title, imgLink, handleClick }) {
  return (
    <button className="card-btn" onClick={handleClick}>
      <span className="card-btn__title">{title}</span>
      <img src={imgLink} alt="" className="card-btn__img" />
    </button>
  );
}

export default Card;
