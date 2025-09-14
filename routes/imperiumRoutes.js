// routes/imperiumRoutes.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const TradeoffDimension = require('../models/TradeoffDimension');

// Import all specialist functions
const { generatePowerQuadrant, generateBreakthroughZone, generateArenaReport, generateArchetype, generateExecutiveSummary } = require('../ai-specialists.js');
// routes/imperiumRoutes.js

const { tradeOffArenas, personalTradeOffs } = require('../assessmentData.js');

// Combine all arena definitions into one array for processing
const ARENA_MAP = [
    ...Object.values(tradeOffArenas),
    ...Object.values(personalTradeOffs)
];

// A single, shared, in-memory job store
const imperiumReportJobs = {};

// --- API ROUTES ---

router.get('/statements', async (req, res) => {
    try {
        const allDimensions = await TradeoffDimension.find({}).lean();
        const arenasMap = new Map();
        allDimensions.forEach(dim => {
            if (!arenasMap.has(dim.arenaTitle)) {
                arenasMap.set(dim.arenaTitle, {
                    arenaTitle: dim.arenaTitle,
                    arenaDescription: dim.arenaDescription,
                    statements: []
                });
            }
            arenasMap.get(dim.arenaTitle).statements.push({ id: dim.statementA.id, text: dim.statementA.text });
            arenasMap.get(dim.arenaTitle).statements.push({ id: dim.statementB.id, text: dim.statementB.text });
        });
        const allArenas = Array.from(arenasMap.values());
        res.json(allArenas);
    } catch (error) {
        console.error("Error fetching Imperium statements:", error);
        res.status(500).json({ error: 'Failed to fetch statements.' });
    }
});

router.post('/submit', async (req, res) => {
    const { answers } = req.body;
    const jobId = crypto.randomUUID();

    // Immediately respond with the jobId so the frontend can start polling
    res.status(202).json({ jobId });

    // --- Perform the full AI generation in the background ---
    try {
        console.log(`Starting FINAL report generation for job: ${jobId}`);
        imperiumReportJobs[jobId] = { status: 'processing', report: null };

        // Run all main analyses in parallel
        const [powerQuadrantData, breakthroughZoneData, archetypeData] = await Promise.all([
            generatePowerQuadrant(answers),
            generateBreakthroughZone(answers),
            generateArchetype(answers)
        ]);
        
        const arenaPromises = ARENA_MAP.map(arena => generateArenaReport(answers, arena));
        const tradeOffArenasData = await Promise.all(arenaPromises);

        const reportSoFar = {
            powerQuadrant: powerQuadrantData,
            breakthroughZone: breakthroughZoneData,
            tradeOffArenas: {
                title: "Trade-off Arenas Report",
                arenas: tradeOffArenasData
            },
            leadershipArchetype: archetypeData
        };
        
        const executiveSummaryText = await generateExecutiveSummary(reportSoFar);

        const finalReport = {
            ...reportSoFar,
            executiveSummary: executiveSummaryText,
        };

        // --- FIX: Update the SHARED job store object ---
        imperiumReportJobs[jobId] = { status: 'completed', report: finalReport };
        console.log(`FINAL Report COMPLETED for job: ${jobId}`);
    } catch (error) {
        console.error("Error in background report generation:", error);
        imperiumReportJobs[jobId] = { status: 'failed', report: null };
    }
});

router.get('/status/:jobId', (req, res) => {
    const { jobId } = req.params;
    const job = imperiumReportJobs[jobId];

    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ status: job.status, report: job.report });
});

module.exports = router;