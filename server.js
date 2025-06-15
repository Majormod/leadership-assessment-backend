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
const competencyMap = {
    // Sales VP Rajesh Mehta (1-20)
    1: "Talent Acquisition & Retention", 2: "Strategic HR Leadership", 3: "People & Stakeholder Management", 4: "Talent Acquisition & Retention", 5: "Ethical & Compliance Judgment", 6: "Strategic HR Leadership", 7: "Interdepartmental Collaboration", 8: "Talent Acquisition & Retention", 9: "Ethical & Compliance Judgment", 10: "Strategic HR Leadership", 11: "Ethical & Compliance Judgment", 12: "People & Stakeholder Management", 13: "Talent Acquisition & Retention", 14: "Talent Acquisition & Retention", 15: "Talent Acquisition & Retention", 16: "Interdepartmental Collaboration", 17: "Strategic HR Leadership", 18: "People & Stakeholder Management", 19: "People & Stakeholder Management", 20: "Strategic HR Leadership",
    // CHRO (21-40)
    21: "Interdepartmental Collaboration", 22: "Decision-Making & Crisis Handling", 23: "Talent Acquisition & Retention", 24: "People & Stakeholder Management", 25: "Ethical & Compliance Judgment", 26: "Ethical & Compliance Judgment", 27: "People & Stakeholder Management", 28: "Decision-Making & Crisis Handling", 29: "Strategic HR Leadership", 30: "Strategic HR Leadership", 31: "Strategic HR Leadership", 32: "People & Stakeholder Management", 33: "Interdepartmental Collaboration", 34: "Interdepartmental Collaboration", 35: "Strategic HR Leadership", 36: "Ethical & Compliance Judgment", 37: "People & Stakeholder Management", 38: "Ethical & Compliance Judgment", 39: "Strategic HR Leadership", 40: "Strategic HR Leadership",
    // HR Professional (41-60)
    41: "Talent Acquisition & Retention", 42: "People & Stakeholder Management", 43: "Ethical & Compliance Judgment", 44: "Strategic HR Leadership", 45: "Decision-Making & Crisis Handling", 46: "Ethical & Compliance Judgment", 47: "People & Stakeholder Management", 48: "Talent Acquisition & Retention", 49: "Talent Acquisition & Retention", 50: "Decision-Making & Crisis Handling", 51: "Ethical & Compliance Judgment", 52: "People & Stakeholder Management", 53: "Ethical & Compliance Judgment", 54: "Strategic HR Leadership", 55: "Ethical & Compliance Judgment", 56: "People & Stakeholder Management", 57: "Decision-Making & Crisis Handling", 58: "Decision-Making & Crisis Handling", 59: "People & Stakeholder Management", 60: "Talent Acquisition & Retention",
    // Admin Manager (61-80)
    61: "Decision-Making & Crisis Handling", 62: "Interdepartmental Collaboration", 63: "People & Stakeholder Management", 64: "Decision-Making & Crisis Handling", 65: "Ethical & Compliance Judgment", 66: "Decision-Making & Crisis Handling", 67: "Interdepartmental Collaboration", 68: "People & Stakeholder Management", 69: "Interdepartmental Collaboration", 70: "People & Stakeholder Management", 71: "People & Stakeholder Management", 72: "Decision-Making & Crisis Handling", 73: "Strategic HR Leadership", 74: "Decision-Making & Crisis Handling", 75: "Ethical & Compliance Judgment", 76: "Ethical & Compliance Judgment", 77: "Interdepartmental Collaboration", 78: "Ethical & Compliance Judgment", 79: "Interdepartmental Collaboration", 80: "Interdepartmental Collaboration",
    // HR Manager (81-100)
    81: "Talent Acquisition & Retention", 82: "Ethical & Compliance Judgment", 83: "Talent Acquisition & Retention", 84: "Talent Acquisition & Retention", 85: "People & Stakeholder Management", 86: "Strategic HR Leadership", 87: "Decision-Making & Crisis Handling", 88: "People & Stakeholder Management", 89: "Ethical & Compliance Judgment", 90: "Ethical & Compliance Judgment", 91: "People & Stakeholder Management", 92: "People & Stakeholder Management", 93: "People & Stakeholder Management", 94: "Strategic HR Leadership", 95: "People & Stakeholder Management", 96: "Ethical & Compliance Judgment", 97: "Talent Acquisition & Retention", 98: "Interdepartmental Collaboration", 99: "Ethical & Compliance Judgment", 100: "Talent Acquisition & Retention",
    // Talent Acquisition Manager (101-120)
    101: "Interdepartmental Collaboration", 102: "Decision-Making & Crisis Handling", 103: "Talent Acquisition & Retention", 104: "Ethical & Compliance Judgment", 105: "Talent Acquisition & Retention", 106: "Talent Acquisition & Retention", 107: "Ethical & Compliance Judgment", 108: "Ethical & Compliance Judgment", 109: "People & Stakeholder Management", 110: "Decision-Making & Crisis Handling", 111: "Talent Acquisition & Retention", 112: "Strategic HR Leadership", 113: "Ethical & Compliance Judgment", 114: "Strategic HR Leadership", 115: "People & Stakeholder Management", 116: "People & Stakeholder Management", 117: "Strategic HR Leadership", 118: "Interdepartmental Collaboration", 119: "Ethical & Compliance Judgment", 120: "Strategic HR Leadership",
    // Managing Director (121-140)
    121: "Strategic HR Leadership", 122: "Interdepartmental Collaboration", 123: "Decision-Making & Crisis Handling", 124: "Talent Acquisition & Retention", 125: "Decision-Making & Crisis Handling", 126: "Talent Acquisition & Retention", 127: "Strategic HR Leadership", 128: "People & Stakeholder Management", 129: "Strategic HR Leadership", 130: "People & Stakeholder Management", 131: "Strategic HR Leadership", 132: "Strategic HR Leadership", 133: "Decision-Making & Crisis Handling", 134: "People & Stakeholder Management", 135: "Talent Acquisition & Retention", 136: "People & Stakeholder Management", 137: "Decision-Making & Crisis Handling", 138: "Decision-Making & Crisis Handling", 139: "Decision-Making & Crisis Handling", 140: "People & Stakeholder Management",
    // External B2B Customer (141-160)
    141: "Interdepartmental Collaboration", 142: "Interdepartmental Collaboration", 143: "Interdepartmental Collaboration", 144: "Decision-Making & Crisis Handling", 145: "Interdepartmental Collaboration", 146: "Decision-Making & Crisis Handling", 147: "Interdepartmental Collaboration", 148: "Interdepartmental Collaboration", 149: "Decision-Making & Crisis Handling", 150: "Decision-Making & Crisis Handling", 151: "Interdepartmental Collaboration", 152: "Decision-Making & Crisis Handling", 153: "Strategic HR Leadership", 154: "Decision-Making & Crisis Handling", 155: "Ethical & Compliance Judgment", 156: "People & Stakeholder Management", 157: "Interdepartmental Collaboration", 158: "Strategic HR Leadership", 159: "Ethical & Compliance Judgment", 160: "People & Stakeholder Management"
};

// --- Your Application Data ---
const caseStudyData = {
    title: "The Vanishing Deals Dilemma",
    background: "Crestone Technologies, a leading B2B SaaS company, has been experiencing a steep decline in sales performance over the past six months. The company, known for its enterprise automation solutions, primarily caters to mid-sized businesses and large corporations. However, despite a strong product-market fit and competitive pricing, the sales team has been unable to close key deals, leading to growing frustration at the leadership level. The issue is not just numbers-it's a complex mix of people, processes, and organizational culture.",
    characters: [
        { name: "Rajesh Mehta (Sales VP)", description: "A veteran in the industry, pushing for aggressive sales targets and attributing the slump to a lack of motivation among sales reps. He believes HR's hiring and retention strategy is failing, and administrative inefficiencies are also affecting performance." },
        { name: "Aparna Sen (CHRO)", description: "A strategic HR leader who is focused on long-term talent development, but is caught between leadership's aggressive demands and her commitment to sustainable, people-first policies." },
        { name: "Sandeep Varma (Admin Manager)", description: "Responsible for office operations and support functions. He's been receiving complaints about increased absenteeism and lower morale among sales team members." },
        { name: "Neha Khanna (HR Manager)", description: "Directly involved with employee engagement, performance appraisals, and workplace policies. She has noticed a pattern of high attrition in the sales team, but her attempts to raise alarms with leadership have not been taken seriously." },
        { name: "Nishant Kapoor (Talent Acquisition Manager)", description: "Struggling to fill sales roles fast enough due to an increasing number of resignations and a shrinking talent pool. His concern is that many high-performing candidates are rejecting offers due to negative Glassdoor reviews and industry rumors about the company's 'toxic' sales culture." },
        { name: "Vikram Nair (Managing Director)", description: "The ultimate decision-maker. Concerned about the company's reputation and bottom line, he wants a rapid turnaround strategy that balances employee well-being with business results." },
        { name: "Arvind Saxena (External B2B Customer)", description: "A key decision-maker at a large corporation that was close to signing a long-term contract with Crestone Technologies but backed out at the last moment due to concerns about the sales team's follow-up and consistency." }
    ],
    crisis: "Crestone Technologies is facing a critical business challenge: three major deals, collectively worth millions, have collapsed in the last quarter. These deals were in the final stages, and their failure has sent shockwaves throughout the organization. The immediate impact is a severe revenue shortfall, but the deeper problem is the growing perception that the company is unreliable. Clients have cited inconsistent communication, frequent changes in account managers, and a general sense of internal chaos as key reasons for walking away.\n\nTensions are escalating between departments. The Sales VP, Rajesh Mehta, has aggressively blamed HR, arguing that the high attrition rate is the primary cause of sales instability. He insists that HR has failed to hire and retain strong salespeople, which has led to constant turnover and disrupted client relationships. He also believes that administrative inefficiencies, such as delays in processing travel reimbursements and inadequate operational support, have lowered morale and slowed deal closures.\n\nOn the HR side, Neha Khanna, the HR Manager, sees a different picture. She has been tracking employee exit interviews, and the data reveals a troubling trend: the sales team is overworked, underappreciated, and struggling with an unsustainable culture of high-pressure targets. Many employees cite burnout, lack of career development, and toxic management practices as their reasons for leaving.\n\nThe Talent Acquisition Manager, Nishant Kapoor, is also facing an uphill battle. His recruitment efforts are yielding fewer results as word spreads about the company's harsh work environment. High-performing candidates are declining offers, and existing employees are leaving faster than he can replace them. The company's Glassdoor ratings are deteriorating, and some former employees have publicly criticized Crestone's leadership on LinkedIn, further damaging employer branding.\n\nAdding to the complexity, the Admin Manager, Sandeep Varma, has received multiple reports of increased sick leaves, disengagement, and unproductive work habits among sales team members. Some salespeople have expressed frustration over delayed commission payouts, poor administrative support, and constant changes in team structures. These operational gaps are compounding the already fragile work environment.\n\nMeanwhile, Managing Director Vikram Nair is under immense pressure from investors and the board. He has demanded an urgent, comprehensive solution to stabilize the company before it suffers lasting reputational damage. He wants an aggressive turnaround strategy but expects it to be executed without alienating the workforce or compromising future growth.\n\nFinally, Arvind Saxena, the external B2B customer who backed out of a major contract, has provided feedback that exposes a deeper issue: he lost confidence in Crestone's ability to provide a seamless customer experience. His company dealt with three different sales reps within a short span, all of whom had different negotiation styles and varying levels of understanding about his business. The lack of continuity and professionalism led him to take his business elsewhere.\n\nThe internal discord at Crestone Technologies is reaching a boiling point. HR is now at the center of this crisis, expected to fix a workforce problem that has spiralled into a full-scale business challenge. But with conflicting demands from sales leadership, employee dissatisfaction, and declining employer reputation, how can the HR team find a path forward?",
    challenges: {
        intro: "The HR team is now faced with one of the most complex crises in the company's history, where the issues extend beyond hiring and retention to touch nearly every aspect of business performance. Addressing this crisis requires a multi-pronged approach that balances immediate action with long-term strategy.",
        areas: [
            {
                title: "1. Talent Acquisition & Retention Challenges",
                points: ["How can HR quickly attract and retain high-quality sales talent when the company's employer brand is deteriorating?", "How can the recruitment process be streamlined to address the urgent hiring needs while maintaining quality?", "Can internal mobility programs be leveraged to redeploy talent from other departments?"]
            },
            {
                title: "2. Workplace Culture & Employee Morale",
                points: ["Sales professionals cite burnout and high-pressure targets as key reasons for leaving. How can HR introduce realistic performance expectations while keeping the business competitive?", "What role does leadership play in shaping a culture that fosters engagement rather than fear-driven productivity?", "Can HR design and implement a structured employee feedback loop that ensures concerns are heard and acted upon?"]
            },
            {
                title: "3. Leadership Alignment & Conflict Resolution",
                points: ["The Sales VP is blaming HR, while HR is pointing out deeper systemic issues. How can HR mediate this conflict and bring both sides to a constructive resolution?", "How can HR help sales leadership transition from a short-term, numbers-driven approach to a more sustainable, people-focused strategy?", "What training programs can be introduced to enhance leadership skills among managers and team leads?"]
            },
            {
                title: "4. Operational & Administrative Gaps",
                points: ["Sales team members complain about delayed commissions and poor administrative support. How can HR and Admin collaborate to resolve these bottlenecks?", "Can HR influence policies around compensation, recognition, and rewards to ensure timely incentives for salespeople?", "Can HR introduce technology-driven solutions to streamline internal operations and reduce inefficiencies?"]
            },
            {
                title: "5. External Perception & Customer Experience",
                points: ["The external customer who backed out highlighted inconsistencies in sales interactions. How can HR influence customer experience when it's not a direct HR function?", "Can HR partner with the sales team to provide training on relationship management and communication skills?", "Should HR implement a more structured onboarding program to ensure new sales hires are well-prepared to represent the company professionally?"]
            }
        ]
    },
    questions: [
      {
        "id": 1, "perspective": "Sales VP Rajesh Mehta", "question": "A top-performing sales executive has suddenly resigned, citing burnout and lack of work-life balance. Rajesh Mehta demands an immediate replacement. How should HR respond?",
        "options": [
          { "id": "A", "text": "Conduct exit interviews, analyze burnout causes, and propose role restructuring." }, { "id": "B", "text": "Start recruitment immediately but request Rajesh to allow time for hiring quality talent." }, { "id": "C", "text": "Quickly promote a junior employee without assessing readiness." }, { "id": "D", "text": "Offer a counteroffer to retain the employee without addressing underlying issues." }, { "id": "E", "text": "Blame workload expectations and advise Rajesh to reduce targets." }, { "id": "F", "text": "Do nothing and let Rajesh manage the situation himself." }
        ], "bestAnswer": "A"
      },
      {
        "id": 2, "perspective": "Sales VP Rajesh Mehta", "question": "Sales performance has dropped 15% in the last quarter. Rajesh believes hiring more aggressive salespeople is the solution. What should HR do?",
        "options": [
          { "id": "A", "text": "Conduct a root cause analysis to determine if training, workload, or processes are contributing factors." }, { "id": "B", "text": "Start recruiting more salespeople immediately to increase manpower." }, { "id": "C", "text": "Suggest firing underperformers before hiring new employees." }, { "id": "D", "text": "Agree with Rajesh's perspective and focus only on hiring aggressive sales profiles." }, { "id": "E", "text": "Recommend investing in technology-driven sales tools instead of hiring." }, { "id": "F", "text": "Ignore Rajesh's concerns and let the sales team figure it out." }
        ], "bestAnswer": "A"
      },
      {
        "id": 3, "perspective": "Sales VP Rajesh Mehta", "question": "The HR team has implemented a new incentive policy, but Rajesh complains that it is demotivating the team. How should HR handle this?",
        "options": [
          { "id": "A", "text": "Conduct a pulse survey to gather feedback and refine the incentive structure." }, { "id": "B", "text": "Ask Rajesh to communicate the benefits of the new structure better." }, { "id": "C", "text": "Modify the policy without data, based solely on Rajesh's feedback." }, { "id": "D", "text": "Keep the policy unchanged and tell Rajesh that adjustments will be reviewed in a year." }, { "id": "E", "text": "Scrap the new policy and revert to the previous model to avoid complaints." }, { "id": "F", "text": "Ignore Rajesh's concerns and let the dissatisfaction persist." }
        ], "bestAnswer": "A"
      },
      {
        "id": 4, "perspective": "Sales VP Rajesh Mehta", "question": "A major B2B client has complained about inconsistent service due to high employee turnover. Rajesh blames HR for not retaining top sales talent. What is the best HR response?",
        "options": [
          { "id": "A", "text": "Analyze exit interview data, identify turnover reasons, and propose retention strategies." }, { "id": "B", "text": "Increase salaries for top salespeople without reviewing other retention factors." }, { "id": "C", "text": "Shift blame to Rajesh's leadership style and avoid HR involvement." }, { "id": "D", "text": "Ask Rajesh to resolve the issue directly with the client while HR works on hiring." }, { "id": "E", "text": "Implement a stay interview process for existing employees to prevent further exits." }, { "id": "F", "text": "Ignore the client complaint as an isolated issue." }
        ], "bestAnswer": "A"
      },
      {
        "id": 5, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh wants to fire a sales employee for underperformance without following HR policies. How should HR respond?",
        "options": [
          { "id": "A", "text": "Enforce performance management processes and offer coaching before termination." }, { "id": "B", "text": "Allow Rajesh to fire the employee but offer severance to avoid legal issues." }, { "id": "C", "text": "Fast-track termination to avoid team disruption." }, { "id": "D", "text": "Suggest transferring the employee to a different sales role instead." }, { "id": "E", "text": "Delay the decision and observe the employee's performance for another quarter." }, { "id": "F", "text": "Approve the termination without following due process." }
        ], "bestAnswer": "A"
      },
      {
        "id": 6, "perspective": "Sales VP Rajesh Mehta", "question": "The HR team is proposing a new flexible work policy, but Rajesh argues that sales teams must be in-office for maximum productivity. What should HR do?",
        "options": [
          { "id": "A", "text": "Conduct a pilot test for flexibility with clear performance tracking." }, { "id": "B", "text": "Implement full flexibility despite Rajesh's concerns." }, { "id": "C", "text": "Reject the proposal and mandate full office presence." }, { "id": "D", "text": "Offer flexibility only for non-client-facing sales roles." }, { "id": "E", "text": "Let Rajesh decide and adjust policies only for the sales team." }, { "id": "F", "text": "Ignore the debate and keep existing policies unchanged." }
        ], "bestAnswer": "A"
      },
      {
        "id": 7, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh is struggling with a lack of collaboration between sales and marketing, leading to weak lead conversions. How should HR support this?",
        "options": [
          { "id": "A", "text": "Organize cross-functional workshops to improve alignment." }, { "id": "B", "text": "Hold a meeting with marketing to adjust their KPIs to fit sales objectives." }, { "id": "C", "text": "Advise Rajesh to manage the conflict internally without HR involvement." }, { "id": "D", "text": "Suggest hiring a third-party consultant to mediate the issue." }, { "id": "E", "text": "Shift blame to the marketing team and escalate the issue to the MD." }, { "id": "F", "text": "Ignore the issue and let the teams sort it out over time." }
        ], "bestAnswer": "A"
      },
      {
        "id": 8, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh has requested urgent hiring for three senior sales roles. However, the HR team is struggling with finding the right candidates. What is the best course of action?",
        "options": [
          { "id": "A", "text": "Communicate realistic timelines and offer interim solutions like internal promotions." }, { "id": "B", "text": "Expedite hiring even if it means compromising on quality." }, { "id": "C", "text": "Delay hiring and tell Rajesh to manage with the existing team." }, { "id": "D", "text": "Suggest outsourcing part of the recruitment process to speed up results." }, { "id": "E", "text": "Hire candidates without proper cultural fit assessment to meet the deadline." }, { "id": "F", "text": "Stop prioritizing these roles and focus on other HR initiatives." }
        ], "bestAnswer": "A"
      },
      {
        "id": 9, "perspective": "Sales VP Rajesh Mehta", "question": "A junior salesperson has filed an HR complaint against Rajesh for excessive pressure and unrealistic expectations. How should HR proceed?",
        "options": [
          { "id": "A", "text": "Conduct a fair investigation, ensuring Rajesh's perspective is also considered." }, { "id": "B", "text": "Dismiss the complaint as sales naturally involves pressure." }, { "id": "C", "text": "Take immediate action against Rajesh without investigating." }, { "id": "D", "text": "Transfer the salesperson to another team to avoid confrontation." }, { "id": "E", "text": "Ask Rajesh to have a one-on-one discussion with the employee instead of HR intervening." }, { "id": "F", "text": "Ignore the complaint to maintain leadership harmony." }
        ], "bestAnswer": "A"
      },
      {
        "id": 10, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh is pushing for an aggressive sales hiring target, but HR warns of budget constraints. What is the best way forward?",
        "options": [
          { "id": "A", "text": "Optimize current resources and explore upskilling for the existing team." }, { "id": "B", "text": "Increase hiring despite the budget constraints." }, { "id": "C", "text": "Reduce Rajesh's hiring targets without discussing alternatives." }, { "id": "D", "text": "Ask finance to increase the budget to accommodate Rajesh's needs." }, { "id": "E", "text": "Prioritize quality hires over quantity and extend the hiring timeline." }, { "id": "F", "text": "Ignore the budget issue and let Rajesh handle cost overruns later." }
        ], "bestAnswer": "A"
      },
      {
        "id": 11, "perspective": "Sales VP Rajesh Mehta", "question": "A key client has raised concerns about unethical sales tactics being used by Rajesh's team. How should HR handle this?",
        "options": [
          { "id": "A", "text": "Launch an internal ethics audit and reinforce compliance training." }, { "id": "B", "text": "Ignore the complaint unless legal action is threatened." }, { "id": "C", "text": "Publicly penalize the sales team to set an example." }, { "id": "D", "text": "Ask Rajesh to handle the issue internally without HR involvement." }, { "id": "E", "text": "Shift blame to individual employees rather than addressing systemic issues." }, { "id": "F", "text": "Defend the sales team without investigating further." }
        ], "bestAnswer": "A"
      },
      {
        "id": 12, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh believes that incentives should be entirely commission-based, while HR prefers a balanced salary-incentive model. What should HR do?",
        "options": [
          { "id": "A", "text": "Benchmark industry practices and propose a data-backed hybrid model." }, { "id": "B", "text": "Let Rajesh decide the structure for the sales team." }, { "id": "C", "text": "Implement HR's preference without consulting sales." }, { "id": "D", "text": "Fully shift to commission-based pay, as Rajesh suggests." }, { "id": "E", "text": "Conduct an employee survey before finalizing the model." }, { "id": "F", "text": "Avoid making changes and keep the current structure." }
        ], "bestAnswer": "A"
      },
      {
        "id": 13, "perspective": "Sales VP Rajesh Mehta", "question": "Sales managers are resigning due to lack of career progression. Rajesh is unaware of their frustrations. How should HR proceed?",
        "options": [
          { "id": "A", "text": "Conduct stay interviews and propose a structured career development plan." }, { "id": "B", "text": "Let Rajesh figure out why his managers are leaving." }, { "id": "C", "text": "Offer salary hikes to managers to retain them." }, { "id": "D", "text": "Ignore the resignations as a normal part of sales turnover." }, { "id": "E", "text": "Encourage Rajesh to provide informal mentorship instead of a formal growth plan." }, { "id": "F", "text": "Delay action and monitor the trend for a few more months." }
        ], "bestAnswer": "A"
      },
      {
        "id": 14, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh is frustrated with HR's slow hiring process and wants to bypass formal protocols. What is the best response?",
        "options": [
          { "id": "A", "text": "Streamline hiring without compromising quality, setting clear SLAs." }, { "id": "B", "text": "Allow Rajesh to make direct hiring decisions without HR involvement." }, { "id": "C", "text": "Keep hiring timelines unchanged, regardless of business urgency." }, { "id": "D", "text": "Push back against Rajesh's request without offering alternative solutions." }, { "id": "E", "text": "Accept delays as necessary to ensure compliance." }, { "id": "F", "text": "Use only internal referrals to speed up hiring." }
        ], "bestAnswer": "A"
      },
      {
        "id": 15, "perspective": "Sales VP Rajesh Mehta", "question": "A high-performing sales leader has received an offer from a competitor. Rajesh wants HR to counter-offer aggressively. What is the best way forward?",
        "options": [
          { "id": "A", "text": "Conduct a retention discussion focusing on long-term career growth." }, { "id": "B", "text": "Immediately match the competitor's offer." }, { "id": "C", "text": "Let the employee leave without discussion." }, { "id": "D", "text": "Create a counteroffer package without understanding the employee's concerns." }, { "id": "E", "text": "Conduct an exit interview but make no effort to retain." }, { "id": "F", "text": "Push the employee to decide quickly without further negotiation." }
        ], "bestAnswer": "A"
      },
      {
        "id": 16, "perspective": "Sales VP Rajesh Mehta", "question": "Sales and Product teams are in conflict—Sales wants quick feature releases, but Product insists on quality. Rajesh blames Product for lost deals. How should HR mediate?",
        "options": [
          { "id": "A", "text": "Set up a structured collaboration process with clear expectations." }, { "id": "B", "text": "Take Rajesh's side and pressure Product to release features faster." }, { "id": "C", "text": "Advise Rajesh to manage the conflict himself." }, { "id": "D", "text": "Ignore the issue and let the teams resolve it over time." }, { "id": "E", "text": "Suggest hiring more engineers to speed up product releases." }, { "id": "F", "text": "Allow Sales to make direct feature requests without involving Product." }
        ], "bestAnswer": "A"
      },
      {
        "id": 17, "perspective": "Sales VP Rajesh Mehta", "question": "A pattern emerges where only aggressive, extroverted employees are promoted in Rajesh's team. Introverts feel overlooked. How should HR address this?",
        "options": [
          { "id": "A", "text": "Develop a fair, competency-based promotion framework." }, { "id": "B", "text": "Let Rajesh continue using his current selection process." }, { "id": "C", "text": "Enforce quotas to ensure introverts are promoted." }, { "id": "D", "text": "Ask Rajesh to mentor introverted employees instead of changing promotion policies." }, { "id": "E", "text": "Conduct an anonymous feedback survey before making any changes." }, { "id": "F", "text": "Ignore the complaints and let team culture evolve naturally." }
        ], "bestAnswer": "A"
      },
      {
        "id": 18, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh's top-performing sales reps show signs of burnout—long hours, health issues, declining morale. How should HR intervene?",
        "options": [
          { "id": "A", "text": "Implement workload balancing and well-being initiatives." }, { "id": "B", "text": "Tell Rajesh that burnout is normal in high-performance teams." }, { "id": "C", "text": "Offer unlimited paid leave without adjusting targets." }, { "id": "D", "text": "Ignore the issue unless sales numbers drop significantly." }, { "id": "E", "text": "Replace overworked employees with fresh hires." }, { "id": "F", "text": "Reduce targets without discussing with Rajesh." }
        ], "bestAnswer": "A"
      },
      {
        "id": 19, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh has fostered a hyper-competitive culture—sales reps sabotage each other to win incentives. Team trust is low. What should HR do?",
        "options": [
          { "id": "A", "text": "Redesign incentives to encourage teamwork." }, { "id": "B", "text": "Let Rajesh continue with the current system since it drives results." }, { "id": "C", "text": "Assign HR mentors to guide new sales reps in handling competition." }, { "id": "D", "text": "Ban all sales incentives to eliminate unhealthy competition." }, { "id": "E", "text": "Conduct one-on-one coaching but keep incentives unchanged." }, { "id": "F", "text": "Let the situation play out naturally without interference." }
        ], "bestAnswer": "A"
      },
      {
        "id": 20, "perspective": "Sales VP Rajesh Mehta", "question": "Rajesh resists hiring diverse talent, arguing that past hires from the same demographic background have performed best. How should HR respond?",
        "options": [
          { "id": "A", "text": "Provide data-driven insights on the benefits of diversity." }, { "id": "B", "text": "Let Rajesh continue hiring as per his preferences." }, { "id": "C", "text": "Impose a strict diversity hiring quota." }, { "id": "D", "text": "Allow diversity hiring but only in non-revenue roles." }, { "id": "E", "text": "Conduct bias-awareness training but take no further action." }, { "id": "F", "text": "Ignore the issue since hiring decisions rest with Rajesh." }
        ], "bestAnswer": "A"
      },
      {
        "id": 21, "perspective": "CHRO", "question": "Rajesh Mehta (Sales VP) blames high attrition in his team on HR's hiring process, claiming new hires are not resilient enough for sales pressure. How should CHRO respond?",
        "options": [
          { "id": "A", "text": "Push back on Rajesh and state that attrition is a leadership issue, not an HR problem." }, { "id": "B", "text": "Agree with Rajesh and revamp the hiring process to prioritize aggressive sales professionals." }, { "id": "C", "text": "Initiate a deeper analysis of attrition trends before making changes." }, { "id": "D", "text": "Introduce resilience training and coaching programs for new hires." }, { "id": "E", "text": "Conduct exit interviews and gather feedback to validate Rajesh's claims before acting." }, { "id": "F", "text": "Do nothing-sales is a tough role, and attrition is expected." }
        ], "bestAnswer": "C"
      },
      {
        "id": 22, "perspective": "CHRO", "question": "The Managing Director (MD) demands an immediate 15% workforce reduction across all departments due to cost pressures. What is the best course of action?",
        "options": [
          { "id": "A", "text": "Execute the layoffs immediately as per the MD's directive." }, { "id": "B", "text": "Negotiate with the MD to explore alternative cost-cutting measures first." }, { "id": "C", "text": "Ask department heads to nominate employees for termination based on performance." }, { "id": "D", "text": "Analyze business impact and propose a phased workforce optimization plan." }, { "id": "E", "text": "Recommend a hiring freeze and salary restructuring instead of layoffs." }, { "id": "F", "text": "Refuse to implement the layoffs and challenge the MD's decision." }
        ], "bestAnswer": "B"
      },
      {
        "id": 23, "perspective": "CHRO", "question": "The Talent Acquisition Manager reports that top candidates are rejecting job offers due to compensation mismatches. How should CHRO address this?",
        "options": [
          { "id": "A", "text": "Increase salary offers to match market rates immediately." }, { "id": "B", "text": "Investigate if non-monetary benefits could attract candidates." }, { "id": "C", "text": "Benchmark competitor salaries and revise compensation strategy accordingly." }, { "id": "D", "text": "Ignore the issue-hiring will improve when the economy stabilizes." }, { "id": "E", "text": "Train recruiters to sell the company's culture and long-term growth instead of compensation." }, { "id": "F", "text": "Lower hiring standards to fill roles quickly." }
        ], "bestAnswer": "C"
      },
      {
        "id": 24, "perspective": "CHRO", "question": "HR's new performance management system is being resisted by senior managers who prefer the old methods. What should CHRO do?",
        "options": [
          { "id": "A", "text": "Enforce the new system strictly, regardless of manager resistance." }, { "id": "B", "text": "Gather feedback and make minor adjustments while keeping the core system intact." }, { "id": "C", "text": "Provide training sessions to help managers understand the benefits of the new system." }, { "id": "D", "text": "Allow teams to choose between the old and new systems." }, { "id": "E", "text": "Scale back implementation and only roll it out to receptive teams first." }, { "id": "F", "text": "Scrap the new system and revert to the old one to avoid conflict." }
        ], "bestAnswer": "C"
      },
      {
        "id": 25, "perspective": "CHRO", "question": "A senior executive is accused of misconduct by multiple employees, but they fear retaliation if they come forward. What should CHRO do?",
        "options": [
          { "id": "A", "text": "Launch an investigation while ensuring employee anonymity." }, { "id": "B", "text": "Inform the executive and ask them to explain their side." }, { "id": "C", "text": "Ignore the complaints unless formal reports are filed." }, { "id": "D", "text": "Recommend suspension of the executive pending investigation." }, { "id": "E", "text": "Discuss with legal and compliance teams before taking action." }, { "id": "F", "text": "Assume the complaints are politically motivated and take no action." }
        ], "bestAnswer": "A"
      },
      {
        "id": 26, "perspective": "CHRO", "question": "The Admin Manager has been repeatedly accused of favoritism in promotions. How should CHRO respond?",
        "options": [
          { "id": "A", "text": "Investigate the claims and ensure promotion decisions are transparent." }, { "id": "B", "text": "Conduct bias-awareness training for all managers." }, { "id": "C", "text": "Dismiss the complaints unless there is hard evidence." }, { "id": "D", "text": "Implement structured promotion criteria with cross-functional input." }, { "id": "E", "text": "Rotate promotion decisions to different teams to reduce bias risks." }, { "id": "F", "text": "Let the Admin Manager handle the issue independently." }
        ], "bestAnswer": "A"
      },
      {
        "id": 27, "perspective": "CHRO", "question": "Employee surveys indicate low engagement in the Sales team, despite competitive compensation. How should CHRO respond?",
        "options": [
          { "id": "A", "text": "Conduct focus groups to understand deeper engagement issues." }, { "id": "B", "text": "Increase monetary incentives to boost morale." }, { "id": "C", "text": "Ask Sales leadership to take ownership of engagement efforts." }, { "id": "D", "text": "Introduce non-monetary benefits like flexible work policies." }, { "id": "E", "text": "Provide leadership coaching for sales managers." }, { "id": "F", "text": "Ignore the survey results, as high turnover is normal in sales." }
        ], "bestAnswer": "A"
      },
      {
        "id": 28, "perspective": "CHRO", "question": "Rajesh Mehta wants HR to terminate a high-performing employee for 'not being a team player.' How should CHRO respond?",
        "options": [
          { "id": "A", "text": "Agree with Rajesh and process the termination." }, { "id": "B", "text": "Investigate and seek 360-degree feedback before deciding." }, { "id": "C", "text": "Transfer the employee to another department instead." }, { "id": "D", "text": "Counsel Rajesh on better conflict resolution instead of termination." }, { "id": "E", "text": "Challenge Rajesh's reasoning and insist on clear performance metrics." }, { "id": "F", "text": "Ignore the request unless legal risks are involved." }
        ], "bestAnswer": "B"
      },
      {
        "id": 29, "perspective": "CHRO", "question": "The company's DEI (Diversity, Equity, and Inclusion) initiatives have stalled due to leadership indifference. What should CHRO do?",
        "options": [
          { "id": "A", "text": "Make DEI initiatives voluntary for managers." }, { "id": "B", "text": "Create accountability metrics tied to leadership performance." }, { "id": "C", "text": "Focus on internal advocacy and education before making policy changes." }, { "id": "D", "text": "Drop the DEI program since leadership is not interested." }, { "id": "E", "text": "Enforce DEI hiring quotas across all departments." }, { "id": "F", "text": "Engage external consultants to drive DEI programs." }
        ], "bestAnswer": "B"
      },
      {
        "id": 30, "perspective": "CHRO", "question": "The Managing Director wants HR to reduce training budgets significantly. How should CHRO respond?",
        "options": [
          { "id": "A", "text": "Cut training programs as per the directive." }, { "id": "B", "text": "Demonstrate ROI of training programs with data." }, { "id": "C", "text": "Move training programs to low-cost virtual platforms." }, { "id": "D", "text": "Prioritize only leadership training while cutting other areas." }, { "id": "E", "text": "Reduce training in non-revenue departments only." }, { "id": "F", "text": "Resist the cuts, arguing employee development is non-negotiable." }
        ], "bestAnswer": "B"
      },
      {
        "id": 31, "perspective": "CHRO", "question": "The Sales VP argues that HR's policies on work-from-home (WFH) are making sales teams less productive.",
        "options": [
          { "id": "A", "text": "Remove WFH for the sales team and mandate full office presence." }, { "id": "B", "text": "Analyze performance data and consult sales managers for feedback." }, { "id": "C", "text": "Maintain the current WFH policy, as flexibility improves employee satisfaction." }, { "id": "D", "text": "Allow only senior sales executives to work remotely while restricting others." }
        ], "bestAnswer": "B"
      },
      {
        "id": 32, "perspective": "CHRO", "question": "A top-performing sales manager has received multiple complaints about toxic leadership behavior.",
        "options": [
          { "id": "A", "text": "Ignore the complaints since the manager is delivering strong results." }, { "id": "B", "text": "Offer leadership coaching and set behavioral improvement goals." }, { "id": "C", "text": "Immediately demote the manager to set an example." }, { "id": "D", "text": "Conduct a company-wide survey to understand if the issue is widespread." }
        ], "bestAnswer": "B"
      },
      {
        "id": 33, "perspective": "CHRO", "question": "The Admin Manager is pushing for stricter biometric attendance policies, but employees feel micromanaged.",
        "options": [
          { "id": "A", "text": "Implement the policy without discussion, as compliance is important." }, { "id": "B", "text": "Gather employee feedback and explore alternative attendance tracking methods." }, { "id": "C", "text": "Allow only certain teams to bypass biometric tracking." }, { "id": "D", "text": "Remove biometric tracking completely to avoid friction." }
        ], "bestAnswer": "B"
      },
      {
        "id": 34, "perspective": "CHRO", "question": "A client has refused to work with the sales team due to a past dispute with an employee.",
        "options": [
          { "id": "A", "text": "Support the sales team in fighting back and defending the employee." }, { "id": "B", "text": "Mediate a discussion between the client and relevant stakeholders." }, { "id": "C", "text": "Immediately reassign the employee to another role." }, { "id": "D", "text": "Ask the employee to issue a public apology." }
        ], "bestAnswer": "B"
      },
      {
        "id": 35, "perspective": "CHRO", "question": "The Managing Director is pushing for an aggressive hiring spree despite HR's concerns about talent availability.",
        "options": [
          { "id": "A", "text": "Follow orders and start mass hiring." }, { "id": "B", "text": "Present market hiring trends and propose a phased hiring strategy." }, { "id": "C", "text": "Delay hiring until a proper strategy is in place, regardless of business urgency." }, { "id": "D", "text": "Only hire from existing competitor companies to reduce risk." }
        ], "bestAnswer": "B"
      },
      {
        "id": 36, "perspective": "CHRO", "question": "An anonymous whistleblower report alleges unethical behavior by a senior leader.",
        "options": [
          { "id": "A", "text": "Conduct a discreet investigation while maintaining confidentiality." }, { "id": "B", "text": "Immediately confront the senior leader and demand an explanation." }, { "id": "C", "text": "Ignore the report unless more evidence emerges." }, { "id": "D", "text": "Publicly announce an internal probe to ensure transparency." }
        ], "bestAnswer": "A"
      },
      {
        "id": 37, "perspective": "CHRO", "question": "A long-term employee has been underperforming, but has strong internal relationships and is well-liked.",
        "options": [
          { "id": "A", "text": "Ignore performance issues to maintain team harmony." }, { "id": "B", "text": "Provide performance improvement support while maintaining fairness." }, { "id": "C", "text": "Transfer the employee to another department instead of addressing the issue." }, { "id": "D", "text": "Terminate the employee to maintain overall performance standards." }
        ], "bestAnswer": "B"
      },
      {
        "id": 38, "perspective": "CHRO", "question": "The Sales VP suggests bypassing standard hiring protocols to onboard a senior candidate quickly.",
        "options": [
          { "id": "A", "text": "Approve the exception since it's a senior hire." }, { "id": "B", "text": "Evaluate the urgency and see if adjustments can be made within ethical limits." }, { "id": "C", "text": "Reject the request outright to maintain strict hiring discipline." }, { "id": "D", "text": "Proceed with the hire and backfill compliance paperwork later." }
        ], "bestAnswer": "B"
      },
      {
        "id": 39, "perspective": "CHRO", "question": "Employees are disengaged with HR's training programs, citing outdated content.",
        "options": [
          { "id": "A", "text": "Continue with the existing programs, as training is mandatory." }, { "id": "B", "text": "Redesign training with real-world case studies and interactive formats." }, { "id": "C", "text": "Make training optional to avoid forcing participation." }, { "id": "D", "text": "Reduce training efforts and focus only on technical upskilling." }
        ], "bestAnswer": "B"
      },
      {
        "id": 40, "perspective": "CHRO", "question": "The company's leadership pipeline is weak, with few internal promotions happening.",
        "options": [
          { "id": "A", "text": "Increase external hiring to fill leadership gaps." }, { "id": "B", "text": "Implement a structured leadership development program." }, { "id": "C", "text": "Encourage employees to seek leadership certifications on their own." }, { "id": "D", "text": "Delay promotions until stronger candidates emerge." }
        ], "bestAnswer": "B"
      },
      {
        "id": 41, "perspective": "HR Professional", "question": "A top sales executive resigns unexpectedly, citing burnout and lack of career growth. How should HR respond?",
        "options": [
          { "id": "A", "text": "Conduct an exit interview to understand key issues and improve retention strategies." }, { "id": "B", "text": "Offer a counteroffer with a higher salary to retain the executive." }, { "id": "C", "text": "Ignore the resignation, as attrition is normal." }, { "id": "D", "text": "Announce an internal vacancy to fill the role as quickly as possible." }, { "id": "E", "text": "Convince the executive to stay for a transition period before leaving." }, { "id": "F", "text": "Launch a company-wide well-being initiative immediately." }
        ], "bestAnswer": "A"
      },
      {
        "id": 42, "perspective": "HR Professional", "question": "A senior leader consistently cancels 1:1 meetings with employees, citing a busy schedule.",
        "options": [
          { "id": "A", "text": "Address the issue privately, emphasizing leadership accountability." }, { "id": "B", "text": "Mandate all senior leaders to hold 1:1s as part of their performance review." }, { "id": "C", "text": "Send anonymous employee feedback to the leader without direct confrontation." }, { "id": "D", "text": "Reassign HR business partners to bridge communication gaps." }, { "id": "E", "text": "Accept that senior leaders have priorities and cannot always accommodate meetings." }, { "id": "F", "text": "Organize a leadership workshop on employee engagement." }
        ], "bestAnswer": "A"
      },
      {
        "id": 43, "perspective": "HR Professional", "question": "A junior HR professional has leaked confidential salary data to employees.",
        "options": [
          { "id": "A", "text": "Investigate the incident thoroughly before deciding on disciplinary action." }, { "id": "B", "text": "Terminate the employee immediately for breach of confidentiality." }, { "id": "C", "text": "Ignore the issue to avoid creating panic in the organization." }, { "id": "D", "text": "Publicly reinforce the importance of confidentiality in HR." }, { "id": "E", "text": "Suspend the employee without pay and conduct an internal review." }, { "id": "F", "text": "Issue a formal warning but allow the employee to continue working." }
        ], "bestAnswer": "A"
      },
      {
        "id": 44, "perspective": "HR Professional", "question": "A new policy on flexible work hours is facing resistance from some managers. What should HR do?",
        "options": [
          { "id": "A", "text": "Train managers on the benefits of flexible work models." }, { "id": "B", "text": "Revert to the old working hours to maintain stability." }, { "id": "C", "text": "Give managers discretion to opt out of the policy if they prefer." }, { "id": "D", "text": "Enforce strict compliance without room for discussion." }, { "id": "E", "text": "Conduct an employee pulse survey to assess concerns." }, { "id": "F", "text": "Allow teams to vote on whether they want flexibility or not." }
        ], "bestAnswer": "A"
      },
      {
        "id": 45, "perspective": "HR Professional", "question": "A client refuses to work with a salesperson based on personal bias. How should HR handle this?",
        "options": [
          { "id": "A", "text": "Mediate a conversation between the client and sales team." }, { "id": "B", "text": "Replace the salesperson to protect business interests." }, { "id": "C", "text": "File a legal complaint against the client." }, { "id": "D", "text": "Ask leadership to decide how to handle the client's concerns." }, { "id": "E", "text": "Address internal bias training but take no direct action." }, { "id": "F", "text": "Accept the client's decision and move on." }
        ], "bestAnswer": "A"
      },
      {
        "id": 46, "perspective": "HR Professional", "question": "An employee complains about a toxic work environment, but their manager dismisses it.",
        "options": [
          { "id": "A", "text": "Investigate the complaint through confidential interviews." }, { "id": "B", "text": "Trust the manager's judgment and take no further action." }, { "id": "C", "text": "Instruct the employee to adjust their expectations." }, { "id": "D", "text": "Issue a general memo on workplace culture without singling anyone out." }, { "id": "E", "text": "Encourage the employee to escalate to leadership directly." }, { "id": "F", "text": "Assign a mentor to the employee instead of investigating." }
        ], "bestAnswer": "A"
      },
      {
        "id": 47, "perspective": "HR Professional", "question": "A department has high turnover, and exit interviews suggest poor leadership is the cause.",
        "options": [
          { "id": "A", "text": "Implement leadership coaching and track improvements." }, { "id": "B", "text": "Replace the department head to solve the issue quickly." }, { "id": "C", "text": "Disregard exit feedback since turnover is inevitable." }, { "id": "D", "text": "Change hiring criteria to bring in more adaptable employees." }, { "id": "E", "text": "Offer retention bonuses to reduce further attrition." }, { "id": "F", "text": "Allow employees to transfer to other departments if they are unhappy." }
        ], "bestAnswer": "A"
      },
      {
        "id": 48, "perspective": "HR Professional", "question": "A high-potential employee resigns due to a lack of career development. How should HR act?",
        "options": [
          { "id": "A", "text": "Implement a structured career growth framework across teams." }, { "id": "B", "text": "Counteroffer with a promotion to make them stay." }, { "id": "C", "text": "Accept the resignation without addressing underlying concerns." }, { "id": "D", "text": "Introduce mandatory leadership training for managers." }, { "id": "E", "text": "Request the employee to stay longer for knowledge transfer." }, { "id": "F", "text": "Conduct an internal skills-mapping exercise to identify gaps." }
        ], "bestAnswer": "A"
      },
      {
        "id": 49, "perspective": "HR Professional", "question": "A new hire is struggling to integrate with their team and seems disengaged.",
        "options": [
          { "id": "A", "text": "Assign a mentor and conduct regular HR check-ins." }, { "id": "B", "text": "Allow the employee time to adjust naturally." }, { "id": "C", "text": "Discuss concerns with the manager and take no further action." }, { "id": "D", "text": "Move the employee to a different team." }, { "id": "E", "text": "Reduce the employee's workload to lower pressure." }, { "id": "F", "text": "Offer a professional development program to engage them." }
        ], "bestAnswer": "A"
      },
      {
        "id": 50, "perspective": "HR Professional", "question": "Employees report excessive workload and stress due to an unrealistic project deadline.",
        "options": [
          { "id": "A", "text": "Work with leadership to adjust project expectations." }, { "id": "B", "text": "Instruct employees to prioritize work-life balance independently." }, { "id": "C", "text": "Offer wellness programs but avoid interfering with project deadlines." }, { "id": "D", "text": "Encourage employees to work harder and manage stress better." }, { "id": "E", "text": "Reassign tasks to distribute workload more evenly." }, { "id": "F", "text": "Escalate the issue to senior leadership with data-driven evidence." }
        ], "bestAnswer": "A"
      },
      {
        "id": 51, "perspective": "HR Professional", "question": "A top performer in the sales team has engaged in unethical sales practices to close deals. How should HR respond?",
        "options": [
          { "id": "A", "text": "Conduct an investigation and, if found guilty, take disciplinary action." }, { "id": "B", "text": "Ignore the issue since the employee is bringing in high revenue." }, { "id": "C", "text": "Issue a general ethics training for all employees rather than singling anyone out." }, { "id": "D", "text": "Transfer the employee to another department to avoid legal complications." }, { "id": "E", "text": "Reward the employee for results but warn them informally." }, { "id": "F", "text": "Let the manager handle the situation without HR involvement." }
        ], "bestAnswer": "A"
      },
      {
        "id": 52, "perspective": "HR Professional", "question": "A senior manager frequently gives negative feedback in a way that demotivates employees.",
        "options": [
          { "id": "A", "text": "Provide leadership coaching to the manager on giving constructive feedback." }, { "id": "B", "text": "Instruct employees to ignore the manager's harsh tone." }, { "id": "C", "text": "Transfer dissatisfied employees to different teams." }, { "id": "D", "text": "Implement a company-wide policy on positive reinforcement." }, { "id": "E", "text": "Allow the manager to continue, as tough feedback is necessary for growth." }, { "id": "F", "text": "Ask employees to document incidents but take no immediate action." }
        ], "bestAnswer": "A"
      },
      {
        "id": 53, "perspective": "HR Professional", "question": "A female employee reports gender-based discrimination but refuses to file a formal complaint.",
        "options": [
          { "id": "A", "text": "Investigate the matter while protecting her confidentiality." }, { "id": "B", "text": "Respect her decision and take no action." }, { "id": "C", "text": "Announce a general diversity and inclusion training instead." }, { "id": "D", "text": "Encourage her to report it formally or drop the issue." }, { "id": "E", "text": "Discuss the matter with her manager but take no formal steps." }, { "id": "F", "text": "Allow HR to monitor the situation but not intervene proactively." }
        ], "bestAnswer": "A"
      },
      {
        "id": 54, "perspective": "HR Professional", "question": "Your company is implementing AI-driven recruitment, and employees fear job losses.",
        "options": [
          { "id": "A", "text": "Communicate transparently about how AI will enhance, not replace, jobs." }, { "id": "B", "text": "Ignore employee concerns since automation is inevitable." }, { "id": "C", "text": "Reassure employees without making any structural changes." }, { "id": "D", "text": "Delay AI implementation to ease resistance." }, { "id": "E", "text": "Offer upskilling programs to future-proof employees' roles." }, { "id": "F", "text": "Avoid addressing the concerns and proceed with AI adoption." }
        ], "bestAnswer": "A"
      },
      {
        "id": 55, "perspective": "HR Professional", "question": "A manager favors certain employees for promotions, causing resentment in the team.",
        "options": [
          { "id": "A", "text": "Implement a clear, data-driven promotion framework." }, { "id": "B", "text": "Let the manager continue, as favoritism is a normal part of leadership." }, { "id": "C", "text": "Conduct a team discussion to address concerns but take no action." }, { "id": "D", "text": "Rotate team members to reduce favoritism perception." }, { "id": "E", "text": "Address the issue with the manager in a coaching session." }, { "id": "F", "text": "Announce an open feedback mechanism for promotion decisions." }
        ], "bestAnswer": "A"
      },
      {
        "id": 56, "perspective": "HR Professional", "question": "A long-serving employee is underperforming but has strong relationships within the company.",
        "options": [
          { "id": "A", "text": "Provide a structured Performance Improvement Plan (PIP)." }, { "id": "B", "text": "Allow the employee to continue due to their history with the company." }, { "id": "C", "text": "Immediately terminate their contract to set a standard." }, { "id": "D", "text": "Reassign them to a less critical role without addressing performance issues." }, { "id": "E", "text": "Offer mentorship to help them regain productivity." }, { "id": "F", "text": "Ask their manager to handle it independently." }
        ], "bestAnswer": "A"
      },
      {
        "id": 57, "perspective": "HR Professional", "question": "An external consultant criticizes your company's HR policies on LinkedIn, causing reputational damage.",
        "options": [
          { "id": "A", "text": "Address the feedback professionally with factual responses." }, { "id": "B", "text": "Ignore the criticism to avoid giving it attention." }, { "id": "C", "text": "Threaten legal action for defamation." }, { "id": "D", "text": "Ask employees to defend the company online." }, { "id": "E", "text": "Launch a positive PR campaign to shift focus." }, { "id": "F", "text": "Block the consultant's access to any future collaborations." }
        ], "bestAnswer": "A"
      },
      {
        "id": 58, "perspective": "HR Professional", "question": "The company needs to reduce headcount due to financial difficulties. What approach should HR take?",
        "options": [
          { "id": "A", "text": "Develop a transparent layoff strategy with clear communication." }, { "id": "B", "text": "Conduct immediate layoffs without prior notice to avoid panic." }, { "id": "C", "text": "Reduce salaries across the board instead of layoffs." }, { "id": "D", "text": "Outsource the layoff process to external agencies." }, { "id": "E", "text": "Offer voluntary exit packages before deciding on layoffs." }, { "id": "F", "text": "Delay action and hope financial conditions improve." }
        ], "bestAnswer": "A"
      },
      {
        "id": 59, "perspective": "HR Professional", "question": "Employees are resisting a major cultural shift initiated by the leadership team.",
        "options": [
          { "id": "A", "text": "Involve employees in the change process through structured discussions." }, { "id": "B", "text": "Push the changes forcefully to ensure compliance." }, { "id": "C", "text": "Fire employees who resist, as they are not aligned with company vision." }, { "id": "D", "text": "Conduct a one-time training session and move forward." }, { "id": "E", "text": "Allow employees to opt out of cultural changes." }, { "id": "F", "text": "Conduct a pulse survey but proceed without major adjustments." }
        ], "bestAnswer": "A"
      },
      {
        "id": 60, "perspective": "HR Professional", "question": "A potential hire has outstanding skills but a history of frequent job changes.",
        "options": [
          { "id": "A", "text": "Assess their long-term commitment before hiring." }, { "id": "B", "text": "Reject them immediately due to high attrition risk." }, { "id": "C", "text": "Offer a short-term contract instead of a full-time role." }, { "id": "D", "text": "Ignore their job history and hire based on skill alone." }, { "id": "E", "text": "Discuss their job changes during the interview for deeper insight." }, { "id": "F", "text": "Have HR conduct a thorough background check before making a decision." }
        ], "bestAnswer": "A"
      },
      {
        "id": 61, "perspective": "Admin Manager, Sandeep Verma", "question": "The sales team is facing a crisis, and the VP Sales requests urgent logistical support for an emergency meeting with clients in another city. However, your budget is already stretched for the quarter. What do you do?",
        "options": [
          { "id": "A", "text": "Decline the request due to budget constraints." }, { "id": "B", "text": "Approve the request immediately, as supporting sales is a priority." }, { "id": "C", "text": "Suggest reallocating funds from another department to cover the costs." }, { "id": "D", "text": "Find a cost-effective alternative and negotiate with vendors." }, { "id": "E", "text": "Request approval from the CHRO before proceeding." }, { "id": "F", "text": "Delay the decision and ask the VP Sales to justify the expense." }
        ], "bestAnswer": "D"
      },
      {
        "id": 62, "perspective": "Admin Manager, Sandeep Verma", "question": "An external B2B customer is scheduled for a visit, but your team is short-staffed. The HR Manager asks you to ensure a seamless experience. What is your best response?",
        "options": [
          { "id": "A", "text": "Personally handle the logistics and assign temporary resources." }, { "id": "B", "text": "Tell HR it's their responsibility to arrange manpower." }, { "id": "C", "text": "Hire temporary staff for the day." }, { "id": "D", "text": "Inform the MD that additional support is needed." }, { "id": "E", "text": "Focus only on security and let the sales team handle hospitality." }, { "id": "F", "text": "Cancel other admin tasks and focus only on the visit." }
        ], "bestAnswer": "A"
      },
      {
        "id": 63, "perspective": "Admin Manager, Sandeep Verma", "question": "Due to the crisis, employee morale is low, and people are requesting better office amenities (snacks, transport, etc.). What should you do?",
        "options": [
          { "id": "A", "text": "Approve requests selectively based on cost-effectiveness." }, { "id": "B", "text": "Deny all requests due to budget issues." }, { "id": "C", "text": "Escalate the issue to the CHRO without taking action." }, { "id": "D", "text": "Implement only low-cost improvements immediately." }, { "id": "E", "text": "Conduct a survey and prioritize the most essential amenities." }, { "id": "F", "text": "Ignore the requests, as operations take precedence." }
        ], "bestAnswer": "A"
      },
      {
        "id": 64, "perspective": "Admin Manager, Sandeep Verma", "question": "A key supplier threatens to delay deliveries due to unpaid invoices. The finance team is unresponsive. What is your best course of action?",
        "options": [
          { "id": "A", "text": "Negotiate partial payments to maintain supply flow." }, { "id": "B", "text": "Escalate the issue to the Managing Director immediately." }, { "id": "C", "text": "Put pressure on Finance to release the payments." }, { "id": "D", "text": "Arrange an emergency alternative vendor." }, { "id": "E", "text": "Allow the supplier to delay deliveries and inform stakeholders." }, { "id": "F", "text": "Ask the sales team to manage without these supplies." }
        ], "bestAnswer": "A"
      },
      {
        "id": 65, "perspective": "Admin Manager, Sandeep Verma", "question": "A senior executive requests personal admin support (chauffeur, assistant), but company policy restricts this. How do you respond?",
        "options": [
          { "id": "A", "text": "Politely explain the policy and decline the request." }, { "id": "B", "text": "Approve it to maintain goodwill with leadership." }, { "id": "C", "text": "Seek CHRO's approval before deciding." }, { "id": "D", "text": "Approve it discreetly and adjust budgets later." }, { "id": "E", "text": "Suggest an external service at their own cost." }, { "id": "F", "text": "Escalate the issue to the MD." }
        ], "bestAnswer": "A"
      },
      {
        "id": 66, "perspective": "Admin Manager, Sandeep Verma", "question": "A major office maintenance issue arises on the same day as an important client visit. How do you handle this?",
        "options": [
          { "id": "A", "text": "Prioritize the client visit and arrange temporary fixes." }, { "id": "B", "text": "Delay the client visit until the issue is resolved." }, { "id": "C", "text": "Split your team to handle both situations effectively." }, { "id": "D", "text": "Call for emergency repairs, regardless of cost." }, { "id": "E", "text": "Assign the responsibility to HR and focus on daily tasks." }, { "id": "F", "text": "Ignore the maintenance issue for now." }
        ], "bestAnswer": "A"
      },
      {
        "id": 67, "perspective": "Admin Manager, Sandeep Verma", "question": "The HR Manager informs you that a new company-wide policy change affects workspace management. What's your best response?",
        "options": [
          { "id": "A", "text": "Work closely with HR to ensure smooth implementation." }, { "id": "B", "text": "Push back, citing operational constraints." }, { "id": "C", "text": "Implement changes without questioning the policy." }, { "id": "D", "text": "Ask employees for feedback before acting." }, { "id": "E", "text": "Escalate concerns to the CHRO before making changes." }, { "id": "F", "text": "Delay the implementation to assess its impact." }
        ], "bestAnswer": "A"
      },
      {
        "id": 68, "perspective": "Admin Manager, Sandeep Verma", "question": "Your team is overwhelmed due to increased admin workload. What do you do?",
        "options": [
          { "id": "A", "text": "Reallocate tasks based on priority." }, { "id": "B", "text": "Demand HR for more hires immediately." }, { "id": "C", "text": "Encourage overtime to meet demands." }, { "id": "D", "text": "Ask leadership for additional budget support." }, { "id": "E", "text": "Train existing employees for better efficiency." }, { "id": "F", "text": "Ignore the issue and let employees manage on their own." }
        ], "bestAnswer": "A"
      },
      {
        "id": 69, "perspective": "Admin Manager, Sandeep Verma", "question": "A conflict arises between your team and the sales team over shared office resources. How do you mediate?",
        "options": [
          { "id": "A", "text": "Facilitate a discussion and find a fair resolution." }, { "id": "B", "text": "Give priority to the sales team since they drive revenue." }, { "id": "C", "text": "Enforce strict policies and do not allow exceptions." }, { "id": "D", "text": "Escalate the issue to the VP Sales and CHRO." }, { "id": "E", "text": "Avoid getting involved, as it's not your concern." }, { "id": "F", "text": "Split resources equally without consulting anyone." }
        ], "bestAnswer": "A"
      },
      {
        "id": 70, "perspective": "Admin Manager, Sandeep Verma", "question": "A team member wants a transfer due to high pressure in admin operations. What do you do?",
        "options": [
          { "id": "A", "text": "Discuss concerns and try to find solutions." }, { "id": "B", "text": "Approve the transfer immediately." }, { "id": "C", "text": "Deny the request due to team workload." }, { "id": "D", "text": "Escalate the request to HR for a decision." }, { "id": "E", "text": "Suggest they find another job if they're unhappy." }, { "id": "F", "text": "Ignore the request and focus on work." }
        ], "bestAnswer": "A"
      },
      {
        "id": 71, "perspective": "Admin Manager, Sandeep Verma", "question": "Your admin staff is complaining about unfair workload distribution, with some employees working longer hours than others. How do you address this?",
        "options": [
          { "id": "A", "text": "Reevaluate workloads and ensure fair distribution." }, { "id": "B", "text": "Tell them that long hours are part of the job." }, { "id": "C", "text": "Ask HR to intervene and resolve the issue." }, { "id": "D", "text": "Offer incentives only to the hardworking employees." }, { "id": "E", "text": "Delay addressing the issue until the crisis is over." }, { "id": "F", "text": "Dismiss their complaints as normal workplace concerns." }
        ], "bestAnswer": "A"
      },
      {
        "id": 72, "perspective": "Admin Manager, Sandeep Verma", "question": "A key vendor provides office supplies but has raised prices unexpectedly. What is your best course of action?",
        "options": [
          { "id": "A", "text": "Negotiate better pricing based on long-term partnership." }, { "id": "B", "text": "Accept the new pricing and adjust budgets accordingly." }, { "id": "C", "text": "Look for alternative vendors immediately." }, { "id": "D", "text": "Cut down on other admin expenses to accommodate the change." }, { "id": "E", "text": "Escalate the issue to the Finance team and let them decide." }, { "id": "F", "text": "Reduce orders to minimize the impact of the price increase." }
        ], "bestAnswer": "A"
      },
      {
        "id": 73, "perspective": "Admin Manager, Sandeep Verma", "question": "The Managing Director asks you to reduce operational costs by 15%. How do you approach this?",
        "options": [
          { "id": "A", "text": "Identify inefficiencies and suggest smart cost-cutting measures." }, { "id": "B", "text": "Immediately lay off admin staff to save costs." }, { "id": "C", "text": "Cut costs in all areas without evaluating impact." }, { "id": "D", "text": "Negotiate better deals with vendors and service providers." }, { "id": "E", "text": "Request the CHRO for guidance before making any cuts." }, { "id": "F", "text": "Ignore the request as the current costs are justified." }
        ], "bestAnswer": "A"
      },
      {
        "id": 74, "perspective": "Admin Manager, Sandeep Verma", "question": "A sudden IT system failure disrupts office operations, and IT support is unavailable. What should you do?",
        "options": [
          { "id": "A", "text": "Implement a temporary manual workaround." }, { "id": "B", "text": "Wait until IT support becomes available." }, { "id": "C", "text": "Escalate the issue to the CHRO for intervention." }, { "id": "D", "text": "Ask employees to continue working without IT support." }, { "id": "E", "text": "Bring in an external IT consultant at an additional cost." }, { "id": "F", "text": "Assign random employees to fix the issue themselves." }
        ], "bestAnswer": "A"
      },
      {
        "id": 75, "perspective": "Admin Manager, Sandeep Verma", "question": "An employee repeatedly violates office cleanliness policies despite warnings. How do you handle this?",
        "options": [
          { "id": "A", "text": "Issue a formal warning and involve HR if needed." }, { "id": "B", "text": "Ignore it since it's a minor issue." }, { "id": "C", "text": "Confront the employee in front of the team." }, { "id": "D", "text": "Enforce stricter office rules for all employees." }, { "id": "E", "text": "Escalate the issue directly to the Managing Director." }, { "id": "F", "text": "Assign them cleaning responsibilities as a punishment." }
        ], "bestAnswer": "A"
      },
      {
        "id": 76, "perspective": "Admin Manager, Sandeep Verma", "question": "There is a fire safety audit next week, but your team has not been trained recently. What do you do?",
        "options": [
          { "id": "A", "text": "Arrange an urgent training session before the audit." }, { "id": "B", "text": "Hope that employees remember past training." }, { "id": "C", "text": "Delay the audit until training is completed." }, { "id": "D", "text": "Assign only a few key employees to attend the audit." }, { "id": "E", "text": "Brief employees informally instead of a full training session." }, { "id": "F", "text": "Let the HR team handle the audit without your involvement." }
        ], "bestAnswer": "A"
      },
      {
        "id": 77, "perspective": "Admin Manager, Sandeep Verma", "question": "The Sales VP asks for admin support beyond standard work hours, but your team is already stretched thin. How do you respond?",
        "options": [
          { "id": "A", "text": "Discuss alternatives, such as rotating shifts." }, { "id": "B", "text": "Refuse, stating that admin staff are not responsible for sales." }, { "id": "C", "text": "Approve overtime for all admin staff without concern for cost." }, { "id": "D", "text": "Hire temporary support to manage the extra workload." }, { "id": "E", "text": "Escalate to the CHRO before making a decision." }, { "id": "F", "text": "Ignore the request and let the sales team handle it themselves." }
        ], "bestAnswer": "A"
      },
      {
        "id": 78, "perspective": "Admin Manager, Sandeep Verma", "question": "A new HR policy requires employees to swipe in and out, but senior employees are refusing to comply. What's your best course of action?",
        "options": [
          { "id": "A", "text": "Enforce the policy for everyone and explain its importance." }, { "id": "B", "text": "Allow senior employees to bypass the rule to maintain goodwill." }, { "id": "C", "text": "Ask HR to directly confront senior employees." }, { "id": "D", "text": "Let it go and focus on enforcing the policy for junior staff." }, { "id": "E", "text": "Suggest a flexible approach to HR that allows exceptions." }, { "id": "F", "text": "Delay implementation until you have full leadership support." }
        ], "bestAnswer": "A"
      },
      {
        "id": 79, "perspective": "Admin Manager, Sandeep Verma", "question": "Your team is struggling to coordinate with the Talent Acquisition Manager due to unclear responsibilities. How do you resolve this?",
        "options": [
          { "id": "A", "text": "Arrange a meeting to clarify roles and responsibilities." }, { "id": "B", "text": "Ask the HR Manager to intervene and fix the problem." }, { "id": "C", "text": "Assign all hiring-related admin tasks to your team." }, { "id": "D", "text": "Refuse to work on any recruitment-related tasks." }, { "id": "E", "text": "Send an email to the CHRO asking for guidance." }, { "id": "F", "text": "Ignore the issue and let things run their course." }
        ], "bestAnswer": "A"
      },
      {
        "id": 80, "perspective": "Admin Manager, Sandeep Verma", "question": "There is a miscommunication between the security team and HR regarding visitor access policies, causing frequent delays. What should you do?",
        "options": [
          { "id": "A", "text": "Conduct a joint meeting to streamline the process." }, { "id": "B", "text": "Let HR handle the issue on their own." }, { "id": "C", "text": "Set new rules for security without consulting HR." }, { "id": "D", "text": "Ignore the complaints since security takes priority." }, { "id": "E", "text": "Ask employees to manage visitor access themselves." }, { "id": "F", "text": "Propose removing visitor restrictions altogether." }
        ], "bestAnswer": "A"
      },
      {
        "id": 81, "perspective": "HR Manager, Neha Khanna", "question": "A senior sales manager consistently fails to meet hiring deadlines, leading to lost business opportunities. How should you handle this?",
        "options": [
          { "id": "A", "text": "Discuss the delays with the manager and collaborate on a better hiring timeline." }, { "id": "B", "text": "Escalate the issue to the CHRO without informing the sales manager." }, { "id": "C", "text": "Push the Talent Acquisition team to work faster without changing the process." }, { "id": "D", "text": "Ignore the delays as they are not under your direct control." }, { "id": "E", "text": "Reduce hiring requirements to speed up recruitment." }, { "id": "F", "text": "Reassign hiring responsibilities to the Admin Manager." }
        ], "bestAnswer": "A"
      },
      {
        "id": 82, "perspective": "HR Manager, Neha Khanna", "question": "An employee files a complaint about their manager's aggressive behavior, but there is no concrete evidence. How should you proceed?",
        "options": [
          { "id": "A", "text": "Conduct a confidential inquiry by speaking to the employee and other team members." }, { "id": "B", "text": "Immediately reprimand the manager based on the complaint." }, { "id": "C", "text": "Ignore the complaint since no proof is available." }, { "id": "D", "text": "Suggest the employee look for another department to work in." }, { "id": "E", "text": "Ask the manager to apologize without verifying the claim." }, { "id": "F", "text": "Forward the complaint to senior leadership without investigation." }
        ], "bestAnswer": "A"
      },
      {
        "id": 83, "perspective": "HR Manager, Neha Khanna", "question": "A top-performing salesperson threatens to resign unless they receive an immediate raise. What is your best response?",
        "options": [
          { "id": "A", "text": "Analyze their performance data and market salary trends before discussing options." }, { "id": "B", "text": "Approve the raise immediately to retain them." }, { "id": "C", "text": "Reject their demand, stating that salary increases follow a schedule." }, { "id": "D", "text": "Advise them to speak directly with the Managing Director." }, { "id": "E", "text": "Ignore their request, as retention is not your direct responsibility." }, { "id": "F", "text": "Offer non-monetary perks instead of a salary increase." }
        ], "bestAnswer": "A"
      },
      {
        "id": 84, "perspective": "HR Manager, Neha Khanna", "question": "Sales VP Rajesh Mehta is pressuring HR to recruit quickly, but quality candidates are hard to find. What should you do?",
        "options": [
          { "id": "A", "text": "Work with Talent Acquisition to find a balance between speed and quality." }, { "id": "B", "text": "Hire anyone available to meet the deadline." }, { "id": "C", "text": "Delay hiring and wait for better candidates, regardless of pressure." }, { "id": "D", "text": "Ask the Sales VP to handle recruitment independently." }, { "id": "E", "text": "Offer financial incentives to recruiters for faster hiring." }, { "id": "F", "text": "Reduce hiring criteria to make recruitment faster." }
        ], "bestAnswer": "A"
      },
      {
        "id": 85, "perspective": "HR Manager, Neha Khanna", "question": "The company is losing employees due to poor work-life balance. How can you address this issue?",
        "options": [
          { "id": "A", "text": "Conduct an employee engagement survey and propose work-life balance initiatives." }, { "id": "B", "text": "Ignore the issue, as work-life balance is subjective." }, { "id": "C", "text": "Reduce working hours for all employees without discussing it with leadership." }, { "id": "D", "text": "Suggest HR stop enforcing leave policies to avoid resignations." }, { "id": "E", "text": "Offer additional salaries instead of improving work-life balance." }, { "id": "F", "text": "Encourage employees to work from home without formal policies." }
        ], "bestAnswer": "A"
      },
      {
        "id": 86, "perspective": "HR Manager, Neha Khanna", "question": "You notice that administrative bottlenecks are slowing down HR processes. What should you do?",
        "options": [
          { "id": "A", "text": "Identify inefficiencies and propose process automation or simplifications." }, { "id": "B", "text": "Assign more HR staff to handle the workload manually." }, { "id": "C", "text": "Escalate the issue to the Managing Director." }, { "id": "D", "text": "Ignore it and accept that HR processes are slow." }, { "id": "E", "text": "Ask employees to be patient with the system." }, { "id": "F", "text": "Implement an entirely new HR system without approval." }
        ], "bestAnswer": "A"
      },
      {
        "id": 87, "perspective": "HR Manager, Neha Khanna", "question": "During a restructuring, employees are anxious about potential layoffs. How do you communicate effectively?",
        "options": [
          { "id": "A", "text": "Be transparent about decisions while reassuring employees where possible." }, { "id": "B", "text": "Keep all information confidential to avoid panic." }, { "id": "C", "text": "Tell employees they will not be affected, even if it's uncertain." }, { "id": "D", "text": "Ask managers to handle all employee concerns on their own." }, { "id": "E", "text": "Avoid addressing the issue and let employees speculate." }, { "id": "F", "text": "Suggest that employees look for other jobs proactively." }
        ], "bestAnswer": "A"
      },
      {
        "id": 88, "perspective": "HR Manager, Neha Khanna", "question": "A new policy is unpopular with employees, and you receive strong pushback. What's your next step?",
        "options": [
          { "id": "A", "text": "Gather feedback, communicate concerns to leadership, and suggest modifications." }, { "id": "B", "text": "Enforce the policy strictly, no matter the resistance." }, { "id": "C", "text": "Ignore employee concerns, assuming they will adjust over time." }, { "id": "D", "text": "Scrap the policy entirely to maintain employee morale." }, { "id": "E", "text": "Let the Talent Acquisition team handle objections." }, { "id": "F", "text": "Escalate the issue to the Managing Director without employee input." }
        ], "bestAnswer": "A"
      },
      {
        "id": 89, "perspective": "HR Manager, Neha Khanna", "question": "A department head is hiring friends and family members without a transparent process. How do you respond?",
        "options": [
          { "id": "A", "text": "Enforce a strict recruitment policy and ensure fairness." }, { "id": "B", "text": "Ignore the situation to avoid conflict." }, { "id": "C", "text": "Allow the hiring to continue but increase oversight." }, { "id": "D", "text": "Report the issue to the CHRO without investigating." }, { "id": "E", "text": "Only intervene if performance issues arise." }, { "id": "F", "text": "Let the department head make hiring decisions independently." }
        ], "bestAnswer": "A"
      },
      {
        "id": 90, "perspective": "HR Manager, Neha Khanna", "question": "A senior employee refuses to attend mandatory diversity and inclusion training. How do you handle this?",
        "options": [
          { "id": "A", "text": "Explain the importance and enforce participation." }, { "id": "B", "text": "Allow them to skip the training due to their seniority." }, { "id": "C", "text": "Ignore their refusal and let them decide for themselves." }, { "id": "D", "text": "Ask their manager to convince them instead." }, { "id": "E", "text": "Remove the training requirement for all employees." }, { "id": "F", "text": "Offer alternative training options tailored to senior staff." }
        ], "bestAnswer": "A"
      },
      {
        "id": 91, "perspective": "HR Manager, Neha Khanna", "question": "An employee claims their promotion was unfairly denied. How do you investigate?",
        "options": [{ "id": "A", "text": "Review performance records and discuss with the manager." }], "bestAnswer": "A"
      },
      {
        "id": 92, "perspective": "HR Manager, Neha Khanna", "question": "A manager is not providing performance feedback to their team. What's your action?",
        "options": [{ "id": "A", "text": "Implement structured feedback sessions for all managers." }], "bestAnswer": "A"
      },
      {
        "id": 93, "perspective": "HR Manager, Neha Khanna", "question": "A toxic work culture is emerging in one department. What should HR do?",
        "options": [{ "id": "A", "text": "Conduct an anonymous survey and take corrective action." }], "bestAnswer": "A"
      },
      {
        "id": 94, "perspective": "HR Manager, Neha Khanna", "question": "Employees resist a new HR tech system. What's your best approach?",
        "options": [{ "id": "A", "text": "Offer training and highlight benefits of the system." }], "bestAnswer": "A"
      },
      {
        "id": 95, "perspective": "HR Manager, Neha Khanna", "question": "An employee frequently underperforms, but the manager is reluctant to act. How do you handle it?",
        "options": [{ "id": "A", "text": "Work with the manager to create a performance improvement plan." }], "bestAnswer": "A"
      },
      {
        "id": 96, "perspective": "HR Manager, Neha Khanna", "question": "An employee lodges a harassment complaint but wants to keep it confidential. How do you proceed?",
        "options": [{ "id": "A", "text": "Follow protocol while maintaining confidentiality." }], "bestAnswer": "A"
      },
      {
        "id": 97, "perspective": "HR Manager, Neha Khanna", "question": "One department faces extremely high attrition. What's the first step?",
        "options": [{ "id": "A", "text": "Conduct exit interviews to understand the reasons." }], "bestAnswer": "A"
      },
      {
        "id": 98, "perspective": "HR Manager, Neha Khanna", "question": "A new HR policy is causing conflicts between departments. How do you fix this?",
        "options": [{ "id": "A", "text": "Mediate discussions and adjust the policy where necessary." }], "bestAnswer": "A"
      },
      {
        "id": 99, "perspective": "HR Manager, Neha Khanna", "question": "A manager bypasses HR and makes hiring decisions independently. How do you respond?",
        "options": [{ "id": "A", "text": "Reinforce HR policies and retrain managers." }], "bestAnswer": "A"
      },
      {
        "id": 100, "perspective": "HR Manager, Neha Khanna", "question": "An employee wants to transition to a different role within the company. What's HR's role?",
        "options": [{ "id": "A", "text": "Assess their skills and facilitate the transition where possible." }], "bestAnswer": "A"
      },
      {
        "id": 101, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A hiring manager keeps rejecting candidates without providing clear reasons. How do you address this?",
        "options": [{ "id": "A", "text": "Request specific feedback on rejections and align hiring criteria accordingly." }], "bestAnswer": "A"
      },
      {
        "id": 102, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A critical position has been open for over 90 days, and internal stakeholders are frustrated. What should you do?",
        "options": [{ "id": "A", "text": "Reevaluate job requirements, explore alternate talent sources, and set realistic hiring timelines." }], "bestAnswer": "A"
      },
      {
        "id": 103, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "The company has been losing top candidates due to slow hiring processes. How do you fix this?",
        "options": [{ "id": "A", "text": "Streamline the interview process by reducing unnecessary steps and improving decision-making speed." }], "bestAnswer": "A"
      },
      {
        "id": 104, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A hiring manager wants to hire an overqualified candidate at a lower salary. How do you handle this?",
        "options": [{ "id": "A", "text": "Advise against potential retention risks and negotiate fair compensation." }], "bestAnswer": "A"
      },
      {
        "id": 105, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A candidate receives a competing offer but prefers your company. How do you respond?",
        "options": [{ "id": "A", "text": "Engage in a proactive counteroffer discussion and emphasize long-term career growth." }], "bestAnswer": "A"
      },
      {
        "id": 106, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "Your organization is struggling to attract diverse talent. What's your next step?",
        "options": [{ "id": "A", "text": "Implement targeted sourcing strategies, partner with diversity-focused organizations, and adjust hiring biases." }], "bestAnswer": "A"
      },
      {
        "id": 107, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A candidate provides misleading experience details but excels in interviews. What's your decision?",
        "options": [{ "id": "A", "text": "Verify details through background checks and reject if dishonesty is confirmed." }], "bestAnswer": "A"
      },
      {
        "id": 108, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A department head insists on hiring a personal connection without proper evaluation. What do you do?",
        "options": [{ "id": "A", "text": "Ensure an unbiased selection process with standardized assessments." }], "bestAnswer": "A"
      },
      {
        "id": 109, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A recruiter on your team is consistently missing hiring targets. How do you address this?",
        "options": [{ "id": "A", "text": "Identify performance gaps, provide training, and set clear accountability measures." }], "bestAnswer": "A"
      },
      {
        "id": 110, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "The CEO wants to speed up executive hiring, but proper vetting takes time. How do you respond?",
        "options": [{ "id": "A", "text": "Balance urgency with thorough assessment to ensure leadership quality." }], "bestAnswer": "A"
      },
      {
        "id": 111, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A strong candidate is hesitant to join due to negative company Glassdoor reviews. What's your approach?",
        "options": [{ "id": "A", "text": "Acknowledge concerns, share internal improvements, and provide direct leadership engagement." }], "bestAnswer": "A"
      },
      {
        "id": 112, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "The company wants to expand into a new market but lacks local hiring expertise. What's your first step?",
        "options": [{ "id": "A", "text": "Research market talent trends, engage local recruiters, and adapt hiring strategies." }], "bestAnswer": "A"
      },
      {
        "id": 113, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A hiring manager bypasses HR and directly hires a candidate without approvals. How do you handle it?",
        "options": [{ "id": "A", "text": "Enforce hiring policies and ensure compliance while maintaining a constructive discussion." }], "bestAnswer": "A"
      },
      {
        "id": 114, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A department demands immediate mass hiring, but workforce planning isn't aligned. What do you do?",
        "options": [{ "id": "A", "text": "Assess long-term workforce needs before approving rapid hiring." }], "bestAnswer": "A"
      },
      {
        "id": 115, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A candidate negotiates aggressively beyond the salary range. How do you respond?",
        "options": [{ "id": "A", "text": "Justify the salary range based on market benchmarks and total rewards package." }], "bestAnswer": "A"
      },
      {
        "id": 116, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "An internal candidate is overlooked for an external hire, causing dissatisfaction. What's your response?",
        "options": [{ "id": "A", "text": "Ensure transparency in selection criteria and provide development feedback." }], "bestAnswer": "A"
      },
      {
        "id": 117, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "Your cost-per-hire is rising, and leadership is concerned. What's your next step?",
        "options": [{ "id": "A", "text": "Optimize sourcing channels, reduce reliance on agencies, and improve employer branding." }], "bestAnswer": "A"
      },
      {
        "id": 118, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A hiring manager consistently changes role requirements mid-process. How do you manage this?",
        "options": [{ "id": "A", "text": "Set clear expectations and freeze role requirements before initiating hiring." }], "bestAnswer": "A"
      },
      {
        "id": 119, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "A senior leader pressures you to hire a candidate who is a poor cultural fit. How do you respond?",
        "options": [{ "id": "A", "text": "Provide data-backed insights on culture fit and potential risks before finalizing the hire." }], "bestAnswer": "A"
      },
      {
        "id": 120, "perspective": "Talent Acquisition Manager, Nishant Kapoor", "question": "Your competitors are attracting talent away from your company. What's your strategy?",
        "options": [{ "id": "A", "text": "Enhance employer branding, improve candidate experience, and offer competitive benefits." }], "bestAnswer": "A"
      },
      {
        "id": 121, "perspective": "Managing Director, Vikram Nair", "question": "Your company's sales have declined for two consecutive quarters. What should be your primary action?",
        "options": [{ "id": "A", "text": "Analyze sales performance data, identify root causes, and align leadership on a strategic recovery plan." }], "bestAnswer": "A"
      },
      {
        "id": 122, "perspective": "Managing Director, Vikram Nair", "question": "Your Sales VP and CHRO disagree on the cause of high attrition in the sales team. How do you resolve the conflict?",
        "options": [{ "id": "A", "text": "Encourage them to collaborate on data-driven insights and propose a joint action plan." }], "bestAnswer": "A"
      },
      {
        "id": 123, "perspective": "Managing Director, Vikram Nair", "question": "A key B2B customer threatens to shift business to a competitor due to poor service. What do you do?",
        "options": [{ "id": "A", "text": "Engage the customer personally, address concerns, and implement service improvements immediately." }], "bestAnswer": "A"
      },
      {
        "id": 124, "perspective": "Managing Director, Vikram Nair", "question": "Your company is struggling to hire senior talent despite aggressive recruitment efforts. What's your approach?",
        "options": [{ "id": "A", "text": "Enhance employer branding, evaluate leadership culture, and explore new sourcing strategies." }], "bestAnswer": "A"
      },
      {
        "id": 125, "perspective": "Managing Director, Vikram Nair", "question": "Your CHRO proposes a high-budget employee wellness program, but CFO raises concerns. How do you decide?",
        "options": [{ "id": "A", "text": "Assess long-term ROI and employee impact before approving or adjusting the proposal." }], "bestAnswer": "A"
      },
      {
        "id": 126, "perspective": "Managing Director, Vikram Nair", "question": "Your Sales VP suggests relaxing hiring criteria to quickly fill vacant roles. How do you respond?",
        "options": [{ "id": "A", "text": "Maintain quality standards while streamlining the hiring process to reduce time-to-fill." }], "bestAnswer": "A"
      },
      {
        "id": 127, "perspective": "Managing Director, Vikram Nair", "question": "One of your business units consistently underperforms. What is your first step?",
        "options": [{ "id": "A", "text": "Evaluate leadership effectiveness, market conditions, and internal inefficiencies before making changes." }], "bestAnswer": "A"
      },
      {
        "id": 128, "perspective": "Managing Director, Vikram Nair", "question": "A high-performing but toxic senior leader is causing employee dissatisfaction. What do you do?",
        "options": [{ "id": "A", "text": "Address behavioral concerns through coaching and set clear expectations for cultural alignment." }], "bestAnswer": "A"
      },
      {
        "id": 129, "perspective": "Managing Director, Vikram Nair", "question": "Your competitor launches an aggressive pricing strategy, and your team panics. How do you handle it?",
        "options": [{ "id": "A", "text": "Conduct a competitive analysis and adjust strategy while maintaining brand value." }], "bestAnswer": "A"
      },
      {
        "id": 130, "perspective": "Managing Director, Vikram Nair", "question": "Your company is planning an acquisition, but employees fear job cuts. How do you manage communication?",
        "options": [{ "id": "A", "text": "Be transparent, address concerns proactively, and highlight growth opportunities." }], "bestAnswer": "A"
      },
      {
        "id": 131, "perspective": "Managing Director, Vikram Nair", "question": "The HR team proposes a hybrid work model, but some senior leaders resist. How do you proceed?",
        "options": [{ "id": "A", "text": "Evaluate data on productivity and employee preferences before making a balanced decision." }], "bestAnswer": "A"
      },
      {
        "id": 132, "perspective": "Managing Director, Vikram Nair", "question": "Your CHRO suggests increasing L&D budgets, but ROI on past training programs is unclear. What do you do?",
        "options": [{ "id": "A", "text": "Ensure measurable impact through structured training programs before approving increased budgets." }], "bestAnswer": "A"
      },
      {
        "id": 133, "perspective": "Managing Director, Vikram Nair", "question": "A senior executive publicly criticizes company policies, causing reputational damage. How do you respond?",
        "options": [{ "id": "A", "text": "Engage privately to understand concerns and reinforce company values professionally." }], "bestAnswer": "A"
      },
      {
        "id": 134, "perspective": "Managing Director, Vikram Nair", "question": "You notice declining employee engagement scores across departments. What's your next step?",
        "options": [{ "id": "A", "text": "Identify key drivers of disengagement and implement targeted initiatives." }], "bestAnswer": "A"
      },
      {
        "id": 135, "perspective": "Managing Director, Vikram Nair", "question": "Your top talent is being poached by competitors. How do you respond?",
        "options": [{ "id": "A", "text": "Review retention strategies, conduct stay interviews, and enhance career growth opportunities." }], "bestAnswer": "A"
      },
      {
        "id": 136, "perspective": "Managing Director, Vikram Nair", "question": "The CHRO suggests revising performance evaluation methods, but managers resist. What do you do?",
        "options": [{ "id": "A", "text": "Ensure stakeholder alignment and pilot the new method before full implementation." }], "bestAnswer": "A"
      },
      {
        "id": 137, "perspective": "Managing Director, Vikram Nair", "question": "A long-time client demands preferential pricing that would impact margins. How do you handle this?",
        "options": [{ "id": "A", "text": "Negotiate value-added offerings instead of unsustainable discounts." }], "bestAnswer": "A"
      },
      {
        "id": 138, "perspective": "Managing Director, Vikram Nair", "question": "A media report misrepresents your company's hiring practices, causing reputational damage. What's your response?",
        "options": [{ "id": "A", "text": "Issue a public clarification while strengthening internal policies." }], "bestAnswer": "A"
      },
      {
        "id": 139, "perspective": "Managing Director, Vikram Nair", "question": "A key department head suddenly resigns, causing leadership instability. What's your first step?",
        "options": [{ "id": "A", "text": "Ensure business continuity by appointing interim leadership while identifying a successor." }], "bestAnswer": "A"
      },
      {
        "id": 140, "perspective": "Managing Director, Vikram Nair", "question": "Your HR team reports a sudden spike in employee grievances. How do you address it?",
        "options": [{ "id": "A", "text": "Investigate underlying causes, improve internal communication, and implement corrective actions." }], "bestAnswer": "A"
      },
      {
        "id": 141, "perspective": "External B2B Customer, Arvind Saxena", "question": "Your company has experienced frequent delays in order fulfillment from the vendor. How do you address the issue?",
        "options": [{ "id": "A", "text": "Escalate concerns to senior leadership and request a concrete action plan for improvement." }], "bestAnswer": "A"
      },
      {
        "id": 142, "perspective": "External B2B Customer, Arvind Saxena", "question": "A new sales representative from the vendor is unresponsive and does not follow up on key requests. What do you do?",
        "options": [{ "id": "A", "text": "Contact the vendor's Sales VP or Account Manager to resolve the issue and ensure proactive service." }], "bestAnswer": "A"
      },
      {
        "id": 143, "perspective": "External B2B Customer, Arvind Saxena", "question": "You have received inconsistent pricing quotes from different sales representatives of the vendor. What is your approach?",
        "options": [{ "id": "A", "text": "Seek clarity on pricing policies from senior management to ensure transparency and consistency." }], "bestAnswer": "A"
      },
      {
        "id": 144, "perspective": "External B2B Customer, Arvind Saxena", "question": "Your vendor suddenly changes their payment terms, negatively impacting your cash flow. What is the best response?",
        "options": [{ "id": "A", "text": "Negotiate revised terms that balance both parties' interests while maintaining a strong partnership." }], "bestAnswer": "A"
      },
      {
        "id": 145, "perspective": "External B2B Customer, Arvind Saxena", "question": "The vendor has made a commitment to improve service levels, but you see no actual change. What should you do?",
        "options": [{ "id": "A", "text": "Request a formal service-level agreement (SLA) and track performance against agreed benchmarks." }], "bestAnswer": "A"
      },
      {
        "id": 146, "perspective": "External B2B Customer, Arvind Saxena", "question": "A competing vendor offers similar products at a significantly lower price. How should you handle this?",
        "options": [{ "id": "A", "text": "Assess overall value beyond pricing, including service, reliability, and long-term relationship benefits." }], "bestAnswer": "A"
      },
      {
        "id": 147, "perspective": "External B2B Customer, Arvind Saxena", "question": "Your vendor introduces a new product that could benefit your business, but there's a learning curve. What should you do?",
        "options": [{ "id": "A", "text": "Request training and trial support before full adoption to minimize disruption." }], "bestAnswer": "A"
      },
      {
        "id": 148, "perspective": "External B2B Customer, Arvind Saxena", "question": "You experience frequent turnover in the vendor's sales and account management teams. What is your primary concern?",
        "options": [{ "id": "A", "text": "Ensure continuity of service and relationship stability by engaging senior leadership." }], "bestAnswer": "A"
      },
      {
        "id": 149, "perspective": "External B2B Customer, Arvind Saxena", "question": "A vendor's competitor reaches out with a better proposal. How do you handle this?",
        "options": [{ "id": "A", "text": "Evaluate objectively and engage your current vendor to discuss improvements before making a decision." }], "bestAnswer": "A"
      },
      {
        "id": 150, "perspective": "External B2B Customer, Arvind Saxena", "question": "Your vendor misses a major delivery deadline, causing disruption in your supply chain. What is the best course of action?",
        "options": [{ "id": "A", "text": "Demand immediate corrective action and reassess contingency plans for future reliability." }], "bestAnswer": "A"
      },
      {
        "id": 151, "perspective": "External B2B Customer, Arvind Saxena", "question": "You notice a decline in product quality from the vendor. What is your next step?",
        "options": [{ "id": "A", "text": "Raise concerns formally and request a root-cause analysis with corrective measures." }], "bestAnswer": "A"
      },
      {
        "id": 152, "perspective": "External B2B Customer, Arvind Saxena", "question": "The vendor increases prices unexpectedly without prior communication. What should you do?",
        "options": [{ "id": "A", "text": "Request justification for the increase and explore negotiations or alternative suppliers." }], "bestAnswer": "A"
      },
      {
        "id": 153, "perspective": "External B2B Customer, Arvind Saxena", "question": "The vendor offers additional discounts if you increase your order quantity. What is the best response?",
        "options": [{ "id": "A", "text": "Analyze demand forecasts and financial impact before committing to a larger order." }], "bestAnswer": "A"
      },
      {
        "id": 154, "perspective": "External B2B Customer, Arvind Saxena", "question": "You hear from industry peers that the vendor is struggling financially. What is the best approach?",
        "options": [{ "id": "A", "text": "Assess their financial health and have contingency plans in place while maintaining open dialogue." }], "bestAnswer": "A"
      },
      {
        "id": 155, "perspective": "External B2B Customer, Arvind Saxena", "question": "A dispute arises over contract terms due to differing interpretations. How do you handle it?",
        "options": [{ "id": "A", "text": "Refer to the signed agreement and engage legal counsel if necessary to resolve ambiguities." }], "bestAnswer": "A"
      },
      {
        "id": 156, "perspective": "External B2B Customer, Arvind Saxena", "question": "Your vendor's customer service team frequently fails to provide timely resolutions. What should you do?",
        "options": [{ "id": "A", "text": "Escalate the issue and request a dedicated account manager for faster resolution." }], "bestAnswer": "A"
      },
      {
        "id": 157, "perspective": "External B2B Customer, Arvind Saxena", "question": "Your company wants to expand the partnership with the vendor, but past performance has been inconsistent. How do you proceed?",
        "options": [{ "id": "A", "text": "Set clear performance metrics and improvement expectations before scaling the relationship." }], "bestAnswer": "A"
      },
      {
        "id": 158, "perspective": "External B2B Customer, Arvind Saxena", "question": "The vendor proposes a joint innovation project that requires significant investment from your side. What do you do?",
        "options": [{ "id": "A", "text": "Evaluate ROI, strategic benefits, and risk factors before committing resources." }], "bestAnswer": "A"
      },
      {
        "id": 159, "perspective": "External B2B Customer, Arvind Saxena", "question": "A compliance issue arises with the vendor that could impact your business. What is your best course of action?",
        "options": [{ "id": "A", "text": "Address compliance concerns immediately and ensure all regulatory standards are met." }], "bestAnswer": "A"
      },
      {
        "id": 160, "perspective": "External B2B Customer, Arvind Saxena", "question": "You receive complaints from your customers about the vendor's product performance. What is your responsibility?",
        "options": [{ "id": "A", "text": "Investigate customer feedback, hold the vendor accountable, and demand improvements." }], "bestAnswer": "A"
      }
    ]
};

// --- API Routes ---

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
    const systemPrompt = `
        You are an expert HR leadership assessment AI. Based on the provided user assessment data, generate a comprehensive report in a strict JSON format.

        **CRITICAL INSTRUCTIONS:**
        1.  **JSON ONLY:** Your entire response MUST be a single, valid JSON object.
        2.  **SCORING LOGIC:** Calculate a score for each competency based on the percentage of correct answers for that competency. The overallScore is the average of all competency scores. Present scores as a string "XX/100".
        3.  **ANALYSIS:** Your analysis must be insightful. Do not just state if the answer was right or wrong. Explain *why* the user's choices were effective or ineffective in the context of HR leadership, referencing their specific answers.
        4.  **JSON STRUCTURE:** The JSON object must follow this exact structure:
            {
              "executiveSummary": "A brief, insightful summary of the user's performance, highlighting 1-2 key strengths and 1-2 major growth areas.",
              "overallScore": "XX/100",
              "competencyBand": "Exceptional / Strong / Developing / Needs Improvement",
              "competencies": [
                {
                  "name": "Strategic HR Leadership",
                  "score": "XX/100",
                  "analysis": "Detailed analysis of user's choices for this competency. Explain the leadership implications of their decisions.",
                  "strengths": "List of key strengths demonstrated in this area.",
                  "growthAreas": "List of key areas for improvement in this area."
                }
              ],
              "recommendedNextSteps": [
                "Actionable, personalized recommendation 1 based on their weakest competencies.",
                "Actionable, personalized recommendation 2 based on their weakest competencies."
              ]
            }
        5.  **COMPETENCIES:** You must generate a report containing an analysis for ALL SIX of the following competencies: "Strategic HR Leadership", "People & Stakeholder Management", "Decision-Making & Crisis Handling", "Ethical & Compliance Judgment", "Talent Acquisition & Retention", "Interdepartmental Collaboration".
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