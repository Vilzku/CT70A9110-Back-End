const express = require('express');
const router = express.Router();
const token = require('../token');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const Meme = require('../models/meme');


// Upload meme
const upload = multer();
router.post('/upload', upload.single('meme'), token.check, async (req, res) => {

    const {
        file,
        body: { title, username }
    } = req;

    // Check if file extension is allowed
    if(!isFileAllowed(file)) {
        return res.status(500).json({ message: "Invalid file type" });
    }

    // Create database entry
    let meme = new Meme({
        filename: createFileName(file),
        title,
        username
    });

    try {
        meme = await meme.save()
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
})


// Get all memes
router.get('/', async (req, res) => {
    try {
        const memes = await Meme.find();
        res.json(memes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Delete all memes from database -- for testing
router.delete('/deleteall', async (req, res) => {
    try {
        await Meme.remove();
        res.json({ message: "All memes deleted from database" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/********** UTILITIES **********/

function isFileAllowed(file) {
    const allowedFileExtensions = ['.jpg', '.png', '.gif'];
    if(allowedFileExtensions.indexOf(file.detectedFileExtension) === -1) {
        return false;
    }
    return true;
}

function createFileName(file) {
    return crypto.randomBytes(8).toString('hex') + file.detectedFileExtension;
}

async function pipeFileToFolder(file, filename) {
    // https://picnature.de/how-to-upload-files-in-nodejs-using-multer-2-0/
    const filePath = path.join(__dirname, '..', 'user_memes', filename)
    await pipeline(file.stream, fs.createWriteStream(filePath));
}

module.exports = router;

