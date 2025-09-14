// logic/mockReportData.js

const mockReportData = {
  userInfo: { name: "Rahul Reddy (Mock Data)" },
  scoredResults: {
    total_points: 125,
    percentage: 58.68,
    coreCapabilityScores: {
      'Strategic Acumen': { yourScore: 65.7, industryAverage: 81.2, topPerformerScore: 93.4 },
      'Commercial Rigor': { yourScore: 78.1, industryAverage: 80.5, topPerformerScore: 91.9 },
      'Brand Craft': { yourScore: 55.4, industryAverage: 79.8, topPerformerScore: 94.1 },
      'Execution & Leadership': { yourScore: 45.9, industryAverage: 82.1, topPerformerScore: 92.5 }
    },
    dimensionScores: {
        strategicJudgment: 60, brandCommAcumen: 55, commercialAcumen: 70, leadershipTeamOrientation: 45,
        resourceAllocationDiscipline: 68, commercialGrowthOrientation: 50, foundationsOfStrategy: 72,
        brandAndCommunicationsKnowledge: 58, analyticsKnowledge: 88
    },
    // --- THIS WAS THE MISSING PIECE ---
    pairs: [
        { qA: 1, rA: 5, qB: 2, rB: 2, pair_id: 1, pair_status: 'clarity', points_awarded: 2 },
        { qA: 3, rA: 4, qB: 4, rB: 4, pair_id: 2, pair_status: 'flexibility', points_awarded: 0 },
        { qA: 5, rA: 2, qB: 6, rB: 6, pair_id: 3, pair_status: 'clarity', points_awarded: 2 },
        { qA: 7, rA: 3, qB: 8, rB: 3, pair_id: 4, pair_status: 'flexibility', points_awarded: 0 },
        { qA: 9, rA: 6, qB: 10, rB: 1, pair_id: 5, pair_status: 'clarity', points_awarded: 2 },
        // ... (can add more mock pairs if needed for full chart testing)
    ]
  },
  executiveSummary: {
    compositeScoreText: "A score of 58.7% indicates a developing marketing capability. The candidate shows foundational knowledge in some areas but has significant opportunities for growth in strategic application and commercial decision-making to reach the level of senior marketing leaders.",
    strengthsText: "The candidate's primary strengths lie in their exceptional grasp of Analytics Knowledge and their clear judgment in certain areas of Brand & Communication. This suggests a data-driven mindset and an intuitive sense for brand messaging.",
    prioritiesText: "Key development areas include deepening the understanding of strategic frameworks and improving execution discipline. A tendency toward contradiction in leadership trade-offs indicates a need to build a more consistent management philosophy.",
    careerImpactStatement: "This profile reflects a marketer with strong analytical potential who must now build the strategic and executional layers to translate data insights into market-shaping influence."
  },
  detailedAnalysis: {
    strategicJudgment: { report: "This is a placeholder analysis for Strategic Judgment. The candidate demonstrates a balanced view but occasionally shows internal contradictions when weighing long-term brand goals against short-term performance pressures. Further development in frameworks like those from Binet & Field would build confidence and consistency." },
    // ... other detailed analysis sections
  }
};

module.exports = { mockReportData };