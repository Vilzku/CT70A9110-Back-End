const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meme", memeSchema);
