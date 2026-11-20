/* ==========================================================================
   ABDUL AZEEZ — CONFIGURABLE PORTFOLIO DATA (V2)
   Update your email, QuickCheckout live URL, or resume PDF here.
   ========================================================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Abdul Azeez",
    shortBrand: "AA",
    title: "Python Full Stack Developer | MERN Stack Developer",
    rotatingRoles: [
      "Python Full Stack Developer",
      "MERN Stack Developer",
      "3x Competition Winner (Solo)",
      "Software Developer & Problem Solver"
    ],
    location: "Hyderabad, Telangana, India",
    educationShort: "B.Tech CSE, Malla Reddy Engineering College and Management Sciences",
    expectedGraduation: "2029",
    github: "https://github.com/Al-Azeez",
    // Configurable contact & resume details
    email: "mullaabdulazeez65@gmail.com",
    resumeUrl: "",         // Optional: set to "./assets/Abdul_Azeez_Resume.pdf" to download a custom PDF
    introParagraphs: [
      "I'm Abdul Azeez, a passionate Computer Science and Engineering student and Full Stack Developer who enjoys transforming ideas into practical digital solutions.",
      "I specialize in Python Full Stack Development and MERN Stack technologies, building responsive applications, REST APIs, database-driven systems, and intelligent software solutions.",
      "My journey extends beyond coding. I actively compete in national-level hackathons—consistently participating as a single solo participant against full teams—and have won 3 major competitions across hackathons, startup poster presentations, and idea pitching.",
      "I believe in learning by building, solving real-world problems, and creating technology that makes a difference."
    ]
  },

  skills: [
    { category: "Programming", icon: "code-2", items: ["Python", "Java", "JavaScript", "C"] },
    { category: "Frontend", icon: "layout", items: ["HTML", "CSS", "React.js", "Tailwind CSS"] },
    { category: "Backend", icon: "server", items: ["Django", "FastAPI", "Node.js", "Express.js"] },
    { category: "Databases", icon: "database", items: ["MongoDB", "SQL"] },
    { category: "Tools", icon: "wrench", items: ["Git", "GitHub", "VS Code"] },
    { category: "DevOps", icon: "container", items: ["Docker", "CI/CD"] }
  ],

  projects: [
    {
      id: "phishx-ai",
      title: "PHISHX AI",
      category: "AI & Python",
      status: "Live",
      shortExplanation: "Phishing URL detection and cybersecurity awareness platform.",
      problemSolved: "Users frequently encounter deceptive links without a fast way to evaluate URL risk or build awareness around common phishing patterns.",
      features: [
        "URL scanning and security analysis",
        "Phishing awareness and reporting",
        "Machine learning-backed threat classification"
      ],
      stack: ["React", "Python", "FastAPI", "Machine Learning"],
      liveUrl: "https://phishxai.alazeez.xyz/",
      githubUrl: null,
      accent: "#06B6D4",
      visualType: "security"
    },
    {
      id: "cropshield-ai",
      title: "CROPSHIELD-AI",
      category: "AI & Python",
      status: "Live",
      shortExplanation: "AI-powered crop disease identification platform.",
      problemSolved: "Delayed identification of plant diseases leads to preventable crop loss when farmers lack timely access to agronomic diagnostics.",
      features: [
        "Image-based disease detection",
        "Confidence reporting",
        "Actionable prevention guidance"
      ],
      stack: ["React", "Python", "FastAPI", "Machine Learning"],
      liveUrl: "https://crop-shield.alazeez.xyz/",
      githubUrl: null,
      accent: "#10B981",
      visualType: "agri"
    },
    {
      id: "civictrust",
      title: "CIVICTRUST",
      category: "MERN Stack",
      status: "Live",
      shortExplanation: "Smart civic complaint management platform.",
      problemSolved: "Municipal sanitation complaints often lack structured tracking between residents reporting issues and administrators reviewing them.",
      features: [
        "Garbage complaint reporting",
        "Incident management workflow",
        "Administrative review dashboard"
      ],
      stack: ["React", "Node.js", "Express.js", "MongoDB"],
      liveUrl: "https://civictrust2.alazeez.xyz/",
      githubUrl: null,
      accent: "#8B5CF6",
      visualType: "civic"
    },
    {
      id: "chainforensics",
      title: "CHAINFORENSICS",
      category: "AI & Python",
      status: "Live",
      shortExplanation: "AI-powered blockchain transaction analysis and investigation platform.",
      problemSolved: "Cryptocurrency investigators face opaque, high-volume ledger activity where suspicious wallet behavior and illicit fund flows are difficult to trace manually.",
      features: [
        "Suspicious transaction detection",
        "Wallet relationship analysis",
        "Explainable alerts and investigation views"
      ],
      stack: ["React", "Python", "FastAPI", "Machine Learning"],
      liveUrl: "https://chain-forensics-gnit.vercel.app",
      githubUrl: null,
      accent: "#3B82F6",
      visualType: "blockchain"
    },
    {
      id: "quickcheckout",
      title: "QUICKCHECKOUT SYSTEM",
      category: "AI & Python",
      status: "Live",
      shortExplanation: "Deployed supermarket self-checkout platform built with Django REST Framework and React.",
      problemSolved: "Long retail billing queues slow down supermarket shopping; a self-checkout workflow streamlines barcode item scanning, cart management, and digital payment.",
      features: [
        "Real-time barcode scanning and smart shopping cart",
        "End-to-end digital payment workflow",
        "Full Django REST Framework + React + MongoDB deployment"
      ],
      stack: ["Django", "Django REST Framework", "React", "Tailwind CSS", "MongoDB"],
      // PASTE YOUR DEPLOYED QUICKCHECKOUT URL HERE (e.g., "https://quickcheckout.vercel.app"):
      liveUrl: "https://quickcheckout-system.alazeez.xyz/",
      githubUrl: "https://github.com/Al-Azeez/QuickCheckout--PYTHON",
      accent: "#F59E0B",
      visualType: "checkout"
    }
  ],

  hackathons: [
    {
      id: "bharat-techfusion-2k26",
      title: "BHARAT TECHFUSION 2K26",
      organization: "KG Reddy College of Engineering & Technology (with Brainovision Solutions India Pvt. Ltd. & AICTE/NEAT)",
      date: "August 24–25, 2026",
      type: "Winner — 2nd Prize in AI & Software",
      badgeClass: "badge-winner",
      soloLabel: "Participated as Single Participant (Solo)",
      isFeaturedAward: true,
      summary: "Won 2nd Prize in the AI & Software domain as a solo competitor at a National-Level 36-Hour Hackathon.",
      details: "Built and pitched an end-to-end AI & Software solution completely solo over 36 continuous hours against multi-member teams from across India. Awarded the Certificate of Merit (2nd Prize), Certificate of Participation, and an Institutional Certificate of Appreciation honoring Malla Reddy Engineering College and Management Sciences.",
      certificates: [
        {
          id: "cert-btf-merit",
          title: "Bharat Techfusion 2K26 — Certificate of Merit (2nd Prize)",
          organization: "KG Reddy College of Engineering & Technology × Brainovision",
          type: "Merit — 2nd Prize",
          date: "August 24–25, 2026",
          description: "Awarded 2nd Prize in the AI & Software domain at the National-Level 36-Hour Hackathon. Earned competing as a single participant against full engineering teams.",
          image: "assets/certificates/bharat-techfusion-merit.webp"
        },
        {
          id: "cert-btf-part",
          title: "Bharat Techfusion 2K26 — Certificate of Participation",
          organization: "KG Reddy College of Engineering & Technology × Brainovision",
          type: "Participation (Solo)",
          date: "August 24–25, 2026",
          description: "Recognizes active solo participation and technical execution across the 36-hour national hackathon conducted in association with AICTE / NEAT and Brainovision.",
          image: "assets/certificates/bharat-techfusion-participation.webp"
        },
        {
          id: "cert-btf-appreciation",
          title: "Bharat Techfusion 2K26 — Certificate of Appreciation",
          organization: "Brainovision Solutions India Pvt. Ltd. & KG Reddy College of Engineering & Technology",
          type: "Institutional Appreciation",
          date: "August 24–25, 2026",
          description: "Presented to Malla Reddy Engineering College and Management Sciences in appreciation of student innovation and representation at Bharat Techfusion 2K26.",
          image: "assets/certificates/bharat-techfusion-appreciation.webp"
        }
      ]
    },
    {
      id: "hackx-2026",
      title: "HACKX 2026 (Muffakham Jah / SU Knowledge Hub)",
      organization: "Muffakham Jah / SU Knowledge Hub Foundation (Incubation Center)",
      date: "2026",
      type: "Top 5th Position (80 Shortlisted / 180+ Teams)",
      badgeClass: "badge-recognition",
      soloLabel: "Participated as Single Participant (Solo)",
      highlightRank: true,
      summary: "Secured Top 5th position among 80 shortlisted teams out of 180+ participating teams — competing as a single participant.",
      details: "Outperformed 175+ multi-member teams to finish in the Top 5th position out of 80 shortlisted finalists. Awarded by SU Knowledge Hub Foundation for standout innovation, technical execution, and creativity.",
      certificates: [
        {
          id: "cert-hackx",
          title: "HACKX 2026 — Top 5th Position (80 Shortlisted / 180+ Teams)",
          organization: "Muffakham Jah / SU Knowledge Hub Foundation",
          type: "Top 5th Position (Solo)",
          date: "2026",
          description: "Recognizes solo participation in HACKX 2026, achieving Top 5th position among 80 shortlisted teams out of 180+ competing teams for innovation and technical build quality.",
          image: "assets/certificates/hackx-2026.webp"
        }
      ]
    },
    {
      id: "tech-horizon-2",
      title: "TECH HORIZON 2.0",
      organization: "IEEE-SMC Society, Guru Nanak Institutions Technical Campus (GNITC), Hyderabad",
      date: "October 9–10, 2026",
      type: "QUALIFIED till the Final Round",
      badgeClass: "badge-finalist",
      soloLabel: "Participated as Single Participant (Solo)",
      highlightRank: true,
      summary: "Qualified all the way to the Final Round as a solo participant at the Tech Horizon 2.0 National-Level Hackathon.",
      details: "Organized by the Department of CSE (Cyber Security & Data Science) and IEEE-SMC Society at GNITC, Hyderabad. Built and defended a full working prototype solo to qualify through all elimination stages into the Final Round.",
      certificates: [
        {
          id: "cert-tech-horizon",
          title: "Tech Horizon 2.0 — Qualified till Final Round",
          organization: "IEEE-SMC Society, Guru Nanak Institutions Technical Campus",
          type: "Final Round Qualifier (Solo)",
          date: "October 9–10, 2026",
          description: "Certifies solo participation and advancement to the Final Round of the Tech Horizon 2.0 National-Level Hackathon hosted by IEEE-SMC Society at GNITC, Hyderabad.",
          image: "assets/certificates/tech-horizon-2.webp"
        }
      ]
    },
    {
      id: "ai-hack-mrdu-2k26",
      title: "AI HACK × MRDU 2K26",
      organization: "Malla Reddy (MR) Deemed to be University × Trizen Community",
      date: "October 3–4, 2026",
      type: "QUALIFIED till the Final Round",
      badgeClass: "badge-finalist",
      soloLabel: "Participated as Single Participant (Solo)",
      highlightRank: true,
      summary: "Qualified till the Final Round competing solo in this 24-Hour AI Hackathon organized with Trizen Community.",
      details: "Designed, coded, and presented an AI-driven solution solo over 24 hours at Malla Reddy (MR) Deemed to be University, Hyderabad, advancing past preliminary evaluations into the Final Round.",
      certificates: [
        {
          id: "cert-ai-hack-mrdu",
          title: "AI HACK × MRDU 2K26 — Qualified till Final Round",
          organization: "Malla Reddy (MR) Deemed to be University × Trizen Community",
          type: "Final Round Qualifier (Solo)",
          date: "October 3–4, 2026",
          description: "Certifies solo participation and Final Round qualification in the 24-Hour AI HACK × MRDU 2K26 Hackathon organized with Trizen Community in Hyderabad.",
          image: "assets/certificates/ai-hack-mrdu.webp"
        }
      ]
    },
    {
      id: "kalachakra-techsurge-2k26",
      title: "KALACHAKRA HACKATHON — TECHSURGE 2K26",
      organization: "Coding Brigade, BVRIT (with HackIndia)",
      date: "September 18, 2026",
      type: "Shortlisted in Top 50 / 200 Teams",
      badgeClass: "badge-recognition",
      soloLabel: "Participated as Single Participant (Solo)",
      highlightRank: true,
      summary: "Shortlisted under the Top 50 teams out of 200 competing teams while participating as a single participant at BVRIT.",
      details: "Competed solo as Team Al-Azeez in the Kalachakra Hackathon at TechSurge 2K26 hosted by Coding Brigade, BVRIT (Greater Hyderabad), earning Top 50 shortlisting among 200 participating teams.",
      certificates: [
        {
          id: "cert-kalachakra",
          title: "Kalachakra Hackathon at TechSurge 2K26 (Top 50 / 200 Teams)",
          organization: "Coding Brigade, BVRIT",
          type: "Top 50 Shortlisted (Solo)",
          date: "September 18, 2026",
          description: "Recognizes solo participation and Top 50 shortlisting (out of 200 teams) at the Kalachakra Hackathon during TechSurge 2K26 hosted by Coding Brigade, BVRIT.",
          image: "assets/certificates/kalachakra-techsurge.webp"
        }
      ]
    },
    {
      id: "hack-with-hyderabad-2026",
      title: "HACK WITH HYDERABAD 2026",
      organization: "HackWithIndia",
      date: "2026",
      type: "Top 1,000 / 3,000 Teams",
      badgeClass: "badge-recognition",
      soloLabel: "Participated as Single Participant (Solo)",
      highlightRank: true,
      summary: "Ranked among the Top 1,000 teams out of 3,000 participating teams as a single participant in Hack With Hyderabad.",
      details: "Recognized by HackWithIndia for strong technical execution and problem-solving in a massive 3,000-team competitive hackathon while competing completely solo.",
      certificates: [
        {
          id: "cert-hwh",
          title: "Hack With Hyderabad — Top 1,000 / 3,000 Teams",
          organization: "HackWithIndia",
          type: "Top 1,000 Recognition (Solo)",
          date: "2026",
          description: "Certifies solo participation and Top 1,000 ranking out of 3,000 participating teams in Hack With Hyderabad organized by HackWithIndia.",
          image: "assets/certificates/hack-with-hyderabad.webp"
        }
      ]
    }
  ],

  certifications: [
    {
      id: "cert-outskill",
      title: "Generative AI Mastermind",
      organization: "Outskill",
      type: "Completion",
      badgeClass: "badge-completion",
      date: "2026",
      description: "Completed intensive training on Generative AI workflows, prompt engineering, and building AI-assisted applications led by Outskill founder Vaibhav Sisinty.",
      image: "assets/certificates/outskill-genai.webp"
    },
    {
      id: "cert-be10x",
      title: "AI Tools and ChatGPT Workshop",
      organization: "be10x",
      type: "Completion",
      badgeClass: "badge-completion",
      date: "June 28, 2026",
      description: "Hands-on workshop covering rapid AI-assisted coding, debugging, data analysis, and workflow automation using modern LLM tools.",
      image: "assets/certificates/be10x-ai-tools.webp"
    },
    {
      id: "cert-freedom-ai",
      title: "Freedom with AI Masterclass",
      organization: "Freedom with AI",
      type: "Completion",
      badgeClass: "badge-completion",
      date: "May 16, 2026",
      description: "Completed the ISO 9001-2015 certified Freedom with AI Masterclass focused on practical AI automation, productivity systems, and applied machine intelligence.",
      image: "assets/certificates/freedom-with-ai.webp"
    },
    {
      id: "cert-maxsri-c",
      title: "C Programming — Certificate of Performance",
      organization: "Maxsri Computer Education",
      type: "Completion (Good)",
      badgeClass: "badge-completion",
      date: "June 25 – July 24, 2025",
      description: "Completed a structured foundational course in C programming covering pointers, memory management, control structures, and algorithmic problem-solving with 'Good' performance.",
      image: "assets/certificates/maxsri-c-programming.webp"
    },
    {
      id: "cert-mahindra",
      title: "The Quiet Power Quiz",
      organization: "Mahindra Rise × Breath Beings",
      type: "Participation",
      badgeClass: "badge-participation",
      date: "2026",
      description: "Participated in Mahindra Rise's #SheIsOnTheRise 2026 leadership and mindfulness quiz in collaboration with Breath Beings, recognizing collaborative leadership mindset.",
      image: "assets/certificates/mahindra-quiet-power.webp"
    }
  ],

  driveCredentials: [
    {
      id: "drive-world-record",
      title: "Human Infinity Formation — Asia & India Book of Records",
      organization: "Marham × WICCI × Fairmount Builders",
      type: "Certificate of Achievement (Record Attempt)",
      badgeClass: "badge-record",
      date: "World Autism Awareness Day",
      description: "Awarded for being an integral part of the official Human Infinity Formation attempt for the India & Asia Book of Records, symbolizing endless acceptance and inclusion for autism.",
      image: "assets/certificates/human-infinity.jpeg"
    },
    {
      id: "drive-google-ambassador",
      title: "Google Student Ambassador Program 2026 — Product Understanding",
      organization: "Google Student Ambassador Program",
      type: "Participation",
      badgeClass: "badge-completion",
      date: "August 28, 2026",
      description: "Participated in the Product Understanding session under the Google Student Ambassador Program 2026, reflecting product curiosity, initiative, and active student community learning.",
      image: "assets/certificates/google.jpeg"
    },
    {
      id: "drive-quizoff-2026",
      title: "QuizOff 2026: India's Biggest AI Quiz",
      organization: "CampusCrew × Unstop",
      type: "Participation",
      badgeClass: "badge-recognition",
      date: "July 19, 2026",
      description: "Competed among 5,25,000+ students from 48,500+ institutions across 35+ countries in India's largest AI quiz hosted on Unstop by CampusCrew.",
      image: "assets/certificates/campus-crew.png"
    },
    {
      id: "drive-genesis-venture",
      title: "Genesis Venture Challenge 2026",
      organization: "CMRTC × IEEE × IIC × Idea Genesis Community",
      type: "Participation",
      badgeClass: "badge-participation",
      date: "2026",
      description: "Participated in the National Entrepreneurship Challenge 2026 at CMR Technical Campus, showcasing startup pitching, business modeling, and entrepreneurial innovation.",
      image: "assets/certificates/genesis-certificate.jpeg"
    },
    {
      id: "drive-hackindia-bvrit",
      title: "HackIndia — TECHSURGE 2K26 (Team Al-Azeez)",
      organization: "HackIndia × BVRIT, Greater Hyderabad",
      type: "Participation (Solo — Team Al-Azeez)",
      badgeClass: "badge-solo",
      date: "September 18, 2026",
      description: "Official HackIndia participation credential for competing solo as Team Al-Azeez at TECHSURGE 2K26, BVRIT Greater Hyderabad, celebrating innovation and engineering impact.",
      image: "assets/certificates/bvrit-certificares.jpeg"
    }
  ],

  academicAwards: [
    {
      id: "award-poster-2nd",
      title: "Poster Presentation Competition — Business / Startup Ideas",
      organization: "Institution's Innovation Council, Malla Reddy Engineering College and Management Sciences",
      type: "Winner — Second Prize",
      badgeClass: "badge-winner",
      date: "July 23, 2026",
      description: "Won Second Prize in the Business & Startup Ideas Poster Presentation Competition conducted under the Ministry of Education's Institution's Innovation Council (IIC) initiative.",
      image: "assets/certificates/poster-presentation-2nd.webp"
    },
    {
      id: "award-idea-3rd",
      title: "Idea Pitching Competition",
      organization: "Institution's Innovation Council, Malla Reddy Engineering College and Management Sciences",
      type: "Winner — Third Prize",
      badgeClass: "badge-winner",
      date: "November 28, 2025",
      description: "Won Third Prize in the IIC Idea Competition during B.Tech 1st Year, recognized for original problem framing, technical feasibility, and impactful pitching.",
      image: "assets/certificates/idea-competition-3rd.webp"
    }
  ],

  momentsOfAchievement: [
    {
      id: "moment-1",
      title: "2nd Prize Winner — Award Ceremony",
      caption: "Receiving the Certificate of Merit for 2nd Prize in AI & Software at Bharat Techfusion 2K26.",
      date: "August 25, 2026",
      image: "assets/photos/moment-ceremony-2nd-prize.webp"
    },
    {
      id: "moment-2",
      title: "Stage Recognition — Bharat Techfusion 2K26",
      caption: "On-stage recognition during the Bharat Techfusion 2K26 National-Level 36-Hour Hackathon.",
      date: "August 25, 2026",
      image: "assets/photos/moment-stage-recognition.webp"
    },
    {
      id: "moment-3",
      title: "Certificate Presentation on Stage",
      caption: "Receiving the Bharat Techfusion 2K26 Certificate of Participation from event dignitaries.",
      date: "August 25, 2026",
      image: "assets/photos/moment-stage-participation.webp"
    },
    {
      id: "moment-4",
      title: "Bharat Techfusion 2K26 — After the Win",
      caption: "With the Bharat Techfusion 2K26 Merit, Participation, and Appreciation certificates.",
      date: "August 25, 2026",
      image: "assets/photos/moment-certificates-showcase.webp"
    }
  ],

  education: [
    {
      period: "Expected Graduation: 2029",
      degree: "B.Tech — Computer Science and Engineering",
      institution: "Malla Reddy Engineering College and Management Sciences, Hyderabad",
      stats: [
        { label: "Current CGPA", value: "7.4" },
        { label: "Branch", value: "CSE" }
      ]
    },
    {
      period: "Completed",
      degree: "Intermediate (Class XI & XII)",
      institution: "Board of Intermediate Education, Telangana",
      stats: [
        { label: "First Year", value: "462 / 470" },
        { label: "Second Year", value: "955 Marks" }
      ]
    }
  ]
};
