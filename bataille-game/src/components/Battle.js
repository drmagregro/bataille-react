import React from 'react';
import Card from './Card';

const Battle = ({ playerDeck, computerDeck, message }) => {
  return (
    <div className="battle-container">
      <h2>Bataille</h2>
      <div className="card-section">
        {playerDeck.length > 0 && (
          <div className="player-cards">
            <h3>Carte Jouée (Joueur)</h3>
            <Card card={playerDeck[0]} />

            {playerDeck.length > 1 && (
              <div className="next-card">
                <h4>Prochaine Carte</h4>
                <Card card={playerDeck[1]} />
              </div>
            )}
          </div>
        )}

        {computerDeck.length > 0 && (
          <div className="computer-card">
            <h3>Carte Jouée (Ordinateur)</h3>
            <Card card={computerDeck[0]} />
          </div>
        )}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Battle;
