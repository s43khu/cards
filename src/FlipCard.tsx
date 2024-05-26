import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import card_back from "./assets/card_back.jpg";
import chariot from "./assets/chariot.jpg";
import death from "./assets/death.jpg";
import devil from "./assets/devil.jpg";
import fortune from "./assets/fortune.jpg";
import hanged from "./assets/hanged.jpg";
import hermit from "./assets/hermit.jpg";
import justice from "./assets/justice.jpg";
import lovers from "./assets/lovers.jpg";
import moon from "./assets/moon.jpg";
import star from "./assets/star.jpg";
import strength from "./assets/strength.jpg";
import sun from "./assets/sun.jpg";
import temperance from "./assets/temperance.jpg";
import tower from "./assets/tower.jpg";
import "./FlipCard.css";

const FlipCard = ({ backContent, onClick, disabled }) => {
  const cardImages = {
    chariot,
    death,
    devil,
    fortune,
    hanged,
    hermit,
    justice,
    lovers,
    moon,
    star,
    strength,
    sun,
    temperance,
    tower,
  };
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cardStyle = {
    padding: "0px",
    margin: "20px",
    width: "200px",
    height: "332px",
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "10px",
    transition: "box-shadow 0.3s ease",
    boxShadow: disabled ? "none" : "0 0 20px 5px gold",
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      {isLoading && <div className="overlay"></div>}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          style={cardStyle}
          onClick={async () => {
            if (!disabled) {
              setIsLoading(true);
              setIsFlipped((prev) => !prev);
              await delay(1000);
              setIsFlipped(false);
              await delay(1000);
              onClick();
              setIsLoading(false);
            }
          }}
          className="CardFront"
        >
          <img src={card_back} alt="card front" />
        </div>
        <div
          style={cardStyle}
          onClick={async () => {
            if (!disabled) {
              setIsLoading(true);
              setIsFlipped((prev) => !prev);
              await delay(1000);
              setIsFlipped(false);
              await delay(1000);
              onClick();
              setIsLoading(false);
            }
          }}
          className="CardBack"
        >
          <img src={cardImages[backContent]} alt="card back" />
        </div>
      </ReactCardFlip>
    </>
  );
};

export default FlipCard;
