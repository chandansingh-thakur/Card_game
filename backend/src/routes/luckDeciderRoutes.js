const express = require("express");

const router = express.Router();

const {
  startGame,
  chooseCard,
  placeBetController,
} = require("../controllers/luckDeciderController");

const authMiddleware = require("../middlewares/authMiddleware");

// Start game
router.post(
  "/start",
  authMiddleware,
  startGame
);

// Place bet
router.post(
  "/bet",
  authMiddleware,
  placeBetController
);

// Choose card
router.post(
  "/choose",
  authMiddleware,
  chooseCard
);

module.exports = router;