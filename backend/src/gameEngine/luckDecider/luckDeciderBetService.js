const User = require("../../models/user");
const Game = require("../../models/game");
const WalletTransaction = require("../../models/walletTransaction");

const placeBet = async (gameId, userId, amount) => {
  // Validate amount
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("Bet amount must be a positive whole number");
  }

  // Find game belonging to this user
  const game = await Game.findOne({
    _id: gameId,
    userId,
    gameType: "luck-decider",
  });

  if (!game) {
    throw new Error("Game not found");
  }

  // Bet can only be placed once
  if (game.status !== "waiting_for_bet") {
    throw new Error("Bet cannot be placed now");
  }

  // Get user wallet
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check balance
  if (user.coins < amount) {
    throw new Error("Insufficient coins");
  }

  const balanceBefore = user.coins;

  // Deduct coins
  user.coins -= amount;

  // Save bet in game
  game.betAmount = amount;
  game.status = "waiting_for_selection";

  await user.save();
  await game.save();

  // Save wallet transaction
  await WalletTransaction.create({
    userId: user._id,
    type: "bet",
    amount,
    balanceBefore,
    balanceAfter: user.coins,
    gameId: game._id,
  });

  return {
    gameId: game._id,
    betAmount: game.betAmount,
    status: game.status,
    wallet: {
      coins: user.coins,
      diamonds: user.diamonds,
    },
  };
};

module.exports = {
  placeBet,
};