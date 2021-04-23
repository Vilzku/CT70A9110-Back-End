const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.patch('/:username', getUser, async (req, res) => {
    if(req.body.username) res.user.username = req.body.username;
    if(req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        res.user.password = hashedPassword;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:username', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User " + req.params.username + " deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user) {
        return res.status(400).json(
            { message: "Cannot find user " + req.body.username }
        );
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.json({ username: user.username, token: "aaa" });
        } else {
            res.status(401).json({ message: "Access denied" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
            );
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}


module.exports = router;