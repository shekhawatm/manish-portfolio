/**
 * ALL the words on the site live in this one file.
 * Edit text here; you never need to touch the design code.
 *
 * Rules (see README): no names other than mine, no pay figures, no internal
 * links, and NO COUNTS from Fireflies.ai (hires, headcount, offers):
 * percentages only. `npm run privacy` checks the rest.
 */

export const site = {
  name: "Manish Shekhawat",
  role: "Head of Recruiting & Culture",
  company: "Fireflies.ai",
  location: "Gurugram, India · working with a fully remote, global team",
  url: "https://manish-portfolio-sepia.vercel.app",
  description:
    "Manish Shekhawat builds the hiring engine behind fast-scaling remote companies. 10+ years in recruiting; Fireflies.ai's first recruiter, now Head of Recruiting & Culture.",
};

/** The mascot's name and the lines it says as you scroll past each section. */
export const mascot = {
  name: "Scout",
  hello: "Hi! I'm Scout. I help Manish find great people.",
  lines: {
    top: "Hi! I'm Scout 👋",
    impact: "Those bars only go up.",
    journey: "Ten years, one craft.",
    lifecycle: "First hello to fifth anniversary.",
    built: "All made with Claude!",
    focus: "Here's what's next.",
    recognition: "No chill. Literally.",
    recommendations: "People like him. A lot.",
    life: "Marathons and home cooking.",
    contact: "Go on, say hi!",
  } as Record<string, string>,
};

export const hero = {
  eyebrow: `${site.role} · ${site.company}`,
  /** The small pill above the headline cycles through these */
  roles: [site.role, "Builder of hiring engines", "People Ops lead", "AI-agent tinkerer", "Culture keeper"],
  greeting: "Hi, I'm Manish",
  headline: "I build the hiring engine behind fast-scaling remote teams.",
  intro:
    "I've spent 10+ years in recruiting: agency desks hiring engineers for India's biggest tech companies, then OYO and Pesto Tech, then joining Fireflies.ai as its first recruiter in 2020. Today I lead talent, People Ops and culture for a fully remote team, built with no agencies and no vendor spend. I'm not an engineer by trade, but I build the tools my team needs, with AI agents and Claude.",
  primaryCta: { label: "See my journey", href: "#journey" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  card: {
    title: "Offer acceptance",
    from: 66,
    to: 94,
    caption: "Fireflies.ai · 2021 → 2026 YTD",
    chips: ["10+ years in hiring", "No agencies, no vendors", "Hiring across continents"],
  },
};

/**
 * Little logo chips shown inline wherever these names appear in the intro.
 * `mark` is the letter on the chip; colours are simple brand-neutral tints.
 */
export const chips: Record<string, { mark: string; color: string; href?: string }> = {
  "Fireflies.ai": { mark: "F", color: "#7c3aed", href: "https://fireflies.ai" },
  OYO: { mark: "O", color: "#e11d48" },
  "Pesto Tech": { mark: "P", color: "#0f766e" },
  Claude: { mark: "✳", color: "#c2410c", href: "https://claude.ai" },
};

/** Compact "Work" list (newest first), shown above the detailed timeline. */
export const work = [
  { org: "Fireflies.ai", role: "Head of Recruiting & Culture", years: "2020 – Now", mark: "F", color: "#7c3aed" },
  { org: "Pesto Tech", role: "Talent Acquisition Specialist", years: "2019 – 2020", mark: "P", color: "#0f766e" },
  { org: "OYO", role: "Senior HR, Tech Hiring", years: "2018 – 2019", mark: "O", color: "#e11d48" },
  { org: "EdTech (stealth)", role: "Co-founder", years: "2018", mark: "E", color: "#ca8a04" },
  { org: "Anzy Careers", role: "Senior Recruitment Specialist", years: "2017 – 2018", mark: "A", color: "#2563eb" },
  { org: "Astra HR Services", role: "Technical Recruiter", years: "2016 – 2017", mark: "A", color: "#475569" },
];

export const nav = [
  { label: "Impact", href: "#impact" },
  { label: "Journey", href: "#journey" },
  { label: "Built", href: "#built" },
  { label: "Awards", href: "#recognition" },
  { label: "Praise", href: "#recommendations" },
  { label: "Contact", href: "#contact" },
];

/** Animated counters. Percentages only for Fireflies.ai. */
export const numbers = {
  title: "By the numbers",
  lead: "Rates, not headcounts. The ratios are the story.",
  items: [
    { value: 10, suffix: "+ yrs", label: "in recruiting and people, from agency desks to building a function from scratch" },
    { value: 94, suffix: "%", label: "offer acceptance in 2026 so far, up from 66% in 2021" },
    { value: 98, suffix: "%", label: "of candidates rated their hiring experience 4.5 or higher out of 5" },
    { value: 66, suffix: "%", label: "of today's active team rated A or A+ by their leads" },
    { value: 91, suffix: "%", label: "people engagement score across a fully remote team" },
    { value: 33, suffix: "%", label: "faster time-to-hire after rebuilding the hiring process" },
  ],
};

/** The impact section: a year-by-year chart plus highlight rates. */
export const engine = {
  title: "A hiring engine that keeps getting better",
  lead: "Offer acceptance at Fireflies.ai, year by year. More people say yes, and stay.",
  chartLabel: "Offer acceptance",
  chartNote: "% of offers accepted",
  trend: [
    { year: "2021", rate: 66 },
    { year: "2022", rate: 83 },
    { year: "2023", rate: 95 },
    { year: "2024", rate: 83 },
    { year: "2025", rate: 87 },
    { year: "2026", rate: 94, note: "YTD" },
  ],
  highlights: [
    { value: "100%", label: "offer-to-join in non-tech roles, and in most teams" },
    { value: "1 in 2", label: "hires rated A or A+, a consistently high bar" },
    { value: "80%", label: "less coaching needed after launching a self-serve HR playbook" },
    { value: "50%+", label: "accept rate on targeted outreach, vs under 1% from volume screening" },
  ],
  countriesTitle: "Hired across",
  countries: [
    "India", "Brazil", "Philippines", "Nigeria", "Pakistan", "United States", "Indonesia",
    "Portugal", "Singapore", "Canada", "France", "Turkey", "Vietnam", "South Africa",
    "Bangladesh", "Argentina", "Australia", "Egypt", "Estonia", "Finland", "Germany",
    "Hungary", "Malaysia", "Taiwan", "Uruguay", "Spain",
  ],
};

/** Career timeline, newest first (from LinkedIn). */
export const journey = {
  title: "A decade of hiring, one craft",
  lead: "From hiring engineers for India's biggest tech companies to building a global people function from zero.",
  roles: [
    {
      years: "2025 – now",
      title: "Head of Recruiting & Culture",
      org: "Fireflies.ai",
      text: "Own hiring end to end for a fully remote, global team, holding the bar at A and A+. Oversee People & HR Ops: global payroll, equity education, onboarding, policy and governance.",
      tags: ["Talent", "People Ops", "Governance"],
      current: true,
    },
    {
      years: "2023 – 2025",
      title: "Global Lead, Talent, People Ops & Culture",
      org: "Fireflies.ai",
      text: "Scaled the people function 0→1 with no external recruiters. Ran a company offsite in Southeast Asia, fully in-house. 95% offer-to-join in 2023; 98% of candidates rated the experience 4.5+/5.",
      tags: ["Offsites", "Engagement", "Culture"],
    },
    {
      years: "2022 – 2023",
      title: "Recruiting & HR Manager",
      org: "Fireflies.ai",
      text: "Cut time-to-hire by a third, launched an HR playbook that cut coaching needs by 80%, and started async all-hands and happy hours across time zones.",
      tags: ["Employer brand", "Playbooks"],
    },
    {
      years: "2021 – 2022",
      title: "Lead Talent, Engineering & GTM",
      org: "Fireflies.ai",
      text: "Led a small talent team through a growth phase in which the company more than tripled. Automated the recruiting cycle and introduced fair pay mapping and a BYOD policy.",
      tags: ["Automation", "Scale"],
    },
    {
      years: "2020 – 2021",
      title: "Founding Recruiter, Tech & GTM",
      org: "Fireflies.ai",
      text: "First recruiter and first people hire. Built sourcing from scratch and hired across LATAM, Southeast Asia, South Asia and Africa, all by direct outreach.",
      tags: ["0 → 1", "Outbound"],
    },
    {
      years: "2019 – 2020",
      title: "Talent Acquisition Specialist",
      org: "Pesto Tech",
      text: "Connected Indian engineers with US startups. Helped grow cohorts 20× and revenue 10×, and set up the recruiting stack from scratch.",
      tags: ["EdTech", "Growth"],
    },
    {
      years: "2018 – 2019",
      title: "Senior HR, Tech & Non-Tech Hiring",
      org: "OYO",
      text: "Lateral and leadership tech hiring with no vendors. Closed OYO's first ML engineer for the consumer team in 15 days, with a 3× ROI on recruiting.",
      tags: ["Leadership hiring", "Tech"],
    },
    {
      years: "2018",
      title: "Co-founder, EdTech (stealth)",
      org: "Own venture",
      text: "Built an early learning platform for students preparing for armed-forces entrance exams: product, content and community.",
      tags: ["Founder", "Product"],
    },
    {
      years: "2016 – 2018",
      title: "Technical Recruiter → Senior Recruitment Specialist",
      org: "Astra HR Services · Anzy Careers",
      text: "Hired engineers for Amazon, Flipkart, Uber, Swiggy, Walmart Labs and more. Built founding teams for startups and beat targets by up to 400%.",
      tags: ["Agency", "Tech hiring"],
    },
  ],
  education: [
    { title: "Visvesvaraya Technological University", detail: "Bachelor of Engineering, First Class with Distinction · top 5% of the class · university athletics", years: "2011 – 2015" },
    { title: "Kendriya Vidyalaya", detail: "High school · School Captain · Student of the Year · Maths Olympiad and quiz winner", years: "2007 – 2010" },
  ],
  companies: ["Fireflies.ai", "OYO", "Pesto Tech", "Amazon", "Flipkart", "Uber", "Swiggy", "Walmart Labs", "Myntra", "Visa"],
};

export const bring = {
  title: "What I bring",
  lead: "Three levels, one habit: make the next step obvious for everyone involved.",
  columns: [
    {
      label: "For the company",
      points: [
        "Hires who join, ship and stay.",
        "Less founder time on hiring: I run senior and technical closes myself.",
        "A fully in-house hiring engine, so budget goes to people, not agencies.",
      ],
    },
    {
      label: "For the team",
      points: [
        "People unblocked fast, before small issues grow.",
        "A clear hiring bar, with written feedback.",
        "A warm start for every new joiner.",
      ],
    },
    {
      label: "For the organisation",
      points: [
        "Systems that outlive any one person.",
        "Automation that takes admin off people, so time goes to conversations.",
        "Predictable people operations: payroll, policy, reviews and offsites on a calendar.",
      ],
    },
  ],
};

export const lifecycle = {
  title: "The whole people lifecycle, end to end",
  lead: "A lean team that owns everything from the first message to the fifth work anniversary.",
  steps: [
    { verb: "Attract", text: "Sourcing, outbound and repeatable channels" },
    { verb: "Hire", text: "Screening, interviews, assignments and closing" },
    { verb: "Operate", text: "Payroll, HR ops, policies and documentation" },
    { verb: "Develop", text: "1:1s, appraisals and performance calibration" },
    { verb: "Engage", text: "Culture, offsites, happy hours and co-working" },
    { verb: "Automate", text: "Dashboards, agents and connected tools" },
  ],
};

export const principles = {
  title: "How I work",
  items: [
    { n: "01", text: "Source, don't outsource.", sub: "GitHub, X-ray, niche communities and outbound." },
    { n: "02", text: "Close without the founders.", sub: "Leadership stays on product; candidates still get a real conversation." },
    { n: "03", text: "Automate before you add headcount.", sub: "Offsites, reimbursements and data run on systems, not people." },
    { n: "04", text: "Build systems, not dependencies.", sub: "Designed once, documented, handed over." },
    { n: "05", text: "Feedback to every candidate, even the no.", sub: "An open role costs less than a bad hire, and less than a bad reputation." },
    { n: "06", text: "The process flexes. The bar doesn't.", sub: "Every market brings different norms; the standard stays the same." },
  ],
};

/** `mock` picks which small illustration (built from fake data) appears on the card. */
export const built = {
  title: "What I've built",
  lead: "Tools my team runs on, built with Claude and AI agents. The previews are illustrations with made-up data.",
  items: [
    { mock: "payroll", title: "Live payroll tracker", text: "One view of pay, contracts and invoices that flags issues before payday." },
    { mock: "review", title: "Performance and bonus tool", text: "Enter appraisals and bonuses directly, no spreadsheet reconciling." },
    { mock: "pipeline", title: "Hiring pipeline tracker", text: "Every role, every candidate and the next step, in one place." },
    { mock: "report", title: "Daily screening report", text: "Posted automatically every morning." },
    { mock: "playbook", title: "Playbooks in minutes", text: "Role kits and hiring guides generated with Claude." },
    { mock: "sourcing", title: "Sourcing hub and calculator", text: "A sourcing hub, plus a compensation calculator anyone can use, no tech skills needed." },
  ],
} as const;

export const focus = {
  title: "What I'm focused on next",
  lead: "A living plan. Every item has a clear outcome.",
  items: [
    { title: "Hire better people", text: "A higher bar with faster execution, and funnel data the whole team understands and acts on." },
    { title: "Unblock teams early", text: "Standing 1:1s with function leads, so blockers surface before they become problems." },
    { title: "Grow a hands-on people team", text: "Bring the full hiring funnel in-house, with trained owners and less dependency on any one person." },
    { title: "Raise the performance bar", text: "A clear bar, early feedback and consistent calibration with leads." },
    { title: "Keep people ops current", text: "Strong basics and fast answers: payroll, policies, assets and everyday questions." },
    { title: "Automate the repetitive", text: "Agents for screening, sourcing and playbooks, and HR tools that talk to each other." },
    { title: "Get closer to the product", text: "Test what we ship, give direct feedback, and understand the customer, not just the org chart." },
  ],
};

/** Honours & awards from LinkedIn, newest first. `featured` ones sit on the trophy shelf. */
export const recognition = {
  title: "Recognition",
  lead: "Five Fireflies.ai awards in five years, and a habit of raising the bar that goes back to school.",
  shelfTitle: "Fireflies.ai awards",
  awards: [
    { title: "No Chill", date: "Aug 2025", org: "Fireflies.ai", text: "For raising the bar every single time. Annual Awards Meet, Mauritius 2025.", featured: true },
    { title: "Hustle Hero", date: "Aug 2024", org: "Fireflies.ai", text: "Exceptional contribution to culture growth during the 2024 Vietnam Global Meet Up.", featured: true },
    { title: "Hustle Hero Award", date: "Dec 2023", org: "Fireflies.ai", text: "“Keep running the culture like a Swiss Army knife.”", featured: true },
    { title: "Onwards Award", date: "Dec 2022", org: "Fireflies.ai", text: "Relentless focus on hiring goals and making Fireflies a great place to work for great candidates.", featured: true },
    { title: "Energy Award", date: "Dec 2021", org: "Fireflies.ai", text: "“Keep scaling and bringing out great hustlers to join our mission.”", featured: true },
    { title: "Hustle on Closure", date: "Dec 2021", org: "Fireflies.ai", text: "Sourcing from scratch and closing remote engineers end to end, at a 77% offer-to-join ratio." },
    { title: "New Product Hackathon", date: "Dec 2021", org: "Fireflies.ai", text: "Designed and pitched a new B2B SaaS feature in two hours." },
    { title: "Super Star Performer", date: "2018", org: "Anzy Careers", text: "Three quarters in a row, hitting 150%, 250% and 400% of target." },
    { title: "Marathon Runner", date: "2015", org: "College", text: "Avid runner, keeping a tight hold on fitness." },
    { title: "Overall Hustle", date: "College", org: "Visvesvaraya Technological University", text: "School captain and athletics team captain." },
    { title: "Sports Captain", date: "School", org: "Kendriya Vidyalaya", text: "Football and basketball captain, national-level cricket, and prizes in athletics, karate, quiz and debate." },
    { title: "Student of the Year", date: "School", org: "Kendriya Vidyalaya", text: "Science topper, and best in extracurricular activities." },
  ],
  certifications: [
    { title: "Data-Driven Diversity Recruiting", issuer: "SeekOut", date: "2021", mark: "S", color: "#4b1e6e" },
    { title: "Employer Branding Certification", issuer: "hirist", date: "2021", mark: "h", color: "#f05a28" },
    { title: "Frictionless Sales Certified", issuer: "HubSpot", date: "2020", mark: "H", color: "#ff5c35" },
    { title: "Google Analytics for Beginners", issuer: "Google", date: "2020", mark: "G", color: "#4285f4" },
    { title: "Tech Recruiter Certification Program", issuer: "hirist", date: "2020", mark: "h", color: "#f05a28" },
    { title: "Tech Recruitment Certified Professional", issuer: "SkillPanel", date: "2020", mark: "SP", color: "#7c3aed" },
    { title: "LinkedIn Recruiter Workshop", issuer: "OYO", date: "2019", mark: "O", color: "#ee2e24" },
    { title: "Strategic Leadership", issuer: "Cavalier India", date: "2015", mark: "C", color: "#c81e1e" },
  ],
  publication: { title: "Engine downsizing: trend and technique", text: "Engineering publication" },
};

/**
 * Recommendations, quoted from LinkedIn (all set to public there). Quotes are
 * short excerpts of the full text. `short` is the one-liner for the scrolling strip.
 */
export const recommendations = {
  title: "What people say",
  lead: "Twelve recommendations on LinkedIn, from engineers and leaders I've hired along the way.",
  linkedin: "https://www.linkedin.com/in/manishshekhawatradar/details/recommendations/",
  items: [
    {
      name: "Rakshit Garg", role: "Analytics Leader, Blinkit", year: "2019",
      quote: "The way he handled the entire hiring process end to end was excellent to say the least. Rest assured, if your profile is being handled by Manish you know that you're in good hands.",
      short: "If your profile is being handled by Manish, you know you're in good hands.",
    },
    {
      name: "Nagendra Prasad K S", role: "VP of Engineering, American Express", year: "2018",
      quote: "Thanks to Manish, I was able to make my career move from Amazon seamlessly. Manish has a matured head on young shoulders and that is needed when dealing with senior leadership hiring.",
      short: "A matured head on young shoulders: exactly what senior leadership hiring needs.",
    },
    {
      name: "Disha Venkataraman", role: "Hiring for creative roles, Country Delight", year: "2019",
      quote: "Manish is one of those rare HR professionals who go beyond the basics to make your employment shift a comfortable and informed one. He is approachable and diligent.",
      short: "One of those rare HR professionals who go beyond the basics.",
    },
    {
      name: "Harsh Gandhi", role: "Full-Stack Engineer, ex-Hashnode, Gameskraft", year: "2018",
      quote: "He is very organized and prompt and provided me with many useful tips on interviewing. He is a true professional and an extremely talented recruiter.",
      short: "A true professional and an extremely talented recruiter.",
    },
    {
      name: "Raunak Kumar Agarwal", role: "Senior Engineering Manager, Microsoft", year: "2018",
      quote: "He took extra effort to understand what an individual needs and that is what makes the difference. Manish helped in my recruitment and the experience was very well handled.",
      short: "He took extra effort to understand what an individual needs.",
    },
    {
      name: "Yaswanth Tavva", role: "Principal Software Engineer, Microsoft", year: "2018",
      quote: "Very much concerned to get the candidate the right job he/she deserves. Follow ups during the interview process are very well handled. Kudos to Manish!",
      short: "Very much concerned to get the candidate the right job they deserve.",
    },
    {
      name: "Ekul Chugh", role: "Project Lead, QA, Metacube", year: "2019",
      quote: "Throughout my recruitment process there was never any communication gap. He always kept me updated about my profile status, which is a must quality for a recruiter to have.",
      short: "There was never any communication gap.",
    },
    {
      name: "Debargho Chatterjee", role: "Engineering Leader", year: "2018",
      quote: "Manish is a highly professional, diligent and disciplined person. He has a never say die attitude. It's worth mentioning the awesome human being he is!",
      short: "A never-say-die attitude, and an awesome human being.",
    },
    {
      name: "Abhay Kumar", role: "Staff Engineer, Walmart", year: "2018",
      quote: "He is the kind of person who will not rest till the task at hand is finished, always looking for challenges at work and a very fun loving person to work with.",
      short: "He will not rest till the task at hand is finished.",
    },
    {
      name: "Ankit Jaiswal", role: "Lead Platform Engineer, Lowe's", year: "2018",
      quote: "He is a very humble and friendly person to coordinate with. It was a great experience working with Manish and getting to the right place in accordance with the skill set I carry.",
      short: "A very humble and friendly person to coordinate with.",
    },
    {
      name: "Baidyanath Prasad", role: "Senior Engineering Manager", year: "2018",
      quote: "If you're looking for such opportunity then please send him your resume and sit back at home and start preparing for the interview. Best wishes!",
      short: "Send him your resume, sit back and start preparing for the interview.",
    },
    {
      name: "Jeevan Jyoti Sahoo", role: "Senior Software Engineer", year: "2018",
      quote: "I really liked the way he interacts with the candidate and does follow-ups.",
      short: "I really liked the way he interacts with candidates.",
    },
  ],
};

export const life = {
  title: "Off the clock",
  lead: "Wellness-first, endlessly curious, always up for a conversation about remote hiring.",
  items: [
    { icon: "run", label: "Endurance runner" },
    { icon: "bolt", label: "Calisthenics" },
    { icon: "ball", label: "Basketball & football" },
    { icon: "music", label: "Hobbyist musician" },
    { icon: "chef", label: "Home chef" },
    { icon: "book", label: "Avid reader" },
    { icon: "globe", label: "Curious about cultures" },
  ],
  languages: "Hindi (native) · English (full professional)",
};

export const openSource = {
  title: "Open source",
  items: [
    {
      name: "xray-finder",
      text: "Builds one precise X-ray search string across 16 networks, with a plain-English explanation of what it does.",
      repo: "https://github.com/shekhawatm/xray-finder",
      live: "https://xray-finder.vercel.app",
    },
  ],
  profile: "https://github.com/shekhawatm",
};

export const contact = {
  title: "Let's talk",
  text: "Building a lean, global team, or rethinking how you hire? I'm always up for a conversation about remote hiring, global compensation or building a people function from scratch.",
  email: "shekhawatm57@gmail.com",
  linkedin: "https://www.linkedin.com/in/manishshekhawatradar/",
  github: "https://github.com/shekhawatm",
};

/** Items still to confirm. `npm run privacy` prints these as reminders. */
export const needsConfirmation = [
  "Fireflies.ai percentages: confirm they can be public (most are already on LinkedIn)",
  "Offer acceptance 66% → 94% is from LinkedIn; the internal report says 56% → 90% offer-to-join",
  "Recommendation quotes are trimmed excerpts; check you're happy with each",
  "GitHub: LinkedIn lists github.com/shekhawatm57; the site links github.com/shekhawatm (where xray-finder lives)",
];
