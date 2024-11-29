import React, { useState, useEffect } from 'react';

const createDeck = () => {
  const suits = ['Coeur', 'Carreau', 'Trèfle', 'Pique'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];
  return suits.flatMap(suit => values.map(value => ({ value, suit })));
};


const getCardValue = (card) => {
  const order = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];
  return order.indexOf(card.value);
};

const getSuitSymbol = (suit) => {
  switch (suit) {
    case 'Coeur':
      return '❤️';
    case 'Carreau':
      return '♦️';
    case 'Trèfle':
      return '♣️';
    case 'Pique':
      return '♠️';
    default:
      return '';
  }
};

const App = () => {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    const deck = createDeck().sort(() => Math.random() - 0.5); // Mélange
    setPlayerDeck(deck.slice(0, 26));
    setComputerDeck(deck.slice(26));
  }, []);

  
  const playTurn = () => {
    if (!playerDeck.length || !computerDeck.length) return setMessage('Partie terminée !');

    const [playerCard, ...nextPlayerDeck] = playerDeck;
    const [computerCard, ...nextComputerDeck] = computerDeck;

    const playerCardValue = getCardValue(playerCard);
    const computerCardValue = getCardValue(computerCard);

    
    if (playerCardValue > computerCardValue) {
      setPlayerDeck([...nextPlayerDeck, playerCard, computerCard]);
      setComputerDeck(nextComputerDeck);
      setMessage(`le joueur gagne avec ${playerCard.value} ${getSuitSymbol(playerCard.suit)} contre ${computerCard.value} ${getSuitSymbol(computerCard.suit)}`);
    } else if (computerCardValue > playerCardValue) {
      setComputerDeck([...nextComputerDeck, computerCard, playerCard]);
      setPlayerDeck(nextPlayerDeck);
      setMessage(`l'ordinateur gagne avec ${computerCard.value} ${getSuitSymbol(computerCard.suit)} contre ${playerCard.value} ${getSuitSymbol(playerCard.suit)}`);
    } else {
      setMessage(`égalité : ${playerCard.value} ${getSuitSymbol(playerCard.suit)} contre ${computerCard.value} ${getSuitSymbol(computerCard.suit)}`);
    }

    if (nextPlayerDeck.length === 0) {
      setMessage(' l ordinateur a gagné la partie !');
    }
    if (nextComputerDeck.length === 0) {
      setMessage('le joueur a gagné la partie !');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Jeu de Bataille</h1>
      <button onClick={playTurn} disabled={!playerDeck.length || !computerDeck.length}>
        Jouer un tour
      </button>
      <p>{message}</p>
      <h3>Cartes restantes :</h3>
      <p>Joueur : {playerDeck.length}</p>
      <p>Ordinateur : {computerDeck.length}</p>
    </div>
  );
};

export default App;
