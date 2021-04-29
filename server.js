require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;


// MongoDB
mongoose.connect("mongodb://localhost/db",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Database connected"));


// Start server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', require('./routes/users'));
app.use('/memes', require('./routes/memes'));
app.listen(PORT, () => console.log("Server started on port " + PORT));