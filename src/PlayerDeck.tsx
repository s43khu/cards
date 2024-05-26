import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import { abilities } from "./utils/cardAbilities";
import { shuffle } from "./utils/shuffle";
import FlipCard from "./FlipCard";

const abilitiesInfo = [
  {
    name: "self",
    title: "Death",
    description: "Reduces your lives by 1.",
    icon: "💀",
  },
  {
    name: "fortune",
    title: "Divine Fortune",
    description: "Remove all the death cards from your hand.",
    icon: "🔮",
  },
  {
    name: "hanged",
    title: "Hanging Man",
    description: "Disables opponents  turn.",
    icon: "🔒",
  },
  {
    name: "justice",
    title: "Justice",
    description: "Reduces opponent's lives by 1 and increases your lives by 1.",
    icon: "⚖️",
  },
  {
    name: "strength",
    title: "Bestowed Strength",
    description: "Increases your own lives by 1.",
    icon: "💪",
  },
  {
    name: "sun",
    title: "The Sun",
    description: "Increases your own lives by 2.",
    icon: "☀️",
  },
  {
    name: "moon",
    title: "The Moon",
    description: "Reduces opponent's lives by 1.",
    icon: "🌙",
  },
  {
    name: "chariot",
    title: "Chariot's Praise",
    description: "Add a random good card to your deck.",
    icon: "🚀",
  },
  {
    name: "lovers",
    title: "Lovers Pride",
    description: "Removes one good card from opponent's deck(if have any ofc).",
    icon: "❤️",
  },
  {
    name: "temperance",
    title: "Temperance Cuff",
    description: "Disables the next card's ability you draw",
    icon: "⏳",
  },
  {
    name: "star",
    title: "Shooting Star",
    description: "Adds a death card to opponent deck",
    icon: "⭐",
  },
];

function PlayerDeck({
  player,
  lives,
  setPlayerLives,
  opponentLives,
  setOpponentLives,
  switchTurn,
  gameStarted,
  deck,
  setDeck,
  opponentDeck,
  setOpponentDeck,
  turn,
  isComputer,
}) {
  const [hanged, setHanged] = useState(false);
  const [opponentNextCardDisabled, setOpponentNextCardDisabled] =
    useState(false);

  useEffect(() => {
    if (hanged) {
      setHanged(false);
    }
  }, [turn]);

  useEffect(() => {
    if (gameStarted && !isComputer) {
      if (deck?.length === 0 && lives > 0) {
        setDeck(shuffle());
        toast.success(`Player ${player} has received a new set of cards!`, {
          position: "bottom-left",
        });
      }
    }
  }, [deck, lives, player, setDeck, gameStarted]);

  useEffect(() => {
    if (isComputer && turn && gameStarted) {
      if (deck?.length === 0 && lives > 0) {
        setDeck(shuffle());
        toast.success(`Computer has received a new set of cards!`, {
          position: "bottom-left",
        });
      }
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomIndex];
        if (card) {
          pickCard(card, randomIndex);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [turn, gameStarted, isComputer, deck, player]);

  const pickCard = async (card, index) => {
    if (gameStarted) {
      const updatedDeck = deck.filter((c) => c.uid !== card.uid);
      setDeck(updatedDeck);

      toast.success(`Player ${player} got a ${card.name}`, {
        position: "bottom-left",
      });

      const abilityInfo = abilitiesInfo.find(
        (info) => info.name === card.ability
      );
      if (abilityInfo) {
        toast(`${abilityInfo.title}: ${abilityInfo.description}`, {
          icon: `${abilityInfo.icon}`,
          position: "bottom-left",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 7000,
        });
      }

      let switchTurnAfterAbility = true;
      if (opponentNextCardDisabled) {
        toast(`your's card ability was disabled`, {
          position: "bottom-left",
        });
        setOpponentNextCardDisabled(false);
      } else {
        switch (card.ability) {
          case "self":
            abilities.self(lives, setPlayerLives);
            break;
          case "fortune":
            abilities.fortune(updatedDeck, setDeck);
            break;
          case "hanged":
            abilities.hanged(setHanged);
            switchTurnAfterAbility = false;
            break;
          case "justice":
            abilities.justice(
              lives,
              setPlayerLives,
              opponentLives,
              setOpponentLives
            );
            break;
          case "strength":
            abilities.strength(lives, setPlayerLives);
            break;
          case "sun":
            abilities.sun(lives, setPlayerLives);
            break;
          case "moon":
            abilities.moon(opponentLives, setOpponentLives);
            break;
          case "chariot":
            abilities.chariot(updatedDeck, setDeck);
            break;
          case "lovers":
            abilities.lovers(opponentDeck, setOpponentDeck);
            break;
          case "temperance":
            setOpponentNextCardDisabled(true);
            break;
          case "star":
            abilities.star(opponentDeck, setOpponentDeck);
            break;
          default:
            break;
        }
      }

      if (switchTurnAfterAbility) {
        switchTurn();
      }
    }
  };

  const deathCardCount = deck.filter((card) => card.name === "death").length;

  return (
    <div>
      <Toaster />
      <h2>
        Player {player} Deck {"  "}
        <span style={{ color: "red", fontWeight: "bold" }}>
          Death Cards: {deathCardCount}
        </span>
      </h2>{" "}
      {gameStarted && (
        <>
          {[...Array(lives)].map((_, index) => (
            <span key={index} className="live-icon">
              &#x2665;
            </span>
          ))}
          <div className="deck-column">
            {deck.map((card, index) => (
              <FlipCard
                key={index}
                backContent={card.name}
                onClick={() => pickCard(card, index)}
                disabled={!turn}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PlayerDeck;
