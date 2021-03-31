import React from "react";
import Card from "../Card/Card";
import './PlayingScene.scss';


import { IPlayer } from "../../interfaces";

const PlayingScene: React.FC<{
  getCard: Function;
  results: Boolean | undefined;
  setPlayer: Function;
  setDealer: Function;
  setResults: Function;
  player: IPlayer;
  dealer: IPlayer;
}> = (props) => {
  const hitMe = () => {
    let newPlayer = JSON.parse(JSON.stringify(props.player));
    let newCard = props.getCard();
    newPlayer.Hand.push(newCard);
    newPlayer.Points += newCard.Weight;

    if (newPlayer.Points > 21) {
      stick();
    } else if (newPlayer.Points === 21) {
      props.setResults(true);
    }

    props.setPlayer(newPlayer);
  };

  const stick = () => {
    let newDealer = JSON.parse(JSON.stringify(props.dealer));
    let newCard = props.getCard();
    newDealer.Hand.push(newCard);
    newDealer.Points += newCard.Weight;

    if (newDealer.Points > 21) {
      props.setResults(true);
    } else if (newDealer.Points === 21) {
      props.setResults(false);
    }

    props.setDealer(newDealer);
  };

  const renderPlayerCards = () => {
    if (props.player) {
      return props.player.Hand.map((eachCard) => {
        return <Card value={eachCard.Value} suit={eachCard.Suit}></Card>;
      });
    }
  };

  const renderDealerCards = () => {
    if (props.dealer) {
      return props.dealer.Hand.map((eachCard) => {
        return <Card value={eachCard.Value} suit={eachCard.Suit}></Card>;
      });
    }
  };
  return (
    <div className="Playing-Scene">
      <div className="scene-container">
        <div className="player-cards">
          <h1>Total: {props.player.Points}</h1>
          {renderPlayerCards()}
        </div>
        <div className="dealer-cards">
          <h1>Total: {props.dealer.Points}</h1>
          {renderDealerCards()}
        </div>
        {props.results === undefined && (
          <div>
            <button onClick={hitMe}>Hit me</button>
            <button onClick={stick}>Stick</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayingScene;
