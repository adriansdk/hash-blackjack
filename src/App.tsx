import React, { useState, useEffect } from "react";
import "./App.scss";
import { CreateDeck } from "./constants";
import { IPlayer } from "./interfaces";
import PlayingScene from "./components/PlayingScene/PlayingScene";

function App() {
  const [deck, setDeck] = useState(CreateDeck());
  const [playing, setPlaying] = useState<Boolean>(false);
  const [results, setResults] = useState<Boolean | undefined>(undefined);
  const [player, setPlayer] = useState<IPlayer>({
    Name: "Player 1",
    ID: "player",
    Points: 0,
    Hand: [],
  });
  const [dealer, setDealer] = useState<IPlayer>({
    Name: "CPU",
    ID: "cpu",
    Points: 0,
    Hand: [],
  });

  useEffect(() => {
    if (player.Points > 21) {
      setResults(false);
    }
  }, [player]);

  const startGame = (restart: Boolean) => {
    createPlayer();
    createDealer();
    setPlaying(true);

    if (restart) {
      setResults(undefined);
    }
  };

  const createPlayer = () => {
    let hand = [];
    for (var i = 0; i < 2; i++) {
      hand.push(getCard());
    }

    let points = 0;
    hand.forEach((eachCard) => {
      points += eachCard.Weight;
    });

    let newPlayer = {
      Name: "Player 1",
      ID: "player",
      Points: points,
      Hand: hand,
    };

    setPlayer(newPlayer);
  };

  const createDealer = () => {
    let hand = [];
    hand.push(getCard());

    let points = 0;
    hand.forEach((eachCard) => {
      points += eachCard.Weight;
    });

    let newDealer = {
      Name: "CPU",
      ID: "cpu",
      Points: points,
      Hand: hand,
    };

    setDealer(newDealer);
  };

  const getCard = () => {
    let newDeck = [...deck];
    let cardIndex = Math.floor(Math.random() * newDeck.length);
    let randomCard = newDeck[cardIndex];

    newDeck.splice(cardIndex, 1);

    setDeck(newDeck);
    return randomCard;
  };

  const goToMenu = () => {
    setPlaying(false);
  };

  const renderActions = () => {
    if (results === undefined) {
      return (
        <div>
          <button onClick={goToMenu}>Menu</button>
        </div>
      );
    } else if (results) {
      return (
        <div>
          <h1>you win!</h1>
          <button onClick={goToMenu}>Menu</button>
          <button onClick={(e) => startGame(true)}>Restart</button>
        </div>
      );
    } else if (!results) {
      return (
        <div>
          <h1>you lose!</h1>
          <button onClick={goToMenu}>Menu</button>
          <button onClick={(e) => startGame(true)}>Restart</button>
        </div>
      );
    }
  };

  return (
    <div className="App">
        {playing ? (
          <React.Fragment>
            <PlayingScene
              getCard={getCard}
              setPlayer={setPlayer}
              setDealer={setDealer}
              setResults={setResults}
              results={results}
              player={player}
              dealer={dealer}
            ></PlayingScene>
            <div>{renderActions()}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>Play blackjack!</h1>
            <h3>The rules are as follow:</h3>
            <ul>
              <li>
                There is a standard set of 52 cards. When the game starts, the
                player is given 2 random cards and the dealer is given one which
                the player can see. Each numbered card has its face value, the
                ace can be either 1 or 11 and picture cards are worth 10 points.
              </li>
              <li>
                The player is given the following 2 options: ‘hit’ or ‘stick’.
              </li>
              <li>
                The player can hit or stick until they are either happy with the
                sum of the values of their cards or until the total of their
                cards add up to 21 or over. If their hand is over 21, they lose.
                Otherwise, if they stick, the dealer will then start drawing
                cards until they either have a closer total to 21. If the dealer
                goes over then the player wins.
              </li>
            </ul>
            <button onClick={(e) => startGame(false)}>Start</button>
          </React.Fragment>
        )}
    </div>
  );
}

export default App;
