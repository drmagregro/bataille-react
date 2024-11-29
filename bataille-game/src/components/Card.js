import React from 'react';

const Card = ({ card }) => {
  const getCardImageUrl = (card) => {
    const cardCode = `${card.value[0]}${card.suit[0]}`.toUpperCase();
    return `https://deckofcardsapi.com/static/img/${cardCode}.png`;
  };

  return (
    <div className="card">
      <img src={getCardImageUrl(card)} alt={`${card.value} de ${card.suit}`} />
    </div>
  );
};

export default Card;
