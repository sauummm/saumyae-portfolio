import type { SkillGroup } from '@/types';

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['C#', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Python', 'HTML', 'CSS'],
  },
  {
    category: 'Frameworks',
    items: [
      'ASP.NET Core',
      '.NET',
      'Angular',
      'Entity Framework Core',
      'Spring Boot',
      'React',
      'Next.js',
      'Bootstrap',
    ],
  },
  {
    category: 'Cloud & Platforms',
    items: ['Microsoft Azure', 'Azure DevOps', 'SQL Server (SSMS)', 'Git', 'Postman', 'Visual Studio', 'IntelliJ IDEA'],
  },
  {
    category: 'Concepts',
    items: [
      'RESTful APIs',
      'Microservices',
      'JWT Authentication',
      'OOP',
      'SOLID Principles',
      'Clean Architecture',
      'Dependency Injection',
      'CI/CD',
      'Agile/Scrum',
    ],
  },
  {
    category: 'Other Tools',
    items: ['Power BI', 'Tableau', 'Jupyter Notebook', 'Maven'],
  },
];
