const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Meme', memeSchema);