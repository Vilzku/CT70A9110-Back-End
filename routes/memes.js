const express = require('express');
const router = express.Router();
const token = require('../token');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
// https://picnature.de/how-to-upload-files-in-nodejs-using-multer-2-0/
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);


const upload = multer();
router.post('/upload', upload.single('meme'), token.check, async (req, res) => {

    const {
        file,
        body: { title }
    } = req;
    
    /*if(file.detectedFileExtension != ".jpg" ||
        file.detectedFileExtension != ".png" ||
        file.detectedFileExtension != ".gif") {
            return res.status(500).json({ message: "Invalid file type" });
       }*/

    const fileName = title + file.detectedFileExtension;
    const filePath = path.join(__dirname, '..', 'user_memes', fileName)
    await pipeline(file.stream, fs.createWriteStream(filePath));
    
    res.json({ msg: 'jee' });
})


module.exports = router;