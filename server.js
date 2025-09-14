// server.js - The Main Server File

const http = require('http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// --- Server Setup ---
const app = express();
const port = 3001;

// --- Middleware ---
app.use(cors({ origin: ['http://localhost:3000', 'https://main.d21put265zxojq.amplifyapp.com'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Import Route Files ---
// const caseStudyRoutes = require('./routes/caseStudyRoutes');
// const imperiumRoutes = require('./routes/imperiumRoutes');
const marketingRoutes = require('./routes/marketingRoutes');

// --- Use Route Files ---
app.use('/api', caseStudyRoutes);
app.use('/api/imperium', imperiumRoutes); // This will now work correctly
app.use('/api/marketing', marketingRoutes); // --- NEW LINE 2 ---


// --- NEW: SEQUENTIAL SERVER START LOGIC ---
const startServer = async () => {
    try {
        // 1. Await a successful connection to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully.');

        // 2. ONLY after the connection is successful, start the HTTP server
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process with an error code if the DB connection fails
    }
};

// --- Execute the startup function ---
startServer();