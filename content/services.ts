import type { Service } from '@/types';

/**
 * Client-facing framing of the same real work in content/skills.ts and
 * content/projects.ts — grouped by what gets delivered, not by tech list.
 */
export const services: Service[] = [
  {
    title: 'Full-Stack Web Applications',
    description:
      'End-to-end delivery from data model to UI — ASP.NET Core or Spring Boot APIs, an Angular or React frontend, and a properly indexed SQL data layer underneath, shipped as one coherent product rather than handed off in pieces.',
    icon: 'layers',
    tags: ['ASP.NET Core', 'Angular', 'React', 'SQL Server'],
    accentColor: 'blue',
  },
  {
    title: 'Applied AI & GenAI Systems',
    description:
      'RAG pipelines, embeddings, and vector search — including fully offline/local LLM integration for teams that can’t send data to a third-party API.',
    icon: 'brain-circuit',
    tags: ['RAG', 'Embeddings', 'pgvector', 'Local LLM Inference'],
    accentColor: 'emerald',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Azure-hosted delivery with CI/CD pipelines, Clean Architecture, and SOLID principles built in from the first commit — not bolted on afterward.',
    icon: 'cloud',
    tags: ['Microsoft Azure', 'Azure DevOps', 'CI/CD', 'Clean Architecture'],
    accentColor: 'amber',
  },
  {
    title: 'Computer Vision & ML',
    description:
      'Real-time detection pipelines tuned for accuracy and throughput together — a model that’s only accurate at 2 FPS doesn’t ship.',
    icon: 'camera',
    tags: ['YOLOv8', 'OpenCV', 'Machine Learning'],
    accentColor: 'rose',
  },
];
