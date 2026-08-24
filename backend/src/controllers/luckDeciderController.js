const {
  createGame,
  selectCard,
} = require("../gameEngine/luckDecider/luckDeciderService");

const {
  placeBet,
} = require("../gameEngine/luckDecider/luckDeciderBetService");

// Start a new Luck Decider game
const startGame = async (req, res) => {
  try {
    const game = await createGame(req.userId);

    return res.status(201).json({
      success: true,
      message: "Luck Decider game started",
      game,
    });
  } catch (error) {
    console.error("Start game error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to start game",
    });
  }
};

// Select a card
const chooseCard = async (req, res) => {
  try {
    const { gameId, cardId } = req.body;

    if (!gameId || !cardId) {
      return res.status(400).json({
        success: false,
        message: "gameId and cardId are required",
      });
    }

    const result = await selectCard(
      gameId,
      req.userId,
      cardId
    );

    return res.status(200).json({
      success: true,
      message: "Card selected successfully",
      game: result,
    });
  } catch (error) {
    console.error("Choose card error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const placeBetController = async (req, res) => {
  try {
    const { gameId, amount } = req.body;

    if (!gameId || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "gameId and amount are required",
      });
    }

    const result = await placeBet(
      gameId,
      req.userId,
      amount
    );

    return res.status(200).json({
      success: true,
      message: "Bet placed successfully",
      game: {
        gameId: result.gameId,
        betAmount: result.betAmount,
        status: result.status,
      },
      wallet: result.wallet,
    });
  } catch (error) {
    console.error("Place bet error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  startGame,
  chooseCard,
   placeBetController
};