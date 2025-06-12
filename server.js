const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const port = 3001;

app.use(cors({
  origin: 'https://main.d21put265zxojq.amplifyapp.com', // Restrict to your Amplify frontend
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Case study data
const caseStudyData = {
    title: "The Vanishing Deals Dilemma",
    background: "Crestone Technologies, a leading B2B SaaS company, has been experiencing a steep decline in sales performance over the past six months. The company, known for its enterprise automation solutions, primarily caters to mid-sized businesses and large corporations. However, despite a strong product-market fit and competitive pricing, the sales team has been unable to close key deals, leading to growing frustration at the leadership level. The issue is not just numbers-it's a complex mix of people, processes, and organizational culture.", 
    characters: [
        { name: "Rajesh Mehta (Sales VP)", description: "A veteran in the industry, Rajesh has been pushing for aggressive sales targets, attributing the slump to a lack of motivation among sales reps. He believes HR's hiring and retention strategy is failing, and administrative inefficiencies are also affecting performance." },
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
                points: [
                    "How can HR quickly attract and retain high-quality sales talent when the company's employer brand is deteriorating?",
                    "How can the recruitment process be streamlined to address the urgent hiring needs while maintaining quality?",
                    "Can internal mobility programs be leveraged to redeploy talent from other departments?"
                ]
            },
            {
                title: "2. Workplace Culture & Employee Morale",
                points: [
                    "Sales professionals cite burnout and high-pressure targets as key reasons for leaving. How can HR introduce realistic performance expectations while keeping the business competitive?",
                    "What role does leadership play in shaping a culture that fosters engagement rather than fear-driven productivity?",
                    "Can HR design and implement a structured employee feedback loop that ensures concerns are heard and acted upon?"
                ]
            },
            {
                title: "3. Leadership Alignment & Conflict Resolution",
                points: [
                    "The Sales VP is blaming HR, while HR is pointing out deeper systemic issues. How can HR mediate this conflict and bring both sides to a constructive resolution?",
                    "How can HR help sales leadership transition from a short-term, numbers-driven approach to a more sustainable, people-focused strategy?",
                    "What training programs can be introduced to enhance leadership skills among managers and team leads?"
                ]
            },
            {
                title: "4. Operational & Administrative Gaps",
                points: [
                    "Sales team members complain about delayed commissions and poor administrative support. How can HR and Admin collaborate to resolve these bottlenecks?",
                    "Can HR influence policies around compensation, recognition, and rewards to ensure timely incentives for salespeople?",
                    "How can HR introduce technology-driven solutions to streamline internal operations and reduce inefficiencies?"
                ]
            },
            {
                title: "5. External Perception & Customer Experience",
                points: [
                    "The external customer who backed out highlighted inconsistencies in sales interactions. How can HR influence customer experience when it's not a direct HR function?",
                    "Can HR partner with the sales team to provide training on relationship management and communication skills?",
                    "Should HR implement a more structured onboarding program to ensure new sales hires are well-prepared to represent the company professionally?"
                ]
            }
        ]
    },
    questions: [
        { id: 1, perspective: "Sales VP Rajesh Mehta", question: "A top-performing sales executive has suddenly resigned, citing burnout and lack of work-life balance. Rajesh Mehta demands an immediate replacement. How should HR respond?", options: [ { id: 'A', text: "Conduct exit interviews, analyze burnout causes, and propose role restructuring." }, { id: 'B', text: "Start recruitment immediately but request Rajesh to allow time for hiring quality talent." }, { id: 'C', text: "Quickly promote a junior employee without assessing readiness." }, { id: 'D', text: "Offer a counteroffer to retain the employee without addressing underlying issues." }, { id: 'E', text: "Blame workload expectations and advise Rajesh to reduce targets." }, { id: 'F', text: "Do nothing and let Rajesh manage the situation himself." } ], bestAnswer: 'A' },
        { id: 2, perspective: "Sales VP Rajesh Mehta", question: "Sales performance has dropped 15% in the last quarter. Rajesh believes hiring more aggressive salespeople is the solution. What should HR do?", options: [ { id: 'A', text: "Conduct a root cause analysis to determine if training, workload, or processes are contributing factors." }, { id: 'B', text: "Start recruiting more salespeople immediately to increase manpower." }, { id: 'C', text: "Suggest firing underperformers before hiring new employees." }, { id: 'D', text: " Agree with Rajesh's perspective and focus only on hiring aggressive sales profiles." }, { id: 'E', text: "Recommend investing in technology-driven sales tools instead of hiring." }, { id: 'F', text: "Ignore Rajesh's concerns and let the sales team figure it out." } ], bestAnswer: 'A' },
        { id: 3, perspective: "Sales VP Rajesh Mehta", question: "The HR team has implemented a new incentive policy, but Rajesh complains that it is demotivating the team. How should HR handle this?", options: [ { id: 'A', text: "Conduct a pulse survey to gather feedback and refine the incentive structure." }, { id: 'B', text: "Ask Rajesh to communicate the benefits of the new structure better." }, { id: 'C', text: "Modify the policy without data, based solely on Rajesh's feedback." }, { id: 'D', text: "Keep the policy unchanged and tell Rajesh that adjustments will be reviewed in a year." }, { id: 'E', text: "Scrap the new policy and revert to the previous model to avoid complaints." }, { id: 'F', text: "Ignore Rajesh's concerns and let the dissatisfaction persist." } ], bestAnswer: 'A' },
        { id: 4, perspective: "Sales VP Rajesh Mehta", question: "A major B2B client has complained about inconsistent service due to high employee turnover. Rajesh blames HR for not retaining top sales talent. What is the best HR response?", options: [ { id: 'A', text: "Analyze exit interview data, identify turnover reasons, and propose retention strategies." }, { id: 'B', text: "Increase salaries for top salespeople without reviewing other retention factors." }, { id: 'C', text: "Shift blame to Rajesh's leadership style and avoid HR involvement." }, { id: 'D', text: "Ask Rajesh to resolve the issue directly with the client while HR works on hiring." }, { id: 'E', text: "Implement a stay interview process for existing employees to prevent further exits." }, { id: 'F', text: "Ignore the client complaint as an isolated issue." } ], bestAnswer: 'A' },
        { id: 5, perspective: "Sales VP Rajesh Mehta", question: "Rajesh wants to fire a sales employee for underperformance without following HR policies. How should HR respond?", options: [ { id: 'A', text: "Enforce performance management processes and offer coaching before termination." }, { id: 'B', text: "Allow Rajesh to fire the employee but offer severance to avoid legal issues." }, { id: 'C', text: "Fast-track termination to avoid team disruption." }, { id: 'D', text: "Suggest transferring the employee to a different sales role instead." }, { id: 'E', text: "Delay the decision and observe the employee's performance for another quarter." }, { id: 'F', text: "Approve the termination without following due process." } ], bestAnswer: 'A' },
        { id: 6, perspective: "Sales VP Rajesh Mehta", question: "The HR team is proposing a new flexible work policy, but Rajesh argues that sales teams must be in-office for maximum productivity. What should HR do?", options: [ { id: 'A', text: "Conduct a pilot test for flexibility with clear performance tracking." }, { id: 'B', text: "Implement full flexibility despite Rajesh's concerns." }, { id: 'C', text: "Reject the proposal and mandate full office presence." }, { id: 'D', text: "Offer flexibility only for non-client-facing sales roles." }, { id: 'E', text: "Let Rajesh decide and adjust policies only for the sales team." }, { id: 'F', text: "Ignore the debate and keep existing policies unchanged." } ], bestAnswer: 'A' },
        { id: 7, perspective: "Sales VP Rajesh Mehta", question: "Rajesh is struggling with a lack of collaboration between sales and marketing, leading to weak lead conversions. How should HR support this?", options: [ { id: 'A', text: "Organize cross-functional workshops to improve alignment." }, { id: 'B', text: "Hold a meeting with marketing to adjust their KPIs to fit sales objectives." }, { id: 'C', text: "Advise Rajesh to manage the conflict internally without HR involvement." }, { id: 'D', text: "Suggest hiring a third-party consultant to mediate the issue." }, { id: 'E', text: "Shift blame to the marketing team and escalate the issue to the MD." }, { id: 'F', text: "Ignore the issue and let the teams sort it out over time." } ], bestAnswer: 'A' },
        { id: 8, perspective: "Sales VP Rajesh Mehta", question: "Rajesh has requested urgent hiring for three senior sales roles. However, the HR team is struggling with finding the right candidates. What is the best course of action?", options: [ { id: 'A', text: "Communicate realistic timelines and offer interim solutions like internal promotions." }, { id: 'B', text: "Expedite hiring even if it means compromising on quality." }, { id: 'C', text: "Delay hiring and tell Rajesh to manage with the existing team." }, { id: 'D', text: "Suggest outsourcing part of the recruitment process to speed up results." }, { id: 'E', text: "Hire candidates without proper cultural fit assessment to meet the deadline." }, { id: 'F', text: "Stop prioritizing these roles and focus on other HR initiatives." } ], bestAnswer: 'A' },
        { id: 9, perspective: "Sales VP Rajesh Mehta", question: "A junior salesperson has filed an HR complaint against Rajesh for excessive pressure and unrealistic expectations. How should HR proceed?", options: [ { id: 'A', text: "Conduct a fair investigation, ensuring Rajesh's perspective is also considered." }, { id: 'B', text: "Dismiss the complaint as sales naturally involves pressure." }, { id: 'C', text: "Take immediate action against Rajesh without investigating." }, { id: 'D', text: "Transfer the salesperson to another team to avoid confrontation." }, { id: 'E', text: "Ask Rajesh to have a one-on-one discussion with the employee instead of HR intervening." }, { id: 'F', text: "Ignore the complaint to maintain leadership harmony." } ], bestAnswer: 'A' },
        { id: 10, perspective: "Sales VP Rajesh Mehta", question: "Rajesh is pushing for an aggressive sales hiring target, but HR warns of budget constraints. What is the best way forward?", options: [ { id: 'A', text: "Optimize current resources and explore upskilling for the existing team." }, { id: 'B', text: "Increase hiring despite the budget constraints." }, { id: 'C', text: "Reduce Rajesh's hiring targets without discussing alternatives." }, { id: 'D', text: "Ask finance to increase the budget to accommodate Rajesh's needs." }, { id: 'E', text: "Prioritize quality hires over quantity and extend the hiring timeline." }, { id: 'F', text: "Ignore the budget issue and let Rajesh handle cost overruns later." } ], bestAnswer: 'A' },
        { id: 11, perspective: "Sales VP Rajesh Mehta", question: "A key client has raised concerns about unethical sales tactics being used by Rajesh's team. How should HR handle this?", options: [ { id: 'A', text: "Launch an internal ethics audit and reinforce compliance training." }, { id: 'B', text: "Ignore the complaint unless legal action is threatened." }, { id: 'C', text: "Publicly penalize the sales team to set an example." }, { id: 'D', text: "Ask Rajesh to handle the issue internally without HR involvement." }, { id: 'E', text: "Shift blame to individual employees rather than addressing systemic issues." }, { id: 'F', text: "Defend the sales team without investigating further." } ], bestAnswer: 'A' },
        { id: 12, perspective: "Sales VP Rajesh Mehta", question: "Rajesh believes that incentives should be entirely commission-based, while HR prefers a balanced salary-incentive model. What should HR do?", options: [ { id: 'A', text: "Benchmark industry practices and propose a data-backed hybrid model." }, { id: 'B', text: "Let Rajesh decide the structure for the sales team." }, { id: 'C', text: "Implement HR's preference without consulting sales." }, { id: 'D', text: "Fully shift to commission-based pay, as Rajesh suggests." }, { id: 'E', text: "Conduct an employee survey before finalizing the model." }, { id: 'F', text: "Avoid making changes and keep the current structure." } ], bestAnswer: 'A' },
        { id: 13, perspective: "Sales VP Rajesh Mehta", question: "Sales managers are resigning due to lack of career progression. Rajesh is unaware of their frustrations. How should HR proceed?", options: [ { id: 'A', text: "Conduct stay interviews and propose a structured career development plan." }, { id: 'B', text: "Let Rajesh figure out why his managers are leaving." }, { id: 'C', text: "Offer salary hikes to managers to retain them." }, { id: 'D', text: "Ignore the resignations as a normal part of sales turnover." }, { id: 'E', text: "Encourage Rajesh to provide informal mentorship instead of a formal growth plan." }, { id: 'F', text: "Delay action and monitor the trend for a few more months." } ], bestAnswer: 'A' },
        { id: 14, perspective: "Sales VP Rajesh Mehta", question: "Rajesh is frustrated with HR's slow hiring process and wants to bypass formal protocols. What is the best response?", options: [ { id: 'A', text: "Streamline hiring without compromising quality, setting clear SLAs." }, { id: 'B', text: "Allow Rajesh to make direct hiring decisions without HR involvement." }, { id: 'C', text: "Keep hiring timelines unchanged, regardless of business urgency." }, { id: 'D', text: "Push back against Rajesh's request without offering alternative solutions." }, { id: 'E', text: "Accept delays as necessary to ensure compliance." }, { id: 'F', text: "Use only internal referrals to speed up hiring." } ], bestAnswer: 'A' },
        { id: 15, perspective: "Sales VP Rajesh Mehta", question: "A high-performing sales leader has received an offer from a competitor. Rajesh wants HR to counter-offer aggressively. What is the best way forward?", options: [ { id: 'A', text: "Conduct a retention discussion focusing on long-term career growth." }, { id: 'B', text: "Immediately match the competitor's offer." }, { id: 'C', text: "Let the employee leave without discussion." }, { id: 'D', text: "Create a counteroffer package without understanding the employee's concerns." }, { id: 'E', text: "Conduct an exit interview but make no effort to retain." }, { id: 'F', text: "Push the employee to decide quickly without further negotiation." } ], bestAnswer: 'A' },
        { id: 16, perspective: "Sales VP Rajesh Mehta", question: "Sales and Product teams are in conflict—Sales wants quick feature releases, but Product insists on quality. Rajesh blames Product for lost deals. How should HR mediate?", options: [ { id: 'A', text: "Set up a structured collaboration process with clear expectations." }, { id: 'B', text: "Take Rajesh's side and pressure Product to release features faster." }, { id: 'C', text: "Advise Rajesh to manage the conflict himself." }, { id: 'D', text: "Ignore the issue and let the teams resolve it over time." }, { id: 'E', text: "Suggest hiring more engineers to speed up product releases." }, { id: 'F', text: "Allow Sales to make direct feature requests without involving Product." } ], bestAnswer: 'A' },
        { id: 17, perspective: "Sales VP Rajesh Mehta", question: "A pattern emerges where only aggressive, extroverted employees are promoted in Rajesh's team. Introverts feel overlooked. How should HR address this?", options: [ { id: 'A', text: "Develop a fair, competency-based promotion framework." }, { id: 'B', text: "Let Rajesh continue using his current selection process." }, { id: 'C', text: "Enforce quotas to ensure introverts are promoted." }, { id: 'D', text: "Ask Rajesh to mentor introverted employees instead of changing promotion policies." }, { id: 'E', text: "Conduct an anonymous feedback survey before making any changes." }, { id: 'F', text: "Ignore the complaints and let team culture evolve naturally." } ], bestAnswer: 'A' },
        { id: 18, perspective: "Sales VP Rajesh Mehta", question: "Rajesh's top-performing sales reps show signs of burnout—long hours, health issues, declining morale. How should HR intervene?", options: [ { id: 'A', text: "Implement workload balancing and well-being initiatives." }, { id: 'B', text: "Tell Rajesh that burnout is normal in high-performance teams." }, { id: 'C', text: "Offer unlimited paid leave without adjusting targets." }, { id: 'D', text: "Ignore the issue unless sales numbers drop significantly." }, { id: 'E', text: "Replace overworked employees with fresh hires." }, { id: 'F', text: "Reduce targets without discussing with Rajesh." } ], bestAnswer: 'A' },
        { id: 19, perspective: "Sales VP Rajesh Mehta", question: "Rajesh has fostered a hyper-competitive culture—sales reps sabotage each other to win incentives. Team trust is low. What should HR do?", options: [ { id: 'A', text: "Redesign incentives to encourage teamwork." }, { id: 'B', text: "Let Rajesh continue with the current system since it drives results." }, { id: 'C', text: "Assign HR mentors to guide new sales reps in handling competition." }, { id: 'D', text: "Ban all sales incentives to eliminate unhealthy competition." }, { id: 'E', text: "Conduct one-on-one coaching but keep incentives unchanged." }, { id: 'F', text: "Let the situation play out naturally without interference." } ], bestAnswer: 'A' },
        { id: 20, perspective: "Sales VP Rajesh Mehta", question: "Rajesh resists hiring diverse talent, arguing that past hires from the same demographic background have performed best. How should HR respond?", options: [ { id: 'A', text: "Provide data-driven insights on the benefits of diversity." }, { id: 'B', text: "Let Rajesh continue hiring as per his preferences." }, { id: 'C', text: "Impose a strict diversity hiring quota." }, { id: 'D', text: "Allow diversity hiring but only in non-revenue roles." }, { id: 'E', text: "Conduct bias-awareness training but take no further action." }, { id: 'F', text: "Ignore the issue since hiring decisions rest with Rajesh." } ], bestAnswer: 'A' }
    ]
};

app.get('/api/case-study', (req, res) => {
    const questionsForFrontend = caseStudyData.questions.map(({ bestAnswer, ...rest }) => rest);
    res.json({ ...caseStudyData, questions: questionsForFrontend });
});

app.post('/api/evaluate', async (req, res) => {
    const { answers } = req.body;
    const userChoices = caseStudyData.questions.filter(q => answers[q.id]).map(q => {
        const option = q.options.find(o => o.id === answers[q.id]);
        return `For question "${q.question}", the user chose: "${option?.text || 'No choice found'}".`;
    }).join('\n');
    
    const systemPrompt = `You are an expert HR leadership assessment AI. Your task is to analyze user responses and provide a detailed report. You MUST output a response in a strict JSON format. Do not include any text outside the JSON object. IMPORTANT RULES FOR THE JSON STRUCTURE: 1. The "score" and "overallScore" fields MUST be a string containing a number out of 100, like "85/100". Do NOT use qualitative words like "Intermediate". 2. The "recommendedNextSteps" key MUST be a top-level key in the JSON object, at the same level as "executiveSummary" and "competencies". Do NOT nest it inside a competency object. The required JSON format is: { "executiveSummary": "...", "overallScore": "XX/100", "competencyBand": "...", "competencies": [ { "name": "...", "score": "...", "analysis": "...", "strengths": "...", "growthAreas": "..." } ], "recommendedNextSteps": [ "...", "..." ] } Ensure the "competencies" array contains an object for all six key competencies.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [ { role: "system", content: systemPrompt }, { role: "user", content: userChoices } ],
            response_format: { type: "json_object" }
        });
        
        const rawContent = response.choices[0].message.content;

        try {
            const report = JSON.parse(rawContent);
            res.json(report);
        } catch (parseError) {
            console.error("FAILED TO PARSE JSON FROM OPENAI. The AI returned malformed data.", parseError);
            console.error("--- RAW AI RESPONSE THAT FAILED ---");
            console.log(rawContent);
            console.log("---------------------------------");
            res.status(500).json({ error: "AI returned a response that was not valid JSON." });
        }
    } catch (apiError) {
        console.error("Error calling OpenAI API:", apiError);
        res.status(500).json({ error: "Failed to get a response from the OpenAI API." });
    }
});

// SSL certificate
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.majormod.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.majormod.xyz/fullchain.pem')
};

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS server listening at https://localhost:${port}`);
});