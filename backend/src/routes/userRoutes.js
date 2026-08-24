const express = require("express");

const router = express.Router();

const {

  startGame,

  chooseCard,

} = require("../controllers/luckDeciderController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post(

  "/start",

  authMiddleware,

  startGame

);

router.post(

  "/choose",

  authMiddleware,

  chooseCard

);

module.exports = router;