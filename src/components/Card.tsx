import React from "react";

const Card: React.FC<{ value: string; suit: string }> = (props) => {
    
  const getSuit = () => {
    switch (props.suit) {
      case "Spades":
        return "♠";
      case "Hearts":
        return "♥";
      case "Diamonds":
        return "♦";
      case "Clubs":
        return "♣";
    }
  };

  return (
    <div className="card-container">
      <h1>{props.value}</h1>
      <h1>{getSuit()}</h1>
    </div>
  );
};

export default Card;
