const express = require("express");
const router = express.Router();
const token = require("../token");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const Meme = require("../models/meme");

// Upload meme - requires username and token
const upload = multer();
router.post("/upload", upload.single("meme"), token.check, async (req, res) => {
  const {
    file,
    body: { title, username },
  } = req;

  // Check if file extension is allowed
  try {
    if (!isFileAllowed(file)) {
      return res.status(400).json({ message: "Invalid file type" });
    }
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }

  // Create database entry
  let meme = new Meme({
    filename: createFileName(file),
    title,
    username,
  });

  try {
    meme = await meme.save();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }

  // Pipe the meme to folder
  try {
    pipeFileToFolder(file, meme.filename);
  } catch (err) {
    await meme.remove();
    return res.status(500).send({ message: err.message });
  }

  res.json({ message: "Meme successfully uploaded" });
});

// Get all memes matching username - requires username and token
router.post("/user/:username", token.check, async (req, res) => {
  try {
    const memes = await Meme.find({ username: req.params.username });
    res.json(memes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one meme (info)
router.get("/:filename", async (req, res) => {
  let filename = req.params.filename;
  try {
    if (filename === "random") {
      const random = await Meme.aggregate([{ $sample: { size: 1 } }]);
      filename = random[0].filename;
    }
    const meme = await Meme.findOne({ filename });
    res.json(meme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one meme (file)
router.get("/file/:filename", async (req, res) => {
  try {
    const root = path.join(__dirname, "..", "user_memes", req.params.filename);
    res.sendFile(root);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a meme - requires username and token
router.post("/delete/:filename", token.check, async (req, res) => {
  const meme = Meme.find({ filename: req.params.filename });
  if (meme.username !== req.body.username)
    return res.status(400).json({ message: "Not allowed" });
  try {
    await Meme.deleteOne({ filename: req.params.filename });
    const root = path.join(__dirname, "..", "user_memes", req.params.filename);
    fs.unlink(root, (err) => {
      throw err;
    });
    res.json({ message: "Meme deleted from database" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/********** UTILITIES **********/

function isFileAllowed(file) {
  const allowedFileExtensions = [".jpg", ".png", ".gif"];
  if (allowedFileExtensions.indexOf(file.detectedFileExtension) === -1) {
    return false;
  }
  return true;
}

function createFileName(file) {
  return crypto.randomBytes(8).toString("hex") + file.detectedFileExtension;
}

async function pipeFileToFolder(file, filename) {
  const filePath = path.join(__dirname, "..", "user_memes", filename);
  await pipeline(file.stream, fs.createWriteStream(filePath));
}

module.exports = router;
