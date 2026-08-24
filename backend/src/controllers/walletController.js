const User = require("../models/user");

const getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "coins diamonds"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      wallet: {
        coins: user.coins,
        diamonds: user.diamonds,
      },
    });
  } catch (error) {
    console.error("Wallet error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getWallet,
};