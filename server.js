// server.js - FINAL COMPLETE VERSION

const http = require('http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const crypto = require('crypto');
const OpenAI = require('openai');

const app = express();
app.set('trust proxy', 1);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const port = 3001;
const reportJobs = {};
const USE_MOCK_DATA = true; // Set to 'true' for free, instant testing. Set to 'false' for real AI generation.


app.use(cors({ origin: ['http://localhost:3000', 'https://main.d21put265zxojq.amplifyapp.com'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const competencyMap = {
    1: "Emotional Intelligence", 2: "Strategic Judgment", 3: "Conflict Resolution & Influence", 4: "Accountability & Ownership", 5: "Resilience & Crisis Leadership", 6: "Stakeholder Alignment", 7: "Accountability & Ownership", 8: "Customer-Centricity", 9: "Team Empowerment & Inclusion", 10: "Self-Regulation & Composure", 11: "Team Empowerment & Inclusion", 12: "Ethical & Values-Based Leadership", 13: "Conflict Resolution & Influence", 14: "Innovation Orientation", 15: "Resilience & Crisis Leadership", 16: "Team Empowerment & Inclusion", 17: "Stakeholder Alignment", 18: "Ethical & Values-Based Leadership", 19: "Communication Clarity", 20: "Conflict Resolution & Influence",
    21: "Courage & Constructive Dissent", 22: "Conflict Resolution & Influence", 23: "Collaboration & Cross-Functional Orientation", 24: "Stakeholder Alignment", 25: "Conflict Resolution & Influence", 26: "Innovation Orientation", 27: "Ethical & Values-Based Leadership", 28: "Accountability & Ownership", 29: "Change Leadership", 30: "Customer-Centricity", 31: "Resilience & Crisis Leadership", 32: "Change Leadership", 33: "Team Empowerment & Inclusion", 34: "Resilience & Crisis Leadership", 35: "Decision-Making Under Ambiguity", 36: "Agility & Learning Mindset", 37: "Accountability & Ownership", 38: "Courage & Constructive Dissent", 39: "Ethical & Values-Based Leadership", 40: "Innovation Orientation",
    41: "Self-Regulation & Composure", 42: "Courage & Constructive Dissent", 43: "Self-Regulation & Composure", 44: "Team Empowerment & Inclusion", 45: "Ethical & Values-Based Leadership", 46: "Customer-Centricity", 47: "Accountability & Ownership", 48: "Courage & Constructive Dissent", 49: "Agility & Learning Mindset", 50: "Team Empowerment & Inclusion", 51: "Conflict Resolution & Influence", 52: "Accountability & Ownership", 53: "Agility & Learning Mindset", 54: "Resilience & Crisis Leadership", 55: "Stakeholder Alignment", 56: "Accountability & Ownership", 57: "Stakeholder Alignment", 58: "Agility & Learning Mindset", 59: "Ethical & Values-Based Leadership", 60: "Emotional Intelligence",
    61: "Conflict Resolution & Influence", 62: "Strategic Judgment", 63: "Emotional Intelligence", 64: "Resilience & Crisis Leadership", 65: "Collaboration & Cross-Functional Orientation", 66: "Team Empowerment & Inclusion", 67: "Change Leadership", 68: "Ethical & Values-Based Leadership", 69: "Stakeholder Alignment", 70: "Emotional Intelligence", 71: "Team Empowerment & Inclusion", 72: "Decision-Making Under Ambiguity", 73: "Team Empowerment & Inclusion", 74: "Collaboration & Cross-Functional Orientation", 75: "Stakeholder Alignment", 76: "Resilience & Crisis Leadership", 77: "Stakeholder Alignment", 78: "Team Empowerment & Inclusion", 79: "Resilience & Crisis Leadership", 80: "Innovation Orientation",
    81: "Strategic Judgment", 82: "Decision-Making Under Ambiguity", 83: "Collaboration & Cross-Functional Orientation", 84: "Stakeholder Alignment", 85: "Strategic Judgment", 86: "Conflict Resolution & Influence", 87: "Customer-Centricity", 88: "Resilience & Crisis Leadership", 89: "Collaboration & Cross-Functional Orientation", 90: "Emotional Intelligence", 91: "Prioritization & Focus", 92: "Decision-Making Under Ambiguity", 93: "Change Leadership", 94: "Resilience & Crisis Leadership", 95: "Decision-Making Under Ambiguity", 96: "Emotional Intelligence", 97: "Accountability & Ownership", 98: "Customer-Centricity", 99: "Strategic Judgment", 100: "Strategic Judgment",
    101: "Collaboration & Cross-Functional Orientation", 102: "Change Leadership", 103: "Decision-Making Under Ambiguity", 104: "Stakeholder Alignment", 105: "Decision-Making Under Ambiguity", 106: "Resilience & Crisis Leadership", 107: "Decision-Making Under Ambiguity", 108: "Stakeholder Alignment", 109: "Strategic Judgment", 110: "Customer-Centricity", 111: "Ethical & Values-Based Leadership", 112: "Innovation Orientation", 113: "Collaboration & Cross-Functional Orientation", 114: "Accountability & Ownership", 115: "Strategic Judgment", 116: "Collaboration & Cross-Functional Orientation", 117: "Ethical & Values-Based Leadership", 118: "Accountability & Ownership", 119: "Prioritization & Focus", 120: "Emotional Intelligence",
    121: "Resilience & Crisis Leadership", 122: "Conflict Resolution & Influence", 123: "Ethical & Values-Based Leadership", 124: "Emotional Intelligence", 125: "Resilience & Crisis Leadership", 126: "Innovation Orientation", 127: "Team Empowerment & Inclusion", 128: "Prioritization & Focus", 129: "Customer-Centricity", 130: "Conflict Resolution & Influence", 131: "Strategic Judgment", 132: "Conflict Resolution & Influence", 133: "Change Leadership", 134: "Emotional Intelligence", 135: "Team Empowerment & Inclusion", 136: "Change Leadership", 137: "Ethical & Values-Based Leadership", 138: "Change Leadership", 139: "Conflict Resolution & Influence", 140: "Resilience & Crisis Leadership"
};
const caseStudyData = {
    title: "Leadership Assessment Case Study: The CodeCraft Crisis",
    background: "The air in the Pune office of CodeCraft Systems crackled with a strange mix of energy and tension. Floor-to-ceiling windows framed the monsoon-gray sky, while inside, clusters of software engineers tapped furiously at keyboards, their screens filled with lines of code and dashboards tracking customer engagement from New York to Frankfurt.",
    characters: [
        { name: "Rohan", description: "The Team Lead, who prides himself on holding the line and is feeling immense pressure from flat growth figures." },
        { name: "Aarav", description: "The genius coder, known as 'the brain behind the engine,' who believes in long-term solutions and innovation." },
        { name: "Nikhil", description: "A talented but cynical engineer, known as the 'troublemaker,' who thrives on pushing buttons and challenging the status quo." },
        { name: "Meera", description: "The Manager, skilled at defusing tense situations and focusing on people-centric solutions." },
        { name: "Rajiv", description: "The AVP of Product, trying to navigate competitive pressures and find the company's next strategic play." },
        { name: "Anika", description: "The VP of Sales, based in London, who is focused on the immediate need for sellable features to combat a drying pipeline." }
    ],
    crisis: `Rohan's voice rose above the low hum of the open-plan office. "I don't care if you have to pull an all-nighter. We can't let TechSpark beat us to that update!"\n\nAarav, the genius coder, barely looked up. "We've already optimized the module, Rohan. We're chasing diminishing returns here. What we need is..."\n\n"What we need is to ship on time," Rohan interrupted. From a nearby desk, Nikhil smirked. "Maybe Aarav can invent a time machine and send us all back to when this company still innovated," he said loudly.\n\nBefore Rohan could respond, Meera, the manager, appeared. "Rohan, can I borrow you for a minute?" In a meeting room, she said, "I know you're under pressure. But riding the team harder isn't going to make the numbers look better. Nikhil's attitude is getting worse because he's frustrated, not because he's lazy. And Aarav's ideas - maybe they're what we need."\n\nAn emergency meeting was called by Rajiv, the AVP of Product. "We're being squeezed from all sides. What's our play?" Aarav suggested pivoting toward custom enterprise solutions, leveraging the platform's flexibility. Anika, the VP of Sales, immediately countered from London, "The sales cycles are longer. We'll starve. I need something I can sell now."\n\nRohan found himself caught between the two visions. "Maybe there's a middle path," he suggested. "Could we build custom value fast for niche clients, like fintech or enhancing data privacy for Europe?"\n\nMeera noted the conflict: "It feels like Product, Sales, and Delivery are pulling in different directions. Someone's got to lead this cross-functionally. Rohan, could that be you?"\n\nRohan accepted the challenge. "I'll take it on. But I'll need everyone's support. And we need to decide fast which niche we're going after." As the meeting ended, Meera offered quiet advice: "Leadership isn't about doing it all yourself. It's about getting the best from everyone."`,
    challenges: {
        intro: "Rohan has accepted the cross-functional leadership challenge, but the path forward is filled with complex hurdles that will test his leadership abilities from every angle.",
        areas: [
            { title: "1. Strategic & Product Alignment", points: ["How can Rohan bridge the gap between Aarav's long-term innovation vision and Anika's urgent need for short-term sales wins?", "What process can be established to prioritize features that satisfy both market demands and the core product strategy?", "How can the team pivot to a niche strategy without alienating existing customers or destabilizing the current product?"] },
            { title: "2. Team Dynamics & Culture", points: ["What is the best way to address Nikhil's cynicism and convert his disruptive energy into constructive contributions?", "How can Rohan manage Aarav's potential frustration if his innovative ideas are constantly deferred for short-term fixes?", "How can he address team burnout and pressure while still meeting the non-negotiable deadlines and competitive threats?"] },
            { title: "3. Cross-Functional Leadership", points: ["Now that Rohan is in a cross-functional role, how can he influence peers like Anika and Rajiv without having formal authority over them?", "What communication framework can he set up to ensure Sales, Product, and Engineering are aligned on commitments and timelines?", "How does he manage expectations with senior leadership while navigating the conflicts within the teams?"] }
        ]
    },
    questions: [
        { id: 1, perspective: "Rohan's Perspective", question: "The team is feeling the pressure of tight deadlines and rising competition. What is the best way for me to set the tone as their leader?", options: [{ id: "A", text: "Acknowledge the pressure but redirect focus toward small, immediate wins that build momentum and morale." }, { id: "B", text: "Make it clear that failure isn't an option and that I expect nothing less than full commitment at any cost." }, { id: "C", text: "Schedule daily status checks and question delays aggressively to keep everyone accountable and moving faster." }, { id: "D", text: "Meet with each team member individually and ask how they're coping, adjusting expectations where needed." }, { id: "E", text: "Remind the team of past successes and encourage them to dig deep and stay the course until we meet the deadline." }, { id: "F", text: "Share openly that I'm equally stressed, so they see we're all in this together and it's normal to feel the strain." }], bestAnswer: "A" },
        // ... ALL 140 QUESTIONS ...
        { id: 140, perspective: "Candidate's Own Perspective", question: "A strategic partner fails to deliver on commitments, putting your project at risk. How do you demonstrate leadership in this crisis?", options: [{ id: "A", text: "Engage the partner constructively while developing a contingency plan." }, { id: "B", text: "Escalate immediately to leadership demanding intervention." }, { id: "C", text: "Adjust internal plans and quietly work around the issue." }, { id: "D", text: "Confront the partner firmly about the consequences." }, { id: "E", text: "Focus on short-term fixes and address root issues later." }, { id: "F", text: "Delay reaction until more information is available." }], bestAnswer: "A" }
    ]
};

// --- START: AI HELPER FUNCTIONS (FINAL VERSION) ---

async function getPowerQuadrant(analysisContext) {
    const systemPrompt = `Based on the user's assessment data, identify their top 4 leadership strengths. Return a valid JSON object with a single key "powerQuadrant" whose value is an array of 4 objects. Each object needs keys: "name" (string), "definition" (a 30-word explanation of the strength), and "score" (a number out of 10, max 6.9).`;
    try {
        const response = await openai.chat.completions.create({ model: "gpt-4-turbo", messages: [{ role: "system", content: systemPrompt }, { role: "user", content: JSON.stringify(analysisContext) }], response_format: { type: "json_object" } });
        return JSON.parse(response.choices[0].message.content);
    } catch (e) { console.error("Error in getPowerQuadrant:", e); return { powerQuadrant: [] }; }
}

async function getBreakthroughZone(analysisContext) {
    const systemPrompt = `Based on user's assessment data, identify their top 4 leadership development areas. Return a valid JSON object with a single key "breakthroughZone" whose value is an array of 4 objects. Each object needs keys: "name" (string), "definition" (a 30-word explanation of the gap), and "score" (a number out of 10, max 4.9).`;
    try {
        const response = await openai.chat.completions.create({ model: "gpt-4-turbo", messages: [{ role: "system", content: systemPrompt }, { role: "user", content: JSON.stringify(analysisContext) }], response_format: { type: "json_object" } });
        return JSON.parse(response.choices[0].message.content);
    } catch (e) { console.error("Error in getBreakthroughZone:", e); return { breakthroughZone: [] }; }
}

async function getLeadershipFacet(analysisContext, facetName, facetDefinition) {
    const systemPrompt = `Evaluate the candidate's '${facetName}'. Definition: '${facetDefinition}'. Based on user's data, return a JSON object with keys: "evaluation" (an array of 5 string bullet points, 100 words total), "strengths" (an array of 3 strings, 60 words total), and "gaps" (an array of 3 strings, 60 words total).`;
    try {
        const response = await openai.chat.completions.create({ model: "gpt-4-turbo", messages: [{ role: "system", content: systemPrompt }, { role: "user", content: JSON.stringify(analysisContext) }], response_format: { type: "json_object" } });
        return { ...JSON.parse(response.choices[0].message.content), name: facetName, definition: facetDefinition };
    } catch (e) { console.error(`Error in getLeadershipFacet for ${facetName}:`, e); return { name: facetName, definition: facetDefinition, evaluation: ["Error generating evaluation."] }; }
}

async function getExtendedFacet(analysisContext, facetData) {
    const systemPrompt = `Evaluate '${facetData.title}'. For each of the 4 sub-points (${facetData.subPoints.join(', ')}), provide a 50-word evaluation and a score out of 10. Also provide an overall average score (max ${facetData.maxScore}). Return a JSON object with keys: "averageScore", "radarChartData" (an object with a "labels" array of 4 strings and a "scores" array of 4 numbers), and "subPointEvaluations" (an array of 4 objects, each with "name", "evaluation", "score").`;
    try {
        const response = await openai.chat.completions.create({ model: "gpt-4-turbo", messages: [{ role: "system", content: systemPrompt }, { role: "user", content: JSON.stringify(analysisContext) }], response_format: { type: "json_object" } });
        const result = JSON.parse(response.choices[0].message.content);
        result.subPointEvaluations.forEach((sub, index) => { sub.definition = facetData.definitions[index]; });
        result.title = facetData.title;
        result.industryStandard = facetData.industryStandard;
        return result;
    } catch (e) { console.error(`Error in getExtendedFacet for ${facetData.title}:`, e); return { title: facetData.title, error: "Failed to generate."}; }
}

async function getDepthMap(analysisContext, mapData) {
    const systemPrompt = `Evaluate '${mapData.title}' based on these parameters: ${mapData.parameters.join(', ')}. Definition: '${mapData.definition}'. Provide an inference in 10 bullet points (30 words each). Provide an average score (max ${mapData.maxScore}). Return a JSON object with keys: "inferences" (an array of 10 strings), and "averageScore".`;
    try {
        const response = await openai.chat.completions.create({ model: "gpt-4-turbo", messages: [{ role: "system", content: systemPrompt }, { role: "user", content: JSON.stringify(analysisContext) }], response_format: { type: "json_object" } });
        return { ...JSON.parse(response.choices[0].message.content), title: mapData.title, definition: mapData.definition, industryStandard: mapData.industryStandard };
    } catch (e) { console.error(`Error in getDepthMap for ${mapData.title}:`, e); return { title: mapData.title, error: "Failed to generate."}; }
}
// --- END: AI HELPER FUNCTIONS ---


// --- Main Report Generation Engine ---
// In server.js, replace your existing generateReport function with this final version.

// In server.js, replace your existing generateReport function with this final version.

async function generateReport(jobId, answers) {
    // LOG 1: Announce that the process has started
    console.log(`[Job ${jobId}]: Starting FULL SEQUENTIAL AI report generation...`);
    
    const analysisContext = { answers };
    const taskResults = {};
    
    // The complete "to-do list" for the AI, with no omissions.
    const reportTasks = [
        // Section 1 & 2
        { name: 'powerQuadrant', func: () => getPowerQuadrant(analysisContext) },
        { name: 'breakthroughZone', func: () => getBreakthroughZone(analysisContext) },
        
        // Section 3, Part A: Strategic & Cognitive Facets
        { name: 'facet_strategicJudgment', func: () => getLeadershipFacet(analysisContext, "Strategic Judgment & Foresight", "Your ability to see the bigger picture, think beyond immediate problems, and make decisions that help the company succeed both now and in the future...") },
        { name: 'facet_decisionMaking', func: () => getLeadershipFacet(analysisContext, "Decision-Making Under Ambiguity", "Your ability to make thoughtful, effective choices when the situation is unclear...") },
        { name: 'facet_prioritization', func: () => getLeadershipFacet(analysisContext, "Prioritization & Focus Discipline", "Your ability to identify what truly matters most in a complex situation...") },
        { name: 'facet_riskAwareness', func: () => getLeadershipFacet(analysisContext, "Risk Awareness & Risk-Taking Balance", "Your ability to understand the potential downsides and opportunities...") },
        { name: 'facet_innovation', func: () => getLeadershipFacet(analysisContext, "Innovation Orientation & Growth Mindset", "Your ability to stay open to new ideas...") },
        { name: 'facet_vision', func: () => getLeadershipFacet(analysisContext, "Vision Articulation", "Your ability to clearly express where the team or company needs to go...") },

        // Section 3, Part B: Interpersonal & Stakeholder Facets
        { name: 'facet_emotionalIntelligence', func: () => getLeadershipFacet(analysisContext, "Emotional Intelligence & Empathy", "Your ability to understand what others are feeling...") },
        { name: 'facet_teamEmpowerment', func: () => getLeadershipFacet(analysisContext, "Team Empowerment & Inclusion", "Your ability to create an environment where every team member feels trusted...") },
        { name: 'facet_conflictResolution', func: () => getLeadershipFacet(analysisContext, "Conflict Resolution & Influence without Authority", "Your ability to handle disagreements in a way that brings people together...") },
        { name: 'facet_stakeholderManagement', func: () => getLeadershipFacet(analysisContext, "Stakeholder Management & Alignment", "Your ability to understand the needs, expectations, and concerns of different people...") },
        { name: 'facet_collaboration', func: () => getLeadershipFacet(analysisContext, "Collaboration & Cross-Functional Orientation", "Your ability to work openly and effectively with people across different teams...") },
        { name: 'facet_culturalSensitivity', func: () => getLeadershipFacet(analysisContext, "Cultural Sensitivity & Global Mindset", "Your ability to understand, respect, and work effectively with people from different backgrounds...") },
        { name: 'facet_politicalSavvy', func: () => getLeadershipFacet(analysisContext, "Political Savvy & Diplomacy", "Your ability to navigate the informal networks...") },

        // Section 3, Part C: Personal Mastery & Values Facets
        { name: 'facet_ethicalIntegrity', func: () => getLeadershipFacet(analysisContext, "Ethical Integrity & Values-Based Decision-Making", "Your ability to stay true to what is right and fair...") },
        { name: 'facet_accountability', func: () => getLeadershipFacet(analysisContext, "Accountability & Ownership", "Your ability to take full responsibility for your actions...") },
        { name: 'facet_courage', func: () => getLeadershipFacet(analysisContext, "Courage & Constructive Dissent", "Your ability to speak up respectfully...") },
        { name: 'facet_resilience', func: () => getLeadershipFacet(analysisContext, "Resilience & Crisis Leadership", "Your ability to stay steady, focused, and positive...") },
        { name: 'facet_selfRegulation', func: () => getLeadershipFacet(analysisContext, "Self-Regulation & Composure", "Your ability to manage your emotions...") },
        { name: 'facet_agility', func: () => getLeadershipFacet(analysisContext, "Agility & Learning Orientation", "Your ability to adapt quickly...") },
        
        // Section 4: Extended Leadership Facets
        { name: 'extended_thinkingStyle', func: () => getExtendedFacet(analysisContext, { title: "Leadership Thinking & Cognitive Style", maxScore: 6.6, industryStandard: 7.29, subPoints: ["Systems Thinking", "Anticipatory Thinking / Strategic Foresight", "Decision Accountability Clarity", "Tolerance for Complexity"], definitions: ["Ability to see how decisions affect the wider organization...", "Ability to spot emerging risks, trends, or disruptions early...", "Comfort in drawing the line between what can be delegated...", "Ability to work with competing priorities..."] }) },
        { name: 'extended_relationalStyle', func: () => getExtendedFacet(analysisContext, { title: "Relational & Culture-Building Dimensions", maxScore: 6.5, industryStandard: 7.08, subPoints: ["Psychological Safety Creation", "Trust-Building Orientation", "Humility & Coachability", "Mentorship & Talent Development Focus"], definitions: ["Does the candidate consistently foster an environment where people feel safe...", "How actively they work to build trust upwards, downwards, and sideways...", "Readiness to listen, learn from others, and reconsider one's own ideas...", "Do they show orientation toward nurturing the next layer of leaders..."] }) },
        { name: 'extended_executionStyle', func: () => getExtendedFacet(analysisContext, { title: "Execution & Delivery Style", maxScore: 6.5, industryStandard: 7.23, subPoints: ["Bias for Impact Over Activity", "Follow-Through Discipline", "Adaptation in Real Time", "Proactivity vs. Reactivity Balance"], definitions: ["Whether their choices consistently aim for meaningful results...", "Do they think through to sustainable execution...", "How well they adjust as situations evolve...", "Do they anticipate and pre-empt challenges..."] }) },
        { name: 'extended_organizationalAwareness', func: () => getExtendedFacet(analysisContext, { title: "Organizational & Contextual Awareness", maxScore: 6.6, industryStandard: 7.97, subPoints: ["Business Acumen / Commercial Sensitivity", "Change Readiness (Organizational)", "Cultural Stewardship", "Customer & Market Orientation (Deep)"], definitions: ["Are decisions anchored in business realities...", "Sensitivity to how ready the org or team is for change...", "Are they mindful of shaping and strengthening the culture...", "How well do they balance internal and external stakeholder needs..."] }) },
        { name: 'extended_innerQualities', func: () => getExtendedFacet(analysisContext, { title: "Inner Qualities and Meta-Leader Traits", maxScore: 6.9, industryStandard: 7.34, subPoints: ["Ethical Reflex / Moral Courage", "Authenticity & Congruence", "Restraint & Timing Sense", "Personal Energy Management"], definitions: ["Not just adherence to values...", "Whether their decisions reflect consistency...", "Ability to act decisively and to know when holding back is wiser.", "Do they demonstrate sustainable leadership..."] }) },

        // Section 5: Leadership Depth Map
        { name: 'depth_lens', func: () => getDepthMap(analysisContext, { title: "Leadership Lens™ - The Way You See", definition: "This reflects how you perceive complexity...", maxScore: 6.9, industryStandard: 7.83, parameters: ["Strategic Judgment", "Systems Thinking", "Risk Awareness", "Anticipatory Foresight", "Tolerance for Ambiguity", "Ethical Reflex"] }) },
        { name: 'depth_hand', func: () => getDepthMap(analysisContext, { title: "Leadership Hand™ - The Way You Choose", definition: "This is about how you decide, act, and balance trade-offs...", maxScore: 6.9, industryStandard: 7.81, parameters: ["Prioritization Discipline", "Courage and Constructive Dissent", "Bias for Impact", "Political Savvy", "Conflict Resolution Approach", "Customer & Market Orientation"] }) },
        { name: 'depth_signature', func: () => getDepthMap(analysisContext, { title: "Leadership Signature™ - The Way You Shape Others", definition: "This layer focuses on how you empower, include, influence...", maxScore: 6.9, industryStandard: 7.903, parameters: ["Emotional Intelligence", "Team Empowerment", "Psychological Safety Creation", "Collaboration & Cross-Functional Impact", "Mentorship & Talent Stewardship", "Cultural Sensitivity"] }) },
        { name: 'depth_legacy', func: () => getDepthMap(analysisContext, { title: "Leadership Legacy™ - The Way You Sustain", definition: "This reflects how you ensure your leadership is lasting, ethical, and adaptive.", maxScore: 6.9, industryStandard: 7.85, parameters: ["Resilience and Composure", "Agility and Learning Mindset", "Authenticity and Congruence", "Personal Energy Management", "Change Leadership", "Vision Articulation"] }) },
    ];

    try {
        for (const task of reportTasks) {
            // LOG 2: Announce which section is starting
            console.log(`[Job ${jobId}]: Processing section: ${task.name}...`);
            const result = await task.func();
            taskResults[task.name] = result;
            // LOG 3: Announce which section has finished
            console.log(`[Job ${jobId}]: ...Successfully completed section: ${task.name}`);
        }

        // LOG 4: Announce the final assembly step
        console.log(`[Job ${jobId}]: Assembling final report structure...`);
        
        // Correctly assemble the final report from the results of the tasks
        const finalReport = {
            powerQuadrant: taskResults.powerQuadrant?.powerQuadrant,
            breakthroughZone: taskResults.breakthroughZone?.breakthroughZone,
            leadershipFacets: {
                strategicAndCognitive: [taskResults.facet_strategicJudgment, taskResults.facet_decisionMaking, taskResults.facet_prioritization, taskResults.facet_riskAwareness, taskResults.facet_innovation, taskResults.facet_vision],
                interpersonalAndStakeholder: [taskResults.facet_emotionalIntelligence, taskResults.facet_teamEmpowerment, taskResults.facet_conflictResolution, taskResults.facet_stakeholderManagement, taskResults.facet_collaboration, taskResults.facet_culturalSensitivity, taskResults.facet_politicalSavvy],
                personalMasteryAndValues: [taskResults.facet_ethicalIntegrity, taskResults.facet_accountability, taskResults.facet_courage, taskResults.facet_resilience, taskResults.facet_selfRegulation, taskResults.facet_agility],
            },
            extendedFacets: [taskResults.extended_thinkingStyle, taskResults.extended_relationalStyle, taskResults.extended_executionStyle, taskResults.extended_organizationalAwareness, taskResults.extended_innerQualities],
            depthMap: [taskResults.depth_lens, taskResults.depth_hand, taskResults.depth_signature, taskResults.depth_legacy]
        };

        reportJobs[jobId].status = 'complete';
        reportJobs[jobId].report = finalReport;

        // LOG 5: Announce the final success
        console.log(`[Job ${jobId}]: Report fully generated and stored.`);

    } catch (error) {
        // LOG 6: Log any critical errors
        console.error(`[Job ${jobId}]: A critical error occurred during report generation:`, error);
        reportJobs[jobId].status = 'failed';
        reportJobs[jobId].error = 'An error occurred while generating the report.';
    }
}

// --- API ROUTES ---
app.get('/api/case-study', (req, res) => {
    res.json({ questions: caseStudyData.questions });
});
app.post('/api/evaluate', (req, res) => {
    const jobId = crypto.randomUUID();
    reportJobs[jobId] = { status: 'pending', report: null };
    res.status(202).json({ jobId });
    generateReport(jobId, req.body.answers);
});
app.get('/api/report-status/:jobId', (req, res) => {
    const job = reportJobs[req.params.jobId];
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    res.json(job);
});

// --- SERVER START ---
http.createServer(app).listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});