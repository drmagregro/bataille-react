export const getCardValue = (card) => {
    const order = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    return order.indexOf(card.value);
  };
  
  export const getCardNameInFrench = (card) => {
    const cardValueTranslation = {
      '2': 'Deux', '3': 'Trois', '4': 'Quatre', '5': 'Cinq', '6': 'Six', '7': 'Sept',
      '8': 'Huit', '9': 'Neuf', '10': 'Dix', 'JACK': 'Valet', 'QUEEN': 'Dame',
      'KING': 'Roi', 'ACE': 'As'
    };
  
    const cardSuitTranslation = {
      'HEARTS': 'Cœur', 'DIAMONDS': 'Carreau', 'CLUBS': 'Trèfle', 'SPADES': 'Pique'
    };
  
    return `${cardValueTranslation[card.value]} de ${cardSuitTranslation[card.suit]}`;
  };
  