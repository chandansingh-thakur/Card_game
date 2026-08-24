const express = require("express");
const cors = require("cors");
require("dotenv").config();
const walletRoutes = require("./routes/walletRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/wallet", walletRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Card Game API is running",
  });
});

module.exports = app;