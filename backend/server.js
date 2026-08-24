const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = require("./src/app");
const connectDB = require("./src/config/db");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
};

startServer();