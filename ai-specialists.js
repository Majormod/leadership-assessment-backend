// File: ai-specialists.js

const { OpenAI } = require('openai');
const { ARENA_MAP } = require('./assessmentData.js');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CORE_EVALUATION_LOGIC = `
Your primary task is to act as a logic engine, applying a specific set of rules to a user's answers. The assessment consists of paired, opposing statements. The relationship between the user's answers to these pairs is the key to the entire evaluation.
Here are the rules you MUST follow:
1.  "Consistent Clarity": If the user strongly agrees with one statement (score 5 or 6) and strongly disagrees with its opposing statement (score 1 or 2), this reflects clear, consistent thinking and a well-defined stance.
2.  "Internal Contradiction": If the user agrees (score 5 or 6) or disagrees (score 1 or 2) with BOTH opposing statements, this signals an internal contradiction or a lack of self-awareness.
3.  "Situational Flexibility": If the user's answers are in the mid-range (3 or 4 for both), it indicates flexibility or a lack of a strong conviction.
`;

const generatePowerQuadrant = async (answers) => {
    const answersString = JSON.stringify(answers, null, 2);
    const systemPrompt = `${CORE_EVALUATION_LOGIC}

Now, apply these rules to the following set of user answers. Your specific task is to identify the user's four clearest leadership strengths by finding patterns of "Consistent Clarity". Ensure each score is a number out of 10, not exceeding 6.9.

Based ONLY on this rule-based analysis, generate the "Power Quadrant™" section. You MUST format your response as a single JSON object.
{
  "powerQuadrant": {
    "title": "The Power Quadrant™", "description": "Your four standout traits that anchor your leadership presence...",
    "strengths": [
      { "trait": "Strength 1", "score": 6.8, "analysis": "<250-300 word analysis>" },
      { "trait": "Strength 2", "score": 6.5, "analysis": "<250-300 word analysis>" },
      { "trait": "Strength 3", "score": 6.2, "analysis": "<250-300 word analysis>" },
      { "trait": "Strength 4", "score": 6.0, "analysis": "<250-300 word analysis>" }
    ]
  }
}`;
    try {
        console.log("Requesting LOGIC-BASED Power Quadrant from AI...");
        const response = await openai.chat.completions.create({ model: "gpt-4-turbo", response_format: { type: "json_object" }, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: `Apply the rules to these answers: ${answersString}` }], max_tokens: 2048, temperature: 0.5 });
        const reportSection = JSON.parse(response.choices[0].message.content);
        console.log("Successfully received LOGIC-BASED Power Quadrant.");
        return reportSection.powerQuadrant;
    } catch (error) {
        console.error("Error generating Power Quadrant:", error);
        return { error: true, message: "Failed to generate Power Quadrant." };
    }
};

const generateBreakthroughZone = async (answers) => {
    const answersString = JSON.stringify(answers, null, 2);
    const systemPrompt = `${CORE_EVALUATION_LOGIC}

Now, apply these rules to the user's answers to identify their four clearest areas for development. Find patterns of "Internal Contradiction" and "Situational Flexibility". Ensure each score is a number out of 10, not exceeding 4.9.

Based ONLY on this rule-based analysis, generate "The Breakthrough Zone™" section. You MUST format your response as a single JSON object.
{
  "breakthroughZone": {
    "title": "The Breakthrough Zone™", "description": "The four areas where focused growth can unlock real transformation...",
    "developmentAreas": [
      { "trait": "Development Area 1", "score": 4.8, "analysis": "<250-300 word analysis>" },
      { "trait": "Development Area 2", "score": 4.5, "analysis": "<250-300 word analysis>" },
      { "trait": "Development Area 3", "score": 4.2, "analysis": "<250-300 word analysis>" },
      { "trait": "Development Area 4", "score": 4.0, "analysis": "<250-300 word analysis>" }
    ]
  }
}`;
    try {
        console.log("Requesting LOGIC-BASED Breakthrough Zone from AI...");
        const response = await openai.chat.completions.create({ model: "gpt-4-turbo", response_format: { type: "json_object" }, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: `Apply the rules to these answers: ${answersString}` }], max_tokens: 2048, temperature: 0.5 });
        const reportSection = JSON.parse(response.choices[0].message.content);
        console.log("Successfully received LOGIC-BASED Breakthrough Zone.");
        return reportSection.breakthroughZone;
    } catch (error) {
        console.error("Error generating Breakthrough Zone:", error);
        return { error: true, message: "Failed to generate Breakthrough Zone." };
    }
};

const generateArenaReport = async (answers, arena) => {
    const relevantQuestionIds = arena.subTradeOffs.flatMap(dim => dim.questions);
    const relevantAnswers = {};
    relevantQuestionIds.forEach(id => {
        if (answers[id]) { relevantAnswers[id] = answers[id]; }
    });

    const systemPrompt = `You are a world-class executive coach writing a personalized analysis for a senior leader.

    ## YOUR INTERNAL THOUGHT PROCESS (DO NOT MENTION THIS IN THE REPORT):
    First, you will act as a logic engine. You will be given a user's answers and a set of rules. Your first step is to silently and internally apply these rules to the user's answers to find patterns of 'Consistent Clarity', 'Internal Contradiction', or 'Situational Flexibility'. This logical analysis will form the basis of your written report, but you will not mention the rules or the process directly.

    THE RULES FOR YOUR INTERNAL ANALYSIS:
    ${CORE_EVALUATION_LOGIC}

    THE USER'S ANSWERS FOR THIS SECTION:
    ${JSON.stringify(relevantAnswers, null, 2)}
    
    THE DIMENSIONS FOR THIS ARENA:
    ${JSON.stringify(arena.subTradeOffs.map(d => d.name))}

    ## YOUR WRITING TASK:
    Based on your analysis, write a detailed, 500-word inference for the Trade-off Arena: "${arena.arenaName}: ${arena.description}".

    You MUST follow these writing rules:
    1.  **Persona**: Write as a trusted, expert coach.
    2.  **Audience**: Speak DIRECTLY to the leader ("you", "your"). DO NOT use "the user" or "the candidate".
    3.  **Be Specific**: You MUST explicitly reference and discuss the specific 'Trade-off Dimensions' for this arena (e.g., 'People Development vs. Business Results', 'Innovation vs. Stability'). Connect your findings about the leader's patterns directly to these dimensions.
    4.  **No Technical Jargon**: DO NOT mention statement numbers, scores, or the internal terms "Consistent Clarity", "Internal Contradiction", or "Situational Flexibility". Instead, DESCRIBE the meaning of these patterns in a natural narrative.
    5.  **Format**: Your entire response MUST be a single JSON object.

    The JSON object must have the following structure:
    {
      "arenaName": "${arena.arenaName}",
      "analysis": "<Your 500-word, expertly written analysis, referencing the specific dimensions, goes here.>"
    }`;

    try {
        console.log(`Requesting analysis for Arena: ${arena.arenaName}...`);
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            response_format: { type: "json_object" },
            messages: [{ "role": "system", content: systemPrompt }],
            max_tokens: 1024,
            temperature: 0.5,
        });
        const reportSection = JSON.parse(response.choices[0].message.content);
        console.log(`Successfully received analysis for Arena: ${arena.arenaName}.`);
        return { ...arena, ...reportSection };
    } catch (error) {
        console.error(`Error generating report for Arena: ${arena.arenaName}:`, error);
        return { ...arena, analysis: "An error occurred while generating this section." };
    }
};

const generateArchetype = async (answers) => {
    const answersString = JSON.stringify(answers, null, 2);
    const systemPrompt = `You are an expert leadership analyst. Your task is to determine a leader's single, primary archetype from a provided list based on their answer patterns.

    ## YOUR INTERNAL THOUGHT PROCESS:
    First, silently apply the following rules to the user's complete set of answers to understand their core tendencies.
    THE RULES FOR YOUR INTERNAL ANALYSIS:
    ${CORE_EVALUATION_LOGIC}

    THE 20 POSSIBLE ARCHETYPES:
    - The Visionary, The Strategist, The Operator, The Builder, The Innovator, The Coach, The Connector, The Challenger, The Diplomat, The Guardian, The Catalyst, The Servant, The Disruptor, The Pioneer, The Integrator, The Architect, The Storyteller, The Reformer, The Protector, The Rainmaker.

    ## YOUR WRITING TASK:
    Based on your analysis, select the ONE archetype from the list that best represents the leader's dominant style. Then, write a 500-word analysis explaining WHY that archetype is a fit, citing their patterns of clarity and contradiction.
    You MUST format your response as a single JSON object.
    {
      "leadershipArchetype": {
        "title": "Your Primary Leadership Archetype",
        "archetype": "<The name of the single best-fit archetype you selected>",
        "analysis": "<Your 500-word, expertly written analysis goes here.>"
      }
    }`;
    try {
        console.log("Requesting LOGIC-BASED Archetype from AI...");
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            response_format: { type: "json_object" },
            messages: [{ "role": "system", content: systemPrompt }],
            max_tokens: 1024,
            temperature: 0.5,
        });
        const reportSection = JSON.parse(response.choices[0].message.content);
        console.log("Successfully received LOGIC-BASED Archetype.");
        return reportSection.leadershipArchetype;
    } catch (error) {
        console.error("Error generating Archetype:", error);
        return { error: true, message: "Failed to generate Archetype." };
    }
};

const generateExecutiveSummary = async (fullReportObject) => {
    const reportContext = JSON.stringify(fullReportObject, null, 2);
    const systemPrompt = `You are a world-class leadership analyst writing the final executive summary for a completed leadership report. You will be given a JSON object containing the full report's detailed analysis.

    ## YOUR TASK:
    Synthesize the key findings from the entire report provided. You MUST write a concise, insightful, and impactful 3-4 sentence summary. This summary should highlight the leader's core tension and their standout archetype.
    
    ## WRITING RULES:
    1.  Speak DIRECTLY to the leader ("Your report reveals...").
    2.  Your entire response MUST be a single JSON object with one key.
    {
      "executiveSummary": "<Your 3-4 sentence summary goes here.>"
    }`;
    try {
        console.log("Requesting Executive Summary from AI...");
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            response_format: { type: "json_object" },
            messages: [
                { "role": "system", content: systemPrompt },
                { "role": "user", content: `Generate the executive summary based on this full report: ${reportContext}` }
            ],
            max_tokens: 512,
            temperature: 0.6,
        });
        const summarySection = JSON.parse(response.choices[0].message.content);
        console.log("Successfully received Executive Summary.");
        return summarySection.executiveSummary;
    } catch (error) {
        console.error("Error generating Executive Summary:", error);
        return "An error occurred while generating the executive summary.";
    }
};

module.exports = {
    generatePowerQuadrant,
    generateBreakthroughZone,
    generateArenaReport,
    generateArchetype,
    generateExecutiveSummary,
};