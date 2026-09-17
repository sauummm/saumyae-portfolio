import type { ExperienceEntry } from '@/types';

/**
 * Convention: when `startDate === endDate` (e.g. the 2024 internship, which
 * the résumé lists as a single year rather than a range), the Timeline
 * component should render just that one value instead of "2024 – 2024".
 */
export const experience: ExperienceEntry[] = [
  {
    role: 'Software Engineer',
    company: 'EPAM Systems',
    location: 'Hyderabad, India',
    startDate: 'Nov 2025',
    endDate: 'Present',
    stack: ['ASP.NET Core', 'C#', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework Core', 'Azure', 'Azure DevOps'],
    bullets: [
      'Engineered the Campus Internal Tool (EPM-ICMP-CIT), an enterprise-grade internal platform that streamlines campus recruitment workflows and resource tracking across EPAM, built end-to-end on the Microsoft stack.',
      'Built and maintained scalable RESTful APIs using ASP.NET Core and C#, applying OOP, SOLID principles, and Clean Architecture patterns for maintainable enterprise code.',
      'Developed modular, reusable UI components with Angular and TypeScript, improving frontend performance, code reusability, and cross-team consistency.',
      'Designed and managed relational data models using SQL Server (SSMS) and Entity Framework Core, including schema design, EF migrations, and query optimization for improved database performance.',
      'Leveraged Microsoft Azure services for cloud hosting and integrated Azure DevOps pipelines for streamlined CI/CD workflows.',
      'Followed Agile/Scrum practices — active in sprint planning, daily standups, and code reviews — ensuring delivery of high-quality, production-ready features.',
    ],
  },
  {
    role: 'Computer Vision Intern',
    company: 'Sparsh Securitech',
    location: 'Noida, India',
    startDate: '2024',
    endDate: '2024',
    stack: ['Python', 'OpenCV', 'Machine Learning'],
    bullets: [
      'Built a proof-of-concept (POC) computer vision system for Indian Railways to detect missing safety measures at level crossings, triggering automated alerts in real time.',
      'Improved ML model accuracy by 18% and reduced inference latency by 40% through data augmentation, model fine-tuning, and optimization techniques.',
      'Applied OpenCV for image processing and manipulation pipelines in Python, gaining hands-on production experience in real-time CV applications.',
    ],
  },
];
