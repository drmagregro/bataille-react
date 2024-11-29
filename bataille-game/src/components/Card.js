import React from 'react';

const cardValueTranslation = {
  '2': 'Deux', '3': 'Trois', '4': 'Quatre', '5': 'Cinq', '6': 'Six', '7': 'Sept',
  '8': 'Huit', '9': 'Neuf', '10': 'Dix', 'JACK': 'Valet', 'QUEEN': 'Dame', 
  'KING': 'Roi', 'ACE': 'As'
};

const cardSuitTranslation = {
  'HEARTS': 'Cœur', 'DIAMONDS': 'Carreau', 'CLUBS': 'Trèfle', 'SPADES': 'Pique'
};

const getCardImageUrl = (card) => {
  const cardCode = `${card.value[0]}${card.suit[0]}`.toUpperCase(); 
  return `https://deckofcardsapi.com/static/img/${cardCode}.png`;
};


const Card = ({ card }) => {
  if (!card) return null;  

  const cardNameInFrench = `${cardValueTranslation[card.value]} de ${cardSuitTranslation[card.suit]}`;

  return (
    <div className="card-container">
      <h2>{cardNameInFrench}</h2>
      <img src={getCardImageUrl(card)} alt={`${card.value} ${card.suit}`} />
      <p>{cardNameInFrench}</p>
    </div>
  );
};

export default Card;
