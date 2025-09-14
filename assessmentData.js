// backend/assessmentData.js

const tradeOffArenas = {
    growthCraft: {
        arenaName: "GrowthCraft™",
        description: "Balancing People and Performance",
        subTradeOffs: [
            { name: "People Development vs. Business Results", questions: [1, 2] },
            { name: "Empowering Others vs. Protecting from Failure", questions: [35, 36] },
            { name: "Empowering Stars vs. Building the Whole Team", questions: [41, 42] },
            { name: "Promoting Internal Talent vs. Bringing in External Freshness", questions: [61, 62] },
            { name: "Work-Life Balance for Team vs. Business Demands", questions: [27, 28] }
        ]
    },
    edgeScape: {
        arenaName: "EdgeScape™",
        description: "Risk, Innovation, and Resilience",
        subTradeOffs: [
            { name: "Innovation vs. Stability", questions: [3, 4] },
            { name: "Risk-taking vs. Risk Mitigation", questions: [13, 14] },
            { name: "Persistence vs. Knowing When to Pivot", questions: [49, 50] },
            { name: "Driving Change vs. Respecting Legacy", questions: [55, 56] },
            { name: "Protecting Reputation vs. Taking Bold Stands", questions: [33, 34] }
        ]
    },
    tempoMastery: {
        arenaName: "TempoMastery™",
        description: "Speed, Focus, and Execution Precision",
        subTradeOffs: [
            { name: "Speed of Execution vs. Thoughtful Planning", questions: [11, 12] },
            { name: "Short-term Wins vs. Long-term Vision", questions: [9, 10] },
            { name: "Competing Priorities vs. Singular Focus", questions: [65, 66] },
            { name: "Fast Hiring vs. Careful Selection", questions: [73, 74] },
            { name: "Sticking to Commitments vs. Adjusting with New Information", questions: [39, 40] }
        ]
    },
    powerFrame: {
        arenaName: "PowerFrame™",
        description: "Authority, Alignment, and Delegation",
        subTradeOffs: [
            { name: "Delegation vs. Direct Control", questions: [7, 8] },
            { name: "Centralized Direction vs. Shared Leadership", questions: [57, 58] },
            { name: "Being Hands-on vs. Creating Autonomy", questions: [69, 70] },
            { name: "Taking Responsibility vs. Sharing Responsibility", questions: [67, 68] },
            { name: "Advocating for My Team vs. Aligning with Senior Leadership", questions: [51, 52] }
        ]
    },
    cultureForge: {
        arenaName: "CultureForge™",
        description: "Shaping Values as You Scale",
        subTradeOffs: [
            { name: "Protecting Culture vs. Scaling Rapidly", questions: [81, 82] },
            { name: "Transparency vs. Discretion", questions: [5, 6] },
            { name: "Protecting Reputation vs. Taking Bold Stands", questions: [33, 34] },
            { name: "Conflict Avoidance vs. Conflict Engagement", questions: [75, 76] },
            { name: "Rewarding Loyalty vs. Rewarding Results", questions: [71, 72] }
        ]
    },
    clarityWorks: {
        arenaName: "ClarityWorks™",
        description: "Thought, Communication, and Decision Style",
        subTradeOffs: [
            { name: "Data-driven Decisions vs. Gut Feel / Intuition", questions: [29, 30] },
            { name: "Big-picture Thinking vs. Operational Detail Focus", questions: [47, 48] },
            { name: "Consistency of Communication vs. Tailoring to Audience", questions: [77, 78] },
            { name: "Encouraging Debate vs. Driving Alignment Quickly", questions: [79, 80] },
            { name: "Optimism vs. Realism in Communication", questions: [63, 64] }
        ]
    },
    flexiForce: {
        arenaName: "FlexiForce™",
        description: "Standards, Adaptability, and Fairness",
        subTradeOffs: [
            { name: "Consistency vs. Flexibility in Policies", questions: [19, 20] },
            { name: "Firm Standards vs. Adaptive Expectations", questions: [53, 54] },
            { name: "Global Standards vs. Local Adaptation", questions: [25, 26] },
            { name: "Maintaining Morale vs. Driving Accountability", questions: [37, 38] },
            { name: "Cost Efficiency vs. Value Creation Investments", questions: [21, 22] }
        ]
    },
    presencePulse: {
        arenaName: "Presence Pulse™",
        description: "Emotional and Personal Leadership Stance",
        subTradeOffs: [
            { name: "Emotional Authenticity vs. Emotional Control", questions: [43, 44, 45, 46] },
            { name: "Being Accessible vs. Protecting Focus Time", questions: [59, 60] },
            { name: "Inclusiveness in Decisions vs. Decisiveness under Pressure", questions: [17, 18] },
            { name: "Empathy for Individuals vs. Fairness to the Group", questions: [23, 24] },
            { name: "Process Discipline vs. Creative Freedom", questions: [31, 32] }
        ]
    }
};

const personalTradeOffs = {
    coreForce: {
        arenaName: "CoreForce™",
        description: "The Engine of Drive and Discipline",
        subTradeOffs: [
            { name: "Confidence vs. Humility", questions: [83, 84] },
            { name: "Ambition vs. Contentment", questions: [85, 86] },
            { name: "Inner Calm vs. Inner Drive", questions: [115, 116] },
            { name: "Self-discipline vs. Spontaneity", questions: [111, 112] },
            { name: "Patience vs. Sense of Urgency", questions: [93, 94] }
        ]
    },
    flexiMind: {
        arenaName: "FlexiMind™",
        description: "The Dance of Thinking and Acting",
        subTradeOffs: [
            { name: "Analytical Thinking vs. Intuitive Judgment", questions: [89, 90] },
            { name: "Action Orientation vs. Reflection Orientation", questions: [99, 100] },
            { name: "Perfectionism vs. Pragmatism", questions: [101, 102] },
            { name: "Curiosity vs. Decisiveness", questions: [107, 108] },
            { name: "Discipline vs. Flexibility", questions: [91, 92] }
        ]
    },
    resilientSelf: {
        arenaName: "ResilientSelf™",
        description: "The Strength of Inner Response",
        subTradeOffs: [
            { name: "Resilience vs. Sensitivity to Setbacks", questions: [109, 110] },
            { name: "Self-criticism vs. Self-compassion", questions: [117, 118] },
            { name: "Self-reliance vs. Seeking Support", questions: [95, 96] },
            { name: "Optimism vs. Realism", questions: [63, 64] },
            { name: "Focus on Strengths vs. Focus on Weaknesses", questions: [97, 98] }
        ]
    },
    horizonSense: {
        arenaName: "HorizonSense™",
        description: "The Balance of Time and Values",
        subTradeOffs: [
            { name: "Long-term Vision vs. Short-term Results Drive", questions: [105, 106] },
            { name: "Future-focus vs. Present-mindfulness", questions: [121, 122] },
            { name: "Consistency vs. Adaptability of Values", questions: [103, 104] },
            { name: "Risk-taking vs. Caution", questions: [87, 88] },
            { name: "Love of Mastery vs. Love of Variety", questions: [119, 120] }
        ]
    }
};

module.exports = {
    tradeOffArenas,
    personalTradeOffs
};