// server.js - The Main Server File Edited to work with EC2

const http = require('http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// --- Server Setup ---
const app = express();
const port = 3001;

// --- Middleware ---
app.use(cors({
    origin: [
        'http://34.195.233.179',
        'http://localhost:3000',
        'http://localhost:3001'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Import Route Files ---
const caseStudyRoutes = require('./routes/caseStudyRoutes');
const imperiumRoutes = require('./routes/imperiumRoutes');
const marketingRoutes = require('./routes/marketingRoutes');
const salesRoutes = require('./routes/salesRoutes');

// --- Use Route Files ---
app.use('/api', caseStudyRoutes);
app.use('/api/imperium', imperiumRoutes); // This will now work correctly
app.use('/api/marketing', marketingRoutes); // --- NEW LINE 2 ---
app.use('/api/sales', salesRoutes);


// --- NEW: SEQUENTIAL SERVER START LOGIC ---
const startServer = async () => {
    try {
        // 1. Await a successful connection to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully.');

        // 2. ONLY after the connection is successful, start the HTTP server
        app.listen(port, '0.0.0.0', () => {
        console.log(`> Server ready on http://0.0.0.0:${port}`);
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process with an error code if the DB connection fails
    }
};

// --- Execute the startup function ---
startServer();