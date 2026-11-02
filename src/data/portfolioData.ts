import { ProjectMission, SkillCategory, CertificationItem, WorkHistory } from '../types';

export const PERSONAL_INFO = {
  name: "Om Shrikrishna Gautam",
  roleTitle: "MSc Cybersecurity Manager & Cloud Systems Architect",
  username: "omgautam",
  hostname: "ece-paris-soc",
  location: "Paris, France",
  phone: "+33 0745701519",
  email: "omgautam743@gmail.com",
  currentSchool: "ECE Paris, France",
  currentDegree: "MSc Cybersecurity Manager (2026 – Present)",
  undergradDegree: "Bachelor of Computer Applications (Cloud Computing & System Administration)",
  undergradSchool: "D. Y. Patil International University, Pune, India (2024)",
  undergradCGPA: "7.11 / 10",
  statusBadge: "Paris, FR · Available for Cybersecurity / Cloud Internship (2026/2027)",
  summary: "Cybersecurity master's student at ECE Paris. Background in cloud computing and system administration. Specializing in Vulnerability Assessment and Penetration Testing (VAPT), cloud task offloading architectures on AWS, and enterprise infrastructure incident response."
};

export const ASCII_LOGO = `
 ██████╗ ███╗   ███╗     ██████╗  █████╗ ██╗   ██╗████████╗ █████╗ ███╗   ███╗
██╔═══██╗████╗ ████║    ██╔════╝ ██╔══██╗██║   ██║╚══██╔══╝██╔══██╗████╗ ████║
██║   ██║██╔████╔██║    ██║  ███╗███████║██║   ██║   ██║   ███████║██╔████╔██║
██║   ██║██║╚██╔╝██║    ██║   ██║██╔══██║██║   ██║   ██║   ██╔══██║██║╚██╔╝██║
╚██████╔╝██║ ╚═╝ ██║    ╚██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═╝     ╚═╝     ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝
`;

export const ASCII_MINI_LOGO = `[ OM GAUTAM // ECE PARIS // CLOUD & CYBERSEC ARCHITECT ]`;

export const MISSIONS: ProjectMission[] = [
  {
    id: "cloud-blend",
    title: "Cloud Blend — Mobile Task Offloading Architecture",
    tagline: "Offloading intensive Android batch workloads to AWS S3 & Firebase",
    category: "cloud",
    badge: "Hackathon Winner",
    timeline: "Nov 2023 – May 2024",
    location: "D. Y. Patil International University, Pune",
    brief: "A distributed mobile architecture designed to offload resource-heavy Android tasks directly to cloud workers. Instead of letting phones freeze or overheat during heavy processing, tasks are serialized and handed off to AWS S3 and Firebase for asynchronous cloud execution.",
    roleHighlights: [
      "Designed the mobile-to-cloud offloading pipeline and request dispatch routines.",
      "Integrated AWS S3 object storage for binary payload staging with Firebase for state sync.",
      "Built the client-side task queue and failover handling in Flutter.",
      "Conducted latency and battery benchmarking to measure compute savings.",
      "Won Honourable Mention at the University Engineering Hackathon."
    ],
    techStack: ["Flutter", "AWS S3", "Firebase", "Git", "VS Code"],
    architectureBreakdown: {
      threatOrProblem: "Resource-intensive mobile tasks (e.g. bulk image transformations or file conversions) cause high battery drain, CPU throttling, and UI frame drops on budget hardware.",
      defenseOrSolution: "Built an authenticated client-side offload worker that streams large inputs into private S3 buckets and triggers cloud execution, returning status via real-time listeners.",
      impactResult: "Reduced on-device CPU load by ~65% during peak operations, eliminated main-thread UI freezing, and earned University Hackathon Honours."
    },
    honours: "Honourable Mention at University Hackathon (2024)"
  },
  {
    id: "emergency-management",
    title: "Cloud Emergency Response & Healthcare GIS Platform",
    tagline: "Real-time Patient Management & Hospital Resource Allocation",
    category: "cloud",
    badge: "University Project",
    timeline: "Feb 2024 – May 2024",
    location: "D. Y. Patil International University, Pune",
    brief: "A cloud-based coordination system built to streamline patient intake and hospital bed allocation during emergencies. Integrates live GIS tracking so dispatchers can route ambulances to hospitals with confirmed capacity.",
    roleHighlights: [
      "Built the dispatcher dashboard and bed management interfaces with Angular.",
      "Integrated GIS spatial mapping APIs to trace live vehicle positions and ETA calculations.",
      "Connected REST APIs hosted on AWS infrastructure with access controls.",
      "Tested API resilience under simulated high-concurrency request bursts."
    ],
    techStack: ["Angular", "AWS", "HTML/CSS", "GIS APIs", "Git"],
    architectureBreakdown: {
      threatOrProblem: "During emergency peaks, dispatchers lack live bed availability data, causing ambulance diversions and critical delays.",
      defenseOrSolution: "Designed an event-driven status board that links GIS ambulance telemetry directly to hospital capacity endpoints.",
      impactResult: "Eliminated blind transfers and gave dispatchers a single verified view of live bed availability."
    }
  },
  {
    id: "pitax-security",
    title: "IT Infrastructure & Security Operations",
    tagline: "Network Monitoring, Threat Handling & Incident Response",
    category: "infrastructure",
    badge: "Professional Experience",
    timeline: "Jan – June 2025",
    location: "PITAX Private Limited, Gondia, India",
    brief: "Supported day-to-day IT infrastructure operations, monitored internal network activity for abnormal spikes, troubleshot software issues, and guided employees on secure digital practices.",
    roleHighlights: [
      "Monitored network traffic logs to spot anomalies and unauthorized connection attempts.",
      "Installed, configured, and patched enterprise software across workstations.",
      "Maintained system records and created step-by-step documentation for daily operations.",
      "Helped handle security incident response procedures and user credential resets.",
      "Ran security awareness sessions to train non-technical staff on phishing and password hygiene."
    ],
    techStack: ["Network Monitoring", "Incident Response", "TCP/IP", "Windows Administration", "Documentation"],
    architectureBreakdown: {
      threatOrProblem: "Unpatched workstations, unmonitored endpoints, and employee phishing susceptibility created risks of internal compromise.",
      defenseOrSolution: "Standardized patch schedules, logged endpoint events, and ran security awareness guidance for office staff.",
      impactResult: "Maintained 99.9% network uptime with zero unauthorized access incidents during the 6-month tenure."
    }
  },
  {
    id: "istudio-vapt",
    title: "Vulnerability Assessment & Penetration Testing (VAPT)",
    tagline: "Practical Training in Network Security & Ethical Hacking",
    category: "security",
    badge: "Internship",
    timeline: "June 2022 – July 2022",
    location: "iStudio Security",
    brief: "Completed practical training in ethical hacking methodologies, network reconnaissance, vulnerability identification, and mitigation reporting across web applications.",
    roleHighlights: [
      "Conducted vulnerability assessments using standard network and web security tools.",
      "Practiced reconnaissance, port scanning, and vulnerability exploitation in sandboxed labs.",
      "Audited web application attack surfaces against OWASP Top 10 vulnerabilities.",
      "Wrote structured reports detailing identified vulnerabilities, severity scores, and remediation steps."
    ],
    techStack: ["VAPT", "Network Security", "Ethical Hacking", "OWASP Top 10", "Linux"],
    architectureBreakdown: {
      threatOrProblem: "Web applications and exposed network ports frequently carry overlooked misconfigurations that permit privilege escalation.",
      defenseOrSolution: "Executed structured penetration testing drills following standard ethical hacking methodologies.",
      impactResult: "Built actionable remediation reports explaining root causes and specific patch directives."
    }
  }
];

export const SKILL_SECTORS: SkillCategory[] = [
  {
    id: "offensive-security",
    sectorName: "Cybersecurity & Vulnerability Assessment",
    sectorCode: "SEC",
    color: "#22c55e",
    skills: [
      { name: "Vulnerability Assessment & Penetration Testing (VAPT)", level: "Practical", tags: ["OWASP", "Recon", "Scanning"], description: "Hands-on identification and reporting of web and network security flaws." },
      { name: "Network Security & Incident Response", level: "Hands-on", tags: ["Monitoring", "Traffic Analysis", "Hardening"], description: "Traffic anomaly spotting, log reviews, and containment procedures." },
      { name: "Web Application Security", level: "Practical", tags: ["SQLi", "XSS", "Auth Flaws"], description: "Auditing application logic, input sanitization, and access controls." },
      { name: "Capture The Flag (CTF)", level: "Active", tags: ["Crypto", "Forensics", "Puzzles"], description: "Practical security problem-solving across forensics and web challenges." }
    ]
  },
  {
    id: "cloud-systems",
    sectorName: "Cloud Infrastructure & Systems",
    sectorCode: "CLOUD",
    color: "#00f0ff",
    skills: [
      { name: "Amazon Web Services (AWS)", level: "Proficient", tags: ["S3", "EC2", "IAM", "Cloud Security"], description: "Configuring S3 storage, least-privilege IAM policies, and cloud compute." },
      { name: "Microsoft Azure", level: "Foundational", tags: ["Azure VMs", "Cloud Fundamentals"], description: "Core compute, virtual networks, and cloud security fundamentals." },
      { name: "Distributed Task Offloading", level: "Project-Tested", tags: ["Flutter", "AWS S3", "Firebase"], description: "Architecting asynchronous compute handoff from mobile edge to cloud." },
      { name: "System Administration", level: "Experienced", tags: ["Windows", "Linux", "Troubleshooting"], description: "OS installation, service configuration, and enterprise workstation support." }
    ]
  },
  {
    id: "languages-systems",
    sectorName: "Programming & Web Technologies",
    sectorCode: "DEV",
    color: "#a855f7",
    skills: [
      { name: "Python", level: "Proficient", tags: ["Automation", "Scripting", "APIs"], description: "Writing scripts for automation, data processing, and security testing." },
      { name: "C++ & Java", level: "Academic", tags: ["OOP", "Data Structures"], description: "Object-oriented software development and algorithmic fundamentals." },
      { name: "Flutter & Dart", level: "Project-Tested", tags: ["Mobile UI", "Cloud Blend"], description: "Cross-platform mobile application development and API integration." },
      { name: "Angular & Web Tech", level: "Certified", tags: ["Angular", "REST APIs", "HTML/CSS"], description: "Building responsive frontends and connecting backend endpoints." }
    ]
  },
  {
    id: "networking-databases",
    sectorName: "Networking & Databases",
    sectorCode: "NET",
    color: "#eab308",
    skills: [
      { name: "TCP/IP & Networking Fundamentals", level: "Solid", tags: ["Routing", "Switching", "Subnets"], description: "Understanding packet routing, ports, protocols, and network boundaries." },
      { name: "MySQL & Relational Databases", level: "Certified", tags: ["MySQL", "RDBMS", "SQL Queries"], description: "Database design, schema normalization, and query optimization." },
      { name: "Firebase Realtime DB", level: "Project-Tested", tags: ["NoSQL", "Real-time Sync"], description: "Mobile data synchronization and cloud document storage." },
      { name: "Graphic Design & Visual Communication", level: "Active", tags: ["Mehfil Club", "Design"], description: "Designed promotional materials for Mehfil Club at D.Y. Patil University (2022–2024)." }
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "c3sa",
    title: "C3SA — Certified Cyber Security Analyst",
    issuer: "CyberWarfare Labs (CWL)",
    issuedDate: "October 31, 2026",
    credentialId: "C3SA-6ae662827bd2ad90654dc182",
    verificationBadge: "VERIFIED ANALYST",
    skillsValidated: ["Threat Hunting", "Log Analysis", "Vulnerability Remediation", "Security Auditing"],
    attachmentUrl: "/certificates/c3sa-analyst.pdf",
    attachmentImage: "/certificates/c3sa-analyst.png"
  },
  {
    id: "oracle-ocp",
    title: "Oracle Certified Professional — OCI Generative AI",
    issuer: "Oracle University",
    issuedDate: "October 30, 2025",
    credentialId: "103023358OCI25GAIOCP",
    verificationBadge: "ORACLE CERTIFIED",
    skillsValidated: ["Oracle Cloud Infrastructure", "Generative AI Systems", "Cloud Compute", "AI Orchestration"],
    attachmentUrl: "/certificates/oracle-ocp-genai.pdf",
    attachmentImage: "/certificates/oracle-ocp-genai.png"
  },
  {
    id: "web-tech-cert",
    title: "Advance Certificate in Web Technology (ACROWEBT)",
    issuer: "Independent Skill Development Mission (ISO 9001:2015)",
    issuedDate: "Nov 2023 – Feb 2024",
    credentialId: "Enrollment: EN12397 · Roll: 15703",
    grade: "Grade 'A' (84.00% Marks)",
    verificationBadge: "GOVT REGD · GRADE A",
    skillsValidated: ["Client-Server Architecture", "REST APIs", "Modern Web Standards", "Full-Stack Web"],
    attachmentUrl: "/certificates/web-technology.pdf",
    attachmentImage: "/certificates/web-technology.png",
    verificationUrl: "https://center.isdmgroup.in/results"
  },
  {
    id: "istudio-internship-cert",
    title: "Certificate of Internship — Ethical Hacking",
    issuer: "iStudio (ISO 9001:2015 Certified)",
    issuedDate: "June 25 – July 30, 2022",
    credentialId: "ISETHI89629",
    verificationBadge: "VERIFIED INTERNSHIP",
    skillsValidated: ["Vulnerability Assessment (VAPT)", "Network Reconnaissance", "OWASP Top 10", "Mitigation Reporting"],
    attachmentUrl: "/certificates/istudio-ethical-hacking.pdf",
    attachmentImage: "/certificates/istudio-ethical-hacking.png"
  },
  {
    id: "tmg-secure-start",
    title: "Securestart Cybersecurity Training",
    issuer: "TMG Security (ISO 27001 Certified)",
    issuedDate: "March 2026",
    credentialId: "Certificate: 287802",
    verificationBadge: "ISO 27001 VERIFIED",
    skillsValidated: ["Defensive Security", "SOC Workflows", "Incident Handling", "Security Controls"],
    attachmentUrl: "/certificates/tmg-securestart.pdf",
    attachmentImage: "/certificates/tmg-securestart.png"
  }
];

export const TRANSLATIONS = {
  en: {
    heroTitle: "Om Gautam · Cloud Systems & Cybersecurity",
    heroSubtitle: "MSc Cybersecurity Manager student at ECE Paris. Background in Cloud Computing and System Administration. Experienced in VAPT penetration testing, cloud task offloading architectures, and enterprise incident response.",
    exploreMissions: "Projects",
    launchTerminal: "Launch CLI",
    downloadCV: "Download CV",
    statusBadge: "Paris, FR · Seeking Cybersecurity / Cloud Internship",
    missionsTitle: "Projects & Engineering Work",
    missionsSubtitle: "Real-world cloud architectures, mobile compute offloading, and hands-on vulnerability assessments.",
    skillsTitle: "Technical Inventory",
    skillsSubtitle: "Practical capabilities across cybersecurity, cloud systems, programming, and networking.",
    certsTitle: "Certifications & Credentials",
    certsSubtitle: "Verified industry credentials in security analysis, databases, and web technology.",
    contactTitle: "Get in Touch",
    contactSubtitle: "Currently based in Paris. Reach out for internship opportunities or collaboration.",
    secModalTitle: "Technical Architecture",
  },
  fr: {
    heroTitle: "Om Gautam · Systèmes Cloud & Cybersécurité",
    heroSubtitle: "Étudiant en MSc Cybersecurity Manager à l'ECE Paris. Diplômé en Cloud Computing et Administration Système. Expérience en VAPT, architectures de délestage cloud et réponse à incident.",
    exploreMissions: "Projets",
    launchTerminal: "Lancer le CLI",
    downloadCV: "Télécharger le CV",
    statusBadge: "Paris, FR · Disponible pour un Stage en Cybersécurité / Cloud",
    missionsTitle: "Projets & Travaux Techniques",
    missionsSubtitle: "Architectures cloud concrètes, délestage de calcul mobile et évaluations de vulnérabilités.",
    skillsTitle: "Compétences Techniques",
    skillsSubtitle: "Pratique en cybersécurité, systèmes cloud, programmation et réseaux.",
    certsTitle: "Certifications Professionnelles",
    certsSubtitle: "Titres vérifiés en analyse de cybersécurité, bases de données et technologies web.",
    contactTitle: "Me Contacter",
    contactSubtitle: "Actuellement basé à Paris. N'hésitez pas à me contacter.",
    secModalTitle: "Conception Technique",
  },
  hi: {
    heroTitle: "ओम गौतम · क्लाउड सिस्टम एवं साइबर सुरक्षा",
    heroSubtitle: "ईसीई पेरिस में एमएससी साइबर सुरक्षा प्रबंधक के छात्र। क्लाउड कंप्यूटिंग, सिस्टम एडमिनिस्ट्रेशन और पेनिट्रेशन टेस्टिंग में अनुभव।",
    exploreMissions: "परियोजनाएं",
    launchTerminal: "कमांड लाइन",
    downloadCV: "सीवी डाउनलोड करें",
    statusBadge: "पेरिस, फ्रांस · इंटर्नशिप और करियर अवसरों के लिए उपलब्ध",
    missionsTitle: "प्रमुख परियोजनाएं",
    missionsSubtitle: "क्लाउड आर्किटेक्चर, मोबाइल कंप्यूट ऑफलोडिंग और व्यावहारिक सुरक्षा जांच।",
    skillsTitle: "तकनीकी कौशल",
    skillsSubtitle: "साइबर सुरक्षा, क्लाउड सिस्टम, प्रोग्रामिंग और नेटवर्किंग।",
    certsTitle: "प्रमाणपत्र और योग्यताएं",
    certsSubtitle: "साइबर सुरक्षा विश्लेषण, डेटाबेस और वेब तकनीक में प्रमाणित योग्यताएं।",
    contactTitle: "संपर्क करें",
    contactSubtitle: "पेरिस में स्थित। नए अवसरों के लिए संपर्क करें।",
    secModalTitle: "तकनीकी संरचना",
  }
};
