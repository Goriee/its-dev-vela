import classroomReserve from "../assets/classroom-reserve.png";
import scraperChatbot from "../assets/scraper-chatbot.png";
import qrAttendance from "../assets/qr-attendance.svg";

// Core Technology Stack for Hero and Showcase
export const TECH_STACK = [
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "JavaScript / ES6+", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "MySQL", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "React", category: "frontend" },
  { name: "Web3 & Blockchain", category: "emerging" },
  { name: "REST APIs", category: "architecture" },
  { name: "Git & GitHub", category: "tools" }
];

// Project data structure with enriched metadata
export const PROJECT_DATA = [
  {
    id: "classroom-reserve",
    image: classroomReserve,
    link: "https://github.com/Mrcod3xx/classroom-reserve",
    github: "Mrcod3xx/classroom-reserve",
    category: "fullstack",
    tags: ["Node.js", "Express", "MySQL", "Authentication", "Full Stack"],
    titleKey: "classroomTitle",
    descKey: "classroomDesc",
    highlights: [
      "Role-based authentication & reservation conflict detection algorithms",
      "Dynamic scheduling dashboard with real-time room availability",
      "RESTful API design adhering to clean architectural patterns"
    ]
  },
  {
    id: "web-scraper-chatbot",
    image: scraperChatbot,
    link: "https://github.com/Mrcod3xx/web-scaper-and-ai-chatbot",
    github: "Mrcod3xx/web-scaper-and-ai-chatbot",
    category: "ai",
    tags: ["Python", "Web Scraping", "AI / LLM", "Automation", "REST API"],
    titleKey: "scraperTitle",
    descKey: "scraperDesc",
    highlights: [
      "Automated web scraper pipeline for structured data extraction",
      "AI-driven conversational agent integrating LLM APIs for interactive query responses",
      "Optimized query caching to reduce downstream latency and API token usage"
    ]
  },
  {
    id: "qr-attendance",
    image: qrAttendance,
    link: "https://github.com/Mrcod3xx/qr-attendance-system",
    github: "Mrcod3xx/qr-attendance-system",
    category: "backend",
    tags: ["Node.js", "Express", "MySQL", "QR Scanner", "Event-Driven"],
    titleKey: "qrTitle",
    descKey: "qrDesc",
    highlights: [
      "Contactless real-time QR code generation and instant validation",
      "High-concurrency MySQL transaction handling for simultaneous student check-ins",
      "Exportable attendance analytics and reporting dashboard for administrators"
    ]
  }
];

// Categories for Project Filtering
export const PROJECT_CATEGORIES = [
  { id: "all", labelKey: "allProjects" },
  { id: "backend", labelKey: "filterBackend" },
  { id: "fullstack", labelKey: "filterFullStack" },
  { id: "ai", labelKey: "filterAI" }
];

// Education timeline data
export const EDUCATION_DATA = [
  {
    year: "2024 - Present",
    index: 0,
    status: "In Progress",
    badge: "Undergraduate"
  },
  {
    year: "2022 - 2024",
    index: 1,
    status: "Completed",
    badge: "Technical-Vocational"
  },
  {
    year: "2018 - 2022",
    index: 2,
    status: "Completed",
    badge: "High School"
  },
  {
    year: "2012 - 2018",
    index: 3,
    status: "Completed",
    badge: "Primary"
  }
];

// Social media links with SVG icon paths
export const SOCIAL_LINKS = [
  { 
    id: "github",
    url: "https://github.com/Goriee",
    icon: "bxl-github",
    label: "GitHub",
    handle: "@Goriee"
  },
  { 
    id: "twitter",
    url: "https://x.com/TheGoriee",
    icon: "bxl-twitter",
    label: "X (Twitter)",
    handle: "@TheGoriee"
  },
  { 
    id: "facebook",
    url: "https://www.facebook.com/profile.php?id=61593956971047",
    icon: "bxl-facebook-circle",
    label: "Facebook",
    handle: "Dev Vela"
  }
];

// Contact information
export const CONTACT_INFO = {
  email: "jerome.devela.100@gmail.com",
  location: "Philippines",
  availability: "Open for Collaborations & Roles",
  timezone: "GMT+8"
};

// Resume / Curriculum Vitae URL
export const RESUME_URL = "https://github.com/Goriee";

// Navigation items
export const NAV_ITEMS = [
  { id: "hero", labelKey: "home" },
  { id: "about", labelKey: "about" },
  { id: "projects", labelKey: "projects" },
  { id: "education", labelKey: "education" },
  { id: "contact", labelKey: "contact" }
];
