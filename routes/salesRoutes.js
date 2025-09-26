const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// --- 1. Import Sales-Specific Data and Logic ---
const salesQuestions = require('../data/sales-assessment-data.js');
const salesAnswerKey = require('../data/sales-answer-key.js');

const specialists = require('../logic/sales-ai-specialists.js');

// --- 2. Create a Separate Job Store for Sales Reports ---
const salesReportJobs = {};

// GET /api/sales/questions
router.get('/questions', (req, res) => {
    try {
        // The data file exports the array directly
        res.json(salesQuestions);
    } catch (error) {
        console.error("Error fetching sales questions:", error);
        res.status(500).json({ error: 'Failed to fetch sales questions.' });
    }
});

// POST /api/sales/submit
router.post('/submit', async (req, res) => {
    const { answers, userInfo } = req.body;
    const jobId = crypto.randomUUID();
    
    // Immediately respond to the client with the Job ID
    res.status(202).json({ jobId });

    // --- Start background processing for the report ---
    try {
        console.log(`Starting Sales Performance Index report generation for job: ${jobId}`);
        salesReportJobs[jobId] = { status: 'processing', report: null };

        // 1. Calculate all numerical scores from the user's answers
        const scoredResults = specialists.calculateScores(answers);
        
        console.log(`Kicking off all parallel AI analyses for sales job: ${jobId}`);
        
        // 2. Run all AI analysis functions in parallel for maximum efficiency
        const [
            executiveAnalyses,
            groupAnalyses,
            indexAnalyses
        ] = await Promise.all([
            // Promise for all executive summary pieces
            Promise.all([
                specialists.getCompositeScoreAnalysis(scoredResults),
                specialists.getStrengthsAnalysis(scoredResults),
                specialists.getDevelopmentPrioritiesAnalysis(scoredResults),
                specialists.getAttentionFlagsAnalysis(scoredResults),
                specialists.getCareerImpactStatement(scoredResults),
                // Note: The "Recommended Next Step" prompt (Prompt 5) is a composite
                // and is best generated on the client or by a final AI call, so it's omitted here.
            ]),
            // Promise for all 8 group analyses
            specialists.getGroupAnalyses(scoredResults),
            // Promise for all 13 proprietary index analyses
            specialists.getIndexAnalyses(scoredResults)
        ]);
        
        console.log(`All parallel AI analyses completed for sales job: ${jobId}`);

        // 3. Assemble the final, structured report object
        const finalReport = {
            userInfo: userInfo || {},
            scores: scoredResults,
            analysis: {
                executiveSummary: {
                    composite: executiveAnalyses[0],
                    strengths: executiveAnalyses[1],
                    priorities: executiveAnalyses[2],
                    flags: executiveAnalyses[3],
                    impact: executiveAnalyses[4],
                },
                groups: groupAnalyses, // This will be an object like {'Market & Opportunity Sensing': 'analysis text...', ...}
                indices: indexAnalyses // This will be an object like {'Foresight-in-Action Index': 'analysis text...', ...}
            }
        };

        // 4. Store the completed report and update the job status
        salesReportJobs[jobId] = { status: 'completed', report: finalReport };
        console.log(`Sales Performance Index report COMPLETED for job: ${jobId}`);

    } catch (error) {
        console.error(`Error in background sales report generation for job ${jobId}:`, error);
        salesReportJobs[jobId] = { status: 'failed', report: null };
    }
});

// GET /api/sales/status/:jobId
router.get('/status/:jobId', (req, res) => {
    const job = salesReportJobs[req.params.jobId];
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ status: job.status, report: job.report });
});

module.exports = router;