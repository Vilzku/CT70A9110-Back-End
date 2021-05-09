const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const token = require("../token");
const User = require("../models/user");

// Update user - requires password
router.post("/update/:username", getUser, async (req, res) => {
  console.log(req.body);
  if (!req.body.newPassword)
    res.status(400).json({ message: "New password missing" });

  if (await bcrypt.compare(req.body.password, res.user.password)) {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    res.user.password = hashedPassword;

    try {
      const updatedUser = await res.user.save();
      res.send({ msg: "Password changed" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ msg: "Wrong current password" });
  }
});

// Remove user - requires password
router.post("/delete/:username", getUser, async (req, res) => {
  if (await bcrypt.compare(req.body.password, res.user.password)) {
    try {
      await res.user.remove();
      res.json({ message: "User " + req.params.username + " deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ msg: "Wrong current password" });
  }
});

// Login user - requires username and password
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Cannot find user " + req.body.username });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const tk = token.generate();
      user.token = tk.key;
      user.tokenExpiration = tk.expiration;
      await user.save();
      res.json({ username: user.username, token: user.token });
    } else {
      res.status(401).json({ message: "Access denied" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Register user - requires username and password
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    token: token.generate().key,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware: Find user
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Cannot find user " + req.params.username });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
