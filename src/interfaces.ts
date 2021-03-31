export interface IPlayer {
  Name: string;
  ID: string;
  Points: number;
  Hand: {
    Value: string;
    Suit: string;
    Weight: number;
  }[];
}
