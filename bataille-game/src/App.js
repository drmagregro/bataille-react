import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
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

const App = () => {
  const [deckId, setDeckId] = useState(null);  
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [message, setMessage] = useState('');
  const [playerCard, setPlayerCard] = useState(null); 
  const [computerCard, setComputerCard] = useState(null); 

  
  useEffect(() => {
    const createDeck = async () => {
      try {
       
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
        const deckId = response.data.deck_id;  
        setDeckId(deckId);

        
        const drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`);
        const playerCards = drawCards.data.cards;
        const remainingCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`);
        const computerCards = remainingCards.data.cards;

        setPlayerDeck(playerCards);
        setComputerDeck(computerCards);
      } catch (error) {
        console.error('Erreur lors de la récupération du paquet:', error);
      }
    };
    
    createDeck();
  }, []);

 
  const playTurn = async () => {
    if (!deckId || playerDeck.length === 0 || computerDeck.length === 0) {
      return setMessage('Partie terminée !');
    }

    const playerCurrentCard = playerDeck[0]; 
    const computerCurrentCard = computerDeck[0]; 

    const playerCardValue = getCardValue(playerCurrentCard);
    const computerCardValue = getCardValue(computerCurrentCard);

    
    setPlayerCard(playerCurrentCard);
    setComputerCard(computerCurrentCard);

    
    if (playerCardValue > computerCardValue) {
      setPlayerDeck([...playerDeck.slice(1), playerCurrentCard, computerCurrentCard]);
      setComputerDeck(computerDeck.slice(1));
      setMessage(`Joueur gagne avec ${getCardNameInFrench(playerCurrentCard)} contre ${getCardNameInFrench(computerCurrentCard)}`);
    } else if (computerCardValue > playerCardValue) {
      setComputerDeck([...computerDeck.slice(1), computerCurrentCard, playerCurrentCard]);
      setPlayerDeck(playerDeck.slice(1));
      setMessage(`Ordinateur gagne avec ${getCardNameInFrench(computerCurrentCard)} contre ${getCardNameInFrench(playerCurrentCard)}`);
    } else {
      setMessage(`Égalité : ${getCardNameInFrench(playerCurrentCard)} contre ${getCardNameInFrench(computerCurrentCard)}`);
    }

    if (playerDeck.length === 0 || computerDeck.length === 0) {
      setMessage(playerDeck.length === 0 ? 'Ordinateur a gagné la partie !' : 'Joueur a gagné la partie !');
    }
  };

  
  const getCardValue = (card) => {
    const order = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    return order.indexOf(card.value);
  };

  
  const getCardNameInFrench = (card) => {
    return `${cardValueTranslation[card.value]} de ${cardSuitTranslation[card.suit]}`;
  };

  return (
    <div className="app-container">
      <h1>Jeu de Bataille</h1>
      <button onClick={playTurn} disabled={!deckId || playerDeck.length === 0 || computerDeck.length === 0}>
        Jouer un tour
      </button>
      <p>{message}</p>
      <h3>Cartes restantes :</h3>
      <p>Joueur : {playerDeck.length}</p>
      <p>Ordinateur : {computerDeck.length}</p>

      
      <div className="card-section">
        {playerCard && (
          <div className="card-container">
            <h2>Carte Joueur</h2>
            <img src={getCardImageUrl(playerCard)} alt={`${playerCard.value} ${playerCard.suit}`} />
            <p>{getCardNameInFrench(playerCard)}</p>
          </div>
        )}
        
        {computerCard && (
          <div className="card-container">
            <h2>Carte Ordinateur</h2>
            <img src={getCardImageUrl(computerCard)} alt={`${computerCard.value} ${computerCard.suit}`} />
            <p>{getCardNameInFrench(computerCard)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
