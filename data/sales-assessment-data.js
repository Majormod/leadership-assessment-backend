// sales-assessment-data.js

  // --- Section A: Trade-Off Questions (Q1-Q80) ---
  const questions = [
    {
    id: 1,
    text: "A consumer electronics firm faces diverging channel signals: online B2C sales are rising but volatile, retail is flat yet still commands trust, distribution partners warn of thinning margins, and institutional B2B buyers are exploring bulk contracts. Management asks for your channel priority recommendation. Each choice involves risk—what should the sales lead emphasize?",
    options: [
      { id: 'A', text: "Prioritize B2C online growth through exclusive SKUs and platform partnerships, accepting volatility but betting on scale, while tolerating retailer and distributor discontent as an inevitable consequence of digital channel dominance in consumer categories." },
      { id: 'B', text: "Re-anchor the business in retail by strengthening in-store experience, co-funded promotions, and retailer advocacy, preserving consumer trust and visibility, even if it means accepting slower revenue acceleration from faster-growing digital channels." },
      { id: 'C', text: "Channel investment into B2B institutional buyers with tailored contracts and bulk pricing, trading consumer brand visibility for stable volumes, while risking long-term positioning if end-consumer engagement erodes across retail and digital touchpoints." },
      { id: 'D', text: "Concentrate resources on distributor partnerships by stabilizing margins, extending credit terms, and securing loyalty, acknowledging slower growth in direct channels, but ensuring wide market coverage and long-term access to fragmented consumer demand." }
    ]
  },
  {
    id: 2,
    text: "A consumer goods company sees e-commerce contributing 20% of revenue but absorbing 45% of promotional spend, while general trade delivers 50% revenue with shrinking margins. Modern retail contributes 25% but has slowed growth, and institutional B2B demand is sporadic but high-ticket. Resources are capped. If you were deciding where to channel investment, which approach demonstrates the sharpest channel awareness?",
    options: [
      { id: 'A', text: "Concentrate resources on e-commerce despite cost inefficiencies, reasoning that digital scale builds long-term dominance, even if margin pressure intensifies and traditional partners become increasingly alienated." },
      { id: 'B', text: "Reallocate toward general trade by tightening distributor programs and expanding reach, even if near-term profitability weakens further, betting that volume dominance protects against category disruptions." },
      { id: 'C', text: "Invest disproportionately in modern retail through exclusive assortments and in-store activations, ensuring consumer visibility at scale, even if growth rates remain modest relative to digital channels." },
      { id: 'D', text: "Prioritize selective B2B contracts for large-volume buyers, trading reach for stability, accepting volatility in consumer-facing channels but leveraging institutional deals to anchor predictable revenue." }
    ]
  },
  {
    id: 3,
    text: "A beverage company observes declining volumes in its flagship carbonated line. Meanwhile, regional players are expanding into flavoured sparkling water, health-conscious consumers are experimenting with plant-based drinks, and seasonal festival demand is spiking for traditional syrups. Budgets are constrained, and leadership demands a decisive growth bet. Which opportunity should the sales lead prioritize?",
    options: [
      { id: 'A', text: "Expand aggressively into flavoured sparkling water, accepting uncertain consumer loyalty but capturing adjacency momentum, betting that category proximity reduces risk and creates immediate share in a trend competitors are already amplifying." },
      { id: 'B', text: "Chase seasonal festival demand with short-cycle syrup activations, trading sustained growth for cash-flow spikes, acknowledging that long-term opportunity may remain unaddressed while resources are tied to short-lived surges." },
      { id: 'C', text: "Reinforce carbonated portfolio through price promotions and pack innovation, defending legacy volumes while conceding share in new categories, betting that incumbency strength outweighs emerging signals of consumer fatigue." },
      { id: 'D', text: "Test plant-based drinks with limited pilot launches, recognizing slower adoption curves but securing first-mover positioning, even if near-term revenue impact is minimal and organizational patience for slow-burn categories may run thin." }
    ]
  },
  {
    id: 4,
    text: "A consumer electronics firm notices premium smartphones slowing in volume, while entry-level models dominate rural growth. Simultaneously, accessory sales like earbuds and chargers show high attachment rates, and refurbished devices are gaining traction in urban resale markets. With limited capacity to expand everywhere, management demands prioritization of one pocket of demand. Which path represents sharpest opportunity spotting?",
    options: [
      { id: 'A', text: "Invest in rural entry-level smartphones aggressively, risking thin margins but building long-term reach, betting that volume scale and early loyalty will translate into future upgrades despite low immediate profitability." },
      { id: 'B', text: "Build a structured accessories strategy with bundling and standalone sales, capturing high-margin attachment demand, even if it diverts focus from core devices and risks fragmenting channel efforts." },
      { id: 'C', text: "Explore refurbished device sales through online platforms, leveraging urban acceptance of affordability, acknowledging brand image risks and cannibalization of new models but betting on evolving consumer thrift behaviours." },
      { id: 'D', text: "Protect premium smartphones with aspirational campaigns and financing schemes, sustaining category perception even as growth slows, accepting that incremental gains may be harder to justify in the short term." }
    ]
  },
  {
    id: 5,
    text: "A home-appliances company receives mixed feedback: urban customers praise smart features but complain about after-sales service, while rural buyers emphasize durability and price. Online reviews highlight energy efficiency as a deciding factor, and retailers push for faster-moving models. Leadership wants one actionable direction. Which interpretation of these fragmented signals would best reflect sharp customer insight mining for future growth strategy?",
    options: [
      { id: 'A', text: "Prioritize after-sales service improvements across urban markets, leveraging existing smart-feature adoption, betting that experience gaps are the strongest barrier to loyalty, even if it sidelines energy-efficiency momentum and rural durability demands." },
      { id: 'B', text: "Focus product development on enhanced durability and affordability for rural customers, acknowledging their volume potential, even if it risks neglecting high-margin urban customers who demand advanced technology and service improvements." },
      { id: 'C', text: "Amplify energy efficiency as the unifying benefit across segments, reframing both smart and durable models under sustainability, even if it means deprioritizing immediate service fixes or channel-driven fast-moving assortments." },
      { id: 'D', text: "Respond to retailer pressure by doubling down on fast-moving models, securing shelf share and channel goodwill, even if deeper consumer insight on sustainability, durability, and service gaps is temporarily sidelined." }
    ]
  },
  {
    id: 6,
    text: "A food delivery platform collects feedback: young professionals want healthier menu options, families complain about inconsistent delivery times, and restaurant partners express dissatisfaction with commission structures. Social media chatter increasingly references \"value for money\" as a decision factor. The leadership team asks: from these competing signals, which insight should drive the platform's next growth action to convert scattered feedback into a meaningful opportunity?",
    options: [
      { id: 'A', text: "Expand healthy menu partnerships to capture young professionals, anchoring loyalty with wellness positioning, even if it risks leaving broader family concerns about delivery reliability unaddressed in the short run." },
      { id: 'B', text: "Invest heavily in delivery reliability and logistics efficiency, reframing speed and consistency as value, even if healthier menus and commission grievances remain unresolved for key stakeholders." },
      { id: 'C', text: "Redesign commission structures to appease restaurants, strengthening supply partnerships, even if consumer-facing health and reliability insights are deprioritized, betting that stronger supply-side goodwill sustains the platform in the long term." },
      { id: 'D', text: "Lean into \"value for money\" positioning in marketing campaigns, amplifying affordability messaging, even if operational issues like delivery consistency or commission tensions continue to undermine long-term customer and partner satisfaction." }
    ]
  },
  {
    id: 7,
    text: "A fast-moving consumer goods rep notices that several small retailers in his district are suddenly stocking an unfamiliar regional brand. Distributors quietly mention delayed deliveries from your company's warehouse, while a local festival is approaching that usually boosts category demand. Official sales reports show no decline yet. Which interpretation of these ground signals should guide your immediate action?",
    options: [
      { id: 'A', text: "Address distributor complaints about warehouse delays first, assuming supply disruption is the real trigger behind competitor entry, even if festival demand and retailer enthusiasm for regional players remain temporarily unaddressed." },
      { id: 'B', text: "Prepare an aggressive festival promotion to capture seasonal demand peaks, assuming temporary visibility will offset retailer curiosity about new entrants, even if underlying supply chain inefficiencies remain unresolved." },
      { id: 'C', text: "Launch price-matching schemes against the regional competitor, assuming retailer stocking decisions are driven mainly by margins, even if supply delays and festival opportunities are not fully leveraged." },
      { id: 'D', text: "Monitor official sales reports until a confirmed decline emerges, assuming that anecdotal signals may exaggerate competitor impact, even if distributors and retailers are already hinting at an unfolding risk." }
    ]
  },
  {
    id: 8,
    text: "In a metro cluster, mall footfall data shows steady traffic, but store managers report customers increasingly asking for smaller pack sizes. Local distributors complain about delayed credit recovery, while informal chatter suggests a competitor plans an in-store sampling blitz next month. Head office promotions remain focused on large packs. With no official directive yet, which local action should you prioritize?",
    options: [
      { id: 'A', text: "Prepare counter-sampling activities in anticipation of competitor activations, assuming visibility battles determine customer choice, even if current consumer preferences and distributor issues remain unresolved." },
      { id: 'B', text: "Focus on supporting distributors with credit recovery tools, assuming financial stability is the underlying concern, even if consumer signals on pack preference remain temporarily under-served." },
      { id: 'C', text: "Push for smaller pack allocations with distributors immediately, aligning with ground-level customer demand shifts, even if head office promotional strategy on larger packs remains unchanged and potentially conflicting." },
      { id: 'D', text: "Follow head office promotional guidance strictly, focusing on large-pack push, assuming centralized data outweighs anecdotal chatter, even if ground signals increasingly point toward demand fragmentation." }
    ]
  },
  {
    id: 9,
    text: "A regional competitor launches aggressive discounts on mid-tier SKUs, and retailers eagerly participate. Meanwhile, your premium line shows stable sell-through, and distributors whisper that the competitor is struggling with stockouts in rural territories. Head office debates whether to match discounts, push premium harder, or wait. Official reports don't yet capture the stockout situation. Which competitive response best reflects sharp scanning?",
    options: [
      { id: 'A', text: "Match competitor discounts in mid-tier SKUs immediately, assuming retailer enthusiasm will otherwise erode share, even if premium momentum and rural stockout vulnerabilities remain underleveraged." },
      { id: 'B', text: "Double down on premium SKUs with targeted activations, betting that competitor distraction in mid-tier segments allows you to consolidate leadership in higher-value categories." },
      { id: 'C', text: "Exploit rural stockout intelligence by rushing supply into underserved areas, securing distribution footholds before competitor replenishment, even if mid-tier pricing battles and premium momentum remain temporarily deprioritized." },
      { id: 'D', text: "Hold position and monitor further, assuming competitor aggressiveness may collapse under stock pressures, even if retailers push aggressively for your company to respond with visible discounts." }
    ]
  },
  {
    id: 10,
    text: "A competitor in modern retail chains begins offering bundled SKUs with added accessories, driving visible shelf dominance. Simultaneously, online chatter suggests complaints about those accessories' durability. Your distribution partners report rising inquiries about bundled formats, while internal marketing still focuses on standalone products. You must decide how to respond. Which approach reflects competitive scanning applied for proactive advantage?",
    options: [
      { id: 'A', text: "Replicate competitor bundling quickly to retain shelf parity, ensuring no immediate share loss, even if accessory durability issues create long-term risk of association with low-value add-ons." },
      { id: 'B', text: "Maintain standalone SKUs but arm field teams with counter-pitch messaging on accessory quality, betting that durability criticism will weaken competitor appeal without diluting your current strategy." },
      { id: 'C', text: "Develop differentiated bundles emphasizing quality-tested accessories, turning competitor criticism into contrast, even if development and rollout may take longer, risking temporary shelf disadvantage during competitor's promotional surge." },
      { id: 'D', text: "Ignore bundling trends temporarily, focusing instead on price competitiveness for standalone SKUs, assuming consumer value perceptions are more influenced by base product affordability than by add-on configurations." }
    ]
  },
  {
    id: 11,
    text: "A consumer durables sales team has been hitting quarterly targets largely through outbound calling campaigns, which recently delivered a strong ROI. However, referrals have slowed, walk-in traffic is inconsistent, and digital inquiries are rising but conversion is unclear. Management is concerned about over-reliance on outbound calling. If you were leading prospecting strategy, which path best demonstrates real lead source agility under shifting channel dynamics?",
    options: [
      { id: 'A', text: "Maintain heavy outbound focus while incrementally improving conversion from digital leads, betting that established calling efficiency should not be disrupted even if channel dependency risks remain structurally unaddressed." },
      { id: 'B', text: "Reinvigorate referral programs aggressively with customer incentives, treating them as the most credible lead source, even if other digital and outbound opportunities remain underexploited for near-term funnel resilience." },
      { id: 'C', text: "Test digital inquiries with structured pilots while maintaining calling and referral streams, diversifying cautiously, even if resource spread may reduce short-term efficiency of your highest-yield source." },
      { id: 'D', text: "Prioritize walk-in traffic through in-store activations, treating physical conversion opportunities as most tangible, even if lead flow may remain unpredictable compared to more scalable outbound and online methods." }
    ]
  },
  {
    id: 12,
    text: "An FMCG company sees distributor-sourced leads declining due to reduced beat activity. Meanwhile, e-commerce platforms are generating new inquiries, though volumes remain modest. Local events and sampling campaigns have shown bursts of effectiveness but are costly to sustain. The sales head asks you to decide where to direct prospecting effort for the coming quarter. Which choice shows sharpest understanding of lead source agility?",
    options: [
      { id: 'A', text: "Double down on e-commerce leads aggressively, assuming digital traction will only accelerate, even if distributor relationships weaken and local event-based engagement is deprioritized in the short run." },
      { id: 'B', text: "Revive distributor-led beat plans with new incentives, securing established flows, even if it means delaying investment in emerging but unproven digital and event-based prospecting opportunities." },
      { id: 'C', text: "Balance investment across distributors, digital platforms, and selective event campaigns, accepting lower short-term ROI but ensuring lead diversity and pipeline resilience across multiple prospecting channels." },
      { id: 'D', text: "Focus almost entirely on event activations for immediate volume spikes, accepting cost inefficiency as a trade-off for creating rapid short-term funnel momentum over structural diversification." }
    ]
  },
  {
    id: 13,
    text: "A snack brand is preparing for a metro-wide launch. The budget allows either an aggressive mall sampling blitz, partnerships with local college festivals, or smaller in-store tastings across modern retail outlets. Consumer research suggests young adults are the primary target, but families still account for majority purchase decisions. You must recommend one activation approach under limited funds. Which option demonstrates the sharpest application of activation skills?",
    options: [
      { id: 'A', text: "Prioritize mall sampling blitzes for maximum immediate visibility, even if targeting skews toward families rather than young adults and costs limit repetition across multiple weekends." },
      { id: 'B', text: "Invest in college festival partnerships, aligning tightly with young adult audiences, even if coverage breadth is limited and families who drive majority purchase volume remain under-engaged." },
      { id: 'C', text: "Focus on in-store tastings across retail chains, ensuring direct conversion at the shelf, even if this fails to excite the target demographic and deliver brand buzz during launch." },
      { id: 'D', text: "Split funds evenly across all three activation formats, hedging reach risks, even if diluted impact leaves none of the target groups deeply engaged." }
    ]
  },
  {
    id: 14,
    text: "A mid-tier electronics brand wants to revive sales of its entry-level smartphones. Competitors dominate with celebrity-driven mall activations and influencer campaigns. Your budget is modest, but distributors insist on visible activity to regain momentum. Options include experiential kiosks in transport hubs, retailer-led demo days, and local community tech fairs. Given these choices, what activation path best balances relevance, cost-effectiveness, and conversion likelihood?",
    options: [
      { id: 'A', text: "Set up kiosks in transport hubs, maximizing footfall exposure, even if the transient nature of audiences reduces conversion rates and repeat impressions required for durable brand recall." },
      { id: 'B', text: "Empower retailers with demo days, ensuring hands-on product experience at the point of sale, even if buzz creation remains modest compared to competitor-driven high-profile activations." },
      { id: 'C', text: "Sponsor local tech fairs, leveraging concentrated enthusiasts, even if the audience skews niche and mainstream exposure necessary for broader smartphone adoption remains limited." },
      { id: 'D', text: "Split the budget evenly across kiosks, fairs, and demos, hedging risk, even if fragmented investment prevents any single channel from generating meaningful consumer excitement or conversion." }
    ]
  },
  {
    id: 15,
    text: "A field sales rep enters a mid-sized retail outlet for the first time. The store manager looks busy, attending to inventory, and gives only a brief glance. Other sales reps are waiting nearby. You must choose how to initiate contact. A wrong move risks losing credibility or access. Which approach reflects the strongest application of customer approachability?",
    options: [
      { id: 'A', text: "Wait silently until the manager finishes, signalling respect for their time, even if the lack of proactive engagement risks blending into the crowd of other waiting sales representatives." },
      { id: 'B', text: "Introduce yourself briefly and acknowledge their busyness, offering to return later, demonstrating respect while planting a memorable first impression without demanding immediate attention." },
      { id: 'C', text: "Step in confidently with a product brochure, leveraging urgency to capture attention quickly, even if this interrupts workflow and risks irritating a potential long-term relationship." },
      { id: 'D', text: "Approach with a friendly icebreaker unrelated to sales, aiming to disarm the manager, even if this risks appearing unprofessional or off-topic in a business setting." }
    ]
  },
  {
    id: 16,
    text: "During a B2B client visit, you're introduced to a procurement head who seems sceptical and distracted, repeatedly checking emails. Their reputation is of being transactional and impatient with sales pitches. You must choose your opening move carefully. Which option demonstrates the sharpest application of customer approachability, ensuring you build trust without wasting their limited attention span?",
    options: [
      { id: 'A', text: "Begin with small talk to soften their demeanour, attempting to humanize the interaction, even if this risks further disengagement from someone already signaling impatience with non-essential conversation." },
      { id: 'B', text: "Open with a concise acknowledgment of their limited time, framing your value proposition upfront, signalling respect for their schedule while establishing clarity from the outset." },
      { id: 'C', text: "Launch directly into product details, leveraging urgency to deliver maximum content quickly, even if the absence of rapport weakens the likelihood of being heard beyond surface-level attention." },
      { id: 'D', text: "Pause the meeting, suggesting rescheduling for a calmer slot, even if this risks being interpreted as lack of adaptability and missed opportunity for immediate engagement." }
    ]
  },
  {
    id: 17,
    text: "You recently closed a large deal with a corporate client who is visibly satisfied and has praised your responsiveness. At the same time, your pipeline is thin and leadership expects fresh qualified leads quickly. You consider leveraging this client's network, but the relationship is still relatively new. How should you best approach the use of this satisfied customer for referrals?",
    options: [
      { id: 'A', text: "Immediately request introductions to their peer network, maximizing momentum while goodwill is fresh, even if the client perceives the move as premature and transactional rather than relationship-driven." },
      { id: 'B', text: "Encourage the client to share a testimonial or case study first, deepening advocacy credibility, even if direct introductions to peers may be delayed in the short run." },
      { id: 'C', text: "Wait until the client relationship matures further before requesting referrals, prioritizing trust, even if this risks missing the window where enthusiasm is highest and advocacy energy is strongest." },
      { id: 'D', text: "Approach their procurement team formally to request supplier recommendations to other accounts, bypassing the direct client champion, even if this risks bureaucratic friction and weaker referral quality." }
    ]
  },
  {
    id: 18,
    text: "Your distributor contact in a key territory has a strong personal network among retailers but has been cautious about making introductions. Sales pressure is high, and you know competitor reps are already leveraging local influencers for visibility. You must decide how to activate your distributor's network without damaging trust or appearing exploitative. What's the best approach to optimize referral and network use?",
    options: [
      { id: 'A', text: "Incentivize the distributor directly with performance bonuses for retailer introductions, ensuring motivation is immediate, even if referrals feel commercially driven rather than genuine endorsements." },
      { id: 'B', text: "Collaborate on a joint retailer event hosted by the distributor, allowing natural introductions, even if setup requires more time and effort before tangible leads emerge." },
      { id: 'C', text: "Privately approach retailers within the distributor's network, leveraging informal connections, even if bypassing the distributor risks undermining long-term trust in the partnership." },
      { id: 'D', text: "Focus entirely on building your own retailer network from scratch, avoiding distributor reliance, even if short-term access to established relationships is lost during competitive activity." }
    ]
  },
  {
    id: 19,
    text: "Your territory has produced no new qualified leads for three weeks despite daily outreach. Competitors appear active, and management is pressing for visible pipeline recovery. Fatigue is creeping into your routine, and your instinct is to either reinvent your pitch completely, reduce prospecting to conserve energy, or keep grinding through with steady activity. Which course of action demonstrates the sharpest application of consistent hustle?",
    options: [
      { id: 'A', text: "Cut prospecting volume temporarily, conserving energy for a refreshed approach later, even if pipeline momentum dips further during the pause and recovery requires steeper future effort." },
      { id: 'B', text: "Maintain daily outreach intensity with structured tracking, trusting consistency to eventually deliver, even if short-term results remain scarce and frustration risks undermining morale in the meantime." },
      { id: 'C', text: "Completely redesign prospecting pitches immediately, assuming innovation is the only way to break through, even if frequent changes reduce discipline and prevent reliable measurement of what actually works." },
      { id: 'D', text: "Shift focus entirely to nurturing existing accounts for near-term wins, even if pipeline health deteriorates further from lack of consistent new lead generation activity." }
    ]
  },
  {
    id: 20,
    text: "A sales manager notices one rep who produces bursts of exceptional prospecting in some weeks but goes nearly silent in others, claiming to need recovery periods after heavy activity. Another rep is slower but makes steady daily outreach without peaks. The manager must decide where to focus recognition and coaching. Which decision demonstrates the most accurate grasp of consistent hustle in long-term pipeline health?",
    options: [
      { id: 'A', text: "Recognize the burst performer, celebrating peak weeks of brilliance, even if periods of silence risk pipeline gaps that make forecasting unreliable and future target delivery inconsistent." },
      { id: 'B', text: "Recognize the steady rep, rewarding daily cadence that ensures predictability, even if activity levels are modest and results appear less impressive compared to high-visibility bursts from others." },
      { id: 'C', text: "Split recognition evenly across both reps, encouraging different working styles, even if this blurs accountability for long-term pipeline stability and signals tolerance for inconsistency in prospecting routines." },
      { id: 'D', text: "Defer recognition for both until targets improve across the team, even if individual discipline or inconsistency lessons remain unaddressed and long-term prospecting culture weakens as a result." }
    ]
  },
  {
    id: 21,
    text: "In your territory, several retailers mention that a competitor is offering \"secret discounts\" to select outlets. No official promotion is visible, but sales reps from that brand are seen visiting more frequently. Your distributor insists margins are being eroded already. Leadership is pressing you for a read. With incomplete and partly anecdotal data, which approach demonstrates the sharpest application of competitive intelligence?",
    options: [
      { id: 'A', text: "Alert leadership immediately about competitor discounting, recommending counter-schemes, even if evidence rests largely on retailer anecdotes and no formal confirmation of pricing changes exists yet." },
      { id: 'B', text: "Validate rumours by triangulating retailer inputs with invoice checks, customer bills, and distributor comparisons, escalating only after confirming competitor activity with hard evidence beyond surface-level chatter." },
      { id: 'C', text: "Ignore the talk until official price lists appear, assuming retailer gossip exaggerates competitor tactics, even if market share continues to erode during this wait-and-watch stance." },
      { id: 'D', text: "Ask your distributor to confront competitor sales reps directly, collecting insights through informal channels, even if this risks unverified claims escalating into inter-company conflict or misinformation." }
    ]
  },
  {
    id: 22,
    text: "A competitor launches a new mid-tier product. Field chatter suggests it's priced below cost, but early customers praise its durability. Retailers push for clarity, distributors worry about lost share, and your marketing team is sceptical, calling it a \"short-lived stunt.\" Official data on volumes isn't available yet. As the frontline sales lead, what competitive intelligence step should you prioritize before recommending any counteraction?",
    options: [
      { id: 'A', text: "Collect structured customer feedback on product usage and durability, validating whether early praise reflects genuine differentiation, even if pricing clarity takes longer to establish through formal market data." },
      { id: 'B', text: "Recommend immediate price-matching on your own mid-tier line, neutralizing competitor advantage, even if no verified evidence confirms sustainability of their discount-driven strategy." },
      { id: 'C', text: "Report distributor concerns upward quickly, framing competitor's move as a critical threat, even if insights remain largely speculative and lack verified proof from market validation." },
      { id: 'D', text: "Wait for syndicated market research data to confirm volumes, assuming third-party reports will provide definitive clarity, even if competitor momentum accelerates unchecked in the meantime." }
    ]
  },
  {
    id: 23,
    text: "During a negotiation, a prospect says: \"Your competitor is offering the same product at 15% less and promises faster delivery. Why should I even consider you?\" The room includes both technical evaluators and finance stakeholders. You must respond in real time. Which counter-pitch demonstrates mastery in addressing competitor claims without losing credibility or appearing defensive?",
    options: [
      { id: 'A', text: "Emphasize competitor weaknesses, pointing out known delays and hidden costs, even if this risks sounding negative and undermining your credibility with evaluators who expect professional, fact-based arguments." },
      { id: 'B', text: "Reframe total cost-of-ownership, highlighting lifecycle reliability, service efficiency, and reduced downtime, showing that value extends beyond upfront pricing and delivery speed, even if savings aren't immediately visible." },
      { id: 'C', text: "Offer to match competitor's pricing and expedite delivery timelines, neutralizing objections directly, even if this undermines your value story and signals weakness in negotiation posture." },
      { id: 'D', text: "Deflect the comparison by redirecting the conversation toward your broader portfolio, even if this risks leaving the immediate objection unanswered and weakening trust with analytical decision-makers in the room." }
    ]
  },
  {
    id: 24,
    text: "A retail chain buyer challenges you: \"Brand X has a higher consumer pull right now. If I stock your line, why should I take the risk?\" The buyer is data-driven but pragmatic, under pressure to maximize shelf turnover. You need to counter the competitor's strength in pull without resorting to dismissiveness. Which response reflects the sharpest counter-pitching skill?",
    options: [
      { id: 'A', text: "Criticize Brand X's marketing hype, suggesting consumer demand is temporary and inflated, even if this undermines your professional credibility and risks sounding defensive in a fact-driven discussion." },
      { id: 'B', text: "Present consumer data on your repeat-purchase rates and higher category margins, reframing pull as sustainable profitability, even if short-term buzz appears stronger for Brand X." },
      { id: 'C', text: "Propose deeper trade discounts to offset the risk of stocking your line, even if this shifts the conversation away from value differentiation toward margin erosion." },
      { id: 'D', text: "Downplay Brand X entirely, emphasizing only your promotional calendar, even if this avoids head-to-head comparison but risks appearing evasive in front of a buyer seeking analytical clarity." }
    ]
  },
  {
    id: 25,
    text: "One of your long-term institutional clients suddenly shows reduced order volumes. Informal feedback from operations staff hints that a competitor has been offering aggressive credit terms and faster response times. The client's procurement head hasn't raised any concerns directly but seems less available than usual. You must act quickly to prevent account erosion. Which step demonstrates the strongest application of proactive share defence?",
    options: [
      { id: 'A', text: "Propose matching competitor credit terms immediately, assuming price and credit flexibility are the only drivers of retention, even if this weakens your margins and sets a precedent for future demands." },
      { id: 'B', text: "Arrange a proactive client review meeting, addressing potential pain points and offering differentiated service improvements, even if competitor credit offers remain unchallenged in the short term." },
      { id: 'C', text: "Increase frequency of account manager visits, signalling commitment through visibility, even if no structured plan addresses underlying service or commercial concerns contributing to reduced order volumes." },
      { id: 'D', text: "Wait for the procurement head to raise issues formally, avoiding premature escalation, even if competitor traction strengthens further and relationships weaken in the meantime." }
    ]
  },
  {
    id: 26,
    text: "A distributor who has supported your brand for years begins allocating more shelf space to a rival after they sponsored an exclusive in-store display program. Sales numbers are stable for now, but your field reps report reduced enthusiasm from the distributor's sales team. Leadership asks how you plan to defend share without immediately escalating incentives. Which course of action best represents strategic share defence?",
    options: [
      { id: 'A', text: "Launch a counter-display program with higher incentives, regaining shelf presence quickly, even if this further escalates the incentive race and erodes profitability in the long run." },
      { id: 'B', text: "Strengthen distributor engagement through joint business planning and exclusive training for their sales team, differentiating support beyond incentives, even if competitor-funded visibility remains temporarily stronger." },
      { id: 'C', text: "Reallocate effort to other distributors in the territory, reducing dependence on one partner, even if it risks weakening historical loyalty and further ceding ground to the rival locally." },
      { id: 'D', text: "Hold position and monitor sales volumes, assuming distributor enthusiasm will normalize over time, even if competitor-funded engagement solidifies their advantage during the interim." }
    ]
  },
  {
    id: 27,
    text: "A regional hospital client complains that their current supplier has delayed delivery of critical consumables for the second time in a quarter. The procurement team voices frustration privately but has not formally initiated a switch. Your competitor still holds the official contract. You see an opening to intervene. How should you best approach this opportunity conversion without jeopardizing ethical boundaries or long-term trust?",
    options: [
      { id: 'A', text: "Offer immediate emergency supply at competitive terms, positioning reliability as your differentiator, even if this means absorbing temporary logistical costs to prove responsiveness and secure long-term trust." },
      { id: 'B', text: "Criticize the competitor openly during discussions, reinforcing their unreliability, even if this risks sounding opportunistic and undermining your own credibility with procurement stakeholders." },
      { id: 'C', text: "Wait until the hospital issues a formal RFP, ensuring compliance and fairness, even if this delays action and allows competitor recovery before decisions are reconsidered." },
      { id: 'D', text: "Approach senior hospital leadership with a takeover proposal, bypassing procurement frustration, even if this risks alienating the very stakeholders responsible for daily vendor decisions." }
    ]
  },
  {
    id: 28,
    text: "In your territory, a competitor brand faces widespread stockouts across small retail outlets due to supply chain disruption. Retailers complain about empty shelves but remain hesitant to shift loyalties, expecting the competitor to recover. Your distributor is ready to push extra inventory, but budgets for promotions are limited. Leadership asks how you plan to capitalize. Which move reflects the sharpest practice of opportunity conversion?",
    options: [
      { id: 'A', text: "Flood outlets with your product aggressively, leveraging availability to dominate shelves, even if this risks channel overstocking and potential pushback when competitor supply normalizes." },
      { id: 'B', text: "Provide retailers with immediate replenishment support and joint visibility initiatives, framing reliability as your core differentiator, even if competitor brand preference remains culturally stronger among customers." },
      { id: 'C', text: "Hold back until competitor supply issues persist longer, assuming loyalty shifts only after repeated disappointments, even if this delays capturing share while frustration is highest." },
      { id: 'D', text: "Offer steep short-term discounts to lure retailers, even if this risks profitability erosion and undermines your positioning once competitor supply stabilizes." }
    ]
  },
  {
    id: 29,
    text: "A large corporate prospect shortlists your company and two competitors. One competitor leads with aggressive price cuts; the other highlights flashy new features but has a mixed service record. During negotiations, the procurement team emphasizes budget constraints, while senior management stresses vendor reliability. You must differentiate your offering decisively. Which approach demonstrates the sharpest application of positive differentiation in this contested situation?",
    options: [
      { id: 'A', text: "Reframe the conversation around lifecycle reliability and proven service metrics, showing how lower downtime and stronger support deliver hidden savings, even if your upfront pricing appears higher than competitors' aggressive offers." },
      { id: 'B', text: "Introduce bundled discounts to reduce perceived price gaps, even if this dilutes your value positioning and shifts focus away from reliability and service differentiation." },
      { id: 'C', text: "Highlight minor product enhancements to counter competitor features, even if these do not address procurement's core concerns around budget efficiency and management's emphasis on dependability." },
      { id: 'D', text: "Keep discussions aspirational by stressing brand reputation, even if this avoids addressing concrete procurement criteria like cost efficiency and management concerns around service stability." }
    ]
  },
  {
    id: 30,
    text: "In retail, your mid-premium brand faces pressure from a low-cost competitor offering steep discounts and a luxury competitor investing heavily in aspirational campaigns. Retailers complain margins are under pressure, while consumers increasingly expect justification for \"mid-tier\" pricing. You must position your product to protect shelf space and maintain traction. Which approach demonstrates the strongest application of positive differentiation in this dual-front competitive squeeze?",
    options: [
      { id: 'A', text: "Position the brand as best-in-class value-for-money, highlighting durability and consistent performance, even if it lacks luxury appeal, ensuring consumers and retailers see justification beyond discounts or superficial brand image." },
      { id: 'B', text: "Reduce pricing to narrow the gap with low-cost competitors, even if this risks eroding perceived brand value and mid-premium differentiation in the category." },
      { id: 'C', text: "Invest in lifestyle marketing to counter luxury competitors, even if this risks overstretching budgets and fails to directly defend against low-cost challengers' aggressive price positioning." },
      { id: 'D', text: "Focus only on short-term retailer incentives, securing shelf space temporarily, even if this undermines sustainable consumer-level differentiation in a highly contested mid-tier market." }
    ]
  },
  {
    id: 31,
    text: "You meet with the procurement head of a manufacturing firm evaluating new suppliers. They outline cost reduction as their primary goal but repeatedly reference downtime issues without elaborating. Other vendors jump straight into pricing discussions. You sense an unspoken pain point behind the words. How should you proceed to uncover their true motivation without risking rapport or appearing intrusive?",
    options: [
      { id: 'A', text: "Probe gently about downtime experiences, asking open-ended questions about operational stability, even if this temporarily shifts focus away from pricing and requires patience to uncover deeper concerns." },
      { id: 'B', text: "Focus entirely on cost reduction, matching competitor pricing pitches, even if this misses the underlying downtime issue that may be the real driver behind supplier evaluation." },
      { id: 'C', text: "Share case studies of reliability improvements from other clients, indirectly addressing downtime concerns, even if this avoids direct questioning and risks missing specific client context." },
      { id: 'D', text: "Promise both cost savings and reliability without probing further, assuming you can deliver on both, even if this fails to diagnose the specific downtime triggers affecting their operations." }
    ]
  },
  {
    id: 32,
    text: "A retail chain buyer mentions needing \"better margins\" but also hints at inventory pile-up in certain categories. Competitors are pushing volume-based discounts. You suspect margin pressure is a symptom, not the core problem. How should you best uncover the real motivation behind their stated need for better margins?",
    options: [
      { id: 'A', text: "Ask directly about inventory turnover rates and category performance, linking margin needs to stock efficiency, even if this requires shifting the conversation away from immediate discount demands." },
      { id: 'B', text: "Offer deeper discounts on high-volume SKUs, addressing stated margin pressure directly, even if this fails to address underlying inventory inefficiencies and risks worsening stock pile-up." },
      { id: 'C', text: "Focus on promotional support to clear existing inventory, indirectly improving margins through sell-through, even if this avoids diagnosing whether inventory issues are the actual root cause." },
      { id: 'D', text: "Avoid probing further, assuming the buyer will clarify if needed, even if this risks missing the real motivation and offering generic solutions that don't address their specific operational challenges." }
    ]
  },
  {
    id: 33,
    text: "A corporate client requests a proposal for enterprise software. Their RFP emphasizes cost efficiency, but during discussions, department heads hint at integration challenges with existing systems. The procurement lead insists on sticking to the RFP's pricing focus. You must decide how to address both stated and unstated needs without appearing to disregard formal requirements. Which approach demonstrates the strongest application of need diagnosis?",
    options: [
      { id: 'A', text: "Submit a compliant proposal focused on cost efficiency, avoiding mention of integration challenges, even if this risks missing the real pain points voiced by department heads during informal discussions." },
      { id: 'B', text: "Include an optional addendum addressing integration capabilities and long-term compatibility, balancing RFP compliance with deeper need diagnosis, even if procurement initially prioritizes cost above all else." },
      { id: 'C', text: "Challenge the RFP's narrow focus openly, urging a broader evaluation of integration risks, even if this alienates procurement and risks non-compliance with their formal evaluation criteria." },
      { id: 'D', text: "Promise cost efficiency while informally assuring department heads of integration support, even if this creates inconsistency between written proposal and verbal commitments, risking future disputes." }
    ]
  },
  {
    id: 34,
    text: "A retailer wants to improve footfall during weekdays. The stated need is \"more promotions,\" but store managers mention that nearby competitors have better loyalty programs. The buyer's immediate demand is for discount schemes. You suspect promotions are a temporary fix, not a strategic solution. How should you approach diagnosing the real need here?",
    options: [
      { id: 'A', text: "Probe into customer retention metrics and loyalty program effectiveness, linking promotions to long-term engagement, even if this requires delaying immediate discount discussions to address root causes." },
      { id: 'B', text: "Design a weekday promotion package quickly, meeting the stated demand, even if this avoids diagnosing whether loyalty or retention is the deeper issue behind footfall decline." },
      { id: 'C', text: "Recommend a loyalty program instead of promotions, disregarding the buyer's immediate request, even if this risks appearing unresponsive to their stated preference for short-term activations." },
      { id: 'D', text: "Combine promotions with a small loyalty trial, hedging your response, even if this fails to fully diagnose whether promotions or loyalty address the core footfall challenge effectively." }
    ]
  },
  {
    id: 35,
    text: "A potential client in the hospitality sector expresses interest in your premium equipment but hesitates due to high upfront cost. They mention budget constraints but also allude to competitors' cheaper alternatives. You sense that reliability and long-term savings are important but unstated. How should you best connect your solution to their deeper needs without sounding dismissive of budget concerns?",
    options: [
      { id: 'A', text: "Emphasize durability and reduced maintenance costs, framing higher upfront investment as long-term savings, even if this requires patient explanation and may not immediately overcome budget anxiety." },
      { id: 'B', text: "Match competitor pricing with a stripped-down version, avoiding discussion of premium features, even if this undermines your value proposition and fails to address unstated reliability needs." },
      { id: 'C', text: "Focus solely on product features, assuming technical superiority will justify the price, even if this overlooks the client's expressed budget constraints and unstated operational efficiency concerns." },
      { id: 'D', text: "Defer the discussion until next budget cycle, avoiding price pressure, even if this delays conversion and allows competitors to solidify their position with cheaper alternatives." }
    ]
  },
  {
    id: 36,
    text: "A school administrator wants to upgrade classroom technology. They request the latest devices but seem unsure about total cost of ownership. Teachers mention ease of use, while IT staff worry about compatibility. You must align your solution with these layered needs. Which approach demonstrates the strongest solution alignment?",
    options: [
      { id: 'A', text: "Propose a phased implementation starting with teacher training and compatibility checks, aligning with both ease-of-use and IT concerns, even if this delays full rollout and doesn't immediately meet the administrator's desire for latest devices." },
      { id: 'B', text: "Recommend the latest devices with emphasis on features, satisfying the administrator's initial request, even if this overlooks teacher usability and IT compatibility issues that may emerge later." },
      { id: 'C', text: "Focus on cost-saving alternatives to meet budget constraints, even if this fails to address the administrator's aspiration for modern technology and teacher needs for user-friendly solutions." },
      { id: 'D', text: "Suggest forming a committee to study options further, avoiding immediate commitment, even if this delays decision-making and fails to provide clear solution alignment with stated and unstated needs." }
    ]
  },
  {
    id: 37,
    text: "A retail chain buyer wants to increase sales of health snacks. They ask for more promotions, but store-level data shows high initial sales followed by quick drop-offs. You suspect the issue is more about product placement and consumer education than discounting. How should you align your solution to their true business objective?",
    options: [
      { id: 'A', text: "Propose a combination of targeted promotions, shelf repositioning near checkout counters, and in-store sampling to drive trial and visibility, addressing both stated and diagnostic needs." },
      { id: 'B', text: "Design aggressive discount schemes as requested, focusing solely on price promotions, even if this fails to address the drop-off pattern and may erode margins long-term." },
      { id: 'C', text: "Recommend removing the product from shelves temporarily, arguing weak demand, even if this contradicts the buyer's goal of increasing sales and misses opportunity for improvement." },
      { id: 'D', text: "Focus on competitor activity instead of the buyer's request, suggesting counter-strategies against rival brands, even if this avoids aligning with the specific sales increase objective." }
    ]
  },
  {
    id: 38,
    text: "A corporate client wants to reduce printing costs. Their initial request is for cheaper toner cartridges, but your assessment reveals outdated printers are the main cost driver. The procurement team prefers quick fixes over capital investment. How do you best align your solution with their deeper business objective?",
    options: [
      { id: 'A', text: "Propose a printer upgrade with cost-benefit analysis showing long-term savings, even if this requires convincing procurement to consider capital expenditure beyond their initial preference for toner cost reduction." },
      { id: 'B', text: "Supply cheaper toner cartridges as requested, meeting immediate demand, even if this fails to address the root cause of high printing costs and misses larger savings opportunity." },
      { id: 'C', text: "Suggest reducing print usage through policy changes, avoiding hardware discussions, even if this doesn't align with their operational needs and may be impractical to implement." },
      { id: 'D', text: "Delay response until they experience further cost issues, avoiding difficult conversations, even if this misses the opportunity to provide true solution alignment early." }
    ]
  },
  {
    id: 39,
    text: "During a sales presentation to a hospital committee, you notice the medical director focused on clinical outcomes while the finance manager emphasizes cost control. Your solution offers superior patient results but at a higher price point. How should you handle these conflicting priorities?",
    options: [
      { id: 'A', text: "Present clinical benefits to the medical director while separately discussing long-term cost savings with the finance manager, tailoring messages to each stakeholder's priorities." },
      { id: 'B', text: "Focus exclusively on clinical outcomes, assuming medical needs should dominate, even if this alienates the finance manager and risks budget rejection." },
      { id: 'C', text: "Emphasize cost reduction aspects to please the finance manager, downplaying premium features, even if this undermines your solution's clinical advantages." },
      { id: 'D', text: "Avoid discussing specifics, keeping the presentation high-level, even if this fails to address either stakeholder's concerns and leaves both unsatisfied." }
    ]
  },
  {
    id: 40,
    text: "A school district evaluation committee includes teachers wanting user-friendly technology, IT staff concerned about integration, and administrators focused on budget. Your product excels in usability but requires some customization for existing systems. How do you balance these stakeholder needs?",
    options: [
      { id: 'A', text: "Highlight ease-of-use for teachers, present integration support plans for IT, and demonstrate long-term value for administrators, addressing each group's concerns while showing comprehensive understanding." },
      { id: 'B', text: "Focus only on the budget concerns of administrators, as they hold purchasing authority, even if this neglects teacher and IT needs that could affect implementation success." },
      { id: 'C', text: "Emphasize technical features to impress IT staff, assuming their approval is most critical, even if this overwhelms teachers and doesn't address cost considerations." },
      { id: 'D', text: "Promise everything to everyone without specifics, risking later disappointment when conflicting needs emerge during implementation." }
    ]
  },
  {
    id: 41,
    text: "A manufacturing client's production team loves your equipment's efficiency, but procurement insists on 15% lower pricing. The decision-making committee includes both groups. Your margin is already thin. How should you navigate this multi-stakeholder negotiation?",
    options: [
      { id: 'A', text: "Work with production to quantify efficiency gains that justify current pricing, while offering procurement modest payment terms improvement, addressing both efficiency and cost concerns." },
      { id: 'B', text: "Reduce price immediately to secure the deal, even if this erodes profitability and sets a difficult precedent for future negotiations." },
      { id: 'C', text: "Refuse any price reduction, relying on production's support to override procurement, even if this creates internal conflict and risks losing the deal." },
      { id: 'D', text: "Focus on building relationships with committee members individually, without addressing the specific pricing conflict, hoping personal connections will overcome substantive disagreements." }
    ]
  },
  {
    id: 42,
    text: "A retail chain's marketing team wants exclusive product variants, while operations prefers standardized inventory for efficiency. As their supplier, you can customize but at higher cost. The buying committee includes both departments. How do you balance these conflicting internal stakeholder needs?",
    options: [
      { id: 'A', text: "Propose limited-edition variants for peak seasons alongside standardized core products, balancing marketing excitement with operational efficiency, while transparently discussing cost implications." },
      { id: 'B', text: "Side with marketing since they drive consumer demand, offering full customization even if this creates operational challenges for the client and higher costs for you." },
      { id: 'C', text: "Recommend sticking to standardized products only, prioritizing operational simplicity, even if this disappoints marketing and reduces competitive differentiation." },
      { id: 'D', text: "Let the client's internal teams resolve their conflict before proceeding, avoiding involvement in their decision-making process, even if this delays the sale." }
    ]
  },
  {
    id: 43,
    text: "A prospective client questions your product's premium pricing compared to competitors. Instead of defending the price directly, you guide them through a cost-benefit analysis showing how your solution reduces downtime, extends lifespan, and requires less maintenance. What is the primary strategic purpose of this approach?",
    options: [
      { id: 'A', text: "To reframe the conversation from upfront cost to long-term value, helping the client see economic justification beyond initial price comparison." },
      { id: 'B', text: "To avoid discussing price altogether by overwhelming them with technical data they may not fully understand." },
      { id: 'C', text: "To signal that your product is too sophisticated for price-sensitive customers, effectively qualifying the prospect's budget capacity." },
      { id: 'D', text: "To delay price negotiations until the client is more emotionally invested in the product features." }
    ]
  },
  {
    id: 44,
    text: "When a retailer complains about slow inventory turnover, you shift the discussion to consumer buying patterns and shelf placement strategies rather than immediately offering discounts. What is the key benefit of this conversational redirection?",
    options: [
      { id: 'A', text: "It addresses the root cause of slow turnover rather than just the symptom, potentially creating more sustainable solutions for both parties." },
      { id: 'B', text: "It avoids making any concessions on pricing or terms that might reduce your profitability." },
      { id: 'C', text: "It demonstrates your expertise in retail dynamics, making the retailer more dependent on your advice." },
      { id: 'D', text: "It buys time until market conditions improve and inventory naturally moves faster." }
    ]
  },
  {
    id: 45,
    text: "A client focuses exclusively on product specifications during discussions. You deliberately steer the conversation toward implementation support, training, and service reliability. Why is this redirection strategically important?",
    options: [
      { id: 'A', text: "It highlights value-added aspects where you may have competitive advantages beyond basic product features." },
      { id: 'B', text: "It conceals potential shortcomings in the product's technical specifications compared to competitors." },
      { id: 'C', text: "It simplifies the sales process by reducing the number of decision factors the client must consider." },
      { id: 'D', text: "It allows you to avoid technical details that you may not fully understand." }
    ]
  },
  {
    id: 46,
    text: "During negotiations, a buyer keeps returning to price objections. You consistently redirect to discussions about quality consistency, supply reliability, and after-sales support. What is the underlying psychology of this conversational framing technique?",
    options: [
      { id: 'A', text: "It elevates the decision criteria from price alone to a broader value proposition where you can compete more effectively." },
      { id: 'B', text: "It tests the buyer's patience to see how serious they are about their price objections." },
      { id: 'C', text: "It signals that you're not willing to negotiate on price under any circumstances." },
      { id: 'D', text: "It helps you identify which aspects of your offering the buyer truly values beyond price." }
    ]
  },
  {
    id: 47,
    text: "A corporate client's procurement team insists on standardized pricing based on volume tiers. Your solution delivers greater value through customization that doesn't fit their standard model. How should you approach this pricing discussion?",
    options: [
      { id: 'A', text: "Propose a tailored pricing model that reflects the specific value delivered through customization, while showing how it aligns with their volume-based thinking." },
      { id: 'B', text: "Accept their standardized pricing to secure the deal, even if it doesn't adequately reflect your solution's custom value." },
      { id: 'C', text: "Refuse to negotiate on pricing, insisting your customized approach requires premium pricing regardless of volume." },
      { id: 'D', text: "Hide the customization costs within other service fees to make the base price appear standardized." }
    ]
  },
  {
    id: 48,
    text: "A retailer demands lower prices to match a competitor's offer. Your product has better quality and brand recognition, but the retailer focuses solely on cost. How do you structure your pricing response?",
    options: [
      { id: 'A', text: "Maintain your price but enhance the value proposition through marketing support, merchandising assistance, or extended payment terms." },
      { id: 'B', text: "Match the competitor's price immediately to avoid losing the business, even if it erodes your brand positioning." },
      { id: 'C', text: "Offer a lower-priced alternative product specifically for price-sensitive retailers." },
      { id: 'D', text: "Refuse to discuss pricing and emphasize your product's premium quality until the retailer accepts your position." }
    ]
  },
  {
    id: 49,
    text: "A long-term client requests special pricing for a large order, but your company policy prohibits deviations from standard rates. The client threatens to explore alternatives. How should you handle this situation?",
    options: [
      { id: 'A', text: "Explore non-price alternatives like value-added services, extended warranties, or flexible payment terms that provide equivalent value while maintaining pricing integrity." },
      { id: 'B', text: "Make a secret exception to company policy to retain the client, risking disciplinary action if discovered." },
      { id: 'C', text: "Strictly enforce company policy and accept the potential loss of the client." },
      { id: 'D', text: "Delay responding while hoping the client's demand diminishes over time." }
    ]
  },
  {
    id: 50,
    text: "During contract renewal, a client demands a price reduction citing budget constraints. Your costs have increased since the original agreement. How do you approach this pricing negotiation?",
    options: [
      { id: 'A', text: "Acknowledge their budget concerns while transparently explaining your cost increases, then propose a modest adjustment that shares the burden between both parties." },
      { id: 'B', text: "Accept their demanded reduction to preserve the relationship, absorbing the full cost increase yourself." },
      { id: 'C', text: "Refuse any price change, insisting that market conditions require the increase." },
      { id: 'D', text: "Offer a lower price but reduce service levels correspondingly without explicitly informing the client." }
    ]
  },
  {
    id: 51,
    text: "A prospect hesitates to commit, requesting more time to evaluate options. Your quarter ends in two weeks, and this deal would help you meet your target. How do you balance urgency with relationship building?",
    options: [
      { id: 'A', text: "Explain the quarter-end timing context while emphasizing your commitment to ensuring they make the right decision, offering to address specific concerns immediately." },
      { id: 'B', text: "Create artificial scarcity by suggesting prices will increase or availability will decrease after quarter-end." },
      { id: 'C', text: "Pressure them repeatedly to sign before quarter-end, risking the relationship but potentially securing the deal." },
      { id: 'D', text: "Wait passively for their decision, missing the quarter-end target but preserving the relationship." }
    ]
  },
  {
    id: 52,
    text: "A client needs delivery in four weeks, but your standard timeline is six weeks. Expediting would involve significant overtime costs. How do you manage this timing negotiation?",
    options: [
      { id: 'A', text: "Explain the standard timeline clearly, then propose expedited options with associated costs, letting the client decide based on their urgency and budget." },
      { id: 'B', text: "Promise the four-week delivery regardless of feasibility, risking late delivery and damaging trust." },
      { id: 'C', text: "Refuse any acceleration, insisting on the standard six-week timeline without exception." },
      { id: 'D', text: "Agree to the accelerated timeline but cut corners on quality or testing to meet the deadline." }
    ]
  },
  {
    id: 53,
    text: "During implementation, a client requests additional features not included in the original scope. These would require significant extra resources. How do you handle this scope and timing discussion?",
    options: [
      { id: 'A', text: "Acknowledge the value of their requests, then clearly explain the impact on timeline and cost, presenting options for how to proceed." },
      { id: 'B', text: "Accommodate all requests immediately to maintain goodwill, even if it delays project completion and increases costs you can't recover." },
      { id: 'C', text: "Refuse all additional requests to protect your original timeline and budget." },
      { id: 'D', text: "Implement the changes secretly without discussing implications, then surprise the client with additional charges later." }
    ]
  },
  {
    id: 54,
    text: "A key decision-maker will be unavailable for the next month, delaying a potential deal. Your management expects this quarter's results. How do you navigate this timing challenge?",
    options: [
      { id: 'A', text: "Work with available stakeholders to advance other aspects of the deal while identifying ways to keep the decision-maker engaged during their absence." },
      { id: 'B', text: "Pressure the decision-maker to make an exception and review the proposal before leaving." },
      { id: 'C', text: "Wait passively for the decision-maker's return, missing your quarter target." },
      { id: 'D', text: "Attempt to bypass the decision-maker and get approval from someone else in the organization." }
    ]
  },
  {
    id: 55,
    text: "After delivering a presentation, a prospect remains non-committal and says they need to \"think it over.\" What is the most effective way to advance the conversation toward commitment?",
    options: [
      { id: 'A', text: "Ask specific questions about what aspects they want to consider further, addressing concerns directly while maintaining momentum." },
      { id: 'B', text: "Accept their hesitation and wait for them to initiate further contact." },
      { id: 'C', text: "Pressure them for an immediate decision by emphasizing limited-time offers or scarcity." },
      { id: 'D', text: "Move on to other prospects while keeping this one as a long-term opportunity." }
    ]
  },
  {
    id: 56,
    text: "A client agrees in principle but hesitates to sign the contract, citing minor administrative delays. How should you handle this situation to secure commitment while maintaining professionalism?",
    options: [
      { id: 'A', text: "Offer to assist with administrative processes while reaffirming the value of moving forward, showing support without being pushy." },
      { id: 'B', text: "Set an arbitrary deadline for the offer to expire, creating pressure to sign immediately." },
      { id: 'C', text: "Assume the deal is lost and reallocate your resources to other opportunities." },
      { id: 'D', text: "Sign the contract on their behalf to expedite the process." }
    ]
  },
  {
    id: 57,
    text: "During final negotiations, a client requests additional concessions after already agreeing to terms. How do you secure commitment without endless renegotiation?",
    options: [
      { id: 'A', text: "Reinforce the value already offered while being clear about limits, potentially offering one minor final concession in exchange for immediate commitment." },
      { id: 'B', text: "Continue making concessions until they're satisfied, regardless of impact on your profitability." },
      { id: 'C', text: "Refuse any further discussion and threaten to withdraw the offer entirely." },
      { id: 'D', text: "Agree to their requests but reduce service levels secretly to maintain margins." }
    ]
  },
  {
    id: 58,
    text: "A committee has approved your proposal but delays formal approval due to internal bureaucracy. How do you move toward final commitment?",
    options: [
      { id: 'A', text: "Work with your internal champion to understand and navigate the approval process, providing any needed documentation to facilitate movement." },
      { id: 'B', text: "Bypass normal channels and contact senior executives directly to expedite approval." },
      { id: 'C', text: "Wait passively for their internal processes to unfold, regardless of timeline." },
      { id: 'D', text: "Withdraw the proposal to pressure them into immediate action." }
    ]
  },
  {
    id: 59,
    text: "After implementing your solution, a client reports minor issues that don't significantly impact functionality but affect user experience. How should you respond to ensure long-term satisfaction?",
    options: [
      { id: 'A', text: "Address the issues promptly and communicate the resolution clearly, showing commitment to their complete satisfaction beyond basic functionality." },
      { id: 'B', text: "Explain that since the issues don't affect core functionality, they should accept the solution as delivered." },
      { id: 'C', text: "Ignore the minor issues, focusing instead on upselling additional products or services." },
      { id: 'D', text: "Blame the client's implementation team for the issues to avoid responsibility." }
    ]
  },
  {
    id: 60,
    text: "A client's needs evolve six months into your contract, making your current solution less optimal. How do you approach this situation?",
    options: [
      { id: 'A', text: "Proactively discuss their evolving needs and propose adjustments to the solution, positioning yourself as a strategic partner rather than just a vendor." },
      { id: 'B', text: "Strictly adhere to the original contract terms, ignoring their changing requirements." },
      { id: 'C', text: "Use their changing needs as an opportunity to sell a completely new, more expensive solution." },
      { id: 'D', text: "Wait until contract renewal to address any changes, even if it means the client experiences suboptimal performance in the meantime." }
    ]
  },
  {
    id: 61,
    text: "A client experiences exceptional growth, stretching your solution beyond its intended capacity. How should you handle this success-related challenge?",
    options: [
      { id: 'A', text: "Congratulate them on their growth and collaboratively develop a plan to scale your solution appropriately, strengthening the partnership through their success." },
      { id: 'B', text: "Charge penalty fees for exceeding agreed-upon usage limits without warning." },
      { id: 'C', text: "Ignore the strain on your solution until performance issues force the client to complain." },
      { id: 'D', text: "Recommend they switch to a competitor's more scalable solution to avoid dealing with the complexity." }
    ]
  },
  {
    id: 62,
    text: "During a routine check-in, a client mentions they're \"mostly satisfied\" but have some suggestions for improvement. How do you leverage this feedback?",
    options: [
      { id: 'A', text: "Probe specifically about their suggestions and implement feasible improvements, demonstrating that you value their input beyond basic satisfaction." },
      { id: 'B', text: "Focus on their \"mostly satisfied\" comment and avoid delving into suggestions that might require work." },
      { id: 'C', text: "Defensively explain why their suggestions aren't practical or necessary." },
      { id: 'D', text: "Promise to consider their suggestions but take no actual action unless they escalate their concerns." }
    ]
  },
  {
    id: 63,
    text: "A long-term client suddenly reduces order volume without explanation. What's your first step in addressing this situation?",
    options: [
      { id: 'A', text: "Schedule a meeting to understand their changing needs and circumstances, approaching with curiosity rather than accusation." },
      { id: 'B', text: "Immediately offer discounts to restore previous order volumes without understanding the reason for the change." },
      { id: 'C', text: "Assume they're dissatisfied and begin preparing a defensive case for when they officially complain." },
      { id: 'D', text: "Retaliate by reducing service levels or support for their account." }
    ]
  },
  {
    id: 64,
    text: "A client's business is struggling, and they need to cut costs. They propose reducing services rather than ending the relationship entirely. How should you respond?",
    options: [
      { id: 'A', text: "Work creatively to identify service adjustments that help them reduce costs while maintaining essential value, preserving the relationship for future recovery." },
      { id: 'B', text: "Refuse any modifications to the current agreement, insisting on full payment for contracted services." },
      { id: 'C', text: "Immediately terminate the relationship to avoid the hassle of renegotiation." },
      { id: 'D', text: "Agree to reductions but secretly maintain the same service level to charge higher fees later." }
    ]
  },
  {
    id: 65,
    text: "A previously satisfied client begins complaining frequently about minor issues. Their business hasn't changed significantly. What approach might address the underlying cause?",
    options: [
      { id: 'A', text: "Have an open conversation about their changing expectations or experiences, seeking to understand what's driving the increased dissatisfaction." },
      { id: 'B', text: "Dismiss the complaints as unreasonable since they weren't issues previously." },
      { id: 'C', text: "Accommodate every complaint immediately without seeking patterns or root causes." },
      { id: 'D', text: "Reduce contact with the client to avoid hearing further complaints." }
    ]
  },
  {
    id: 66,
    text: "A client mentions they're evaluating competitors despite generally positive results with your solution. How should you handle this situation?",
    options: [
      { id: 'A', text: "Explore their reasons for considering alternatives while reaffirming your commitment to their success, addressing any gaps proactively." },
      { id: 'B', text: "Immediately offer price concessions to discourage competitor consideration." },
      { id: 'C', text: "Become defensive about your solution's superiority compared to competitors." },
      { id: 'D', text: "Begin disengaging from the account in anticipation of losing the business." }
    ]
  },
  {
    id: 67,
    text: "After a successful project completion, how should you approach the client to expand the relationship?",
    options: [
      { id: 'A', text: "Schedule a strategic review to discuss results achieved and identify additional opportunities where you can add value, building on the success." },
      { id: 'B', text: "Immediately present a list of additional services they should purchase." },
      { id: 'C', text: "Wait for them to identify new needs on their own before making suggestions." },
      { id: 'D', text: "Assume they'll automatically think of you for future needs without any proactive effort." }
    ]
  },
  {
    id: 68,
    text: "A client successfully implements your solution in one department. How do you approach expansion to other parts of their organization?",
    options: [
      { id: 'A', text: "Work with your initial contact to identify other departments with similar challenges and arrange introductions, leveraging the success story appropriately." },
      { id: 'B', text: "Contact other departments directly without referral, potentially bypassing your original contact." },
      { id: 'C', text: "Wait for other departments to notice the success and approach you independently." },
      { id: 'D', text: "Pressure your initial contact to mandate organization-wide adoption regardless of fit." }
    ]
  },
  {
    id: 69,
    text: "A client achieves significant results using your product. What's the most effective way to leverage this success for relationship expansion?",
    options: [
      { id: 'A', text: "Document the results collaboratively and develop a case study that can be used to demonstrate value to other parts of their organization." },
      { id: 'B', text: "Immediately increase prices for this client, capitalizing on their demonstrated value realization." },
      { id: 'C', text: "Assume their success will naturally lead to expanded usage without any additional effort." },
      { id: 'D', text: "Use their success primarily as a marketing tool for new clients rather than for expansion within their organization." }
    ]
  },
  {
    id: 70,
    text: "A client values your solution but has limited budget for expansion. How can you creatively grow the relationship?",
    options: [
      { id: 'A', text: "Identify smaller, incremental expansion opportunities that deliver clear value within their budget constraints, building toward larger adoption over time." },
      { id: 'B', text: "Pressure them to find additional budget by emphasizing the return on investment they've already experienced." },
      { id: 'C', text: "Accept the budget limitation and cease expansion efforts until their financial situation improves." },
      { id: 'D', text: "Offer expanded services at a loss temporarily to secure the relationship, risking your own profitability." }
    ]
  },
  {
    id: 71,
    text: "A satisfied client refers you to a colleague in another company. How should you approach this new opportunity while maintaining the existing relationship?",
    options: [
      { id: 'A', text: "Thank the referring client appropriately and ensure the new prospect receives excellent service, which reflects well on both relationships." },
      { id: 'B', text: "Focus primarily on the new opportunity since it represents fresh revenue, assuming the existing client is already secured." },
      { id: 'C', text: "Ask the existing client to actively advocate for you with the new prospect, potentially straining the relationship." },
      { id: 'D', text: "Avoid pursuing the referral to prevent any potential conflict of interest with the existing client." }
    ]
  },
  {
    id: 72,
    text: "A client's business expands into new markets where you have limited presence. How should you approach this expansion opportunity?",
    options: [
      { id: 'A', text: "Research the new markets thoroughly and develop a realistic plan for supporting their expansion, being honest about capabilities and limitations." },
      { id: 'B', text: "Promise full support in the new markets regardless of your actual capacity to deliver." },
      { id: 'C', text: "Discourage their expansion to maintain the relationship in its current comfortable state." },
      { id: 'D', text: "Withdraw from the relationship since you cannot support their growth ambitions." }
    ]
  },
  {
    id: 73,
    text: "A retail partner achieves exceptional sales with your products during a festival period. How can you leverage this success to expand the relationship?",
    options: [
      { id: 'A', text: "Analyze the sales data together to understand success factors, then plan how to replicate this performance across other categories or time periods." },
      { id: 'B', text: "Use the success to demand better shelf space or terms in future negotiations." },
      { id: 'C', text: "Assume the festival success was an anomaly and maintain business as usual." },
      { id: 'D', text: "Reduce support since the products have proven they can sell themselves." }
    ]
  },
  {
    id: 74,
    text: "A corporate client's leadership changes, bringing in new executives unfamiliar with your work. How should you approach relationship expansion in this context?",
    options: [
      { id: 'A', text: "Request introductions to new stakeholders and proactively demonstrate the value you've delivered, building credibility with the new leadership team." },
      { id: 'B', text: "Rely on existing contacts to advocate for you with the new leadership without direct engagement." },
      { id: 'C', text: "Wait for the new leadership to settle in before making any expansion attempts, risking lost momentum." },
      { id: 'D', text: "Assume the relationship will continue unchanged since the operational staff remains the same." }
    ]
  },
  {
    id: 75,
    text: "You notice a client using your product in ways you hadn't anticipated, creating unexpected value. How should you leverage this discovery?",
    options: [
      { id: 'A', text: "Explore this innovative usage together and consider how to formalize or expand it, potentially creating new value for both organizations." },
      { id: 'B', text: "Correct their usage to align with your intended product design, ensuring consistency." },
      { id: 'C', text: "Ignore the unconventional usage as long as it doesn't cause problems." },
      { id: 'D', text: "Charge additional fees for this unintended use since it delivers extra value." }
    ]
  },
  {
    id: 76,
    text: "A client's industry undergoes significant regulatory changes affecting how they can use your solution. How should you approach this challenge?",
    options: [
      { id: 'A', text: "Proactively research the regulatory changes and propose adaptations to your solution, positioning yourself as a partner in navigating compliance." },
      { id: 'B', text: "Wait for the client to request changes, then charge for customization work." },
      { id: 'C', text: "Ignore the regulations unless they directly impact your ability to deliver the solution as contracted." },
      { id: 'D', text: "Terminate the relationship to avoid compliance complexities." }
    ]
  },
  {
    id: 77,
    text: "A long-term client's business model evolves, making your current solution less relevant. How should you respond?",
    options: [
      { id: 'A', text: "Engage in strategic discussions about their new direction and explore how your capabilities might align with their evolving needs." },
      { id: 'B', text: "Continue delivering the existing solution as contracted, ignoring the changing relevance." },
      { id: 'C', text: "Immediately propose a completely new solution without fully understanding their new direction." },
      { id: 'D', text: "Gradually disengage from the relationship as the fit diminishes." }
    ]
  },
  {
    id: 78,
    text: "Market conditions change, reducing the perceived value of your solution compared to emerging alternatives. How should you address this with existing clients?",
    options: [
      { id: 'A', text: "Proactively discuss the changing landscape and demonstrate how your solution continues to deliver unique value, potentially making adjustments to maintain competitiveness." },
      { id: 'B', text: "Avoid discussing market changes to prevent clients from considering alternatives." },
      { id: 'C', text: "Secretly enhance your solution without informing clients until competitors force the issue." },
      { id: 'D', text: "Lower prices aggressively to retain clients regardless of profitability." }
    ]
  },
  {
    id: 79,
    text: "A client's competitor implements your solution and achieves dramatic results. How should you leverage this situation with your client?",
    options: [
      { id: 'A', text: "Tactfully share relevant insights about the industry trend while respecting confidentiality, helping your client maintain competitiveness." },
      { id: 'B', text: "Use the competitor's success to pressure your client into expanding their usage immediately." },
      { id: 'C', text: "Avoid mentioning the competitor's implementation to prevent uncomfortable comparisons." },
      { id: 'D', text: "Share confidential details about the competitor's implementation to demonstrate your value." }
    ]
  },
  {
    id: 80,
    text: "New technology emerges that could complement or compete with your solution. How should you address this with clients?",
    options: [
      { id: 'A', text: "Research the technology thoroughly and develop a informed perspective on how it relates to your solution, then discuss options openly with clients." },
      { id: 'B', text: "Dismiss the new technology as irrelevant to avoid clients considering alternatives." },
      { id: 'C', text: "Immediately develop your own version of the technology regardless of its actual value." },
      { id: 'D', text: "Wait until clients ask about the technology before forming an opinion." }
    ]
  },
  {
    id: 81,
    text: "A client's industry faces disruption that changes fundamental business processes. How should you adapt your approach?",
    options: [
      { id: 'A', text: "Engage deeply with the disruption's implications for your client and co-create adaptive strategies that leverage your solution in new ways." },
      { id: 'B', text: "Continue promoting your solution as originally designed, assuming industry fundamentals will eventually return to normal." },
      { id: 'C', text: "Panic and radically alter your solution to chase the disruption without strategic direction." },
      { id: 'D', text: "Withdraw from the industry until the disruption settles into a new stable state." }
    ]
  },
  {
    id: 82,
    text: "Economic conditions change, affecting your clients' budgets and priorities. How should you adjust your approach?",
    options: [
      { id: 'A', text: "Revisit conversations about value and ROI, emphasizing aspects most relevant in the new economic context while being sensitive to budget constraints." },
      { id: 'B', text: "Maintain your standard pricing and approach, assuming the economic cycle will eventually improve." },
      { id: 'C', text: "Drastically reduce prices across the board to retain clients regardless of profitability." },
      { id: 'D', text: "Focus exclusively on new clients in unaffected industries, abandoning existing relationships." }
    ]
  },
  {
    id: 83,
    text: "You achieve exceptional results with a client in a specific application. How can you leverage this success across other clients with similar needs?",
    options: [
      { id: 'A', text: "Develop a case study with measurable results and systematically share relevant insights with similar clients, adapting the approach to each context." },
      { id: 'B', text: "Assume other clients will automatically hear about the success and request similar implementations." },
      { id: 'C', text: "Immediately contact all similar clients with a standardized pitch about the success, regardless of their specific situation." },
      { id: 'D', text: "Keep the success confidential to maintain competitive advantage with that specific client." }
    ]
  },
  {
    id: 84,
    text: "A client in a niche industry achieves breakthrough results with your solution. How can you leverage this success beyond that industry?",
    options: [
      { id: 'A', text: "Analyze the universal principles behind the success and adapt the case study for adjacent industries where similar challenges exist." },
      { id: 'B', text: "Assume the success is too industry-specific to be relevant elsewhere." },
      { id: 'C', text: "Claim expertise in the new industry despite limited experience beyond this one client." },
      { id: 'D', text: "Use the case study identically across all industries without adaptation." }
    ]
  },
  {
    id: 85,
    text: "You develop an innovative approach that delivers value for one client. How should you scale this innovation across your client base?",
    options: [
      { id: 'A', text: "Package the approach into a replicable methodology while maintaining flexibility to adapt to different client contexts." },
      { id: 'B', text: "Implement the exact same approach with all clients regardless of fit, prioritizing consistency over customization." },
      { id: 'C', text: "Keep the approach exclusive to the original client to maintain their competitive advantage." },
      { id: 'D', text: "Wait for clients to request the approach individually rather than proactively offering it." }
    ]
  },
  {
    id: 86,
    text: "A pilot program with a client proves highly successful. How should you leverage these results?",
    options: [
      { id: 'A', text: "Document the pilot process and outcomes thoroughly, then use this evidence to support expansion within the client organization and similar implementations elsewhere." },
      { id: 'B', text: "Immediately roll out the program organization-wide without further testing or adaptation." },
      { id: 'C', text: "Consider the pilot complete and move on to other initiatives without capturing learnings." },
      { id: 'D', text: "Use the pilot success to demand higher prices from the client for full implementation." }
    ]
  },
  {
    id: 87,
    text: "You discover an unexpected application for your solution while working with a client. How should you leverage this discovery?",
    options: [
      { id: 'A', text: "Validate the application systematically and develop a structured approach for replicating it where appropriate, creating new market opportunities." },
      { id: 'B', text: "Immediately market the new application to all clients without validation or customization." },
      { id: 'C', text: "Ignore the discovery as an anomaly that distracts from your core value proposition." },
      { id: 'D', text: "Patent the application and restrict its use to maximize profitability from this one insight." }
    ]
  },
  {
    id: 88,
    text: "A client achieves significant cost savings using your solution in ways you hadn't promoted. How should you leverage this insight?",
    options: [
      { id: 'A', text: "Study the cost-saving methodology and incorporate it into your value proposition, giving proper credit to the client while enhancing your offering." },
      { id: 'B', text: "Take full credit for the cost savings and use it aggressively in marketing without acknowledging the client's innovation." },
      { id: 'C', text: "Avoid highlighting the cost savings to prevent setting unrealistic expectations with other clients." },
      { id: 'D', text: "Charge the client for consulting services since they effectively improved your solution." }
    ]
  },
  {
    id: 89,
    text: "You receive positive feedback about an aspect of your service you considered minor. How should you respond?",
    options: [
      { id: 'A', text: "Recognize this as an unexpected strength and consider how to emphasize or enhance this aspect deliberately." },
      { id: 'B', text: "Dismiss the feedback as irrelevant to your core value proposition." },
      { id: 'C', text: "Immediately make this minor aspect the centerpiece of your marketing." },
      { id: 'D', text: "Assume all clients value this aspect equally without further validation." }
    ]
  },
  {
    id: 90,
    text: "A client successfully integrates your solution with other systems, creating synergistic value. How should you leverage this integration insight?",
    options: [
      { id: 'A', text: "Document the integration approach and develop it as a standardized offering where appropriate, creating new value for clients with similar ecosystems." },
      { id: 'B', text: "Claim expertise in all integrated systems despite limited experience beyond this specific case." },
      { id: 'C', text: "Ignore the integration as too specific to this client's unique environment." },
      { id: 'D', text: "Recommend the exact same integration to all clients regardless of their system landscape." }
    ]
  },
  {
    id: 91,
    text: "During a complex negotiation, the client's legal team raises concerns about contract terms that your standard agreement cannot accommodate. How should you proceed?",
    options: [
      { id: 'A', text: "Engage your legal team to understand the concerns and explore alternative phrasing that protects both parties' interests while moving the deal forward." },
      { id: 'B', text: "Insist on your standard terms, arguing that exceptions create operational complexity." },
      { id: 'C', text: "Accept the client's terms without review, prioritizing deal closure over risk management." },
      { id: 'D', text: "Withdraw from the negotiation, assuming the legal hurdles are insurmountable." }
    ]
  },
  {
    id: 92,
    text: "A client requests customization that requires approval from multiple departments within your organization. The sales cycle is already lengthy. How should you manage this complexity?",
    options: [
      { id: 'A', text: "Map the approval process clearly for the client while working internally to streamline decisions, maintaining transparency about timelines and requirements." },
      { id: 'B', text: "Promise quick approval without verifying internal processes, risking missed deadlines and credibility loss." },
      { id: 'C', text: "Discourage the customization to avoid internal complexity, potentially missing an opportunity to better serve the client." },
      { id: 'D', text: "Proceed with the customization without proper approvals, creating internal conflict and potential compliance issues." }
    ]
  },
  {
    id: 93,
    text: "You're negotiating with a buying committee where different members have conflicting priorities. How should you navigate these competing interests?",
    options: [
      { id: 'A', text: "Identify overlapping interests and frame your solution to address common ground while acknowledging different priorities, seeking win-win outcomes." },
      { id: 'B', text: "Focus exclusively on the most powerful decision-maker, ignoring other committee members' concerns." },
      { id: 'C', text: "Try to please every committee member equally, potentially creating a diluted solution that satisfies no one completely." },
      { id: 'D', text: "Withdraw from the complex negotiation in favor of simpler deals with individual decision-makers." }
    ]
  },
  {
    id: 94,
    text: "A potential deal involves compliance requirements outside your expertise. How should you approach this situation?",
    options: [
      { id: 'A', text: "Acknowledge the complexity and engage appropriate experts to ensure compliance, being transparent with the client about the process." },
      { id: 'B', text: "Downplay the compliance requirements to keep the deal simple and moving forward." },
      { id: 'C', text: "Decline the opportunity immediately due to the compliance complexity." },
      { id: 'D', text: "Promise compliance without verifying your ability to deliver, risking legal issues later." }
    ]
  },
  {
    id: 95,
    text: "During implementation, unexpected technical challenges arise that require significant additional resources. How should you handle this situation?",
    options: [
      { id: 'A', text: "Communicate the challenges transparently to the client while presenting options for resolution, sharing responsibility for decision-making." },
      { id: 'B', text: "Absorb the costs silently to avoid difficult conversations, damaging your profitability." },
      { id: 'C', text: "Blame the client's environment for the challenges to avoid responsibility." },
      { id: 'D', text: "Abandon the project, citing unforeseen complications." }
    ]
  },
  {
    id: 96,
    text: "A client's organizational structure changes mid-deal, introducing new stakeholders with different perspectives. How should you adapt?",
    options: [
      { id: 'A', text: "Request meetings with new stakeholders to understand their priorities and reconfirm alignment, adapting your approach while maintaining deal momentum." },
      { id: 'B', text: "Continue dealing exclusively with original contacts, ignoring the organizational changes." },
      { id: 'C', text: "Restart the sales process completely with the new stakeholders." },
      { id: 'D', text: "Withdraw from the deal, assuming the changes have made it untenable." }
    ]
  },
  {
    id: 97,
    text: "You discover that fulfilling a client's unusual request would set an unsustainable precedent for future business. How should you respond?",
    options: [
      { id: 'A', text: "Explain the precedent concern honestly while exploring alternative solutions that meet the client's needs without creating future problems." },
      { id: 'B', text: "Accommodate the request to secure the deal, worrying about precedents later." },
      { id: 'C', text: "Refuse the request abruptly without explanation, damaging the relationship." },
      { id: 'D', text: "Hide the precedent concern by making the accommodation secretly." }
    ]
  },
  {
    id: 98,
    text: "A deal requires coordination between multiple departments within your organization that have competing priorities. How should you ensure alignment?",
    options: [
      { id: 'A', text: "Facilitate cross-departmental discussions to establish shared goals and clear accountability, creating internal alignment before presenting solutions to the client." },
      { id: 'B', text: "Promise the client whatever they want, then force internal departments to comply." },
      { id: 'C', text: "Work around uncooperative departments by finding alternative ways to deliver, creating internal friction." },
      { id: 'D', text: "Simplify the solution to avoid internal coordination challenges, potentially reducing value for the client." }
    ]
  },
  {
    id: 99,
    text: "Regulatory changes during a negotiation require significant contract modifications. How should you manage this fluid situation?",
    options: [
      { id: 'A', text: "Collaborate with the client to adapt the agreement to new requirements, positioning both parties as partners navigating external changes together." },
      { id: 'B', text: "Insist on the original terms, arguing that regulatory changes shouldn't affect a negotiated deal." },
      { id: 'C', text: "Withdraw from the negotiation, citing regulatory uncertainty." },
      { id: 'D', text: "Proceed with the original agreement, ignoring the regulatory changes and hoping they won't be enforced." }
    ]
  },
  {
    id: 100,
    text: "A client demands terms that conflict with your company's ethical guidelines. How should you handle this situation?",
    options: [
      { id: 'A', text: "Clearly explain the ethical boundaries while exploring alternative approaches that satisfy the client's legitimate needs within appropriate constraints." },
      { id: 'B', text: "Accommodate the demand secretly to secure the business." },
      { id: 'C', text: "Refuse the terms abruptly without explanation or alternative suggestions." },
      { id: 'D', text: "Attempt to change your company's guidelines to accommodate the client." }
    ]
  },
  {
    id: 101,
    text: "You're leading a sales team with mixed experience levels. Junior members struggle with complex negotiations while seniors resist new methodologies. How should you approach team development?",
    options: [
      { id: 'A', text: "Pair junior and senior members on deals to facilitate knowledge transfer while gradually introducing new methodologies with clear rationale and support." },
      { id: 'B', text: "Focus training exclusively on junior members, assuming seniors will adapt naturally." },
      { id: 'C', text: "Implement new methodologies mandatorily without addressing resistance, creating friction with experienced team members." },
      { id: 'D', text: "Maintain separate approaches for different experience levels, risking inconsistent performance and team fragmentation." }
    ]
  },
  {
    id: 102,
    text: "Your team faces increased competition in key territories. Some members respond aggressively while others become passive. How should you guide them?",
    options: [
      { id: 'A', text: "Develop a coordinated competitive strategy that leverages diverse strengths while maintaining ethical standards, ensuring consistent messaging across the team." },
      { id: 'B', text: "Let each member develop individual responses based on their comfort level, accepting inconsistent approaches across territories." },
      { id: 'C', text: "Mandate a single aggressive response for all members, regardless of territory differences or personal styles." },
      { id: 'D', text: "Focus resources only on territories with minimal competition, avoiding tough markets altogether." }
    ]
  },
  {
    id: 103,
    text: "Market changes require your team to learn new selling approaches. Resistance is high due to past success with traditional methods. How should you lead this transition?",
    options: [
      { id: 'A', text: "Communicate the business case for change clearly while providing adequate training and celebrating early adopters, creating momentum through demonstrated success." },
      { id: 'B', text: "Force immediate adoption through strict performance metrics, dismissing concerns about transition challenges." },
      { id: 'C', text: "Delay the transition until market forces make change unavoidable, losing competitive advantage in the meantime." },
      { id: 'D', text: "Implement the new approaches secretly through a few selected team members, creating division within the team." }
    ]
  },
  {
    id: 104,
    text: "Your team's performance metrics show inconsistency across regions. Some attribute this to market differences, others to execution variability. How should you address this?",
    options: [
      { id: 'A', text: "Analyze both market factors and execution patterns to identify root causes, then develop targeted improvements that account for regional differences while raising performance standards uniformly." },
      { id: 'B', text: "Standardize expectations across all regions, ignoring market variability and punishing underperformance regardless of context." },
      { id: 'C', text: "Accept the inconsistencies as inevitable given market differences, avoiding difficult conversations about execution quality." },
      { id: 'D', text: "Focus exclusively on top-performing regions, reallocating resources from struggling areas." }
    ]
  },
  {
    id: 105,
    text: "A key team member consistently achieves targets but alienates colleagues and clients with aggressive tactics. How should you address this situation?",
    options: [
      { id: 'A', text: "Acknowledge the results while addressing the behavioral issues through coaching, clearly linking sustainable success to relationship quality." },
      { id: 'B', text: "Ignore the behavior since the team member delivers strong results." },
      { id: 'C', text: "Terminate the team member immediately to protect team culture, despite their performance." },
      { id: 'D', text: "Isolate the team member from others to minimize cultural impact while benefiting from their results." }
    ]
  },
  {
    id: 106,
    text: "Your team faces new reporting requirements that they perceive as bureaucratic. How should you implement these changes?",
    options: [
      { id: 'A', text: "Explain the purpose behind the requirements and work with the team to streamline implementation, demonstrating how good reporting can actually support their sales efforts." },
      { id: 'B', text: "Enforce the requirements strictly without explanation, dismissing complaints as resistance to necessary discipline." },
      { id: 'C', text: "Secretly reduce reporting expectations to maintain team morale." },
      { id: 'D', text: "Delay implementation until team pressure forces abandonment of the new requirements." }
    ]
  },
  {
    id: 107,
    text: "Two strong performers on your team develop a competitive dynamic that hinders collaboration. How should you intervene?",
    options: [
      { id: 'A', text: "Facilitate a conversation about shared goals and create opportunities for collaboration that demonstrate the value of combining their strengths." },
      { id: 'B', text: "Let the competition continue, assuming it will drive higher individual performance." },
      { id: 'C', text: "Force collaboration through mandated partnership, potentially increasing tension." },
      { id: 'D', text: "Separate them completely to minimize conflict, even if it reduces overall team effectiveness." }
    ]
  },
  {
    id: 108,
    text: "Industry disruption requires your team to develop entirely new skills. How should you approach this capability building?",
    options: [
      { id: 'A', text: "Assess skill gaps honestly and create a phased development plan with appropriate training, mentorship, and practical application opportunities." },
      { id: 'B', text: "Hire new talent with the required skills, sidelining existing team members." },
      { id: 'C', text: "Expect current team members to self-educate without support or time allocation." },
      { id: 'D', text: "Ignore the disruption, hoping current skills will remain relevant." }
    ]
  },
  {
    id: 109,
    text: "Your team shows signs of burnout after prolonged intense effort. How should you address this while maintaining performance?",
    options: [
      { id: 'A', text: "Acknowledge the burnout openly and work with the team to establish sustainable rhythms, prioritizing recovery while maintaining key accountabilities." },
      { id: 'B', text: "Push through with motivational speeches, treating burnout as a mindset issue." },
      { id: 'C', text: "Reduce targets temporarily without addressing underlying workload issues." },
      { id: 'D', text: "Ignore the signs, assuming high performers will naturally manage their stress." }
    ]
  },
  {
    id: 110,
    text: "A previously successful sales methodology becomes less effective due to market changes. Your team remains attached to the familiar approach. How should you lead this change?",
    options: [
      { id: 'A', text: "Present clear evidence of shifting effectiveness and co-create new approaches with the team, honoring past success while embracing necessary evolution." },
      { id: 'B', text: "Mandate immediate adoption of a new methodology without team input." },
      { id: 'C', text: "Let individual members gradually discover the need for change through their own struggling results." },
      { id: 'D', text: "Blame the team for poor execution rather than acknowledging methodological obsolescence." }
    ]
  },
  {
    id: 111,
    text: "You need to allocate limited resources between protecting existing accounts and pursuing new opportunities. How should you approach this strategic decision?",
    options: [
      { id: 'A', text: "Analyze the lifetime value and growth potential of existing accounts versus the probability and value of new opportunities, creating a balanced portfolio approach." },
      { id: 'B', text: "Focus exclusively on existing accounts, assuming current revenue is more secure than new business." },
      { id: 'C', text: "Prioritize new opportunities overwhelmingly, believing growth comes primarily from new client acquisition." },
      { id: 'D', text: "Divide resources equally across all accounts and opportunities regardless of potential return." }
    ]
  },
  {
    id: 112,
    text: "Market analysis suggests emerging customer segments that don't align with your current offerings. How should you respond?",
    options: [
      { id: 'A', text: "Evaluate the strategic fit and resource requirements for serving these segments, making deliberate choices about whether and how to pursue them." },
      { id: 'B', text: "Immediately adapt your offerings to chase the new segments, risking dilution of core value proposition." },
      { id: 'C', text: "Ignore emerging segments entirely, focusing exclusively on current markets." },
      { id: 'D', text: "Create completely separate business units to pursue each new segment independently." }
    ]
  },
  {
    id: 113,
    text: "Competitive intelligence reveals a fundamental shift in how customers make purchasing decisions. How should you adjust your sales strategy?",
    options: [
      { id: 'A', text: "Reevaluate your customer engagement model and value proposition to align with new decision criteria, while maintaining core strengths that remain relevant." },
      { id: 'B', text: "Double down on traditional approaches, assuming the shift is temporary." },
      { id: 'C', text: "Radically overhaul your strategy to mirror competitors' approaches without validating what works for your specific capabilities." },
      { id: 'D', text: "Wait until the shift demonstrates sustained momentum before making any changes." }
    ]
  },
  {
    id: 114,
    text: "Economic indicators suggest coming volatility in your key markets. How should you prepare your sales strategy?",
    options: [
      { id: 'A', text: "Develop scenario plans for different economic conditions, building flexibility into your approach while maintaining focus on core value delivery." },
      { id: 'B', text: "Maintain current strategy unchanged, assuming your value proposition transcends economic cycles." },
      { id: 'C', text: "Make drastic preemptive cuts to prepare for worst-case scenarios." },
      { id: 'D', text: "Focus exclusively on short-term results without strategic planning." }
    ]
  },
  {
    id: 115,
    text: "Technology advancements enable new sales channels that could complement or compete with your current approach. How should you respond?",
    options: [
      { id: 'A', text: "Test new channels systematically while evaluating their fit with your target customers and value proposition, integrating successful experiments into your strategy." },
      { id: 'B', text: "Adopt all new channels immediately to avoid being left behind." },
      { id: 'C', text: "Ignore new channels until they demonstrate dominant market penetration." },
      { id: 'D', text: "View new channels as threats to be countered rather than opportunities to be explored." }
    ]
  },
  {
    id: 116,
    text: "Customer feedback indicates declining satisfaction with industry-standard sales approaches. How should you innovate your strategy?",
    options: [
      { id: 'A', text: "Engage deeply with customer frustrations to develop more responsive approaches, potentially creating competitive advantage through superior customer experience." },
      { id: 'B', text: "Attribute dissatisfaction to individual customer quirks rather than systemic issues." },
      { id: 'C', text: "Copy innovative approaches from unrelated industries without adaptation." },
      { id: 'D', text: "Lower prices to compensate for customer experience shortcomings." }
    ]
  },
  {
    id: 117,
    text: "Regulatory changes create new constraints but also new opportunities in your market. How should you adapt your strategy?",
    options: [
      { id: 'A', text: "Analyze the regulatory landscape thoroughly and reposition your value proposition to leverage new opportunities while ensuring compliance." },
      { id: 'B', text: "Focus exclusively on compliance, treating regulations as purely constraining." },
      { id: 'C', text: "Ignore regulations until enforcement actions force adaptation." },
      { id: 'D', text: "Lobby against the regulations while continuing business as usual." }
    ]
  },
  {
    id: 118,
    text: "Data analysis reveals that a small subset of customers generates disproportionate profitability. How should this insight inform your strategy?",
    options: [
      { id: 'A', text: "Develop targeted approaches for high-value customer segments while evaluating whether other segments can be made more profitable through different engagement models." },
      { id: 'B', text: "Focus exclusively on profitable segments, abandoning others." },
      { id: 'C', text: "Continue treating all customers equally to avoid appearing discriminatory." },
      { id: 'D', text: "Raise prices uniformly to improve overall profitability." }
    ]
  },
  {
    id: 119,
    text: "Your company's strategic direction shifts, requiring alignment from the sales organization. How should you translate this into sales strategy?",
    options: [
      { id: 'A', text: "Interpret the strategic shift in terms of specific customer impacts and sales implications, developing clear guidance for the team while maintaining operational stability." },
      { id: 'B', text: "Implement the shift abruptly without considering practical sales implications." },
      { id: 'C', text: "Resist the shift, arguing that sales should dictate company strategy rather than follow it." },
      { id: 'D', text: "Wait for detailed instructions rather than proactively interpreting strategic direction." }
    ]
  },
  {
    id: 120,
    text: "Global events disrupt supply chains critical to your customers' operations. How should you adjust your sales strategy?",
    options: [
      { id: 'A', text: "Communicate transparently with customers about challenges while demonstrating adaptability and problem-solving, strengthening relationships through difficult circumstances." },
      { id: 'B', text: "Hide supply chain issues until they directly impact deliveries." },
      { id: 'C', text: "Blame external factors while maintaining business-as-usual approaches." },
      { id: 'D', text: "Temporarily withdraw from affected markets until stability returns." }
    ]
  },
  {
    id: 121,
    text: "A long-term client suddenly becomes unresponsive to communications. Previously, interactions were positive and productive. What's your first step?",
    options: [
      { id: 'A', text: "Reach out through a different channel with a concise, non-invasive message expressing concern and offering flexibility in communication timing." },
      { id: 'B', text: "Continue calling and emailing frequently until you receive a response." },
      { id: 'C', text: "Assume the client is no longer interested and close the file." },
      { id: 'D', text: "Contact other people in the organization to inquire about the unresponsive individual." }
    ]
  },
  {
    id: 122,
    text: "A prospect agrees to a meeting but cancels at the last minute for the second time. How should you proceed?",
    options: [
      { id: 'A', text: "Send a polite message acknowledging their busy schedule and proposing a low-commitment alternative, such as a brief call or flexible scheduling options." },
      { id: 'B', text: "Express frustration about the cancellations and demand more respect for your time." },
      { id: 'C', text: "Continue scheduling meetings indefinitely, accepting their cancellations as normal." },
      { id: 'D', text: "Remove them from your prospect list immediately." }
    ]
  },
  {
    id: 123,
    text: "During a negotiation, your main contact goes silent after receiving your proposal. Follow-ups receive no response. What's the best approach?",
    options: [
      { id: 'A', text: "Send a brief message referencing the proposal and asking if they'd prefer to discuss it after dealing with other priorities, showing empathy while maintaining presence." },
      { id: 'B', text: "Resend the proposal daily with increasingly urgent messages." },
      { id: 'C', text: "Withdraw the proposal to create urgency." },
      { id: 'D', text: "Assume the deal is lost and move on completely." }
    ]
  },
  {
    id: 124,
    text: "A previously engaged client stops responding after implementation begins. The project is proceeding well based on other team members' feedback. How should you handle this?",
    options: [
      { id: 'A', text: "Send a casual check-in referencing the positive progress and inviting their input, making it easy for them to re-engage without pressure." },
      { id: 'B', text: "Demand to know why they've become unresponsive." },
      { id: 'C', text: "Continue implementation without their input, assuming silence means approval." },
      { id: 'D', text: "Escalate to their management about their lack of engagement." }
    ]
  },
  {
    id: 125,
    text: "After a positive initial meeting, a prospect doesn't respond to your follow-up scheduling attempts. What's your next move?",
    options: [
      { id: 'A', text: "Send a value-added message sharing relevant industry insights or resources, re-establishing contact through helpful content rather than direct scheduling pressure." },
      { id: 'B', text: "Continue sending meeting requests with the same message." },
      { id: 'C', text: "Assume they've chosen a competitor and cease contact." },
      { id: 'D', text: "Contact their assistant or colleagues to schedule the meeting indirectly." }
    ]
  },
  {
    id: 126,
    text: "A client who typically responds quickly hasn't replied to your last three messages over two weeks. Previous interactions were positive. How should you interpret this silence?",
    options: [
      { id: 'A', text: "Consider possible reasons for the silence (competing priorities, vacation, decision delays) and adjust your approach accordingly rather than assuming dissatisfaction." },
      { id: 'B', text: "Interpret the silence as rejection and discontinue outreach." },
      { id: 'C', text: "Assume they're no longer interested in your services." },
      { id: 'D', text: "Confront them about the unprofessionalism of not responding." }
    ]
  },
  {
    id: 127,
    text: "You receive an angry email from a client about a service issue. The tone is harsh and includes personal criticism. What's your first response?",
    options: [
      { id: 'A', text: "Acknowledge their frustration without defensiveness and propose a constructive path forward, focusing on resolving the issue rather than reacting to the tone." },
      { id: 'B', text: "Respond in kind, defending yourself against the personal attacks." },
      { id: 'C', text: "Ignore the email until the client calms down." },
      { id: 'D', text: "Forward the email to your manager without responding." }
    ]
  },
  {
    id: 128,
    text: "During a presentation, a prospect challenges your claims aggressively and questions your credibility. How should you handle this?",
    options: [
      { id: 'A', text: "Respond calmly with specific evidence and data, acknowledging their skepticism while demonstrating confidence in your offering." },
      { id: 'B', text: "Become defensive and argue more forcefully about your product's superiority." },
      { id: 'C', text: "Defer to their expertise and abandon your presentation." },
      { id: 'D', text: "End the meeting early to avoid further conflict." }
    ]
  },
  {
    id: 129,
    text: "A client publicly criticizes your company on social media after a negative experience. How should you respond?",
    options: [
      { id: 'A', text: "Respond publicly with a commitment to resolve the issue, then address the details privately to demonstrate accountability while containing the conversation." },
      { id: 'B', text: "Ignore the public criticism and handle it through normal customer service channels." },
      { id: 'C', text: "Respond defensively, challenging their version of events." },
      { id: 'D', text: "Retaliate by highlighting the client's past difficulties." }
    ]
  },
  {
    id: 130,
    text: "A negotiation becomes heated when the client demands unreasonable concessions. How should you de-escalate?",
    options: [
      { id: 'A', text: "Suggest a brief pause, then reframe the conversation around mutual interests rather than positions, seeking common ground." },
      { id: 'B', text: "Match their intensity to demonstrate you won't be intimidated." },
      { id: 'C', text: "Accede to their demands to end the conflict quickly." },
      { id: 'D', text: "Terminate the negotiation immediately." }
    ]
  },
  {
    id: 131,
    text: "A colleague takes credit for your work during a team meeting. How should you address this?",
    options: [
      { id: 'A', text: "Wait until after the meeting and have a private conversation with the colleague, expressing your concern while seeking to understand their perspective." },
      { id: 'B', text: "Publicly correct them during the meeting to establish credit immediately." },
      { id: 'C', text: "Complain to management without speaking to the colleague first." },
      { id: 'D', text: "Retaliate by undermining their work in future interactions." }
    ]
  },
  {
    id: 132,
    text: "Your manager gives you conflicting instructions on a priority account. How should you resolve this?",
    options: [
      { id: 'A', text: "Politely seek clarification about the priorities, presenting the conflicting instructions neutrally and asking for guidance on how to proceed." },
      { id: 'B', text: "Follow the most recent instruction without questioning the conflict." },
      { id: 'C', text: "Ignore both instructions and proceed with your own approach." },
      { id: 'D', text: "Complain to HR about poor management." }
    ]
  },
  {
    id: 133,
    text: "A peer consistently misses deadlines that impact your ability to serve clients effectively. How should you address this?",
    options: [
      { id: 'A', text: "Initiate a problem-solving conversation focused on process improvements rather than personal criticism, seeking to understand their challenges while advocating for your clients' needs." },
      { id: 'B', text: "Publicly highlight their failures to pressure improvement." },
      { id: 'C', text: "Work around them by doing their tasks yourself to ensure client service." },
      { id: 'D', text: "Escalate to management immediately without attempting direct resolution." }
    ]
  },
  {
    id: 134,
    text: "You discover a teammate is sharing confidential client information with a competitor. What's your first action?",
    options: [
      { id: 'A', text: "Document what you've observed discreetly and report it to appropriate management or compliance channels according to company policy." },
      { id: 'B', text: "Confront the teammate directly without evidence." },
      { id: 'C', text: "Ignore the situation to avoid workplace conflict." },
      { id: 'D', text: "Begin gathering information to use against the teammate in future." }
    ]
  },
  {
    id: 135,
    text: "Your team is divided between supporting an existing profitable product versus investing in a innovative but unproven new offering. How should you approach this conflict?",
    options: [
      { id: 'A', text: "Facilitate a data-driven discussion about balancing short-term revenue with long-term innovation, seeking a portfolio approach that accommodates both perspectives." },
      { id: 'B', text: "Side with the majority view to maintain team harmony." },
      { id: 'C', text: "Impose your own decision without team input." },
      { id: 'D', text: "Avoid the conflict by delaying the decision." }
    ]
  },
  {
    id: 136,
    text: "A client requests a feature your product doesn't currently offer. How should you respond?",
    options: [
      { id: 'A', text: "Acknowledge the value of their request, explain your current capabilities, and explore whether existing features might meet their underlying need while documenting their request for future consideration." },
      { id: 'B', text: "Promise the feature will be available soon to keep them engaged, even if development isn't planned." },
      { id: 'C', text: "Dismiss the request as incompatible with your product roadmap." },
      { id: 'D', text: "Criticize their current processes to justify why the feature isn't necessary." }
    ]
  },
  {
    id: 137,
    text: "During a product demonstration, you discover the solution doesn't perform as expected in the client's specific environment. How should you handle this?",
    options: [
      { id: 'A', text: "Acknowledge the issue transparently, explain any limitations, and propose next steps for addressing the gap while emphasizing strengths that remain relevant." },
      { id: 'B', text: "Continue the demonstration as planned, hoping the client doesn't notice the issue." },
      { id: 'C', text: "Blame the client's environment for the performance issues." },
      { id: 'D', text: "Abandon the demonstration and reschedule when the product works perfectly." }
    ]
  },
  {
    id: 138,
    text: "A client expects implementation timelines that your team cannot realistically meet. How should you manage these expectations?",
    options: [
      { id: 'A', text: "Present a realistic timeline with clear milestones, explaining the factors that determine the schedule while identifying any areas where acceleration might be possible." },
      { id: 'B', text: "Agree to the unrealistic timeline and hope your team can overcome the challenges." },
      { id: 'C', text: "Refuse the timeline without offering alternatives." },
      { id: 'D', text: "Blame other departments for the timeline constraints." }
    ]
  },
  {
    id: 139,
    text: "You realize you made an error in a proposal that significantly understates the project cost. The client has already expressed satisfaction with the quoted price. What should you do?",
    options: [
      { id: 'A', text: "Contact the client immediately, acknowledge the error transparently, and present a corrected proposal with appropriate explanation, emphasizing your commitment to honesty." },
      { id: 'B', text: "Proceed with the project and absorb the cost difference to avoid difficult conversations." },
      { id: 'C', text: "Look for ways to reduce project scope to match the quoted price without informing the client." },
      { id: 'D', text: "Wait until the project is underway and then claim unforeseen complications require additional budget." }
    ]
  },
  {
    id: 140,
    text: "A client asks about your product's capabilities compared to a competitor's. You know the competitor has a slight advantage in one specific area. How should you respond?",
    options: [
      { id: 'A', text: "Acknowledge the competitor's strength in that area while highlighting your advantages in other dimensions that may be more important to the client's overall success." },
      { id: 'B', text: "Deny any competitive disadvantages and claim superiority across all features." },
      { id: 'C', text: "Avoid direct comparison and change the subject to your product's strengths." },
      { id: 'D', text: "Criticize the competitor's implementation of the feature to diminish its value." }
    ]
  },
  {
    id: 141,
    text: "Your company makes a decision that you disagree with but must implement with clients. How should you approach this?",
    options: [
      { id: 'A', text: "Execute the decision professionally while providing constructive feedback through appropriate channels, maintaining alignment with company direction while advocating for improvement." },
      { id: 'B', text: "Subtly undermine the decision when communicating with clients." },
      { id: 'C', text: "Openly criticize the decision to clients to distance yourself from it." },
      { id: 'D', text: "Refuse to implement the decision, risking disciplinary action." }
    ]
  },
  {
    id: 142,
    text: "You discover a compliance issue in how your team has been documenting sales. What's your first step?",
    options: [
      { id: 'A', text: "Immediately investigate the scope of the issue, document findings, and report to appropriate compliance or legal channels while ceasing non-compliant practices." },
      { id: 'B', text: "Address the issue quietly with the team without formal reporting." },
      { id: 'C', text: "Ignore the issue if it hasn't caused problems yet." },
      { id: 'D', text: "Destroy evidence of non-compliant documentation to avoid repercussions." }
    ]
  },
  {
    id: 143,
    text: "A client suggests an arrangement that would violate your company's ethical guidelines but would secure a major deal. How should you respond?",
    options: [
      { id: 'A', text: "Politely decline while explaining your ethical boundaries, then explore alternative arrangements that achieve the client's legitimate goals through appropriate means." },
      { id: 'B', text: "Agree to the arrangement secretly to secure the business." },
      { id: 'C', text: "Report the client to authorities for suggesting an unethical arrangement." },
      { id: 'D', text: "Seek special permission from management to make an exception." }
    ]
  },
  {
    id: 144,
    text: "You overhear a competitor's confidential information accidentally. What should you do?",
    options: [
      { id: 'A', text: "Avoid using the information and disclose the incident to appropriate leadership to determine proper handling according to company policy." },
      { id: 'B', text: "Use the information strategically but discreetly to gain competitive advantage." },
      { id: 'C', text: "Share the information with your team to help competitive positioning." },
      { id: 'D', text: "Contact the competitor to inform them of their security lapse." }
    ]
  },
  {
    id: 145,
    text: "A client offers you a personal gift that exceeds your company's acceptable value threshold. How should you handle this?",
    options: [
      { id: 'A', text: "Politely decline the gift while explaining your company's policy, emphasizing that your commitment to their success doesn't require personal incentives." },
      { id: 'B', text: "Accept the gift discreetly to avoid offending the client." },
      { id: 'C', text: "Accept the gift but disclose it to your compliance department." },
      { id: 'D', text: "Report the client for attempting to influence you improperly." }
    ]
  },
  {
    id: 146,
    text: "You make a commitment to a client that you later discover you cannot keep. What should you do?",
    options: [
      { id: 'A', text: "Inform the client immediately, explain the situation honestly, and present alternative solutions to minimize impact on their business." },
      { id: 'B', text: "Wait until the commitment date approaches before informing the client." },
      { id: 'C', text: "Attempt to fulfill the commitment through extraordinary means, risking further overpromising." },
      { id: 'D', text: "Blame internal factors beyond your control for the failure." }
    ]
  },
  {
    id: 147,
    text: "A colleague shares confidential salary information with you. How should you respond?",
    options: [
      { id: 'A', text: "Politely indicate that you prefer not to discuss confidential compensation information and change the subject." },
      { id: 'B', text: "Listen discreetly but avoid sharing your own information." },
      { id: 'C', text: "Share your salary information to reciprocate." },
      { id: 'D', text: "Report the colleague to HR for violating confidentiality." }
    ]
  },
  {
    id: 148,
    text: "You realize a client misunderstanding has led them to expect benefits your product cannot deliver. How should you address this?",
    options: [
      { id: 'A', text: "Clarify capabilities honestly while focusing on the value you can deliver, correcting misconceptions early to maintain trust." },
      { id: 'B', text: "Allow the misunderstanding to continue until contract signing." },
      { id: 'C', text: "Blame the misunderstanding on the client's failure to comprehend your explanations." },
      { id: 'D', text: "Promise future enhancements that might eventually deliver the expected benefits." }
    ]
  },
  {
    id: 149,
    text: "Your sales numbers are below target with one week left in the quarter. A client offers a large deal if you backdate the contract to the previous quarter. What should you do?",
    options: [
      { id: 'A', text: "Decline the offer and explore legitimate ways to accelerate genuine deals to meet your target." },
      { id: 'B', text: "Accept the offer since it helps both you and the client." },
      { id: 'C', text: "Consult your manager about making an exception for this situation." },
      { id: 'D', text: "Backdate the contract but record it properly in the system." }
    ]
  },
  {
    id: 150,
    text: "You witness a colleague exaggerating product capabilities to a client. What action should you take?",
    options: [
      { id: 'A', text: "Intervene discreetly if possible, then discuss the importance of accurate representation with the colleague afterward, escalating only if the behavior continues." },
      { id: 'B', text: "Publicly correct your colleague during the client meeting." },
      { id: 'C', text: "Report the colleague to management immediately without speaking to them first." },
      { id: 'D', text: "Ignore the behavior to avoid conflict." }
    ]
  },
  {
    id: 151,
    text: "A long-term client's business is struggling, and they need temporary payment flexibility. How should you respond?",
    options: [
      { id: 'A', text: "Work within company guidelines to create a temporary accommodation that supports the client through difficulty while protecting your organization's interests." },
      { id: 'B', text: "Offer unauthorized payment terms to help the client without consulting your company." },
      { id: 'C', text: "Enforce standard payment terms strictly, regardless of their situation." },
      { id: 'D', text: "Advise the client to seek competitors who might offer better terms." }
    ]
  },
  {
    id: 152,
    text: "A client requests support outside normal business hours for a non-urgent matter. How should you handle this?",
    options: [
      { id: 'A', text: "Acknowledge the request and establish reasonable boundaries, offering alternative timing while demonstrating commitment to their needs." },
      { id: 'B', text: "Respond immediately regardless of the time to provide exceptional service." },
      { id: 'C', text: "Ignore the request until normal business hours resume." },
      { id: 'D', text: "Charge premium rates for after-hours support without discussion." }
    ]
  },
  {
    id: 153,
    text: "You're planning a vacation when an important client schedules a meeting that conflicts with your time off. How should you handle this?",
    options: [
      { id: 'A', text: "Propose alternative dates or a colleague who can effectively represent you, balancing client needs with your planned time off." },
      { id: 'B', text: "Cancel your vacation to accommodate the client meeting." },
      { id: 'C', text: "Decline the meeting without explanation, sticking to your vacation plans." },
      { id: 'D', text: "Attend the meeting remotely during your vacation." }
    ]
  },
  {
    id: 154,
    text: "A client expects immediate responses to all communications, including evenings and weekends. How should you manage these expectations?",
    options: [
      { id: 'A', text: "Have a respectful conversation about communication norms, establishing reasonable response timelines while ensuring urgent matters receive prompt attention." },
      { id: 'B', text: "Meet their expectations by being constantly available, risking burnout." },
      { id: 'C', text: "Ignore after-hours communications completely without setting expectations." },
      { id: 'D', text: "Charge extra for 24/7 availability." }
    ]
  },
  {
    id: 155,
    text: "You're feeling overwhelmed with workload but receive an additional important assignment. How should you respond?",
    options: [
      { id: 'A', text: "Communicate your current priorities honestly and discuss resource options, whether reprioritization, extension, or additional support." },
      { id: 'B', text: "Accept the assignment and work excessive hours to complete everything." },
      { id: 'C', text: "Refuse the additional assignment without discussion." },
      { id: 'D', text: "Accept the assignment but deliver poor quality on all tasks." }
    ]
  },
  {
    id: 156,
    text: "A client requests custom reports that would require significant manual effort. How should you approach this?",
    options: [
      { id: 'A', text: "Explain the effort involved and explore whether standard reports or slightly modified parameters could meet their needs efficiently, while being open to custom work if truly necessary." },
      { id: 'B', text: "Agree to create the custom reports regardless of the time required." },
      { id: 'C', text: "Refuse the request outright as too burdensome." },
      { id: 'D', text: "Promise the reports but delay indefinitely due to the effort involved." }
    ]
  },
  {
    id: 157,
    text: "You notice a pattern of a particular client consistently making last-minute requests that disrupt your schedule. How should you address this?",
    options: [
      { id: 'A', text: "Have a proactive conversation about planning and priorities, establishing clearer processes for requests while maintaining responsiveness to genuine emergencies." },
      { id: 'B', text: "Accommodate all requests regardless of impact on your other work." },
      { id: 'C', text: "Begin declining all last-minute requests from this client." },
      { id: 'D', text: "Complain to your manager about the client's unreasonable behavior." }
    ]
  },
  {
    id: 158,
    text: "A client asks you to perform tasks outside your agreed scope of work. How should you respond?",
    options: [
      { id: 'A', text: "Clarify the scope boundary while being helpful, potentially identifying appropriate channels or resources for the requested tasks." },
      { id: 'B', text: "Perform the tasks without comment to maintain goodwill." },
      { id: 'C', text: "Refuse abruptly without explanation." },
      { id: 'D', text: "Agree but charge significantly for the additional work." }
    ]
  },
  {
    id: 159,
    text: "You're experiencing personal issues affecting your work performance. How should you manage this situation?",
    options: [
      { id: 'A', text: "Communicate appropriately with your manager about temporary challenges while maintaining professionalism with clients and prioritizing critical responsibilities." },
      { id: 'B', text: "Continue working without adjustment, hoping to overcome the issues through willpower." },
      { id: 'C', text: "Take unannounced time off to address the personal issues." },
      { id: 'D', text: "Share personal details with clients to explain any performance dips." }
    ]
  },
  {
    id: 160,
    text: "You achieve exceptional results for a client who then makes increasingly demanding requests. How should you balance generosity with boundaries?",
    options: [
      { id: 'A', text: "Acknowledge their appreciation while gently establishing sustainable service parameters, ensuring you can maintain quality across all client relationships." },
      { id: 'B', text: "Continue accommodating all requests to maintain the positive relationship." },
      { id: 'C', text: "Suddenly enforce strict boundaries without explanation." },
      { id: 'D', text: "Begin reducing service quality to manage the workload." }
    ]
 }
];

module.exports = questions;