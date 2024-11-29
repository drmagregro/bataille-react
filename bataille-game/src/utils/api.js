import axios from 'axios';


export const createDeck = async () => {
  try {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
    return response.data.deck_id; 
  } catch (error) {
    console.error('Erreur lors de la création du deck :', error);
    throw error;
  }
};

export const drawCards = async (deckId, count) => {
  try {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
    return response.data.cards; 
  } catch (error) {
    console.error('Erreur lors du tirage des cartes :', error);
    throw error;
  }
};
