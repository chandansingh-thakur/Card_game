const Game = require("../../models/game");

const {
  createDeck,
  shuffleDeck,
} = require("./deck");

// Start a new Luck Decider game
const createGame = async (userId) => {
  const deck = shuffleDeck(createDeck());

  const game = await Game.create({
    userId,
    gameType: "luck-decider",
    status: "waiting_for_bet",
    deck,
  });

  return {
    gameId: game._id,
    status: game.status,
  };
};

// Get user's game
const getGame = async (gameId, userId) => {
  const game = await Game.findOne({
    _id: gameId,
    userId,
    gameType: "luck-decider",
  });

  return game;
};

// Select a card
const selectCard = async (gameId, userId, cardId) => {
  const game = await getGame(gameId, userId);

  if (!game) {
    throw new Error("Game not found");
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

  game.selectedCard = {
    id: selectedCard.id,
    suit: selectedCard.suit,
    rank: selectedCard.rank,
  };

  game.status = "ready_to_reveal";

  await game.save();

  return {
    gameId: game._id,
    status: game.status,
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