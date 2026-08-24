const crypto = require("crypto");

const {
  createDeck,
  shuffleDeck,
} = require("./deck");

const games = new Map();

const createGame = (userId) => {
  const gameId = crypto.randomUUID();

  const deck = shuffleDeck(createDeck());

  const game = {
    gameId,
    userId,
    deck,

    // Player has not selected a card yet
    selectedCard: null,

    // Cards revealed during the game
    playerCard: null,
    aiCard: null,

    status: "waiting_for_selection",

    createdAt: new Date(),
  };

  games.set(gameId, game);

  return {
    gameId,
    status: game.status,
  };
};

const getGame = (gameId) => {
  return games.get(gameId);
};

const selectCard = (gameId, userId, cardId) => {
  const game = games.get(gameId);

  if (!game) {
    throw new Error("Game not found");
  }

  if (game.userId !== userId) {
    throw new Error("You are not allowed to access this game");
  }

  if (game.status !== "waiting_for_selection") {
    throw new Error("Card selection is not allowed now");
  }

  const selectedCard = game.deck.find(
    (card) => card.id === cardId
  );

  if (!selectedCard) {
    throw new Error("Invalid card selection");
  }

  game.selectedCard = selectedCard;
  game.status = "ready_to_reveal";

  return {
    gameId: game.gameId,
    status: game.status,

    // Don't reveal the actual card yet
    selectedCard: {
      id: selectedCard.id,
      suit: selectedCard.suit,
      rank: selectedCard.rank,
    },
  };
};

module.exports = {
  createGame,
  getGame,
  selectCard,
};