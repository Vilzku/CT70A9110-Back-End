const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const token = require('../token');
const User = require('../models/user');


// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update user
router.patch('/:username', getUser, async (req, res) => {
    if(req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        res.user.password = hashedPassword;
    }
    try {
        const updatedUser = await res.user.save();
        res.send({ msg: "success" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Remove user
router.delete('/:username', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User " + req.params.username + " deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Login user
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user) {
        return res.status(400).json(
            { message: "Cannot find user " + req.body.username }
        );
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
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


// Register user
router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        token: token.generate().key
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Find user
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findOne(
            { username: req.params.username }
        );
        if(!user) {
            return res.status(404).json(
                { message: "Cannot find user " + req.params.username }
            );
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}


module.exports = router;