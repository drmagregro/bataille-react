import React from 'react';
import { getCardValue, getCardNameInFrench } from '../utils/cardUtils';

const Battle = ({ playerDeck, computerDeck, setPlayerDeck, setComputerDeck, setMessage }) => {
  const handleTurn = () => {
    const playerCard = playerDeck[0];
    const computerCard = computerDeck[0];

    const playerCardValue = getCardValue(playerCard);
    const computerCardValue = getCardValue(computerCard);

    if (playerCardValue > computerCardValue) {
      setPlayerDeck([...playerDeck.slice(1), playerCard, computerCard]);
      setComputerDeck(computerDeck.slice(1));
      setMessage(`Le joueur gagne avec ${getCardNameInFrench(playerCard)} contre ${getCardNameInFrench(computerCard)}`);
    } else if (computerCardValue > playerCardValue) {
      setComputerDeck([...computerDeck.slice(1), computerCard, playerCard]);
      setPlayerDeck(playerDeck.slice(1));
      setMessage(`L'ordinateur gagne avec ${getCardNameInFrench(computerCard)} contre ${getCardNameInFrench(playerCard)}`);
    } else {
      setMessage(`Égalité avec ${getCardNameInFrench(playerCard)} contre ${getCardNameInFrench(computerCard)}`);
    }
  };

  return (
    <div>
      <button onClick={handleTurn}>Jouer un tour</button>
    </div>
  );
};

export default Battle;
