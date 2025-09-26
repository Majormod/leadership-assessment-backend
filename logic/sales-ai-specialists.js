const { OpenAI } = require('openai');
const answerKey = require('../data/sales-answer-key');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- MAPPINGS FROM THE SALES PERFORMANCE INDEX PDF --- ---

// Maps each of the 40 traits to its corresponding question IDs.
const questionMapping = {
    'Channel Awareness': [1, 2, 81, 82],
    'Opportunity Spotting': [3, 4, 83, 84],
    'Customer Insight Mining': [5, 6, 85, 86],
    'Local Intelligence': [7, 8, 87, 88],
    'Competitive Scanning': [9, 10, 89, 90],
    'Lead Source Agility': [11, 12, 91, 92],
    'Activation Skills': [13, 14, 93, 94],
    'Customer Approachability': [15, 16, 95, 96],
    'Referral/Network Use': [17, 18, 97, 98],
    'Consistent Hustle': [19, 20, 99, 100],
    'Competitive Intelligence': [21, 22, 101, 102],
    'Counter-Pitching Skill': [23, 24, 103, 104],
    'Share Defence': [25, 26, 105, 106],
    'Opportunity Conversion': [27, 28, 107, 108],
    'Positive Differentiation': [29, 30, 109, 110],
    'Needs Discovery': [31, 32, 111, 112],
    'Value Presentation': [33, 34, 113, 114],
    'Objection Handling': [35, 36, 115, 116],
    'Closing Skill': [37, 38, 117, 118],
    'Pitch Adaptability': [39, 40, 119, 120],
    'Price Discipline': [41, 42, 121, 122],
    'Deal Structuring': [43, 44, 123, 124],
    'Win-Win Thinking': [45, 46, 125, 126],
    'Promotion Usage': [47, 48, 127, 128],
    'Risk Management': [49, 50, 129, 130],
    'Distributor Engagement': [51, 52, 131, 132],
    'Retailer Connect': [53, 54, 133, 134],
    'Customer Follow-up': [55, 56, 135, 136],
    'Influence Building': [57, 58, 137, 138],
    'Conflict Resolution': [59, 60, 139, 140],
    'Coverage Discipline': [61, 62, 141, 142],
    'Pipeline Hygiene': [63, 64, 143, 144],
    'Time & Route Planning': [65, 66, 145, 146],
    'Learning Agility': [67, 68, 147, 148],
    'Resilience & Energy': [69, 70, 149, 150],
    'Goal Setting & Alignment': [71, 72, 151, 152],
    'Coaching & Development': [73, 74, 153, 154],
    'Motivation & Morale': [75, 76, 155, 156],
    'Performance Management': [77, 78, 157, 158],
    'Collaboration & Cohesion': [79, 80, 159, 160],
};

// Maps each of the 8 main groups to their constituent traits.
const groupMapping = {
    'Market & Opportunity Sensing': ['Channel Awareness', 'Opportunity Spotting', 'Customer Insight Mining', 'Local Intelligence', 'Competitive Scanning'],
    'Prospecting & Demand Creation': ['Lead Source Agility', 'Activation Skills', 'Customer Approachability', 'Referral/Network Use', 'Consistent Hustle'],
    'Competition Handling & Market Positioning': ['Competitive Intelligence', 'Counter-Pitching Skill', 'Share Defence', 'Opportunity Conversion', 'Positive Differentiation'],
    'Customer Engagement & Conversion': ['Needs Discovery', 'Value Presentation', 'Objection Handling', 'Closing Skill', 'Pitch Adaptability'],
    'Negotiation & Commercial Acumen': ['Price Discipline', 'Deal Structuring', 'Win-Win Thinking', 'Promotion Usage', 'Risk Management'],
    'Relationship & Channel Management': ['Distributor Engagement', 'Retailer Connect', 'Customer Follow-up', 'Influence Building', 'Conflict Resolution'],
    'Execution Discipline & Personal Effectiveness': ['Coverage Discipline', 'Pipeline Hygiene', 'Time & Route Planning', 'Learning Agility', 'Resilience & Energy'],
    'Team Management': ['Goal Setting & Alignment', 'Coaching & Development', 'Motivation & Morale', 'Performance Management', 'Collaboration & Cohesion'],
};

/**
 * ## SCORING LOGIC ##
 * This function is pure JavaScript and calculates all scores based on the new, simpler rules.
 */
const calculateScores = (userAnswers) => {
    console.log("Calculating scores for Sales Performance Index...");

    const scores = {
        traits: {},
        groups: {},
        indices: {},
        totalRaw: 0,
        compositeScore: 0,
    };

    // 1. Calculate scores for each of the 40 traits
    for (const trait in questionMapping) {
        let correctAnswers = 0;
        const questionsForTrait = questionMapping[trait];
        questionsForTrait.forEach(qId => {
            if (userAnswers[qId] && userAnswers[qId] === answerKey[qId]) {
                correctAnswers++;
            }
        });
        // Each trait has 4 questions worth 5 marks each (total 20).
        // The final score is scaled to 100 as per the PDF's prompt instructions.
        scores.traits[trait] = (correctAnswers * 5 / 20) * 100;
    }

    // 2. Aggregate trait scores into the 8 main groups
    for (const group in groupMapping) {
        let groupTotalScore = 0;
        const traitsForGroup = groupMapping[group];
        traitsForGroup.forEach(trait => {
            groupTotalScore += scores.traits[trait];
        });
        // Each group score is the average of its 5 trait scores.
        scores.groups[group] = groupTotalScore / traitsForGroup.length;
    }
    
    // 3. Calculate the overall composite score
    let totalCorrect = 0;
    for (let i = 1; i <= 160; i++) {
        if (userAnswers[i] && userAnswers[i] === answerKey[i]) {
            totalCorrect++;
        }
    }
    scores.totalRaw = totalCorrect * 5;
    scores.compositeScore = (totalCorrect / 160) * 100;

    // 4. Calculate all 13 proprietary indices based on trait scores
    scores.indices['Foresight-in-Action Index'] = (scores.traits['Opportunity Spotting'] + scores.traits['Local Intelligence']) / 2;
    scores.indices['Funnel Resilience Score'] = (scores.traits['Lead Source Agility'] + scores.traits['Referral/Network Use']) / 2;
    scores.indices['Market Combat Quotient'] = (scores.traits['Competitive Intelligence'] + scores.traits['Counter-Pitching Skill']) / 2;
    scores.indices['Execution Integrity Index'] = (scores.traits['Pipeline Hygiene'] + scores.traits['Coverage Discipline']) / 2;
    scores.indices['Solution Resonance Score'] = (scores.traits['Needs Discovery'] + scores.traits['Value Presentation']) / 2;
    scores.indices['Sustained-Funnel Engine'] = (scores.traits['Lead Source Agility'] + scores.traits['Consistent Hustle'] + scores.traits['Pipeline Hygiene']) / 3;
    scores.indices['Competitive Mobility Index'] = (scores.traits['Competitive Intelligence'] + scores.traits['Share Defence'] + scores.traits['Opportunity Conversion']) / 3;
    scores.indices['Commercial Balance Triad'] = (scores.traits['Price Discipline'] + scores.traits['Deal Structuring'] + scores.traits['Win-Win Thinking']) / 3;
    scores.indices['Channel Advocacy Triad'] = (scores.traits['Distributor Engagement'] + scores.traits['Retailer Connect'] + scores.traits['Influence Building']) / 3;
    scores.indices['Conversion Mastery'] = (scores.traits['Needs Discovery'] + scores.traits['Objection Handling'] + scores.traits['Closing Skill']) / 3;
    scores.indices['Scaling-Readiness index'] = (scores.traits['Learning Agility'] + scores.traits['Resilience & Energy'] + scores.traits['Coaching & Development'] + scores.traits['Motivation & Morale']) / 4;
    scores.indices['Territory Execution Score'] = (scores.traits['Coverage Discipline'] + scores.traits['Time & Route Planning'] + scores.traits['Pipeline Hygiene'] + scores.traits['Consistent Hustle']) / 4;
    scores.indices['Market Differentiation Engine'] = (scores.traits['Customer Insight Mining'] + scores.traits['Local Intelligence'] + scores.traits['Competitive Scanning'] + scores.traits['Positive Differentiation']) / 4;
    scores.indices['Team Performance Engine'] = (scores.traits['Performance Management'] + scores.traits['Collaboration & Cohesion'] + scores.traits['Goal Setting & Alignment'] + scores.traits['Coaching & Development']) / 4;

    console.log("Score calculation complete.");
    return scores;
};


/**
 * Helper function to call OpenAI API
 */
const callOpenAI = async (systemPrompt, userContent, responseFormat = null) => {
    try {
        const messages = [{ role: "system", content: systemPrompt }, { role: "user", content: userContent }];
        const params = { model: "gpt-4-turbo", messages, temperature: 0.5, max_tokens: 2000 };
        if (responseFormat) {
            params.response_format = responseFormat;
        }
        const completion = await openai.chat.completions.create(params);
        
        // Return the raw content, parsing will be handled by the caller
        return completion.choices[0].message.content;

    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw error;
    }
};


// --- AI SPECIALIST FUNCTIONS (1 per Prompt) ---

// Prompt 1: Composite Score
const getCompositeScoreAnalysis = async (scores) => {
    const scaledScore = scores.compositeScore;
    let bandKey = '';
    let bandDescription = '';

    if (scaledScore >= 80) {
        bandKey = "80-100: Market-Ready Leader";
        bandDescription = "You demonstrate outstanding sales capability across the spectrum from sensing opportunities to executing with discipline and leading others. This makes you highly competitive against peers, ready for expanded responsibility, and a strong candidate for leadership-track roles.";
    } else if (scaledScore >= 60) {
        bandKey = "60-79: Consistent Performer";
        bandDescription = "You show strong, balanced capability across most dimensions of sales performance. While you deliver reliably, selective gaps in agility, consistency, or leadership readiness may limit breakthrough impact. With focused development, you can move toward market-leading performance.";
    } else if (scaledScore >= 40) {
        bandKey = "40-59: Capable Contributor";
        bandDescription = "Your performance indicates solid foundational sales skills, but with uneven depth across key areas. You may excel in certain dimensions but lack consistency across the full cycle. Without targeted improvement, your impact may remain situational rather than scalable.";
    } else {
        bandKey = "0-39: Development Priority";
        bandDescription = "Results suggest major gaps across multiple dimensions of sales capability. Current performance is below benchmark for peer groups and risks limiting career growth. Intensive development is required to strengthen core skills and build long-term credibility in sales roles.";
    }

    const systemPrompt = `You are an expert analyst. Based on the user's score and performance band, your task is to provide the corresponding inference exactly as written.`;
    const userContent = `The participant's scaled score is ${scaledScore.toFixed(1)}. The assigned performance band is "${bandKey}". Provide the inference for this band.`;
    
    // This is a simple rule-based prompt, but we run it through the LLM for consistency of the architecture.
    // In a more advanced version, the LLM could add nuance. For now, it will just return the description.
    // return callOpenAI(systemPrompt, userContent); 
    return bandDescription; // Direct return is more efficient for this rule-based task.
};

// Prompt 2: Top Three Strengths
const getStrengthsAnalysis = async (scores) => {
    const groupScores = Object.entries(scores.groups).sort((a, b) => b[1] - a[1]);
    const topThree = groupScores.slice(0, 3);

    const systemPrompt = `Evaluate the participant's Top Three Strengths. For each strength, provide commentary on why it matters for sales performance, how it can be leveraged, and its implications for career trajectory. The commentary for each strength must be a minimum of 40 words, highly professional, and reflect strategic depth.`;
    const userContent = `
        The participant's top three strengths are:
        1. ${topThree[0][0]} (Score: ${topThree[0][1].toFixed(1)})
        2. ${topThree[1][0]} (Score: ${topThree[1][1].toFixed(1)})
        3. ${topThree[2][0]} (Score: ${topThree[2][1].toFixed(1)})
        
        Generate the analysis.
    `;
    return callOpenAI(systemPrompt, userContent);
};

// Prompt 3: Top Three Development Priorities
const getDevelopmentPrioritiesAnalysis = async (scores) => {
    const groupScores = Object.entries(scores.groups).sort((a, b) => b[1] - a[1]);
    const priorities = groupScores.slice(3, 6); // Ranks 4th, 5th, 6th

    const systemPrompt = `Evaluate the participant's Top Three Development Priorities. For each priority, explain why improvement matters, the risks if unaddressed, and a clear development path. The commentary for each must be a minimum of 40 words, professional, and diagnostic.`;
    const userContent = `
        The participant's top three development priorities are:
        1. ${priorities[0][0]} (Score: ${priorities[0][1].toFixed(1)})
        2. ${priorities[1][0]} (Score: ${priorities[1][1].toFixed(1)})
        3. ${priorities[2][0]} (Score: ${priorities[2][1].toFixed(1)})

        Generate the analysis.
    `;
    return callOpenAI(systemPrompt, userContent);
};

// Prompt 4: Immediate Attention Flags
const getAttentionFlagsAnalysis = async (scores) => {
    const groupScores = Object.entries(scores.groups).sort((a, b) => b[1] - a[1]);
    // Per the PDF, this includes ranks 5, 6, 7, 8. Note the overlap with Development Priorities.
    const flags = groupScores.slice(4, 8); 

    const systemPrompt = `Evaluate the participant's Immediate Attention Flags. For each flag, describe why underperformance is a critical risk, the immediate business impact, and urgent corrective actions. The commentary for each must be a minimum of 40 words, diagnostic, and urgent in tone.`;
    const userContent = `
        The participant's immediate attention flags are:
        1. ${flags[0][0]} (Score: ${flags[0][1].toFixed(1)})
        2. ${flags[1][0]} (Score: ${flags[1][1].toFixed(1)})
        3. ${flags[2][0]} (Score: ${flags[2][1].toFixed(1)})
        4. ${flags[3][0]} (Score: ${flags[3][1].toFixed(1)})

        Generate the analysis.
    `;
    return callOpenAI(systemPrompt, userContent);
};

// Prompt 6: Career Impact Statement (Prompt 5 is a composition of others)
const getCareerImpactStatement = async (scores) => {
    const systemPrompt = `Generate a single, forward-looking Career Impact Statement (25-40 words). It must connect the participant's strengths to sales outcomes and indicate development needs critical for progression. The tone must be sharp, professional, and aspirational.`;
    const userContent = `
        The participant's scores are:
        - Composite Score: ${scores.compositeScore.toFixed(1)}
        - All Group Scores: ${JSON.stringify(scores.groups)}
        - All Trait Scores: ${JSON.stringify(scores.traits)}

        Generate the statement.
    `;
    return callOpenAI(systemPrompt, userContent);
};


// Prompts 8-15: Analysis for each of the 8 Groups
const getGroupAnalyses = async (scores) => {
    const analyses = {};
    for (let i = 0; i < 8; i++) {
        const groupName = Object.keys(groupMapping)[i];
        const score = scores.groups[groupName];
        let band = '';
        if (score >= 80) band = "Band 1 (e.g., Strategic Sensor)";
        else if (score >= 60) band = "Band 2 (e.g., Pragmatic Spotter)";
        else if (score >= 40) band = "Band 3 (e.g., Reactive Adapter)";
        else band = "Band 4 (e.g., Blind Spot Risk)";

        const systemPrompt = `You will be given a sales capability group, the participant's score, and their performance band. Your task is to provide the detailed, pre-written commentary for that specific band from the 'Sales Performance Index' source document.`;
        const userContent = `Group: "${groupName}". Score: ${score.toFixed(1)}. Band: "${band}". Provide the commentary for this band.`;
        
        analyses[groupName] = await callOpenAI(systemPrompt, userContent);
    }
    return analyses;
};

// Prompts 16-28: Analysis for each of the 13 (+1) Indices
// Note: The PDF has 14 indices listed in the report section, but only 13 prompts. I will implement the 13 with prompts.
const getIndexAnalyses = async (scores) => {
    const analyses = {};
    const indexPrompts = [
        'Foresight-in-Action Index', 'Market Combat Quotient', 'Execution Integrity Index',
        'Solution Resonance Score', 'Sustained-Funnel Engine', 'Competitive Mobility Index',
        'Commercial Balance Triad', 'Channel Advocacy Triad', 'Conversion Mastery',
        'Scaling-Readiness index', 'Territory Execution Score', 'Market Differentiation Engine',
        'Team Performance Engine'
    ];

    for (const indexName of indexPrompts) {
        const score = scores.indices[indexName];
        let band = '';
        if (score >= 80) band = "Band 1 (e.g., Proactive Navigator)";
        else if (score >= 60) band = "Band 2 (e.g., Balanced Scanner)";
        else if (score >= 40) band = "Band 3 (e.g., Reactive Observer)";
        else band = "Band 4 (e.g., Signal Blind Spot)";

        const systemPrompt = `You will be given a proprietary sales index, the participant's score, and their performance band. Your task is to provide the detailed, pre-written commentary for that specific band from the 'Sales Performance Index' source document.`;
        const userContent = `Index: "${indexName}". Score: ${score.toFixed(1)}. Band: "${band}". Provide the commentary for this band.`;
        
        analyses[indexName] = await callOpenAI(systemPrompt, userContent);
    }
    return analyses;
};


// --- EXPORT ALL FUNCTIONS ---
module.exports = {
    calculateScores,
    getCompositeScoreAnalysis,
    getStrengthsAnalysis,
    getDevelopmentPrioritiesAnalysis,
    getAttentionFlagsAnalysis,
    getCareerImpactStatement,
    getGroupAnalyses, // This will return an object with all 8 group analyses
    getIndexAnalyses, // This will return an object with all 13 index analyses
};