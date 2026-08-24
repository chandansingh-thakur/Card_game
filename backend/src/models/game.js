const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    suit: {
      type: String,
      required: true,
    },

    rank: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const gameSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    gameType: {
      type: String,
      enum: ["luck-decider"],
      default: "luck-decider",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "waiting_for_bet",
        "waiting_for_selection",
        "ready_to_reveal",
        "completed",
        "cancelled",
      ],
      default: "waiting_for_bet",
    },

    betAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Full shuffled deck
    deck: {
      type: [cardSchema],
      default: [],
    },

    selectedCard: {
      type: cardSchema,
      default: null,
    },

    aiCard: {
      type: cardSchema,
      default: null,
    },

    playerCard: {
      type: cardSchema,
      default: null,
    },

    result: {
      type: String,
      enum: ["win", "loss", null],
      default: null,
    },

    payout: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);