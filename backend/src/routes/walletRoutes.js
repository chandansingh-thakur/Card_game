const express = require("express");
const router = express.Router();

const { getWallet } = require("../controllers/walletController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getWallet);

module.exports = router;