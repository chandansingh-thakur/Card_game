import "./Card.css";

function Card({ card, hidden = false, selected = false, onClick }) {
  if (hidden) {
    return (
      <div className="playing-card card-back">
        <div className="card-back-inner">
          <span>AI</span>
          <strong>♠</strong>
          <span>CARD ARENA</span>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="playing-card empty-card">
        <span>?</span>
      </div>
    );
  }

  const isRed = card.suit === "♥" || card.suit === "♦";

  return (
    <button
      type="button"
      className={`playing-card ${isRed ? "red-card" : "black-card"} ${
        selected ? "selected-card" : ""
      }`}
      onClick={onClick}
      disabled={!onClick}
    >
      <span className="card-corner">
        {card.rank}
        <small>{card.suit}</small>
      </span>

      <span className="card-center-suit">
        {card.suit}
      </span>

      <span className="card-corner bottom">
        {card.rank}
        <small>{card.suit}</small>
      </span>
    </button>
  );
}

export default Card;