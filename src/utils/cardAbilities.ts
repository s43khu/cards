const goodCards = [
    { name: "fortune", ability: "fortune" },
    { name: "lovers", ability: "lovers" },
    { name: "moon", ability: "moon" },
    { name: "star", ability: "star" },
    { name: "strength", ability: "strength" },
    { name: "sun", ability: "sun" },
  ];

export const abilities = {
  self: (lives: any,setPlayerLives : any) => {
   setPlayerLives(lives-1);
  },
  fortune: (deck :any, setDeck :any) => {
    const updatedDeck = deck.filter((card :any) => card.name !== "death");
    setDeck(updatedDeck);
  },
  hanged: (setHanged: any) => {
    setHanged(true);
  },
  justice: (lives: any,
    setPlayerLives: any,
    opponentLives : any,
    setOpponentLives: any) => {
   setOpponentLives(opponentLives-1);
   setPlayerLives(lives + 1)
  },
  lovers: ( opponentDeck : any,
    setOpponentDeck: any) => {
        const opponentGoodCards = opponentDeck.filter(card => goodCards.includes(card.name));
        if (opponentGoodCards.length > 0) {
          const cardToRemove = opponentGoodCards[Math.floor(Math.random() * opponentGoodCards.length)];
          const updatedDeck = opponentDeck.filter(card => card.uid !== cardToRemove.uid);
          setOpponentDeck(updatedDeck);
        }
  },
  moon: (opponentLives : any,
    setOpponentLives: any) => {
    setOpponentLives(opponentLives - 1)
  },
  star: (opponentDeck :any, setOpponentDeck: any) => {
    if (opponentDeck.length < 5) {
      const deathCard = { name: "death", ability: "self", uid: Math.random().toString(36).substr(2, 5) };
      const updatedDeck = [...opponentDeck, deathCard];
      setOpponentDeck(updatedDeck);
    }
  },
  strength: (lives: any,
    setPlayerLives: any) => {
        setPlayerLives(lives + 1)
  },
  sun: (lives: any,
    setPlayerLives: any) => {
   setPlayerLives(lives+2)
  },
  temperance: (setOpponentNextCardDisabled :any) => {
    setOpponentNextCardDisabled(true);
  },
  chariot: (deck: any, setDeck: any) => {
    const randomGoodCard = goodCards[Math.floor(Math.random() * goodCards.length)];
    const newDeck = [...deck, randomGoodCard];
    setDeck(newDeck);
  },
  
};
