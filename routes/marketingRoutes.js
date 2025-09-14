// routes/marketingRoutes.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { marketingQuestions } = require('../data/marketing-assessment-data.js');
const { marketingAnswerKey } = require('../data/marketing-answer-key.js');

// Import all specialist functions
const {
  calculateScores,
  generateExecutiveSummary,
  generateStrategicJudgmentReport,
  generateBrandCommAcumenReport,
  generateCommercialAcumenReport,
  generateLeadershipTeamOrientationReport,
  generateResourceAllocationDisciplineReport,
  generateCommercialGrowthOrientationReport,
  generateFoundationsOfStrategyReport,
  generateBrandAndCommunicationsKnowledgeReport,
  generatePricingAndChannelsKnowledgeReport,
  generatePaucityOfBudgetsKnowledgeReport,
  generateDigitalAndDataKnowledgeReport,
  generateGlobalAndCulturalKnowledgeReport,
  generateFutureAndThoughtLeadershipKnowledgeReport,
  generateStrategyAndPositioningApplicationReport,
  generateBrandAndCommunicationApplicationReport,
  generateCustomerAndGrowthApplicationReport,
  generateChannelsAndDistributionApplicationReport,
  generatePricingAndMonetizationApplicationReport,
  generateMarketingBudgetsApplicationReport,
  generateExecutionAndPrioritizationDisciplineReport,
  generateSelfAwarenessAndReflectionReport,
  generateCreativityAndNarrativePowerReport,
  generateAnalyticsKnowledgeReport
} = require('../logic/marketing-ai-specialists.js');

const marketingReportJobs = {};
const USE_MOCK_DATA = false; // Ensure this is false to use the live API

router.get('/questions', (req, res) => {
  try {
    res.json(marketingQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: 'Failed to fetch questions.' });
  }
});

router.post('/submit', async (req, res) => {
  const { answers, userInfo } = req.body;
  const jobId = crypto.randomUUID();
  res.status(202).json({ jobId });

  if (USE_MOCK_DATA) { /* ... mock data logic ... */ return; }

  // --- THIS IS THE LIVE API LOGIC THAT WAS MISSING ---
  try {
    console.log(`Starting Marketing Influence Quotient report generation for job: ${jobId}`);
    marketingReportJobs[jobId] = { status: 'processing', report: null };

    const scoredResults = calculateScores(answers, marketingAnswerKey);
    
// In routes/marketingRoutes.js

    console.log(`Kicking off all parallel AI analysis for job: ${jobId}`);
    const reportPieces = await Promise.all([
      // Trade-Off functions (Correctly receive both arguments)
      generateExecutiveSummary(scoredResults, answers),
      generateStrategicJudgmentReport(scoredResults, answers),
      generateBrandCommAcumenReport(scoredResults, answers),
      generateCommercialAcumenReport(scoredResults, answers),
      generateLeadershipTeamOrientationReport(scoredResults, answers),
      generateResourceAllocationDisciplineReport(scoredResults, answers),
      generateCommercialGrowthOrientationReport(scoredResults, answers),
      
      // --- CORRECTED: All MCQ functions now receive the full `scoredResults` object ---
      generateFoundationsOfStrategyReport(scoredResults),
      generateBrandAndCommunicationsKnowledgeReport(scoredResults),
      generatePricingAndChannelsKnowledgeReport(scoredResults),
      generatePaucityOfBudgetsKnowledgeReport(scoredResults),
      generateDigitalAndDataKnowledgeReport(scoredResults),
      generateGlobalAndCulturalKnowledgeReport(scoredResults),
      generateFutureAndThoughtLeadershipKnowledgeReport(scoredResults),
      generateStrategyAndPositioningApplicationReport(scoredResults),
      generateBrandAndCommunicationApplicationReport(scoredResults),
      generateCustomerAndGrowthApplicationReport(scoredResults),
      generateChannelsAndDistributionApplicationReport(scoredResults),
      generatePricingAndMonetizationApplicationReport(scoredResults),
      generateMarketingBudgetsApplicationReport(scoredResults),
      generateExecutionAndPrioritizationDisciplineReport(scoredResults),
      generateSelfAwarenessAndReflectionReport(scoredResults),
      generateCreativityAndNarrativePowerReport(scoredResults),
      generateAnalyticsKnowledgeReport(scoredResults)
    ]);
    console.log(`All parallel AI analyses completed for job: ${jobId}`);

    const finalReport = {
      userInfo: userInfo || {},
      scoredResults,
      executiveSummary: reportPieces[0],
      detailedAnalysis: {
        strategicJudgment: reportPieces[1], brandCommAcumen: reportPieces[2], commercialAcumen: reportPieces[3], leadershipTeamOrientation: reportPieces[4], resourceAllocationDiscipline: reportPieces[5], commercialGrowthOrientation: reportPieces[6],
        foundationsOfStrategy: reportPieces[7], brandAndCommunicationsKnowledge: reportPieces[8], pricingAndChannelsKnowledge: reportPieces[9], paucityOfBudgetsKnowledge: reportPieces[10], digitalAndDataKnowledge: reportPieces[11], globalAndCulturalKnowledge: reportPieces[12], futureAndThoughtLeadership: reportPieces[13],
        strategyAndPositioningApplication: reportPieces[14], brandAndCommunicationApplication: reportPieces[15], customerAndGrowthApplication: reportPieces[16], channelsAndDistributionApplication: reportPieces[17], pricingAndMonetizationApplication: reportPieces[18], marketingBudgetsApplication: reportPieces[19],
        executionAndPrioritizationDiscipline: reportPieces[20], selfAwarenessAndReflection: reportPieces[21], creativityAndNarrativePower: reportPieces[22], analyticsKnowledge: reportPieces[23]
      }
    };

    console.log("FINAL REPORT OBJECT being stored:", JSON.stringify(finalReport, null, 2));
    marketingReportJobs[jobId] = { status: 'completed', report: finalReport };
    console.log(`Marketing Influence Quotient report COMPLETED for job: ${jobId}`);

  } catch (error) {
    console.error(`Error in background marketing report generation for job ${jobId}:`, error);
    marketingReportJobs[jobId] = { status: 'failed', report: null };
  }
});

router.get('/status/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = marketingReportJobs[jobId];
  if (!job) { return res.status(404).json({ error: 'Job not found' }); }
  res.json({ status: job.status, report: job.report });
});

module.exports = router;