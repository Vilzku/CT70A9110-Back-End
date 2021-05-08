const crypto = require("crypto");
const User = require("./models/user");

// Create an access token
function generate() {
  return {
    key: crypto.randomBytes(32).toString("hex"),
    expiration: Date.now() + 60 * 60 * 1000, // +1h
  };
}

// Check if token is valid
async function check(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (req.body.token !== user.token) {
      return res.status(401).json({ message: "invalid token" });
    }
    if (Date.now() > user.tokenExpiration) {
      return res.status(401).json({ message: "token expired" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = { generate, check };
