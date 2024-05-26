export const shuffle = () => {
    const safeCards = [
        { name: "devil", ability: null }, 
        { name: "death", ability: "self" }, 
        { name: "hermit", ability: null }, 
        { name: "tower", ability: null },
    ];
    
    const abilityCards = [
        { name: "fortune", ability: "fortune" },
        { name: "hanged", ability: "hanged" },
        { name: "justice", ability: "justice" },
        { name: "lovers", ability: "lovers" },
        { name: "moon", ability: "moon" },
        { name: "star", ability: "star" },
        { name: "strength", ability: "strength" },
        { name: "sun", ability: "sun" },
        { name: "temperance", ability: "temperance" },
        { name: "chariot", ability: "chariot" },
    ];

    let array = [...safeCards, ...safeCards,...safeCards,...safeCards,...safeCards,...safeCards, ...abilityCards];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    const shuffledArrayWithUID = array.map((card, index) => ({ ...card, uid: generateUID() }));
    return shuffledArrayWithUID.slice(0, 5);
};

const generateUID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < 5; i++) {
        uid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uid;
};
