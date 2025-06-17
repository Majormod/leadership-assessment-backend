// --- Core Modules ---
const https = require('https');
const http = require('http'); // Import the http module
const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- App Setup ---
const app = express();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const port = 3001; // Define a port

// --- Middleware ---
app.use(cors({
    origin: ['http://localhost:3000', 'https://main.d21put265zxojq.amplifyapp.com'] 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- Competency Map for all 160 Questions ---
// --- Competency Map for the new Case Study ---
const competencyMap = {
    // Rohan's Perspective (1-20)
    1: "Emotional Intelligence", 2: "Strategic Judgment", 3: "Conflict Resolution & Influence", 4: "Accountability & Ownership", 5: "Resilience & Crisis Leadership", 6: "Stakeholder Alignment", 7: "Accountability & Ownership", 8: "Customer-Centricity", 9: "Team Empowerment & Inclusion", 10: "Self-Regulation & Composure", 11: "Team Empowerment & Inclusion", 12: "Ethical & Values-Based Leadership", 13: "Conflict Resolution & Influence", 14: "Innovation Orientation", 15: "Resilience & Crisis Leadership", 16: "Team Empowerment & Inclusion", 17: "Stakeholder Alignment", 18: "Ethical & Values-Based Leadership", 19: "Communication Clarity", 20: "Conflict Resolution & Influence",
    // Aarav's Perspective (21-40)
    21: "Courage & Constructive Dissent", 22: "Conflict Resolution & Influence", 23: "Collaboration & Cross-Functional Orientation", 24: "Stakeholder Alignment", 25: "Conflict Resolution & Influence", 26: "Innovation Orientation", 27: "Ethical & Values-Based Leadership", 28: "Accountability & Ownership", 29: "Change Leadership", 30: "Customer-Centricity", 31: "Resilience & Crisis Leadership", 32: "Change Leadership", 33: "Team Empowerment & Inclusion", 34: "Resilience & Crisis Leadership", 35: "Decision-Making Under Ambiguity", 36: "Agility & Learning Mindset", 37: "Accountability & Ownership", 38: "Courage & Constructive Dissent", 39: "Ethical & Values-Based Leadership", 40: "Innovation Orientation",
    // Nikhil's Perspective (41-60)
    41: "Self-Regulation & Composure", 42: "Courage & Constructive Dissent", 43: "Self-Regulation & Composure", 44: "Team Empowerment & Inclusion", 45: "Ethical & Values-Based Leadership", 46: "Customer-Centricity", 47: "Accountability & Ownership", 48: "Courage & Constructive Dissent", 49: "Agility & Learning Mindset", 50: "Team Empowerment & Inclusion", 51: "Conflict Resolution & Influence", 52: "Accountability & Ownership", 53: "Agility & Learning Mindset", 54: "Resilience & Crisis Leadership", 55: "Stakeholder Alignment", 56: "Accountability & Ownership", 57: "Stakeholder Alignment", 58: "Agility & Learning Mindset", 59: "Ethical & Values-Based Leadership", 60: "Emotional Intelligence",
    // Meera's Perspective (61-80)
    61: "Conflict Resolution & Influence", 62: "Strategic Judgment", 63: "Emotional Intelligence", 64: "Resilience & Crisis Leadership", 65: "Collaboration & Cross-Functional Orientation", 66: "Team Empowerment & Inclusion", 67: "Change Leadership", 68: "Ethical & Values-Based Leadership", 69: "Stakeholder Alignment", 70: "Emotional Intelligence", 71: "Team Empowerment & Inclusion", 72: "Decision-Making Under Ambiguity", 73: "Team Empowerment & Inclusion", 74: "Collaboration & Cross-Functional Orientation", 75: "Stakeholder Alignment", 76: "Resilience & Crisis Leadership", 77: "Stakeholder Alignment", 78: "Team Empowerment & Inclusion", 79: "Resilience & Crisis Leadership", 80: "Innovation Orientation",
    // Rajiv's Perspective (81-100)
    81: "Strategic Judgment", 82: "Decision-Making Under Ambiguity", 83: "Collaboration & Cross-Functional Orientation", 84: "Stakeholder Alignment", 85: "Strategic Judgment", 86: "Conflict Resolution & Influence", 87: "Customer-Centricity", 88: "Resilience & Crisis Leadership", 89: "Collaboration & Cross-Functional Orientation", 90: "Emotional Intelligence", 91: "Prioritization & Focus", 92: "Decision-Making Under Ambiguity", 93: "Change Leadership", 94: "Resilience & Crisis Leadership", 95: "Decision-Making Under Ambiguity", 96: "Emotional Intelligence", 97: "Accountability & Ownership", 98: "Customer-Centricity", 99: "Strategic Judgment", 100: "Strategic Judgment",
    // Anika's Perspective (101-120)
    101: "Collaboration & Cross-Functional Orientation", 102: "Change Leadership", 103: "Decision-Making Under Ambiguity", 104: "Stakeholder Alignment", 105: "Decision-Making Under Ambiguity", 106: "Resilience & Crisis Leadership", 107: "Decision-Making Under Ambiguity", 108: "Stakeholder Alignment", 109: "Strategic Judgment", 110: "Customer-Centricity", 111: "Ethical & Values-Based Leadership", 112: "Innovation Orientation", 113: "Collaboration & Cross-Functional Orientation", 114: "Accountability & Ownership", 115: "Strategic Judgment", 116: "Collaboration & Cross-Functional Orientation", 117: "Ethical & Values-Based Leadership", 118: "Accountability & Ownership", 119: "Prioritization & Focus", 120: "Emotional Intelligence",
    // Candidate's Perspective (121-140)
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
        // PASTE THE NEW CHALLENGES OBJECT BELOW
    challenges: {
        intro: "Rohan has accepted the cross-functional leadership challenge, but the path forward is filled with complex hurdles that will test his leadership abilities from every angle.",
        areas: [
            {
                title: "1. Strategic & Product Alignment",
                points: ["How can Rohan bridge the gap between Aarav's long-term innovation vision and Anika's urgent need for short-term sales wins?", "What process can be established to prioritize features that satisfy both market demands and the core product strategy?", "How can the team pivot to a niche strategy without alienating existing customers or destabilizing the current product?"]
            },
            {
                title: "2. Team Dynamics & Culture",
                points: ["What is the best way to address Nikhil's cynicism and convert his disruptive energy into constructive contributions?", "How can Rohan manage Aarav's potential frustration if his innovative ideas are constantly deferred for short-term fixes?", "How can he address team burnout and pressure while still meeting the non-negotiable deadlines and competitive threats?"]
            },
            {
                title: "3. Cross-Functional Leadership",
                points: ["Now that Rohan is in a cross-functional role, how can he influence peers like Anika and Rajiv without having formal authority over them?", "What communication framework can he set up to ensure Sales, Product, and Engineering are aligned on commitments and timelines?", "How does he manage expectations with senior leadership while navigating the conflicts within the teams?"]
            }
        ]
    },
    // This is the full list of 140 questions.
// Replace the existing 'questions' array in server.js with this one.
questions: [
    // --- Rohan's Perspective (1-20) ---
    { id: 1, perspective: "Rohan's Perspective", question: "The team is feeling the pressure of tight deadlines and rising competition. What is the best way for me to set the tone as their leader?", options: [
        { id: "A", text: "Acknowledge the pressure but redirect focus toward small, immediate wins that build momentum and morale." }, { id: "B", text: "Make it clear that failure isn't an option and that I expect nothing less than full commitment at any cost." }, { id: "C", text: "Schedule daily status checks and question delays aggressively to keep everyone accountable and moving faster." }, { id: "D", text: "Meet with each team member individually and ask how they're coping, adjusting expectations where needed." }, { id: "E", text: "Remind the team of past successes and encourage them to dig deep and stay the course until we meet the deadline." }, { id: "F", text: "Share openly that I'm equally stressed, so they see we're all in this together and it's normal to feel the strain." }
    ], bestAnswer: "A" },
    { id: 2, perspective: "Rohan's Perspective", question: "Aarav keeps suggesting longer-term solutions, but Anika is demanding quick wins. How should I respond to these competing needs?", options: [
        { id: "A", text: "Listen to both and push back on Aarav, asking him to set aside long-term ideas and focus purely on short-term fixes." }, { id: "B", text: "Propose a middle ground - develop quick prototypes of Aarav's ideas that we can market-test in weeks, not months." }, { id: "C", text: "Privately tell Aarav to keep working on his vision while publicly committing only to Anika's immediate asks." }, { id: "D", text: "Let Product and Sales battle it out and follow whichever side wins the leadership team's support." }, { id: "E", text: "Champion Aarav's vision fully, even if it means risking tension with Sales in the short run." }, { id: "F", text: "Arrange a workshop where Aarav and Anika co-design features that balance speed and differentiation." }
    ], bestAnswer: "F" },
    /*
    { id: 3, perspective: "Rohan's Perspective", question: "Nikhil's cynicism is affecting the team mood. What is the best leadership action I can take?", options: [
        { id: "A", text: "Ask Nikhil to present constructive suggestions to the team so he channels his energy productively." }, { id: "B", text: "Call him out in front of the team to show that this negativity won't be tolerated anymore." }, { id: "C", text: "Assign Nikhil to a low-visibility task so his attitude causes less disruption." }, { id: "D", text: "Have a private conversation with Nikhil, seeking to understand the root cause of his frustrations." }, { id: "E", text: "Ignore him for now - he'll tire himself out eventually, and I can't afford distractions." }, { id: "F", text: "Suggest the team take a break together to reset the mood and reduce tensions overall." }
    ], bestAnswer: "D" },
    { id: 4, perspective: "Rohan's Perspective", question: "The AVP of Product (Rajiv) asks me to lead a cross-functional initiative that feels huge and risky. How should I handle this?", options: [
        { id: "A", text: "Say yes but set very clear conditions about the support and resources I'll need to succeed." }, { id: "B", text: "Agree right away to show I'm a team player, and figure out the details later as things unfold." }, { id: "C", text: "Ask Rajiv for time to think it over before making a decision, so I can assess the risk." }, { id: "D", text: "Decline politely, explaining that my plate is full and I don't want to overpromise and underdeliver." }, { id: "E", text: "Say yes but keep my head down, quietly trying to manage without raising expectations." }, { id: "F", text: "Accept and immediately ask for a coach or mentor to guide me on managing cross-functional work." }
    ], bestAnswer: "A" },
    { id: 5, perspective: "Rohan's Perspective", question: "The team is burning out, but deadlines are non-negotiable. What's my best move as a leader?", options: [
        { id: "A", text: "Organize a team-wide reset session, acknowledging burnout and co-creating a recovery plan while staying on track." }, { id: "B", text: "Increase monitoring and ask for more frequent progress updates to ensure no one slacks off." }, { id: "C", text: "Reward those who put in extra hours, to motivate the team through example." }, { id: "D", text: "Be transparent about the situation and ask for voluntary extra effort, showing appreciation for any help." }, { id: "E", text: "Shift tasks so those with more energy right now carry a bit more weight, balancing the load temporarily." }, { id: "F", text: "Double down on pushing the team harder, reminding them that we don't have the luxury of slowing down." }
    ], bestAnswer: "A" },
    { id: 6, perspective: "Rohan's Perspective", question: "Rajiv and Anika are disagreeing publicly in meetings. What should I do as the leader of the delivery team?", options: [
        { id: "A", text: "Stay neutral and let them resolve their differences - I'm not in charge of either function." }, { id: "B", text: "Step in to summarize both points and suggest we take the debate offline to preserve meeting productivity." }, { id: "C", text: "Take Anika's side because Sales drives revenue, and that's our immediate priority." }, { id: "D", text: "Highlight how both views are valuable and propose a structured discussion to align on goals." }, { id: "E", text: "Push Rajiv's view because product innovation is our way out of this flat growth." }, { id: "F", text: "Stay silent - better not to get involved in politics beyond my role." }
    ], bestAnswer: "D" },
    { id: 7, perspective: "Rohan's Perspective", question: "There's a risk we will miss the current delivery milestone. How do I best handle communication with senior leadership?", options: [
        { id: "A", text: "Proactively communicate the risk with a recovery plan and specific asks for support." }, { id: "B", text: "Delay informing leadership until I'm certain the milestone is at risk - I don't want to raise alarms unnecessarily." }, { id: "C", text: "Sugarcoat the situation to maintain confidence, promising the team will pull through." }, { id: "D", text: "Bring the team together, align on the recovery plan, and then jointly present it to leadership." }, { id: "E", text: "Escalate immediately, asking leadership for guidance and intervention." }, { id: "F", text: "Focus on solving the problem quietly - I'll inform leadership only if things get worse." }
    ], bestAnswer: "A" },
    { id: 8, perspective: "Rohan's Perspective", question: "A critical client raises concerns about the product's roadmap. How do I best lead the response?", options: [
        { id: "A", text: "Invite the client to a collaborative session to better understand their concerns and refine our plans." }, { id: "B", text: "Reassure the client that everything is under control, even if we still have work to do internally." }, { id: "C", text: "Ask Rajiv to handle it, as Product owns the roadmap, and I should focus on delivery." }, { id: "D", text: "Escalate the issue to the CEO to get top-down support for addressing the client's concerns." }, { id: "E", text: "Propose a joint call with Sales, Product, and Delivery to present a united front to the client." }, { id: "F", text: "Promise the client rapid fixes without fully consulting Product or Sales to keep them happy short-term." }
    ], bestAnswer: "E" },
    { id: 9, perspective: "Rohan's Perspective", question: "I notice that some quieter team members are disengaging during meetings. What leadership action is most effective?", options: [
        { id: "A", text: "Make time to speak with them individually, asking how they're feeling and what might re-engage them." }, { id: "B", text: "Ignore it for now - maybe they're just introverted and prefer to contribute in other ways." }, { id: "C", text: "Restructure meetings so everyone has to share updates, ensuring equal participation." }, { id: "D", text: "Call on them directly in meetings so they're forced to speak up and stay engaged." }, { id: "E", text: "Pair them with stronger communicators who can help draw them out." }, { id: "F", text: "Send a message reminding the whole team that engagement is expected during meetings." }
    ], bestAnswer: "A" },
    { id: 10, perspective: "Rohan's Perspective", question: "My own stress levels are rising. What's the best way to manage this without impacting my leadership?", options: [
        { id: "A", text: "Be open with the team about my stress so they see I'm human and can relate." }, { id: "B", text: "Seek support from a mentor or coach to help me process the pressure productively." }, { id: "C", text: "Double down on working longer hours to stay ahead of the pressure." }, { id: "D", text: "Delegate more, trusting my team to share the load so I can focus on what matters most." }, { id: "E", text: "Keep it to myself - I'm the leader, and it's my job to absorb the pressure." }, { id: "F", text: "Schedule short breaks to recharge, modeling good self-care for the team." }
    ], bestAnswer: "B" },
    { id: 11, perspective: "Rohan's Perspective", question: "The team is split between those pushing for innovation and those worried about delivery risks. How do I best unify them?", options: [
        { id: "A", text: "Organize a session where both sides present their views, helping us co-create a balanced path forward." }, { id: "B", text: "Side with the cautious team members to ensure we don't overreach and miss delivery." }, { id: "C", text: "Push the innovation agenda firmly - it's what we need to break out of this plateau." }, { id: "D", text: "Avoid taking a stance, hoping the team will resolve the tension on its own over time." }, { id: "E", text: "Ask Meera or Rajiv to step in and help me mediate so I don't appear biased." }, { id: "F", text: "Frame the debate as healthy, encouraging both sides to continue challenging each other openly." }
    ], bestAnswer: "A" },
    { id: 12, perspective: "Rohan's Perspective", question: "Anika pressures me for delivery dates I know are unrealistic. How should I handle this?", options: [
        { id: "A", text: "Agree to the dates, knowing I'll figure out a way to hit them under pressure." }, { id: "B", text: "Propose alternative dates with clear reasoning and impacts, showing I've thought it through." }, { id: "C", text: "Push the team harder, hoping we can just about meet the deadline." }, { id: "D", text: "Tell Anika that Delivery isn't the problem - Sales overpromises too often." }, { id: "E", text: "Stay silent, then work privately with my team to make the dates happen somehow." }, { id: "F", text: "Escalate to Rajiv or senior leadership, asking them to help manage Sales' expectations." }
    ], bestAnswer: "B" },
    { id: 13, perspective: "Rohan's Perspective", question: "Nikhil's negativity has started influencing newer team members. What's the most effective step I can take?", options: [
        { id: "A", text: "Give Nikhil a formal warning so it's clear that attitude matters as much as technical skill." }, { id: "B", text: "Set up a coaching conversation with Nikhil, focused on solutions and ownership rather than blame." }, { id: "C", text: "Ask Meera to handle Nikhil since she's better at these tricky interpersonal issues." }, { id: "D", text: "Move Nikhil to work remotely or offsite to limit his influence on the team." }, { id: "E", text: "Let things run their course - the newer team members will learn to ignore him over time." }, { id: "F", text: "Create a culture-building initiative so positivity outweighs individual negativity." }
    ], bestAnswer: "B" },
    { id: 14, perspective: "Rohan's Perspective", question: "Senior leadership asks for 'radical ideas' to break flat growth. How should I respond?", options: [
        { id: "A", text: "Organize a hackathon or innovation sprint to harness team creativity quickly." }, { id: "B", text: "Submit my own ideas first, to show leadership I can think strategically." }, { id: "C", text: "Ask Aarav privately for his ideas - he's the most innovative person on the team." }, { id: "D", text: "Wait and see what others propose before offering anything, to gauge the mood." }, { id: "E", text: "Downplay the need for radical ideas, focusing on executing what we already have planned." }, { id: "F", text: "Ask for more clarity on what leadership means by 'radical' before engaging the team." }
    ], bestAnswer: "A" },
    { id: 15, perspective: "Rohan's Perspective", question: "The team misses a delivery commitment. What's my best move as a leader?", options: [
        { id: "A", text: "Take full ownership with leadership and shield my team from blame." }, { id: "B", text: "Ask the team to write a detailed post-mortem so we can learn from it together." }, { id: "C", text: "Downplay the miss and focus on how we'll hit the next target." }, { id: "D", text: "Identify the weak performers and hold them accountable individually." }, { id: "E", text: "Escalate, asking for additional resources so it doesn't happen again." }, { id: "F", text: "Focus on motivating the team with praise for their effort despite the miss." }
    ], bestAnswer: "B" },
    { id: 16, perspective: "Rohan's Perspective", question: "Aarav is frustrated that his ideas aren't getting traction. What's my best step as his leader?", options: [
        { id: "A", text: "Give him a dedicated time slot in team meetings to showcase his ideas." }, { id: "B", text: "Tell him gently to stay focused on delivery - there's no bandwidth for experimentation now." }, { id: "C", text: "Assign him a special project where he can explore his ideas in a low-risk setting." }, { id: "D", text: "Encourage him to document his proposals and send them directly to Rajiv." }, { id: "E", text: "Ask Meera to mentor him so he learns how to position ideas better." }, { id: "F", text: "Remind him that the business comes first, and innovation can wait for calmer times." }
    ], bestAnswer: "C" },
    { id: 17, perspective: "Rohan's Perspective", question: "The client unexpectedly asks for scope changes close to delivery. How should I handle this?", options: [
        { id: "A", text: "Push back firmly, explaining the impact on timelines and quality." }, { id: "B", text: "Agree immediately - we need to keep the client happy at all costs." }, { id: "C", text: "Ask the client for clarity on priorities so we can assess trade-offs together." }, { id: "D", text: "Escalate to leadership, asking for strategic direction before responding." }, { id: "E", text: "Accept the change and work with the team to figure out how to deliver without delay." }, { id: "F", text: "Stay non-committal for now, buying time to work out what's feasible." }
    ], bestAnswer: "C" },
    { id: 18, perspective: "Rohan's Perspective", question: "Some team members are performing below expectations. What is the best leadership action?", options: [
        { id: "A", text: "Set clear, measurable goals for them and coach them regularly toward improvement." }, { id: "B", text: "Reassign them to simpler tasks to minimize delivery risk." }, { id: "C", text: "Speak with HR about starting a formal performance improvement plan." }, { id: "D", text: "Publicly highlight high performers so underperformers feel more pressure to step up." }, { id: "E", text: "Give them more time - people improve when they're not micromanaged." }, { id: "F", text: "Ignore it for now, focusing instead on keeping the stronger members motivated." }
    ], bestAnswer: "A" },
    { id: 19, perspective: "Rohan's Perspective", question: "We're about to present our plan to leadership. How can I ensure the team's work shines?", options: [
        { id: "A", text: "Involve the team in crafting and rehearsing the presentation so they feel ownership." }, { id: "B", text: "Polish the plan myself and present it solo for maximum clarity and control." }, { id: "C", text: "Focus on making it visually impressive so leadership is wowed by the polish." }, { id: "D", text: "Delegate the presentation to Aarav and Rajiv - they know the details best." }, { id: "E", text: "Stay brief and high-level to respect leadership's time." }, { id: "F", text: "Focus on selling the plan's potential, downplaying gaps or risks for now." }
    ], bestAnswer: "A" },
    { id: 20, perspective: "Rohan's Perspective", question: "I sense tension between two of my senior engineers that's starting to affect collaboration. What should I do?", options: [
        { id: "A", text: "Mediate a conversation where they air concerns and we agree on how to move forward." }, { id: "B", text: "Separate them onto different projects so the tension no longer disrupts work." }, { id: "C", text: "Wait and see if the issue resolves itself - they're adults and should handle it." }, { id: "D", text: "Ask Meera or HR to step in and run a formal conflict resolution process." }, { id: "E", text: "Remind the team publicly that professionalism is non-negotiable." }, { id: "F", text: "Let them know in private that their tension is noticed and must stop immediately." }
    ], bestAnswer: "A" },

    // --- Aarav's Perspective (21-40) ---
    { id: 21, perspective: "Aarav's Perspective", question: "The team is under tight pressure, and my ideas keep getting sidelined in meetings. What should I do as Aarav?", options: [
        { id: "A", text: "Ask Rohan privately for feedback on how to present my ideas so they're heard better." }, { id: "B", text: "Stop contributing ideas for now and focus only on my assigned coding tasks." }, { id: "C", text: "Raise my hand in the next meeting and insist the team listens to my suggestions." }, { id: "D", text: "Document my ideas in detail and email them to the entire leadership group." }, { id: "E", text: "Vent my frustration to Nikhil and see if he feels the same way." }, { id: "F", text: "Wait for the pressure to ease before bringing up my suggestions again." }
    ], bestAnswer: "A" },
    { id: 22, perspective: "Aarav's Perspective", question: "Nikhil is openly criticizing management decisions, and it's affecting team morale. What could I do?", options: [
        { id: "A", text: "Have a direct, private conversation with Nikhil and ask him to tone it down." }, { id: "B", text: "Join in with Nikhil's criticism to express my frustrations too." }, { id: "C", text: "Quietly focus on my work and avoid getting involved in the negativity." }, { id: "D", text: "Raise my concerns about Nikhil's behavior with Rohan or Meera." }, { id: "E", text: "Try to change the subject or shift conversations to something positive." }, { id: "F", text: "Post my own views on our internal chat to balance out his negativity." }
    ], bestAnswer: "D" },
    { id: 23, perspective: "Aarav's Perspective", question: "Rohan seems overloaded and distracted lately, and it's slowing our team down. How can I respond?", options: [
        { id: "A", text: "Offer to take ownership of a small part of the project to ease his load." }, { id: "B", text: "Ignore it and just focus on my part of the work." }, { id: "C", text: "Complain to Meera that Rohan isn't leading the team properly." }, { id: "D", text: "Talk to my peers about how poorly things are being managed." }, { id: "E", text: "Wait - maybe things will improve once this deadline passes." }, { id: "F", text: "Propose a short team huddle to help Rohan and the team re-focus." }
    ], bestAnswer: "A" },
    { id: 24, perspective: "Aarav's Perspective", question: "Anika keeps changing requirements mid-sprint, causing extra rework. What should I do as Aarav?", options: [
        { id: "A", text: "Suggest to Rohan that we agree on firmer scope control with Sales." }, { id: "B", text: "Quietly do the extra work without raising concerns." }, { id: "C", text: "Email Anika directly and explain how the changes are affecting delivery." }, { id: "D", text: "Tell the team we should push back harder on Sales' requests." }, { id: "E", text: "Log the extra hours but not say anything further." }, { id: "F", text: "Ask Rohan for clarity on how to handle such requests going forward." }
    ], bestAnswer: "F" },
    { id: 25, perspective: "Aarav's Perspective", question: "There's conflict between two colleagues that's starting to impact code quality. What's the best thing I can do?", options: [
        { id: "A", text: "Encourage both of them to sit down and work things out directly." }, { id: "B", text: "Stay out of it; it's not my responsibility to solve their issues." }, { id: "C", text: "Flag the situation to Rohan before it affects our delivery further." }, { id: "D", text: "Speak to each person separately and see if I can help ease the tension." }, { id: "E", text: "Quietly adjust my own work so their conflict doesn't block me." }, { id: "F", text: "Mention the tension casually in a team meeting to surface the issue." }
    ], bestAnswer: "C" },
    { id: 26, perspective: "Aarav's Perspective", question: "The company is asking for ideas to break through flat growth. What's my best response as Aarav?", options: [
        { id: "A", text: "Set aside time to think through ideas and submit them formally." }, { id: "B", text: "Wait - ideas should come from leaders, not from coders like me." }, { id: "C", text: "Talk to a few teammates to brainstorm and share a group proposal." }, { id: "D", text: "Suggest improvements in technical processes that might drive efficiency." }, { id: "E", text: "Stay focused on my coding and let others handle the strategy." }, { id: "F", text: "Send my ideas directly to Rajiv so they aren't filtered by layers of management." }
    ], bestAnswer: "A" },
    { id: 27, perspective: "Aarav's Perspective", question: "I notice that code reviews are rushed, leading to bugs in production. What action should I take?", options: [
        { id: "A", text: "Propose we block dedicated time for more thorough code reviews." }, { id: "B", text: "Quietly double-check my own code more carefully to avoid issues." }, { id: "C", text: "Raise it in the next team meeting and offer solutions to improve the process." }, { id: "D", text: "Ignore it; fixing bugs later is just part of the job sometimes." }, { id: "E", text: "Inform Rohan or Meera that quality is slipping so they can act." }, { id: "F", text: "Leave anonymous feedback in the next team survey about this problem." }
    ], bestAnswer: "C" },
    { id: 28, perspective: "Aarav's Perspective", question: "The team celebrates when Aarav delivers critical fixes, but I feel underappreciated otherwise. What could I do?", options: [
        { id: "A", text: "Share my contributions more openly during team updates." }, { id: "B", text: "Keep my head down - recognition isn't why I do this work." }, { id: "C", text: "Ask Rohan for feedback and guidance on growing my visibility." }, { id: "D", text: "Wait for others to notice my consistent contributions over time." }, { id: "E", text: "Discuss with Meera how I might take on more visible responsibilities." }, { id: "F", text: "Look for external opportunities where I might be valued more." }
    ], bestAnswer: "C" },
    { id: 29, perspective: "Aarav's Perspective", question: "A new tool has been introduced that could improve efficiency, but no one is adopting it. How could I help?", options: [
        { id: "A", text: "Create a simple guide or demo to help teammates get started with it." }, { id: "B", text: "Talk to Rohan about making it mandatory for certain tasks." }, { id: "C", text: "Quietly use it myself without pushing others." }, { id: "D", text: "Wait and see if adoption improves on its own." }, { id: "E", text: "Propose we drop the tool if no one wants it." }, { id: "F", text: "Offer to run an informal session to show how it adds value." }
    ], bestAnswer: "F" },
    { id: 30, perspective: "Aarav's Perspective", question: "The client gives sudden feedback that our solution is missing a critical feature. What should I do?", options: [
        { id: "A", text: "Alert Rohan right away and offer to help brainstorm fixes." }, { id: "B", text: "Quietly start coding the feature without waiting for instructions." }, { id: "C", text: "Email the client for clarification before we take action." }, { id: "D", text: "Tell the team that this isn't our fault and shouldn't derail us." }, { id: "E", text: "Raise the issue in the next meeting and discuss next steps collectively." }, { id: "F", text: "Let Rohan handle it it's above my level to intervene with clients." }
    ], bestAnswer: "A" },
    { id: 31, perspective: "Aarav's Perspective", question: "Our team is missing deadlines repeatedly, and stress levels are high. What should I do as Aarav?", options: [
        { id: "A", text: "Propose a retrospective session to identify blockers and solutions as a team." }, { id: "B", text: "Keep my head down and focus only on finishing my assigned work." }, { id: "C", text: "Speak to Rohan and ask if we can adjust timelines or priorities." }, { id: "D", text: "Point out in meetings that unrealistic deadlines are setting us up for failure." }, { id: "E", text: "Suggest working extra hours quietly to meet the deadlines." }, { id: "F", text: "Start documenting delays to protect myself if questions are raised." }
    ], bestAnswer: "A" },
    { id: 32, perspective: "Aarav's Perspective", question: "There's a proposal to bring in external consultants to help the team. What's my best response?", options: [
        { id: "A", text: "Welcome the idea and offer to collaborate with them for the team's benefit." }, { id: "B", text: "Express my concern that outsiders may not understand our work culture." }, { id: "C", text: "Quietly continue my work and let the leaders decide how to use consultants." }, { id: "D", text: "Suggest we first identify if internal upskilling could achieve the same result." }, { id: "E", text: "Feel threatened and worry that they might replace or overshadow our team." }, { id: "F", text: "Offer to help onboard the consultants and bring them up to speed faster." }
    ], bestAnswer: "A" },
    { id: 33, perspective: "Aarav's Perspective", question: "A teammate is struggling technically but isn't asking for help. How might I respond?", options: [
        { id: "A", text: "Approach them discreetly and offer support without making them feel judged." }, { id: "B", text: "Ignore it; it's their responsibility to ask for help when needed." }, { id: "C", text: "Alert Rohan so he can step in before it affects delivery." }, { id: "D", text: "Raise it indirectly in a team meeting to encourage openness." }, { id: "E", text: "Discuss it informally with others to see if they've noticed too." }, { id: "F", text: "Wait and see if they figure it out on their own." }
    ], bestAnswer: "A" },
    { id: 34, perspective: "Aarav's Perspective", question: "The company announces budget cuts, and morale drops sharply. What could I do?", options: [
        { id: "A", text: "Try to stay positive and focus on what's within my control." }, { id: "B", text: "Talk to my teammates and help them process their worries constructively." }, { id: "C", text: "Quietly update my resume and start exploring other options." }, { id: "D", text: "Suggest to Rohan that we organize a team discussion to address concerns." }, { id: "E", text: "Share my frustrations openly, so others know they aren't alone." }, { id: "F", text: "Avoid conversations about it and keep my head down." }
    ], bestAnswer: "A" },
    { id: 35, perspective: "Aarav's Perspective", question: "Rajiv asks for quick turnaround on a client request that seems poorly thought through. What is my best move?", options: [
        { id: "A", text: "Raise my concerns respectfully and suggest clarifying client needs first." }, { id: "B", text: "Just complete the work without questioning it - Rajiv asked, after all." }, { id: "C", text: "Propose a quick team huddle to align on the best approach." }, { id: "D", text: "Wait for someone else to flag the issues with the request." }, { id: "E", text: "Start coding what I think is best, even if it differs from Rajiv's ask." }, { id: "F", text: "Suggest documenting risks and assumptions before we proceed." }
    ], bestAnswer: "A" },
    { id: 36, perspective: "Aarav's Perspective", question: "The project requires knowledge of a new technology I don't fully understand. What's the best thing I could do?", options: [
        { id: "A", text: "Proactively seek out learning resources and upskill quickly." }, { id: "B", text: "Quietly struggle through and hope it doesn't show." }, { id: "C", text: "Ask Rohan if we can get training or mentorship on it." }, { id: "D", text: "Suggest the task be reassigned to someone more experienced." }, { id: "E", text: "Delay starting on it while I figure out how to approach it." }, { id: "F", text: "Collaborate with a teammate who already knows the technology." }
    ], bestAnswer: "A" },
    { id: 37, perspective: "Aarav's Perspective", question: "A small bug I fixed has unexpectedly made me look like a hero. How should I handle it?", options: [
        { id: "A", text: "Share credit with teammates who helped me spot or solve it." }, { id: "B", text: "Quietly accept the praise and move on without overthinking it." }, { id: "C", text: "Use the opportunity to propose improvements in our QA process." }, { id: "D", text: "Remind everyone it was a team effort, not just my win." }, { id: "E", text: "Stay silent and hope the attention fades quickly." }, { id: "F", text: "Highlight my contribution more to position myself for bigger opportunities." }
    ], bestAnswer: "A" },
    { id: 38, perspective: "Aarav's Perspective", question: "Our team's sprint goals seem unrealistic, and no one is speaking up. How could I act?", options: [
        { id: "A", text: "Suggest a sprint planning review to adjust expectations realistically." }, { id: "B", text: "Stay silent to avoid tension or conflict." }, { id: "C", text: "Discuss my concerns with Rohan privately." }, { id: "D", text: "Try to complete as much as possible and let the rest slip." }, { id: "E", text: "Encourage teammates to collectively raise the issue." }, { id: "F", text: "Document my workload so it's clear what's feasible." }
    ], bestAnswer: "C" },
    { id: 39, perspective: "Aarav's Perspective", question: "I see that Nikhil's code often needs rework, but he dismisses feedback. What should I do?", options: [
        { id: "A", text: "Give constructive feedback privately and offer to pair-program on tricky parts." }, { id: "B", text: "Ignore it and focus on cleaning up after him when needed." }, { id: "C", text: "Escalate the issue to Rohan if quality keeps slipping." }, { id: "D", text: "Leave comments in code reviews and hope he takes them seriously." }, { id: "E", text: "Discuss the situation with Meera for a broader solution." }, { id: "F", text: "Avoid giving feedback - he's unlikely to listen anyway." }
    ], bestAnswer: "A" },
    { id: 40, perspective: "Aarav's Perspective", question: "The company offers a hackathon to drive innovation, but no one on the team seems interested. What could I do?", options: [
        { id: "A", text: "Take the lead in forming a team and propose a fun project idea." }, { id: "B", text: "Stay out of it - if others don't want to join, that's their choice." }, { id: "C", text: "Encourage others by highlighting how it could help our team's visibility." }, { id: "D", text: "Ask Rohan to endorse participation to generate more interest." }, { id: "E", text: "Quietly join another team outside ours to still take part." }, { id: "F", text: "Wait to see if enthusiasm builds closer to the date." }
    ], bestAnswer: "A" },

    // --- Nikhil's Perspective (41-60) ---
    { id: 41, perspective: "Nikhil's Perspective", question: "I feel my skills are underutilized and my suggestions are ignored in meetings. What should I do?", options: [
        { id: "A", text: "Speak privately with Rohan and ask how I can contribute more meaningfully." }, { id: "B", text: "Push harder in meetings to make sure people hear and implement my ideas." }, { id: "C", text: "Withdraw from discussions and focus only on the tasks assigned to me." }, { id: "D", text: "Send my ideas directly to senior leaders, bypassing my immediate manager." }, { id: "E", text: "Reflect on how I'm presenting my suggestions and adjust my approach." }, { id: "F", text: "Complain to a few colleagues to gain support for my frustration." }
    ], bestAnswer: "A" },
    { id: 42, perspective: "Nikhil's Perspective", question: "I strongly disagree with a technical direction chosen by the team, but the decision has been made. What should I do?", options: [
        { id: "A", text: "Raise my concerns again during the next team meeting and challenge the decision." }, { id: "B", text: "Document my concerns for future reference but support the decision for now." }, { id: "C", text: "Quietly do things my own way in my part of the codebase." }, { id: "D", text: "Discuss my concerns privately with Rohan to seek his advice." }, { id: "E", text: "Work with the team to make the current direction succeed despite my reservations." }, { id: "F", text: "Talk to Meera or Rajiv about overriding the decision." }
    ], bestAnswer: "E" },
    { id: 43, perspective: "Nikhil's Perspective", question: "Rohan calls out my mistakes in a team meeting, and I feel humiliated. How should I respond?", options: [
        { id: "A", text: "Ask Rohan privately for feedback on how to improve." }, { id: "B", text: "Publicly defend myself in the meeting to justify my actions." }, { id: "C", text: "Shut down and stop contributing to avoid further embarrassment." }, { id: "D", text: "Take time later to reflect on whether the criticism was fair." }, { id: "E", text: "Complain to other team members about Rohan's behavior." }, { id: "F", text: "Raise the issue with Meera about being called out unfairly." }
    ], bestAnswer: "D" },
    { id: 44, perspective: "Nikhil's Perspective", question: "A junior developer keeps asking me for help and it's slowing down my own work. What could I do?", options: [
        { id: "A", text: "Set boundaries and ask them to try solving problems on their own first." }, { id: "B", text: "Offer to pair with them for a short time to help them gain confidence." }, { id: "C", text: "Ignore their requests and focus on my own tasks." }, { id: "D", text: "Suggest they ask Rohan or someone else for help instead." }, { id: "E", text: "Raise my workload concerns with Rohan so he can address it." }, { id: "F", text: "Make time to mentor them, seeing it as an investment in team strength." }
    ], bestAnswer: "F" },
    { id: 45, perspective: "Nikhil's Perspective", question: "The team is planning a solution that I know will cause technical debt. What's my best move?", options: [
        { id: "A", text: "Propose alternatives clearly and explain the long-term risks." }, { id: "B", text: "Go along with the plan - it's not worth the fight." }, { id: "C", text: "Quietly code things in a cleaner way without discussing it." }, { id: "D", text: "Ask for a deeper technical review before we commit to this plan." }, { id: "E", text: "Highlight the issue to Meera or Rajiv if the team won't listen." }, { id: "F", text: "Wait to see if the plan fails and then point out the problem." }
    ], bestAnswer: "A" },
    { id: 46, perspective: "Nikhil's Perspective", question: "The client gives contradictory feedback on features I've developed. How should I handle this?", options: [
        { id: "A", text: "Ask Rohan or the client directly for clarification." }, { id: "B", text: "Quietly make changes based on what I think the client wants." }, { id: "C", text: "Document the feedback and ask for a formal clarification from Sales." }, { id: "D", text: "Complain to my team about how unclear the client always is." }, { id: "E", text: "Escalate the issue to senior management so they handle it." }, { id: "F", text: "Ignore the contradictions and proceed with the original plan." }
    ], bestAnswer: "A" },
    { id: 47, perspective: "Nikhil's Perspective", question: "I'm overloaded, but the team keeps assigning me critical tasks. What could I do?", options: [
        { id: "A", text: "Speak up and ask for my workload to be rebalanced." }, { id: "B", text: "Just put in longer hours and try to handle it all." }, { id: "C", text: "Quietly drop less important tasks to focus on the critical ones." }, { id: "D", text: "Raise the issue with Meera or Rajiv for immediate intervention." }, { id: "E", text: "Encourage the team to upskill so responsibilities are shared better." }, { id: "F", text: "Vent to colleagues about being overburdened." }
    ], bestAnswer: "A" },
    { id: 48, perspective: "Nikhil's Perspective", question: "A release is at risk, but the team is avoiding difficult decisions. How could I act?", options: [
        { id: "A", text: "Propose a focused meeting to tackle the tough decisions head-on." }, { id: "B", text: "Step back and let the managers deal with it." }, { id: "C", text: "Quietly fix what I can and leave the rest." }, { id: "D", text: "Start documenting risks and suggest a revised plan." }, { id: "E", text: "Voice concerns bluntly in meetings to force action." }, { id: "F", text: "Wait - sometimes issues resolve themselves under pressure." }
    ], bestAnswer: "A" },
    { id: 49, perspective: "Nikhil's Perspective", question: "The code review process is slow, delaying progress. What should I do?", options: [
        { id: "A", text: "Propose we adopt new tools or processes to speed things up." }, { id: "B", text: "Quietly skip code reviews on minor changes to save time." }, { id: "C", text: "Talk to Rohan about setting clearer SLAs for reviews." }, { id: "D", text: "Start reviewing others' code more proactively to set an example." }, { id: "E", text: "Complain to teammates that reviews are a bottleneck." }, { id: "F", text: "Wait and see if the team notices the delay on its own." }
    ], bestAnswer: "D" },
    { id: 50, perspective: "Nikhil's Perspective", question: "I feel our technical capabilities could be stronger, but no one seems focused on improvement. How could I respond?", options: [
        { id: "A", text: "Propose regular knowledge-sharing sessions within the team." }, { id: "B", text: "Focus on my own growth and not worry about the team." }, { id: "C", text: "Raise the issue at the next team retrospective." }, { id: "D", text: "Suggest Rohan sponsor formal training for the team." }, { id: "E", text: "Highlight gaps to senior leadership and ask for action." }, { id: "F", text: "Quietly improve things where I can without making it a big issue." }
    ], bestAnswer: "A" },
    { id: 51, perspective: "Nikhil's Perspective", question: "I sense growing tension between Aarav and me during code reviews. What should I do?", options: [
        { id: "A", text: "Arrange a one-on-one chat with Aarav to clear the air." }, { id: "B", text: "Raise the issue with Rohan and let him mediate." }, { id: "C", text: "Continue as usual tension is part of working in tech teams." }, { id: "D", text: "Subtly undermine Aarav's work in reviews to assert my authority." }, { id: "E", text: "Reflect on my own tone and approach in code reviews." }, { id: "F", text: "Avoid reviewing Aarav's code to reduce friction." }
    ], bestAnswer: "E" },
    { id: 52, perspective: "Nikhil's Perspective", question: "A critical production bug is traced back to my code. How might I respond?", options: [
        { id: "A", text: "Own up to the mistake and work quickly to fix it." }, { id: "B", text: "Quietly fix the issue and hope no one notices." }, { id: "C", text: "Shift blame by pointing out gaps in the testing process." }, { id: "D", text: "Suggest a team post-mortem to prevent similar issues." }, { id: "E", text: "Raise the issue with Rohan before rumors start spreading." }, { id: "F", text: "Let the managers handle it without getting involved." }
    ], bestAnswer: "A" },
    { id: 53, perspective: "Nikhil's Perspective", question: "The team is adopting a framework I'm unfamiliar with, and I feel left behind. What should I do?", options: [
        { id: "A", text: "Invest time to learn it on my own as fast as possible." }, { id: "B", text: "Resist using the new framework and stick to what I know." }, { id: "C", text: "Ask for team help or mentoring to get up to speed." }, { id: "D", text: "Propose we delay adoption until I'm comfortable with it." }, { id: "E", text: "Quietly avoid tasks involving the new framework." }, { id: "F", text: "Suggest the team arrange a workshop so we all level up together." }
    ], bestAnswer: "F" },
    { id: 54, perspective: "Nikhil's Perspective", question: "A project milestone is slipping, and frustration is building. What's my best move?", options: [
        { id: "A", text: "Propose a focused troubleshooting session to identify blockers." }, { id: "B", text: "Wait for managers to come up with a plan." }, { id: "C", text: "Work extra hours to push through my parts faster." }, { id: "D", text: "Start calling out others who are causing delays." }, { id: "E", text: "Quietly do my bit and not get involved in the team stress." }, { id: "F", text: "Recommend breaking the work down further to regain control." }
    ], bestAnswer: "A" },
    { id: 55, perspective: "Nikhil's Perspective", question: "I see Rajiv making promises to clients that seem unrealistic. How could I act?", options: [
        { id: "A", text: "Raise the risks calmly with Rajiv and suggest alternatives." }, { id: "B", text: "Complain to teammates about how Sales overcommits." }, { id: "C", text: "Propose a joint session between Sales and Tech to align expectations." }, { id: "D", text: "Escalate my concerns to Meera or Rohan directly." }, { id: "E", text: "Ignore it it's not my job to manage client promises." }, { id: "F", text: "Start preparing a technical workaround just in case." }
    ], bestAnswer: "D" },
    { id: 56, perspective: "Nikhil's Perspective", question: "The team is celebrating a successful release, but I feel my contributions weren't recognized. What should I do?", options: [
        { id: "A", text: "Privately ask Rohan for feedback on my performance." }, { id: "B", text: "Share my achievements with the team in a humble way." }, { id: "C", text: "Quietly disengage if they didn't notice, why bother?" }, { id: "D", text: "Vent to a few teammates about being overlooked." }, { id: "E", text: "Raise the issue in the next review cycle." }, { id: "F", text: "Reflect on whether I'm doing enough to highlight my impact." }
    ], bestAnswer: "F" },
    { id: 57, perspective: "Nikhil's Perspective", question: "There's a debate on code quality vs. delivery speed, and the team is divided. How could I help?", options: [
        { id: "A", text: "Suggest a balanced approach that meets both needs." }, { id: "B", text: "Take the side of code quality, no matter the delivery impact." }, { id: "C", text: "Stay out of it and let others argue it out." }, { id: "D", text: "Propose we define clearer coding standards for future work." }, { id: "E", text: "Support delivery speed deadlines matter most." }, { id: "F", text: "Highlight past examples where poor quality hurt us later." }
    ], bestAnswer: "F" },
    { id: 58, perspective: "Nikhil's Perspective", question: "I feel I'm not learning enough on this project. What's the best thing I could do?", options: [
        { id: "A", text: "Ask Rohan for opportunities on more challenging tasks." }, { id: "B", text: "Quietly keep going at least it's a stable role." }, { id: "C", text: "Propose enhancements or side projects that build new skills." }, { id: "D", text: "Start applying elsewhere for better learning opportunities." }, { id: "E", text: "Request mentorship on technologies I want to master." }, { id: "F", text: "Take my frustration out on the quality of work assigned." }
    ], bestAnswer: "A" },
    { id: 59, perspective: "Nikhil's Perspective", question: "I've spotted a serious security gap in our product. What's my best action?", options: [
        { id: "A", text: "Raise it immediately with the team and propose fixes." }, { id: "B", text: "Quietly patch it on my own without involving others." }, { id: "C", text: "Document it and wait for the next security review." }, { id: "D", text: "Inform Meera or Rajiv directly given the seriousness." }, { id: "E", text: "Bring it up in casual team discussions to test reactions." }, { id: "F", text: "Ignore it not my problem unless it becomes critical." }
    ], bestAnswer: "A" },
    { id: 60, perspective: "Nikhil's Perspective", question: "Rohan is assigning Aarav to lead a new feature I wanted to own. How should I react?", options: [
        { id: "A", text: "Ask Rohan for feedback on how I can earn such opportunities." }, { id: "B", text: "Support Aarav's efforts and offer help where needed." }, { id: "C", text: "Quietly feel resentful but not say anything." }, { id: "D", text: "Complain to colleagues about favoritism." }, { id: "E", text: "Focus on excelling in my current assignments to prove myself." }, { id: "F", text: "Escalate to Meera that I'm being overlooked unfairly." }
    ], bestAnswer: "A" },

    // --- Meera's Perspective (61-80) ---
    { id: 61, perspective: "Meera's Perspective", question: "The team is under pressure to deliver, and tensions between Nikhil and Aarav are rising. How should I act?", options: [
        { id: "A", text: "Bring them together for a mediated conversation to clear misunderstandings." }, { id: "B", text: "Ignore it for now; the deadline matters more than team harmony." }, { id: "C", text: "Assign them to work on separate modules to avoid conflict." }, { id: "D", text: "Escalate the issue to Rajiv before it impacts delivery." }, { id: "E", text: "Remind them both privately about team values and professionalism." }, { id: "F", text: "Let Rohan handle it it's his team after all." }
    ], bestAnswer: "A" },
    { id: 62, perspective: "Meera's Perspective", question: "Rajiv pushes for a faster timeline that risks product quality. What should I do?", options: [
        { id: "A", text: "Propose a realistic plan balancing speed and quality, and explain the trade-offs." }, { id: "B", text: "Agree meeting sales commitments is the top priority." }, { id: "C", text: "Raise the risks in the leadership meeting and seek alignment." }, { id: "D", text: "Quietly instruct the team to do their best with the faster schedule." }, { id: "E", text: "Push back firmly on Rajiv's request and insist on quality first." }, { id: "F", text: "Let the team figure out how to make it work without intervening much." }
    ], bestAnswer: "A" },
    { id: 63, perspective: "Meera's Perspective", question: "A valuable team member, Nikhil, is disengaged and missing his usual spark. What could I do?", options: [
        { id: "A", text: "Schedule a one-on-one to explore what's bothering him." }, { id: "B", text: "Wait and see if he regains motivation on his own." }, { id: "C", text: "Quietly reassign some of his work to lighten his load." }, { id: "D", text: "Openly ask him in a team meeting why he seems disengaged." }, { id: "E", text: "Discuss Nikhil's performance with HR in case action is needed." }, { id: "F", text: "Assign him a fresh challenge that might rekindle his interest." }
    ], bestAnswer: "A" },
    { id: 64, perspective: "Meera's Perspective", question: "The client is unhappy with a recent release, and the team is demoralized. What's my best move?", options: [
        { id: "A", text: "Arrange a debrief focusing on lessons learned and next steps." }, { id: "B", text: "Reassure the team privately and let the dust settle before addressing it formally." }, { id: "C", text: "Blame the issues on gaps in Rajiv's sales commitments." }, { id: "D", text: "Rally the team with a positive plan for addressing the client concerns." }, { id: "E", text: "Minimize discussion of the issue too much talk will hurt morale further." }, { id: "F", text: "Escalate the client's feedback to senior management and let them handle it." }
    ], bestAnswer: "D" },
    { id: 65, perspective: "Meera's Perspective", question: "Rohan's team is overworked, but other teams have capacity. What should I do?", options: [
        { id: "A", text: "Reallocate some tasks to other teams to balance the load." }, { id: "B", text: "Encourage Rohan to ask for help rather than intervene directly." }, { id: "C", text: "Praise Rohan's team for their dedication and leave things as is." }, { id: "D", text: "Raise this in leadership meetings to push for resource rebalancing." }, { id: "E", text: "Quietly let it continue high performers always carry more load." }, { id: "F", text: "Arrange a temporary task force to support Rohan's team." }
    ], bestAnswer: "A" },
    { id: 66, perspective: "Meera's Perspective", question: "I sense the team is hesitant to speak up in meetings. How could I respond?", options: [
        { id: "A", text: "Set ground rules that make it safe to share differing views." }, { id: "B", text: "Encourage individuals privately to voice their opinions." }, { id: "C", text: "Conclude people have nothing useful to add and move on." }, { id: "D", text: "Ask more open-ended questions in meetings to draw out input." }, { id: "E", text: "Let discussions stay top-down that's often more efficient." }, { id: "F", text: "Arrange smaller group discussions to give quieter voices space." }
    ], bestAnswer: "F" },
    { id: 67, perspective: "Meera's Perspective", question: "The product roadmap needs to change due to market shifts, but the team is attached to the old plan. What's my best move?", options: [
        { id: "A", text: "Clearly explain the business reasons for change and invite ideas." }, { id: "B", text: "Enforce the new plan without much discussion time is tight." }, { id: "C", text: "Wait and see if the external pressures ease up first." }, { id: "D", text: "Co-create the updated roadmap with the team's input." }, { id: "E", text: "Escalate resistance to senior leadership as a performance concern." }, { id: "F", text: "Make only minimal changes so the team feels more comfortable." }
    ], bestAnswer: "D" },
    { id: 68, perspective: "Meera's Perspective", question: "The company is considering outsourcing some development work, and the team is anxious. What should I do?", options: [
        { id: "A", text: "Communicate openly about what's known and listen to concerns." }, { id: "B", text: "Assure the team there's no reason to worry, even if I'm unsure." }, { id: "C", text: "Downplay the topic to avoid unnecessary panic." }, { id: "D", text: "Advocate for a fair and transparent process if outsourcing proceeds." }, { id: "E", text: "Ask HR to handle communications it's not my role." }, { id: "F", text: "Support outsourcing quietly, as cost savings matter most." }
    ], bestAnswer: "A" },
    { id: 69, perspective: "Meera's Perspective", question: "Anika's marketing team needs technical input urgently, but my team is fully booked. How could I act?", options: [
        { id: "A", text: "Find a short-term way to support Anika without harming delivery." }, { id: "B", text: "Tell Anika she'll have to wait we have our own priorities." }, { id: "C", text: "Ask Rajiv or Rohan for ideas on how to help." }, { id: "D", text: "Assign a junior developer to assist as a learning opportunity." }, { id: "E", text: "Ignore the request marketing often asks for unrealistic help." }, { id: "F", text: "Propose a joint planning session to align on priorities." }
    ], bestAnswer: "F" },
    { id: 70, perspective: "Meera's Perspective", question: "I notice Rohan seems stressed and burnt out. What could I do?", options: [
        { id: "A", text: "Check in with him privately and offer support." }, { id: "B", text: "Ask HR to step in before it becomes a bigger issue." }, { id: "C", text: "Let him work through it that's what leaders do." }, { id: "D", text: "Adjust his responsibilities temporarily to reduce pressure." }, { id: "E", text: "Openly mention in a meeting that Rohan seems stressed." }, { id: "F", text: "Suggest he take some time off to recharge." }
    ], bestAnswer: "A" },
    { id: 71, perspective: "Meera's Perspective", question: "I'm hearing complaints that Rohan is micromanaging. What's the best way to handle this?", options: [
        { id: "A", text: "Have a private conversation with Rohan to understand his intent." }, { id: "B", text: "Monitor the situation quietly maybe it'll resolve itself." }, { id: "C", text: "Send out a blanket email reminding all leads about empowering teams." }, { id: "D", text: "Escalate it directly to HR for formal intervention." }, { id: "E", text: "Provide Rohan with coaching on delegation and trust." }, { id: "F", text: "Ignore it some teams need tight control in tough times." }
    ], bestAnswer: "E" },
    { id: 72, perspective: "Meera's Perspective", question: "There's been a major client escalation, and Rajiv and I disagree on how to respond. What should I do?", options: [
        { id: "A", text: "Propose a joint meeting with leadership to align on a plan." }, { id: "B", text: "Stick firmly to my view and push Rajiv to agree." }, { id: "C", text: "Compromise quickly to present a united front to the client." }, { id: "D", text: "Let Rajiv handle it his way to avoid more conflict." }, { id: "E", text: "Ask the CEO for guidance to break the deadlock." }, { id: "F", text: "Focus on supporting my team while Rajiv manages the client." }
    ], bestAnswer: "A" },
    { id: 73, perspective: "Meera's Perspective", question: "I notice the same people always get visible, high-stakes projects. What action could I take?", options: [
        { id: "A", text: "Consciously broaden opportunities to others to build bench strength." }, { id: "B", text: "Leave things as is those people are simply top performers." }, { id: "C", text: "Bring it up in leadership reviews to drive more equitable assignment." }, { id: "D", text: "Wait and see if others step up on their own." }, { id: "E", text: "Encourage quieter team members to volunteer for bigger roles." }, { id: "F", text: "Rotate project ownership systematically to develop talent." }
    ], bestAnswer: "A" },
    { id: 74, perspective: "Meera's Perspective", question: "I sense that cultural differences are creating friction between onsite and offshore teams. What's the best move?", options: [
        { id: "A", text: "Arrange cross-cultural workshops to build mutual understanding." }, { id: "B", text: "Wait these things often smooth out over time." }, { id: "C", text: "Remind both teams about company values and expected behaviors." }, { id: "D", text: "Assign a senior team member to monitor and report issues." }, { id: "E", text: "Ignore minor tensions unless they disrupt delivery." }, { id: "F", text: "Encourage team members to visit or virtually shadow each other." }
    ], bestAnswer: "A" },
    { id: 75, perspective: "Meera's Perspective", question: "Rohan's team is falling behind on documentation, and QA is frustrated. How should I respond?", options: [
        { id: "A", text: "Meet with Rohan and QA to agree on a clear documentation plan." }, { id: "B", text: "Let QA push Rohan it's their issue to sort out." }, { id: "C", text: "Ask QA to adjust and work with what they have for now." }, { id: "D", text: "Propose assigning a dedicated resource for documentation." }, { id: "E", text: "Remind the entire team in writing about documentation standards." }, { id: "F", text: "Downplay it focus should stay on working code, not paperwork." }
    ], bestAnswer: "A" },
    { id: 76, perspective: "Meera's Perspective", question: "A senior developer threatens to quit over workload stress. What's my best response?", options: [
        { id: "A", text: "Listen carefully, acknowledge the stress, and explore solutions." }, { id: "B", text: "Tell them to hang in it's a tough phase for everyone." }, { id: "C", text: "Immediately escalate to HR and senior leadership." }, { id: "D", text: "Shift deadlines or reassign work where possible to ease pressure." }, { id: "E", text: "Suggest they take time off to recover." }, { id: "F", text: "Advise them to consider if they're in the right role for this team." }
    ], bestAnswer: "A" },
    { id: 77, perspective: "Meera's Perspective", question: "Anika's team feels that Engineering doesn't respect their timelines for marketing inputs. What should I do?", options: [
        { id: "A", text: "Call a joint session to align Marketing and Engineering priorities." }, { id: "B", text: "Assure Anika I'll look into it but take no immediate action." }, { id: "C", text: "Ask Rohan to prioritize Marketing requests more strongly." }, { id: "D", text: "Remind Anika that Engineering has its own critical deadlines." }, { id: "E", text: "Propose a shared planning calendar to improve coordination." }, { id: "F", text: "Escalate the issue to the COO for resolution." }
    ], bestAnswer: "E" },
    { id: 78, perspective: "Meera's Perspective", question: "I see a team forming cliques, and it's starting to hurt collaboration. What's the best action?", options: [
        { id: "A", text: "Organize team-building activities to rebuild unity." }, { id: "B", text: "Watch and wait to see if it corrects itself." }, { id: "C", text: "Have private chats with clique leaders to understand what's driving it." }, { id: "D", text: "Assign mixed teams for projects to break down barriers." }, { id: "E", text: "Call it out in a team meeting and demand better behavior." }, { id: "F", text: "Report it to HR as a formal conduct concern." }
    ], bestAnswer: "D" },
    { id: 79, perspective: "Meera's Perspective", question: "A competitor just launched a feature we were planning - the team feels deflated. What could I do?", options: [
        { id: "A", text: "Gather the team to refocus on what differentiates our product." }, { id: "B", text: "Downplay it competitors always do things like this." }, { id: "C", text: "Rally the team with a faster timeline for our release." }, { id: "D", text: "Suggest we pivot to a different, unique feature." }, { id: "E", text: "Ask Rajiv and Anika for help re-energizing the team." }, { id: "F", text: "Let the team process the disappointment before acting." }
    ], bestAnswer: "A" },
    { id: 80, perspective: "Meera's Perspective", question: "A junior engineer suggests a bold technical idea that could change our architecture. What's my best move?", options: [
        { id: "A", text: "Encourage them to develop a proposal and present it." }, { id: "B", text: "Dismiss it big changes from juniors are too risky." }, { id: "C", text: "Ask senior engineers for input before responding." }, { id: "D", text: "Praise their initiative but steer them toward safer ideas." }, { id: "E", text: "Bring it up in technical leadership meetings for discussion." }, { id: "F", text: "Quietly let it drop now isn't the time for big changes." }
    ], bestAnswer: "A" },

    // --- Rajiv's Perspective (81-100) ---
    { id: 81, perspective: "Rajiv's Perspective", question: "The sales pipeline in Europe is slowing, and I'm worried about targets. What's my best action?", options: [
        { id: "A", text: "Call a strategy session with Product and Marketing to co-create solutions." }, { id: "B", text: "Push the sales team harder to close existing prospects." }, { id: "C", text: "Quietly lower targets internally to avoid demoralizing the team." }, { id: "D", text: "Explore partnerships or alliances to boost sales quickly." }, { id: "E", text: "Focus solely on the US market where demand is steadier." }, { id: "F", text: "Ask senior management for support on incentives or pricing levers." }
    ], bestAnswer: "A" },
    { id: 82, perspective: "Rajiv's Perspective", question: "A key prospect asks for a feature we don't have yet. What should I do?", options: [
        { id: "A", text: "Collaborate with Product to assess feasibility before committing." }, { id: "B", text: "Promise delivery to close the deal and work it out later." }, { id: "C", text: "Redirect the client to focus on existing strengths of our product." }, { id: "D", text: "Escalate it to the AVP Product for immediate prioritization." }, { id: "E", text: "Delay responding until I have more internal clarity." }, { id: "F", text: "Offer a discount instead of the feature to secure the deal." }
    ], bestAnswer: "A" },
    { id: 83, perspective: "Rajiv's Perspective", question: "Anika is frustrated that Sales keeps changing requirements for collateral last minute. What could I do?", options: [
        { id: "A", text: "Involve Anika earlier in sales planning to avoid last-minute changes." }, { id: "B", text: "Explain to Anika that agility is part of supporting sales." }, { id: "C", text: "Let it continue marketing needs to stay flexible." }, { id: "D", text: "Assign a dedicated liaison between Sales and Marketing." }, { id: "E", text: "Raise this with senior leadership as a process gap." }, { id: "F", text: "Assure Anika I'll try to stabilize inputs going forward." }
    ], bestAnswer: "A" },
    { id: 84, perspective: "Rajiv's Perspective", question: "I sense the Product and Engineering teams feel Sales over-promises. How should I address this?", options: [
        { id: "A", text: "Propose joint planning to align commitments and capabilities." }, { id: "B", text: "Reassure Product and Engineering privately without changing much." }, { id: "C", text: "Adjust sales messaging to better reflect product realities." }, { id: "D", text: "Argue that Sales needs flexibility to win deals the rest must adapt." }, { id: "E", text: "Ask Meera to mediate between teams for better coordination." }, { id: "F", text: "Raise it with the CEO as a strategic misalignment." }
    ], bestAnswer: "A" },
    { id: 85, perspective: "Rajiv's Perspective", question: "The team is losing deals to a competitor with lower prices. What's my best move?", options: [
        { id: "A", text: "Work with leadership on creative value-based selling strategies." }, { id: "B", text: "Request temporary price adjustments to match the competitor." }, { id: "C", text: "Pressure the sales team to push harder despite pricing gaps." }, { id: "D", text: "Focus on accounts less sensitive to pricing." }, { id: "E", text: "Ignore the competitor focusing on value will win in the end." }, { id: "F", text: "Explore non-price levers like bundled services or support perks." }
    ], bestAnswer: "A" },
    { id: 86, perspective: "Rajiv's Perspective", question: "Nikhil keeps questioning the commercial priorities in meetings. What could I do?", options: [
        { id: "A", text: "Invite him to a one-on-one to better understand his concerns." }, { id: "B", text: "Remind him that Sales priorities are set by leadership and not debatable." }, { id: "C", text: "Ignore his comments unless they disrupt decisions." }, { id: "D", text: "Encourage him to present constructive alternatives." }, { id: "E", text: "Raise his behavior with Meera as a leadership concern." }, { id: "F", text: "Publicly push back to stop negative influence on the team." }
    ], bestAnswer: "A" },
    { id: 87, perspective: "Rajiv's Perspective", question: "A long-term client is unhappy about a support issue and threatens to leave. What should I do?", options: [
        { id: "A", text: "Personally engage the client to rebuild trust." }, { id: "B", text: "Ask Support to handle it as they normally would." }, { id: "C", text: "Offer the client commercial concessions as goodwill." }, { id: "D", text: "Escalate it urgently with cross-functional teams to resolve fast." }, { id: "E", text: "Let the AVP Product take point on the resolution." }, { id: "F", text: "Wait to see if the issue settles without overreacting." }
    ], bestAnswer: "D" },
    { id: 88, perspective: "Rajiv's Perspective", question: "The CEO pressures me to hit numbers despite market challenges. What's my response?", options: [
        { id: "A", text: "Present a data-backed plan showing realistic options and risks." }, { id: "B", text: "Quietly try to hit the numbers without sharing concerns." }, { id: "C", text: "Push the team harder even if it risks burnout." }, { id: "D", text: "Ask for additional resources or support to achieve targets." }, { id: "E", text: "Focus only on the most promising deals to conserve effort." }, { id: "F", text: "Reassure the CEO we'll deliver no matter what." }
    ], bestAnswer: "A" },
    { id: 89, perspective: "Rajiv's Perspective", question: "Meera's team is slow to support a major sales initiative. What could I do?", options: [
        { id: "A", text: "Work with Meera to jointly solve resource bottlenecks." }, { id: "B", text: "Escalate directly to the COO to speed things up." }, { id: "C", text: "Wait they'll catch up eventually." }, { id: "D", text: "Assign Sales team members to help with preparation work." }, { id: "E", text: "Adjust my timelines and manage client expectations better." }, { id: "F", text: "Criticize Meera's team openly to pressure faster action." }
    ], bestAnswer: "A" },
    { id: 90, perspective: "Rajiv's Perspective", question: "A junior sales rep loses a big deal and feels demoralized. How should I respond?", options: [
        { id: "A", text: "Coach them on what went wrong and how to improve." }, { id: "B", text: "Tell them to move on losses happen in sales." }, { id: "C", text: "Review the loss in a team meeting for shared learning." }, { id: "D", text: "Quietly shift their accounts to a more experienced rep." }, { id: "E", text: "Give them a smaller win to help rebuild confidence." }, { id: "F", text: "Escalate the issue to HR for formal review." }
    ], bestAnswer: "A" },
    { id: 91, perspective: "Rajiv's Perspective", question: "I notice that deals in the pipeline are stagnating at the proposal stage. What action should I take?", options: [
        { id: "A", text: "Hold a deal review with the team to diagnose and unblock issues." }, { id: "B", text: "Increase discounts or incentives to push deals forward." }, { id: "C", text: "Leave it for another quarter some deals take longer to close." }, { id: "D", text: "Ask Marketing for stronger collateral to help close." }, { id: "E", text: "Focus effort on only the largest stalled deals for now." }, { id: "F", text: "Escalate to leadership for additional support or visibility." }
    ], bestAnswer: "A" },
    { id: 92, perspective: "Rajiv's Perspective", question: "Product wants to delay a promised feature, and the client is getting upset. What's the best approach?", options: [
        { id: "A", text: "Negotiate a timeline the client can live with, then align internally." }, { id: "B", text: "Pressure Product to deliver as promised, no matter the challenge." }, { id: "C", text: "Offer the client discounts or extras to make up for the delay." }, { id: "D", text: "Be fully transparent with the client about the situation." }, { id: "E", text: "Keep quiet and hope the client stays patient." }, { id: "F", text: "Escalate to the CEO to force Product to deliver faster." }
    ], bestAnswer: "A" },
    { id: 93, perspective: "Rajiv's Perspective", question: "A competitor launches an aggressive marketing campaign against us. What's my best move?", options: [
        { id: "A", text: "Collaborate with Marketing to counter with our own bold campaign." }, { id: "B", text: "Reassure the team and focus on our strengths instead of reacting." }, { id: "C", text: "Let it pass competitors often try stunts like this." }, { id: "D", text: "Call an urgent meeting to recalibrate our sales messaging." }, { id: "E", text: "Focus on securing existing clients from switching." }, { id: "F", text: "Pressure my team to discount deals aggressively in response." }
    ], bestAnswer: "A" },
    { id: 94, perspective: "Rajiv's Perspective", question: "Sales morale is low after missing a key quarterly target. What's the best course of action?", options: [
        { id: "A", text: "Rally the team with clear next steps and renewed focus." }, { id: "B", text: "Push them harder to make up the gap urgently." }, { id: "C", text: "Organize a session to reflect and learn from what happened." }, { id: "D", text: "Ignore it it's just one quarter; no need to overreact." }, { id: "E", text: "Quietly adjust future targets downward to ease pressure." }, { id: "F", text: "Request support from senior leadership on incentives or enablement." }
    ], bestAnswer: "C" },
    { id: 95, perspective: "Rajiv's Perspective", question: "A large prospect asks for region-specific customizations that Product doesn't want to build. What should I do?", options: [
        { id: "A", text: "Propose a creative workaround that meets the prospect's need." }, { id: "B", text: "Promise the customization to win the deal and sort it out later." }, { id: "C", text: "Align with Product first, then revert to the prospect honestly." }, { id: "D", text: "Ask for an exception approval from senior leadership." }, { id: "E", text: "Suggest the client adapt to our standard solution." }, { id: "F", text: "Delay responding and hope the issue resolves itself." }
    ], bestAnswer: "C" },
    { id: 96, perspective: "Rajiv's Perspective", question: "A junior sales team member keeps complaining about lack of recognition. What's my best response?", options: [
        { id: "A", text: "Privately recognize and coach them on building visibility." }, { id: "B", text: "Remind them that recognition is earned over time." }, { id: "C", text: "Give them a high-profile opportunity to prove themselves." }, { id: "D", text: "Tell them to focus on performance rather than seeking praise." }, { id: "E", text: "Raise their concern in leadership meetings for broader visibility." }, { id: "F", text: "Ignore it we can't cater to everyone's feelings." }
    ], bestAnswer: "A" },
    { id: 97, perspective: "Rajiv's Perspective", question: "The COO asks for my view on why revenue is flat. What's the most constructive way to respond?", options: [
        { id: "A", text: "Present a thoughtful analysis with proposed solutions." }, { id: "B", text: "Blame external market factors beyond our control." }, { id: "C", text: "Highlight other departments' delays that affected sales." }, { id: "D", text: "Propose a task force to dig deeper into root causes." }, { id: "E", text: "Focus on reassuring the COO rather than presenting problems." }, { id: "F", text: "Ask for more time before giving a view." }
    ], bestAnswer: "A" },
    { id: 98, perspective: "Rajiv's Perspective", question: "A major client wants Rajiv personally involved in quarterly business reviews. What should I do?", options: [
        { id: "A", text: "Agree and commit to personally attending key reviews." }, { id: "B", text: "Delegate to a senior sales manager to manage it." }, { id: "C", text: "Explain that my bandwidth won't allow for such involvement." }, { id: "D", text: "Ask the client for fewer reviews to make it feasible." }, { id: "E", text: "Assure the client of my support but stay in the background." }, { id: "F", text: "Quietly ignore the request and let the usual team handle it." }
    ], bestAnswer: "A" },
    { id: 99, perspective: "Rajiv's Perspective", question: "Meera suggests we slow new deals until delivery teams catch up. What's the best way to respond?", options: [
        { id: "A", text: "Collaborate with her on a balanced growth plan." }, { id: "B", text: "Push back Sales must keep driving regardless." }, { id: "C", text: "Escalate to leadership for a broader discussion." }, { id: "D", text: "Ask delivery teams to find efficiencies instead." }, { id: "E", text: "Slow selectively only on lower priority prospects." }, { id: "F", text: "Quietly ignore the suggestion and continue as planned." }
    ], bestAnswer: "A" },
    { id: 100, perspective: "Rajiv's Perspective", question: "A new competitor is gaining ground fast in our core segment. What action should I prioritize?", options: [
        { id: "A", text: "Work with cross-functional teams to sharpen our unique value." }, { id: "B", text: "Instruct the team to discount heavily to retain clients." }, { id: "C", text: "Focus on reassuring existing clients of our strengths." }, { id: "D", text: "Ask for more marketing investment to counter the threat." }, { id: "E", text: "Wait and watch to see if the competitor sustains momentum." }, { id: "F", text: "Propose an urgent executive-level review of our strategy." }
    ], bestAnswer: "A" },

    // --- Anika's Perspective (101-120) ---
    { id: 101, perspective: "Anika's Perspective", question: "The sales team keeps changing requirements for campaign materials at the last minute. What should I do?", options: [
        { id: "A", text: "Propose regular alignment meetings with Sales to set expectations early." }, { id: "B", text: "Accommodate the changes without raising concerns - sales comes first." }, { id: "C", text: "Escalate to Rajiv and Meera about the constant disruptions." }, { id: "D", text: "Set stricter timelines and explain the impact of late changes." }, { id: "E", text: "Ask my team to stay flexible and manage as best as they can." }, { id: "F", text: "Document and review the pattern with Sales leadership later." }
    ], bestAnswer: "A" },
    { id: 102, perspective: "Anika's Perspective", question: "Product priorities keep shifting, which affects our messaging. What's the best response?", options: [
        { id: "A", text: "Request a cross-functional roadmap alignment session." }, { id: "B", text: "Adjust marketing messaging quietly each time priorities change." }, { id: "C", text: "Highlight the confusion to senior leadership as a strategic risk." }, { id: "D", text: "Focus on stable product features and ignore the rest." }, { id: "E", text: "Escalate delays in getting clear inputs to the AVP Product." }, { id: "F", text: "Keep reworking campaigns as required without challenging Product." }
    ], bestAnswer: "A" },
    { id: 103, perspective: "Anika's Perspective", question: "The CEO asks me to produce a major thought leadership piece in just three days. How should I respond?", options: [
        { id: "A", text: "Propose a realistic timeline while still supporting the CEO's goal." }, { id: "B", text: "Push my team to meet the deadline no matter what." }, { id: "C", text: "Suggest repurposing existing content to meet the timeline." }, { id: "D", text: "Accept and figure it out later how to deliver." }, { id: "E", text: "Explain why the timeline risks quality and propose alternatives." }, { id: "F", text: "Ask for additional resources to help meet the deadline." }
    ], bestAnswer: "E" },
    { id: 104, perspective: "Anika's Perspective", question: "Rajiv's team complains our campaigns aren't generating enough leads. What's my best move?", options: [
        { id: "A", text: "Analyze campaign data and review strategy with Sales." }, { id: "B", text: "Defend the marketing team and blame Sales for poor conversion." }, { id: "C", text: "Propose joint reviews to align on messaging and targeting." }, { id: "D", text: "Reassure my team we're doing fine and not change much." }, { id: "E", text: "Ask Rajiv to provide clearer lead criteria." }, { id: "F", text: "Quietly adjust our approach without raising it further." }
    ], bestAnswer: "A" },
    { id: 105, perspective: "Anika's Perspective", question: "Meera asks Marketing to support a new initiative with no extra budget. How should I handle this?", options: [
        { id: "A", text: "Propose a scaled-down plan that fits existing resources." }, { id: "B", text: "Accept and try to stretch my team's capacity." }, { id: "C", text: "Raise the concern formally and request proper funding." }, { id: "D", text: "Reprioritize other projects quietly to make room." }, { id: "E", text: "Tell Meera it's not feasible without extra funds." }, { id: "F", text: "Delay action and hope the request is reconsidered." }
    ], bestAnswer: "A" },
    { id: 106, perspective: "Anika's Perspective", question: "My team feels burnt out after a series of back-to-back launches. What should I do?", options: [
        { id: "A", text: "Reprioritize work and give them breathing space where possible." }, { id: "B", text: "Encourage them to push through this is normal in marketing." }, { id: "C", text: "Request temporary resources or freelancers to help." }, { id: "D", text: "Share the feedback with leadership and propose solutions." }, { id: "E", text: "Organize a morale-boosting activity to lift spirits." }, { id: "F", text: "Tell them this is a test of resilience in our field." }
    ], bestAnswer: "A" },
    { id: 107, perspective: "Anika's Perspective", question: "A senior leader provides conflicting input on a campaign. What's the best course of action?", options: [
        { id: "A", text: "Clarify expectations directly with the leader." }, { id: "B", text: "Proceed with my team's original plan to avoid confusion." }, { id: "C", text: "Escalate to Meera for resolution." }, { id: "D", text: "Quietly adjust the plan without addressing the conflict." }, { id: "E", text: "Arrange a joint discussion to align on direction." }, { id: "F", text: "Delay action until the conflict resolves itself." }
    ], bestAnswer: "E" },
    { id: 108, perspective: "Anika's Perspective", question: "Rajiv wants last-minute changes that could delay a campaign launch. How should I approach this?", options: [
        { id: "A", text: "Explain the impact and propose an alternative timeline." }, { id: "B", text: "Make the changes quietly and delay the launch." }, { id: "C", text: "Push the team to meet the new request anyway." }, { id: "D", text: "Suggest deferring the changes to a future phase." }, { id: "E", text: "Escalate to senior leadership for guidance." }, { id: "F", text: "Agree and figure out how to manage the delay later." }
    ], bestAnswer: "A" },
    { id: 109, perspective: "Anika's Perspective", question: "The Product team wants a bigger marketing push for a feature with little market demand. What's my best move?", options: [
        { id: "A", text: "Propose focusing on features with stronger market potential." }, { id: "B", text: "Challenge Product on their assumptions and ask for data." }, { id: "C", text: "Agree and put together a plan as requested." }, { id: "D", text: "Consult Rajiv and Meera on balancing priorities." }, { id: "E", text: "Quietly downplay the feature in our campaigns." }, { id: "F", text: "Escalate concerns about wasting resources." }
    ], bestAnswer: "B" },
    { id: 110, perspective: "Anika's Perspective", question: "A key client complains that marketing materials don't reflect their experience with us. What's the right response?", options: [
        { id: "A", text: "Engage the client directly to understand their feedback." }, { id: "B", text: "Review and refresh our materials to better match reality." }, { id: "C", text: "Reassure the client we'll consider their input next time." }, { id: "D", text: "Defend the current materials as representing broader reality." }, { id: "E", text: "Escalate the feedback to leadership for strategic review." }, { id: "F", text: "Delay acting until we hear more complaints." }
    ], bestAnswer: "A" },
    { id: 111, perspective: "Anika's Perspective", question: "A regional sales head pressures me to approve a localized campaign that risks brand consistency. What should I do?", options: [
        { id: "A", text: "Propose adjustments that balance local needs with brand guidelines." }, { id: "B", text: "Approve it sales knows what works in their region." }, { id: "C", text: "Consult with leadership before deciding." }, { id: "D", text: "Refuse and remind them of our brand policies." }, { id: "E", text: "Quietly let them run it without formal approval." }, { id: "F", text: "Delay and hope they drop the idea." }
    ], bestAnswer: "A" },
    { id: 112, perspective: "Anika's Perspective", question: "Competitors are gaining share with edgy, unconventional campaigns. How should I respond?", options: [
        { id: "A", text: "Analyze what's working for them and propose bold ideas ourselves." }, { id: "B", text: "Ask my team to stick to proven approaches for now." }, { id: "C", text: "Raise the matter in strategy meetings for broader input." }, { id: "D", text: "Launch an aggressive campaign immediately to counter." }, { id: "E", text: "Monitor the trend before reacting too fast." }, { id: "F", text: "Focus on strengthening our core messaging instead." }
    ], bestAnswer: "A" },
    { id: 113, perspective: "Anika's Perspective", question: "My team keeps facing delays because Product and Sales give late inputs. What's my best action?", options: [
        { id: "A", text: "Propose a structured planning calendar with agreed deadlines." }, { id: "B", text: "Adjust timelines as best as possible without raising it." }, { id: "C", text: "Escalate to Meera about the recurring issue." }, { id: "D", text: "Let the teams know that Marketing will proceed without late inputs." }, { id: "E", text: "Quietly make the best of the situation every time." }, { id: "F", text: "Arrange a cross-functional session to improve the process." }
    ], bestAnswer: "A" },
    { id: 114, perspective: "Anika's Perspective", question: "A campaign has just launched and we spot a serious factual error. What's the best course?", options: [
        { id: "A", text: "Pause the campaign immediately and fix it." }, { id: "B", text: "Downplay the issue most people won't notice." }, { id: "C", text: "Escalate to senior leaders and ask for guidance." }, { id: "D", text: "Issue a correction and keep the campaign live." }, { id: "E", text: "Quietly fix it in the backend without much noise." }, { id: "F", text: "Let it run and focus on doing better next time." }
    ], bestAnswer: "A" },
    { id: 115, perspective: "Anika's Perspective", question: "Leadership wants to reduce marketing spend but increase impact. What should I prioritize?", options: [
        { id: "A", text: "Propose smarter targeting and more efficient channels." }, { id: "B", text: "Ask for clarity on priorities before adjusting plans." }, { id: "C", text: "Push my team to work harder to achieve more with less." }, { id: "D", text: "Defend the current budget as already lean." }, { id: "E", text: "Quietly trim small costs without changing major plans." }, { id: "F", text: "Delay action until firm decisions are made." }
    ], bestAnswer: "A" },
    { id: 116, perspective: "Anika's Perspective", question: "The sales team often launches local initiatives without informing Marketing. What's my best move?", options: [
        { id: "A", text: "Propose a formal alignment protocol for local initiatives." }, { id: "B", text: "Accept that sales will do what they need to." }, { id: "C", text: "Escalate the issue to Rajiv and Meera." }, { id: "D", text: "Have informal conversations to smooth things over." }, { id: "E", text: "Quietly monitor and adjust our plans as needed." }, { id: "F", text: "Confront the sales team firmly about process violations." }
    ], bestAnswer: "A" },
    { id: 117, perspective: "Anika's Perspective", question: "Product is asking for major campaign support for a feature still in beta. What should I do?", options: [
        { id: "A", text: "Explain the risk and propose a pre-launch teaser instead." }, { id: "B", text: "Agree to support and figure out the details later." }, { id: "C", text: "Ask leadership for guidance on priorities." }, { id: "D", text: "Decline and focus on stable features." }, { id: "E", text: "Quietly prepare materials without promoting the feature too heavily." }, { id: "F", text: "Push the team to create full campaigns regardless of readiness." }
    ], bestAnswer: "A" },
    { id: 118, perspective: "Anika's Perspective", question: "My team complains they're being blamed unfairly for weak lead numbers. What's my best action?", options: [
        { id: "A", text: "Review the data with them and propose a joint review with Sales." }, { id: "B", text: "Reassure them that this happens in marketing." }, { id: "C", text: "Escalate the blame issue to Meera." }, { id: "D", text: "Quietly support them without rocking the boat." }, { id: "E", text: "Challenge Sales directly about the fairness of their comments." }, { id: "F", text: "Tell the team to focus on improving results instead of the blame." }
    ], bestAnswer: "A" },
    { id: 119, perspective: "Anika's Perspective", question: "Rajiv asks for marketing to focus heavily on deals in Europe, but the pipeline there is weak. How should I respond?", options: [
        { id: "A", text: "Propose a balanced regional focus aligned to real pipeline." }, { id: "B", text: "Accept and shift resources as requested." }, { id: "C", text: "Raise the concern to Meera and seek clarity." }, { id: "D", text: "Quietly shift only part of the focus to Europe." }, { id: "E", text: "Ask Rajiv for data to justify the shift." }, { id: "F", text: "Delay any major change until the pipeline improves." }
    ], bestAnswer: "A" },
    { id: 120, perspective: "Anika's Perspective", question: "A junior team member's work is repeatedly subpar. What's the best way to handle this?", options: [
        { id: "A", text: "Coach them directly and set clear improvement goals." }, { id: "B", text: "Quietly redistribute their tasks to stronger team members." }, { id: "C", text: "Escalate the issue to HR or leadership for action." }, { id: "D", text: "Provide feedback and give them one more chance." }, { id: "E", text: "Tolerate the situation to avoid creating conflict." }, { id: "F", text: "Assign them lower-impact work to limit damage." }
    ], bestAnswer: "A" },

    // --- Candidate's Own Perspective (121-140) ---
    { id: 121, perspective: "Candidate's Own Perspective", question: "The team is losing motivation after a flat year of business, increased competition, and shifting priorities. As the leader, how do you best reinvigorate your people while staying focused on results?", options: [
        { id: "A", text: "Engage the team openly about challenges and co-create a path forward that excites them." }, { id: "B", text: "Push for harder work and higher goals to restore performance energy." }, { id: "C", text: "Focus on quick wins and highlight small successes to rebuild confidence." }, { id: "D", text: "Reassure them privately but avoid raising these concerns publicly." }, { id: "E", text: "Escalate to leadership that we need morale-building initiatives." }, { id: "F", text: "Let things settle and trust that motivation will return with time." }
    ], bestAnswer: "A" },
    { id: 122, perspective: "Candidate's Own Perspective", question: "There's tension between Sales and Product that's impacting delivery timelines and team morale. How should you handle this complex cross-functional issue?", options: [
        { id: "A", text: "Facilitate a direct dialogue between teams to surface issues and align." }, { id: "B", text: "Quietly adjust my team's plans to manage the fallout." }, { id: "C", text: "Escalate the conflict to senior leaders for resolution." }, { id: "D", text: "Gather facts and propose a shared accountability framework." }, { id: "E", text: "Let the teams resolve it on their own over time." }, { id: "F", text: "Take sides with the team that aligns better with business priorities." }
    ], bestAnswer: "A" },
    { id: 123, perspective: "Candidate's Own Perspective", question: "A senior leader pressures you to cut corners on a major deliverable due to time constraints. How do you balance compliance, quality, and integrity?", options: [
        { id: "A", text: "Propose an alternative that preserves quality within a feasible timeline." }, { id: "B", text: "Comply and hope it doesn't significantly hurt outcomes." }, { id: "C", text: "Push back firmly, explaining risks to the business and reputation." }, { id: "D", text: "Deliver as instructed and quietly try to mitigate risks." }, { id: "E", text: "Escalate the ethical concern to a higher authority." }, { id: "F", text: "Delay action in hopes the pressure eases." }
    ], bestAnswer: "C" },
    { id: 124, perspective: "Candidate's Own Perspective", question: "Your top performer starts showing signs of burnout and disengagement, but is reluctant to speak about it. What's the most effective leadership response?", options: [
        { id: "A", text: "Create a safe space for them to open up and explore solutions together." }, { id: "B", text: "Quietly redistribute their workload without making it obvious." }, { id: "C", text: "Encourage them to push through we all have rough patches." }, { id: "D", text: "Escalate the issue to HR for formal intervention." }, { id: "E", text: "Wait and watch if the situation improves on its own." }, { id: "F", text: "Reward them publicly to rekindle their motivation." }
    ], bestAnswer: "A" },
    { id: 125, perspective: "Candidate's Own Perspective", question: "A major campaign fails publicly, and blame is circulating across functions. As the leader, what is your best approach?", options: [
        { id: "A", text: "Take ownership, debrief the failure, and focus on learning points." }, { id: "B", text: "Defend my team and point out where others went wrong." }, { id: "C", text: "Propose an objective cross-functional review to address root causes." }, { id: "D", text: "Quietly make adjustments without drawing attention to the failure." }, { id: "E", text: "Escalate to leadership that we need process changes." }, { id: "F", text: "Downplay the issue and move on quickly to the next task." }
    ], bestAnswer: "A" },
    { id: 126, perspective: "Candidate's Own Perspective", question: "A junior employee proposes an idea that could disrupt current processes but has potential. What's the most effective response?", options: [
        { id: "A", text: "Explore the idea further and guide them to build a strong case." }, { id: "B", text: "Praise the effort but shelve the idea to avoid disruption." }, { id: "C", text: "Ask the team to critique and challenge the proposal rigorously." }, { id: "D", text: "Adopt it immediately to show openness to innovation." }, { id: "E", text: "Quietly test the idea on a small scale without involving others." }, { id: "F", text: "Encourage more such ideas but delay acting on this one." }
    ], bestAnswer: "A" },
    { id: 127, perspective: "Candidate's Own Perspective", question: "You notice that silent team members rarely contribute in critical discussions. How should you strengthen collective intelligence and inclusion?", options: [
        { id: "A", text: "Actively draw them in and create formats where they feel safe to speak." }, { id: "B", text: "Accept that some people prefer to observe rather than contribute." }, { id: "C", text: "Arrange smaller forums where quieter voices can be heard." }, { id: "D", text: "Let the stronger contributors drive decisions for efficiency." }, { id: "E", text: "Escalate concerns of disengagement to HR or my manager." }, { id: "F", text: "Wait for them to speak up in their own time." }
    ], bestAnswer: "A" },
    { id: 128, perspective: "Candidate's Own Perspective", question: "The company is under pressure to cut costs. You're asked for ideas to trim your team's budget. What's your best course of action?", options: [
        { id: "A", text: "Engage my team to identify efficiencies without hurting key outcomes." }, { id: "B", text: "Quietly trim low-visibility costs without consultation." }, { id: "C", text: "Propose cuts only where I know they'll be least noticed." }, { id: "D", text: "Defend the budget and argue cuts will damage results." }, { id: "E", text: "Escalate the need for a broader cost-sharing approach across teams." }, { id: "F", text: "Delay suggestions and hope the pressure eases." }
    ], bestAnswer: "A" },
    { id: 129, perspective: "Candidate's Own Perspective", question: "A high-value client complains that your team isn't meeting expectations. How do you respond?", options: [
        { id: "A", text: "Meet the client personally, listen deeply, and co-create a recovery plan." }, { id: "B", text: "Reassure the client and quietly ask the team to improve." }, { id: "C", text: "Escalate internally and seek help addressing the gaps." }, { id: "D", text: "Defend the team's efforts and explain external challenges." }, { id: "E", text: "Propose a formal review of our service model." }, { id: "F", text: "Downplay the issue to prevent alarm." }
    ], bestAnswer: "A" },
    { id: 130, perspective: "Candidate's Own Perspective", question: "Your manager publicly criticizes your team unfairly in a senior meeting. What's the best leadership reaction?", options: [
        { id: "A", text: "Address it calmly in the meeting and defend my team factually." }, { id: "B", text: "Stay silent in the meeting and debrief my team later." }, { id: "C", text: "Escalate the issue through formal channels." }, { id: "D", text: "Quietly work on improving areas of perceived weakness." }, { id: "E", text: "Confront the manager privately and express my concerns." }, { id: "F", text: "Let it go to avoid further conflict." }
    ], bestAnswer: "E" },
    { id: 131, perspective: "Candidate's Own Perspective", question: "The company wants faster innovation, but your team is overwhelmed managing existing commitments. How do you balance delivering today with building for the future?", options: [
        { id: "A", text: "Engage the team to co-design a plan that protects delivery while creating space for innovation." }, { id: "B", text: "Quietly push the team to work harder and stretch for both objectives." }, { id: "C", text: "Delay new initiatives until we stabilize current work." }, { id: "D", text: "Propose that leadership prioritize initiatives or provide more resources." }, { id: "E", text: "Experiment with small pilot innovations that don't derail core work." }, { id: "F", text: "Focus on delivering today's work and revisit innovation later." }
    ], bestAnswer: "A" },
    { id: 132, perspective: "Candidate's Own Perspective", question: "A respected senior colleague is making decisions that undermine cross-functional trust. You disagree, but they have more authority. What's your best move?", options: [
        { id: "A", text: "Propose a joint session to realign goals and address tensions constructively." }, { id: "B", text: "Quietly adjust my plans to minimize the damage without confrontation." }, { id: "C", text: "Escalate my concerns to leadership for intervention." }, { id: "D", text: "Seek informal allies to build a case for change." }, { id: "E", text: "Challenge the colleague directly and risk the conflict." }, { id: "F", text: "Let the situation play out rather than create political risk." }
    ], bestAnswer: "A" },
    { id: 133, perspective: "Candidate's Own Perspective", question: "A new competitor is disrupting your market with technology your company hasn't invested in. How do you lead your team in this uncertainty?", options: [
        { id: "A", text: "Gather the team to assess threats, opportunities, and propose a response plan." }, { id: "B", text: "Reassure them and maintain focus on our current strengths." }, { id: "C", text: "Escalate the concern to senior leadership for strategic action." }, { id: "D", text: "Quietly explore partnerships or vendors to bridge our gap." }, { id: "E", text: "Delay major action and observe how the disruption unfolds." }, { id: "F", text: "Push my team to match the competitor's moves immediately." }
    ], bestAnswer: "A" },
    { id: 134, perspective: "Candidate's Own Perspective", question: "Your most trusted lieutenant strongly disagrees with your approach on a key project and challenges you openly. How do you handle this?", options: [
        { id: "A", text: "Listen deeply, explore their reasoning, and seek a shared solution." }, { id: "B", text: "Acknowledge their view but stick firmly to my plan." }, { id: "C", text: "De-escalate and discuss privately later." }, { id: "D", text: "Adjust my plan to accommodate their position to keep unity." }, { id: "E", text: "Escalate the disagreement for arbitration." }, { id: "F", text: "View the challenge as disloyal and address it assertively." }
    ], bestAnswer: "A" },
    { id: 135, perspective: "Candidate's Own Perspective", question: "You discover that informal cliques have formed in your team, impacting morale and collaboration. What's your most effective action?", options: [
        { id: "A", text: "Work to rebuild inclusiveness through team initiatives and one-on-ones." }, { id: "B", text: "Quietly monitor and hope the cliques dissolve naturally." }, { id: "C", text: "Directly confront the groups and demand better behavior." }, { id: "D", text: "Propose cross-functional assignments to break down barriers." }, { id: "E", text: "Escalate the issue to HR or senior management." }, { id: "F", text: "Focus on high performers and let others self-manage." }
    ], bestAnswer: "D" },
    { id: 136, perspective: "Candidate's Own Perspective", question: "The CEO announces a change in company direction that you feel is risky and poorly communicated. What's your best leadership response?", options: [
        { id: "A", text: "Help my team process the change and align while sharing constructive feedback upwards." }, { id: "B", text: "Defend the CEO's decision fully to ensure stability." }, { id: "C", text: "Express my concerns openly in leadership meetings." }, { id: "D", text: "Quietly advise my team but avoid pushing back at senior levels." }, { id: "E", text: "Delay alignment until the direction is clearer." }, { id: "F", text: "Rally my team to execute while seeking informal clarity on risks." }
    ], bestAnswer: "A" },
    { id: 137, perspective: "Candidate's Own Perspective", question: "A long-time client offers you a large deal with terms that stretch ethical boundaries. How should you lead this situation?", options: [
        { id: "A", text: "Escalate and seek guidance while explaining risks clearly to the client." }, { id: "B", text: "Agree to the deal but document my concerns for the record." }, { id: "C", text: "Negotiate terms that meet our ethical standards." }, { id: "D", text: "Refuse the deal outright to protect the company's integrity." }, { id: "E", text: "Quietly accept and manage the risks as they arise." }, { id: "F", text: "Delay commitment while exploring options." }
    ], bestAnswer: "D" },
    { id: 138, perspective: "Candidate's Own Perspective", question: "The company is pushing digital transformation, but several senior team members resist learning new tools and ways of working. How do you lead this shift?", options: [
        { id: "A", text: "Model the change myself and provide coaching and support to the team." }, { id: "B", text: "Mandate the change and enforce compliance." }, { id: "C", text: "Give them time and hope peer pressure drives adoption." }, { id: "D", text: "Propose external training and resources to ease the transition." }, { id: "E", text: "Escalate to HR or leadership that stronger action is needed." }, { id: "F", text: "Quietly adjust workloads to favor those embracing the change." }
    ], bestAnswer: "A" },
    { id: 139, perspective: "Candidate's Own Perspective", question: "You are asked to lead a cross-functional team where key players have personal conflicts. What's your most effective leadership move?", options: [
        { id: "A", text: "Set shared goals and create norms that emphasize collaboration." }, { id: "B", text: "Accept that some conflict is natural and proceed." }, { id: "C", text: "Have private conversations to understand and address concerns." }, { id: "D", text: "Escalate to leadership to mediate the issues." }, { id: "E", text: "Let the work unfold and see if the conflict resolves itself." }, { id: "F", text: "Split responsibilities to minimize their interaction." }
    ], bestAnswer: "C" },
    */
    { id: 140, perspective: "Candidate's Own Perspective", question: "A strategic partner fails to deliver on commitments, putting your project at risk. How do you demonstrate leadership in this crisis?", options: [
        { id: "A", text: "Engage the partner constructively while developing a contingency plan." }, { id: "B", text: "Escalate immediately to leadership demanding intervention." }, { id: "C", text: "Adjust internal plans and quietly work around the issue." }, { id: "D", text: "Confront the partner firmly about the consequences." }, { id: "E", text: "Focus on short-term fixes and address root issues later." }, { id: "F", text: "Delay reaction until more information is available." }
    ], bestAnswer: "A" }
]
};

// --- API Routes ------

// Route to send the full case study and questions to the frontend
app.get('/api/case-study', (req, res) => {
    // We remove the 'bestAnswer' key before sending to the frontend to prevent cheating.
    const questionsForFrontend = caseStudyData.questions.map(({ bestAnswer, ...rest }) => rest);
    res.json({ ...caseStudyData, questions: questionsForFrontend });
});

// Route to evaluate the user's answers and return a report
app.post('/api/evaluate', async (req, res) => {
    const { answers } = req.body;

    // Create a detailed analysis context for the AI
    const analysisContext = caseStudyData.questions
        .filter(q => answers[q.id])
        .map(q => {
            const userAnswerObj = q.options.find(o => o.id === answers[q.id]);
            const bestAnswerObj = q.options.find(o => o.id === q.bestAnswer);
            const competency = competencyMap[q.id] || "General HR Skills";

            return {
                questionId: q.id,
                competency: competency,
                userAnswer: userAnswerObj ? userAnswerObj.text : "No answer provided",
                bestAnswer: bestAnswerObj ? bestAnswerObj.text : "N/A",
                isCorrect: userAnswerObj && bestAnswerObj ? userAnswerObj.id === bestAnswerObj.id : false
            };
        });

    // Create a new, highly-specific system prompt
// Create the new, comprehensive system prompt
const systemPrompt = `
You are an expert leadership assessment AI. Your task is to analyze the user's responses to a leadership simulation and generate a comprehensive, multi-part report in a strict JSON format.

**CRITICAL INSTRUCTIONS:**
1.  **JSON ONLY:** Your entire response MUST be a single, valid JSON object. Do not include any text or formatting outside of this JSON object.
2.  **ANALYZE DEEPLY:** Your analysis must be profound and multi-dimensional. Do not just state if an answer was right or wrong. Explain the 'why' behind the user's choices, referencing their specific answers and the implications for their leadership style in a dynamic, high-stakes environment.
3.  **ADHERE TO THE STRUCTURE:** The final JSON object must follow the exact structure outlined below.

**JSON OUTPUT STRUCTURE:**

{
  "narrativeAnalysis": {
    "introduction": "Start with a brief, insightful summary of the user's core leadership philosophy as revealed by their choices.",
    "parameters": [
      {
        "name": "Strategic Judgment",
        "evaluation": "Provide a 100-word analysis on their ability to balance short-term wins with long-term positioning and the quality of their big-picture thinking.",
        "strengths": ["List 1-2 key strengths demonstrated in this area."],
        "gaps": ["List 1-2 key gaps or areas for development in this area."]
      },
      // ... Generate a block for EACH of the 18 parameters from the list below ...
      // (Strategic Judgment, Decision-Making, Stakeholder Alignment, Ethical Leadership, Emotional Intelligence, Team Empowerment, Resilience, Innovation, Conflict Resolution, Change Leadership, Self-Regulation, Collaboration, Customer-Centricity, Accountability, Agility, Courage, Communication, Prioritization)
    ]
  },
  "metaCognitiveAnalysis": {
    "introduction": "An introductory sentence about the deeper behavioral patterns observed.",
    "qualities": [
      {
        "name": "Critical Thinking Agility",
        "evaluation": "Analyze how well they navigate complex trade-offs versus seeking simple answers. Evaluate their ability to integrate diverse information."
      },
      // ... Generate a block for EACH of the 9 meta-cognitive qualities below ...
      // (Critical Thinking Agility, Perspective-Taking, Situational Awareness, Consistency of Values, Patience vs. Impulsiveness, Political Savvy, Bias Toward Action, Tolerance for Ambiguity, Risk Appetite)
    ]
  },
  "cognitivePatterns": {
    "introduction": "An introductory sentence about the observed cognitive patterns.",
    "patterns": [
      {
        "name": "Holistic Vs. Fragmented Thinker",
        "evaluation": "In about 100 words, assess whether the candidate connects dots across the organization or focuses on isolated issues."
      },
      {
        "name": "Ethics-centered Vs. Outcome-centered Decision Maker",
        "evaluation": "In about 100 words, assess if their decisions are guided by principles or driven purely by desired results."
      },
      {
        "name": "Micro-manager Vs. Delegator vs. Empowerer",
        "evaluation": "In about 100 words, evaluate their tendency to control, assign tasks, or build capability in others."
      },
      {
        "name": "Collaborative Vs. Authoritarian Tendencies",
        "evaluation": "In about 100 words, assess whether they lean towards building consensus or directing action from the top."
      },
      {
        "name": "Proactive Strategist Vs. Reactive Problem Solver",
        "evaluation": "In about 100 words, evaluate if they tend to anticipate and shape the future or primarily respond to immediate problems."
      }
    ]
  },
  "scoringMatrix": {
    "introduction": "An introductory sentence for the scoring matrix.",
    "scores": [
      {
        "dimension": "Cognitive / Strategic",
        "parameters": [
          { "name": "Strategic Judgment", "score": "X/10", "rationale": "Provide a concise 3-line rationale for the score based on their answers." },
          // ... score for all 6 Cognitive/Strategic dimensions ...
        ]
      },
      {
        "dimension": "Interpersonal / Relational",
        "parameters": [
          { "name": "Emotional Intelligence", "score": "X/10", "rationale": "Provide a concise 3-line rationale for the score." },
          // ... score for all 8 Interpersonal/Relational dimensions ...
        ]
      },
      {
        "dimension": "Personal Mastery",
        "parameters": [
          { "name": "Ethical & Values-Based Leadership", "score": "X/10", "rationale": "Provide a concise 3-line rationale for the score." },
          // ... score for all 6 Personal Mastery dimensions ...
        ]
      }
    ]
  }
}
`;
    
    // Create the user prompt with the detailed context
    const userPrompt = `
        Please generate a detailed assessment report based on the following user data:
        ${JSON.stringify(analysisContext, null, 2)}
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo", // Using a more powerful model for better analysis
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });
        
        const rawContent = response.choices[0].message.content;

        try {
            const report = JSON.parse(rawContent);
            res.json(report);
        } catch (parseError) {
            console.error("FAILED TO PARSE JSON FROM OPENAI.", parseError);
            console.error("--- RAW AI RESPONSE THAT FAILED ---");
            console.log(rawContent);
            console.log("---------------------------------");
            res.status(500).json({ error: "The AI returned a response that was not valid JSON." });
        }
    } catch (apiError) {
        console.error("Error calling OpenAI API:", apiError);
        res.status(500).json({ error: "Failed to get a response from the OpenAI API." });
    }
});


// --- SERVER START LOGIC ---
// This block will try to start an HTTPS server, but will fall back to HTTP if SSL certs are not found.
try {
    // Attempt to read the SSL certificate files for HTTPS
    const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/api.majormod.xyz/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/api.majormod.xyz/fullchain.pem')
    };

    // If successful, create and start the HTTPS server (for your deployed server)
    https.createServer(options, app).listen(port, () => {
      console.log(`HTTPS server listening on port ${port}`);
    });

} catch (error) {
    // If reading the cert files fails (because we are on a local machine), this catch block will run.
    if (error.code === 'ENOENT') {
        console.log("SSL certs not found. Starting a standard HTTP server for local development.");
        
        // Create and start a standard HTTP server
        http.createServer(app).listen(port, () => {
            console.log(`HTTP server listening on http://localhost:${port}`);
        });
    } else {
        // If there's some other error, log it.
        console.error("An error occurred during server startup:", error);
    }
}