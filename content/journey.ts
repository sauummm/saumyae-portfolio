import type { JourneyMilestone } from '@/types';

/**
 * Dates and titles mirror content/education.ts / content/experience.ts
 * exactly — this is a compact narrative view of the same real chronology,
 * not a separate source of truth.
 */
export const journey: JourneyMilestone[] = [
  { date: 'Oct 2020', title: 'B.Tech in Computer Science begins' },
  { date: '2024', title: 'Computer Vision Internship', org: 'Sparsh Securitech' },
  { date: 'Feb 2025', title: 'PG Diploma, Advanced Computing', org: 'CDAC' },
  { date: 'Nov 2025', title: 'Software Engineer', org: 'EPAM Systems · Present' },
];
