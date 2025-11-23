import classroomReserve from "../assets/classroom-reserve.png";
import scraperChatbot from "../assets/scraper-chatbot.png";
import qrAttendance from "../assets/qr-attendance.svg";

// Project data structure
export const PROJECT_DATA = [
  {
    id: 'classroom-reserve',
    image: classroomReserve,
    link: 'https://github.com/Mrcod3xx/classroom-reserve',
    github: 'Mrcod3xx/classroom-reserve',
    titleKey: 'classroomTitle',
    descKey: 'classroomDesc'
  },
  {
    id: 'web-scraper-chatbot',
    image: scraperChatbot,
    link: 'https://github.com/Mrcod3xx/web-scaper-and-ai-chatbot',
    github: 'Mrcod3xx/web-scaper-and-ai-chatbot',
    titleKey: 'scraperTitle',
    descKey: 'scraperDesc'
  },
  {
    id: 'qr-attendance',
    image: qrAttendance,
    link: 'https://github.com/Mrcod3xx/qr-attendance-system',
    github: 'Mrcod3xx/qr-attendance-system',
    titleKey: 'qrTitle',
    descKey: 'qrDesc'
  }
];

// Education timeline data
export const EDUCATION_DATA = [
  { year: '2024 - Present', index: 0 },
  { year: '2022 - 2024', index: 1 },
  { year: '2018 - 2022', index: 2 },
  { year: '2012 - 2018', index: 3 }
];

// Social media links
export const SOCIAL_LINKS = [
  { 
    id: 'github',
    url: 'https://github.com/Goriee',
    icon: 'bxl-github',
    label: 'GitHub'
  },
  {
    id: 'facebook',
    url: 'https://www.facebook.com/Gorieeeeeee',
    icon: 'bxl-facebook-circle',
    label: 'Facebook'
  },
  {
    id: 'twitter',
    url: 'https://x.com/G0RIEEE',
    icon: 'bxl-twitter',
    label: 'Twitter/X'
  }
];

// Navigation items
export const NAV_ITEMS = [
  { id: 'hero', labelKey: 'home' },
  { id: 'about', labelKey: 'about' },
  { id: 'projects', labelKey: 'projects' },
  { id: 'contact', labelKey: 'contact' },
  { id: 'education', labelKey: 'education' }
];
