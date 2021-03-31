import React from "react";
import './Card.scss';


const Card: React.FC<{ value: string; suit: string }> = (props) => {
    
  const getSuit = () => {
    switch (props.suit) {
      case "Spades":
        return <p className="black">♠</p>;
      case "Hearts":
        return <p className="red">♥</p>;
      case "Diamonds":
        return <p className="red">♦</p>;
      case "Clubs":
        return <p className="black">♣</p>;
    }
  };

  return (
    <div className="Card">
      <div className="card-container">
        <h1>{props.value}</h1>
        <h1 className="suit">{getSuit()}</h1>
      </div>
    </div>
  );
};

export default Card;
