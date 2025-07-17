require("dotenv").config();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  const validApiKey = process.env.API_KEY; // Simpan API Key di .env

  if (!apiKey) {
    return res.status(401).json({ message: "API Key is required" });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({ message: "Invalid API Key" });
  }

  next(); // Lanjutkan ke handler berikutnya jika API Key valid
};

module.exports = apiKeyMiddleware;
