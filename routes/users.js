const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one
router.get('/:username', getUser, (req, res) => {
    res.json(res.user);
});

// Create
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update
router.patch('/:username', getUser, async (req, res) => {
    if(req.body.username) res.user.username = req.body.username;
    if(req.body.password) res.user.password = req.body.password;
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:username', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User " + req.params.username + " deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findOne(
            { username: req.params.username }
        );
        if(!user) {
            return res.status(404).json(
                { message: "Cannot find user " + req.params.username }
            );;
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

module.exports = router;