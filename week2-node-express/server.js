require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE

//json parsing
app.use(express.json());

// Serving static index.html file
app.use(express.static(path.join(__dirname, 'public')));

// Custom middle ware for logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
    next();
});

// ROUTES

// POST /user
app.post('/user', (req, res) => {
    const { name, email } = req.body;
    // Error handling for missing data
    if (!name || !email) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Please provide both name and email"
        });
    }
    res.json({ message: `Hello, ${name}!` });
});

// GET /user/:id
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User ${userId} profile` });
});

// START
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
