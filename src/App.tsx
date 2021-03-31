import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";
import { CreateDeck } from "./constants";
import { IPlayer } from "./interfaces";
import PlayingScene from "./components/PlayingScene";

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

  const startGame = () => {
    createPlayer();
    createDealer();
    setPlaying(true);
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

  return (
    <div className="App">
      <header className="App-header">
        {playing ? (
          <PlayingScene
            getCard={getCard}
            setPlayer={setPlayer}
            setDealer={setDealer}
            setResults={setResults}
            results={results}
            player={player}
            dealer={dealer}
          ></PlayingScene>
        ) : (
          <div>
            <h1>Play blackjack!</h1>
            <button onClick={startGame}>Start</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
