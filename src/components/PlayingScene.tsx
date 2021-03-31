import React from "react";
import { IPlayer } from "../interfaces";
import Card from "./Card";

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
      hitDealer();
    } else if (newPlayer.Points === 21) {
      props.setResults(true);
    }

    props.setPlayer(newPlayer);
  };

  const hitDealer = () => {
    let newDealer = JSON.parse(JSON.stringify(props.dealer));
    let newCard = props.getCard();
    newDealer.Hand.push(newCard);
    newDealer.Points += newCard.Weight;

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
    <div>
      <div>
        <h1>Total: {props.player.Points}</h1>
        {renderPlayerCards()}
      </div>
      <div>
        <h1>Total: {props.dealer.Points}</h1>
        {renderDealerCards()}
      </div>
      <div>
        <button onClick={hitMe}>Hit me</button>
        <button onClick={hitDealer}>Hit dealer</button>
      </div>
    </div>
  );
};

export default PlayingScene;
