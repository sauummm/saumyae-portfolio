import type { Project } from '@/types';

/**
 * Disclosure posture per project (see plan / types/index.ts for the
 * ContentStatus / ConfidentialLevel mechanics):
 *
 * - offline-rag-chatbot   → status: ready,       confidential: sanitized
 * - campus-internal-tool  → status: placeholder, confidential: confidential  (generic only, forever)
 * - ecommerce-microservices → status: ready,     confidential: public       (links pending from user)
 * - realtime-object-detection → status: ready,   confidential: public       (links pending from user)
 *
 * "ready" here describes the case-study *text* — gallery Assets are their
 * own placeholders independent of it, and for campus-internal-tool no
 * gallery will ever be populated (see its disclosureNote).
 */
export const projects: Project[] = [
  {
    slug: 'offline-rag-chatbot',
    title: 'Offline RAG Chatbot — SCDM Accelerator',
    tagline:
      'A fully offline, retrieval-augmented chatbot — solo-built, from vector store to generation.',
    summary:
      'Solo-built the offline chatbot inside a team hackathon project: recursive document ingestion, pgvector similarity search, and local LLM generation, with zero third-party API calls.',
    role: 'Solo-built the offline RAG chatbot end to end (ingestion, embeddings, vector search, local generation); contributed as part of the team on the shared frontend and backend.',
    stack: ['Python', 'PostgreSQL', 'pgvector', 'RAG', 'Embeddings', 'Local/Offline LLM Inference'],
    status: 'ready',
    confidential: 'sanitized',
    featured: true,
    timeframe: '2026 · in progress (SCDM Hackathon 2026)',
    thumbnail: {
      alt: 'Offline RAG Chatbot interface (sanitized demo pending)',
      status: 'placeholder',
      note: 'Screenshot pending — will use sanitized/dummy documents, never sponsor data.',
    },
    disclosureNote:
      'Built for the SCDM Hackathon 2026, hosted by the Society for Clinical Data Management (SCDM). Architecture, role, and tech choices are freely discussable — but sponsor-provided documents and data are confidential and will never appear in a screenshot, recording, or shared code. Any demo assets shown here use synthetic/sanitized documents only.',
    overview:
      'The SCDM Accelerator is a team project built for the SCDM Hackathon 2026, hosted by the Society for Clinical Data Management — a nonprofit focused on clinical data management and data science. Within a small team, I was solely responsible for designing and building the accelerator’s offline chatbot: a retrieval-augmented assistant that lets users query a large corpus of clinical-data-management documents entirely offline, with no data ever leaving the local environment. I also contributed to the shared frontend and backend alongside teammates.',
    problem:
      'Clinical data management teams work with sensitive, often sponsor-owned documents that can’t be sent to a third-party AI API for search or summarization — yet teams still need fast, conversational access to what’s buried in those documents. The accelerator needed a chatbot that could answer questions grounded in a large, evolving document set without any external network calls, so sponsor data would never leave the environment it was ingested in.',
    approach:
      'I designed and built an offline RAG (Retrieval-Augmented Generation) pipeline end to end: documents are recursively read from a source directory, split into chunks, and embedded, with the resulting vectors stored in PostgreSQL via the pgvector extension. At query time, the user’s question is embedded with the same model, a similarity search retrieves the most relevant chunks from pgvector, and those chunks are passed as grounding context to a locally-hosted LLM for generation — no OpenAI/Anthropic/etc. API call at any point in the pipeline. That kept every sponsor document fully offline by construction, not by policy.',
    architectureSteps: [
      'Recursive document ingestion — walks a source directory tree and reads every supported document.',
      'Chunking — splits ingested text into overlapping, retrieval-sized passages.',
      'Embedding — encodes each chunk into a vector representation.',
      'Vector storage & similarity search — stores embeddings in PostgreSQL via the pgvector extension; retrieves the top-matching chunks by similarity at query time.',
      'Local/offline generation — feeds retrieved chunks as context to a locally-hosted LLM, with no third-party API calls at any stage.',
    ],
    results:
      'Full outcomes are still being finalized as the hackathon’s judging is ongoing. The core value proposition is already proven, though: a fully offline architecture means the chatbot can run entirely inside a sponsor’s own environment with zero data egress — non-negotiable for a clinical-data-management audience.',
    gallery: [
      {
        alt: 'RAG pipeline architecture diagram',
        status: 'placeholder',
        note: 'Diagram to be added.',
      },
      {
        alt: 'Chatbot conversation view (sanitized demo)',
        status: 'placeholder',
        note: 'Pending sanitized/dummy demo documents — sponsor data will never be shown here.',
      },
    ],
  },
  {
    slug: 'ecommerce-microservices',
    title: 'E-Commerce Platform with Microservices',
    tagline: 'A microservice-ready e-commerce backend and storefront.',
    summary:
      'RESTful Spring Boot backend with an optimized MySQL schema and a React storefront, structured so services can scale or split independently.',
    role: 'Solo developer.',
    stack: ['Spring Boot', 'React', 'MySQL', 'REST API'],
    status: 'ready',
    confidential: 'public',
    featured: true,
    timeframe: 'Apr 2025 – Present',
    thumbnail: {
      alt: 'E-Commerce Platform screenshot',
      status: 'placeholder',
      note: 'Screenshot coming soon.',
    },
    overview:
      'A microservice-ready e-commerce platform built end to end — a RESTful Spring Boot backend, a responsive React storefront, and a MySQL data layer — structured so individual services can scale or be extracted independently as the system grows.',
    problem:
      'Most personal e-commerce projects hard-code a single monolithic backend that can’t demonstrate how a real storefront scales. The goal was something with an actual service-boundary story, not just a CRUD app with a shopping cart.',
    approach:
      'I implemented the backend as RESTful Spring Boot APIs, with the MySQL schema specifically reworked — indexes and query patterns — to cut response times by roughly 30%. The React frontend covers registration, login, and the core product browsing/purchase flows. The API layer is structured in independently deployable modules so it can decompose into separate microservices without a rewrite.',
    architectureSteps: [
      'Spring Boot REST API layer, structured for microservice decomposition',
      'MySQL data layer with optimized schema and indexing',
      'React frontend — auth, product catalog, and cart flows',
    ],
    results:
      'Achieved roughly 30% faster query response times through schema and indexing optimization, with complete registration-to-purchase user flows on the frontend.',
    gallery: [
      {
        alt: 'E-Commerce Platform — product catalog',
        status: 'placeholder',
        note: 'Screenshot coming soon.',
      },
      {
        alt: 'E-Commerce Platform — checkout flow',
        status: 'placeholder',
        note: 'Screenshot coming soon.',
      },
    ],
  },
  {
    slug: 'campus-internal-tool',
    title: 'Campus Internal Tool (EPM-ICMP-CIT)',
    tagline: 'An internal EPAM platform for campus recruitment workflows and resource tracking.',
    summary:
      'An enterprise ASP.NET Core + Angular platform built at EPAM to streamline campus recruitment and resource tracking across teams.',
    role: 'Backend and frontend engineer on the EPAM team building this internal tool.',
    stack: ['ASP.NET Core', 'C#', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework Core', 'Azure'],
    status: 'placeholder',
    confidential: 'confidential',
    featured: false,
    timeframe: 'Nov 2025 – Present',
    thumbnail: {
      alt: 'Campus Internal Tool',
      status: 'placeholder',
      note: 'Not published — internal EPAM tool.',
    },
    disclosureNote:
      'This is an internal EPAM Systems tool. Only the generic role, architecture, and technology stack are shared here — no screenshots, internal workflows, or proprietary details, now or later.',
    overview:
      'An enterprise-grade internal platform built at EPAM Systems to automate campus recruitment tracking and resource management, serving multiple internal teams.',
    problem:
      'EPAM’s campus recruitment process spanned multiple manual, disconnected steps across teams, with no single internal system to track candidates and resources consistently.',
    approach:
      'Working within EPAM’s internal team, I helped build a layered ASP.NET Core backend exposing RESTful APIs, consumed by an Angular/TypeScript frontend, with EF Core and SQL Server handling the relational data model and Azure/Azure DevOps covering hosting and CI/CD.',
    architectureSteps: [
      'ASP.NET Core backend, layered/Clean Architecture',
      'RESTful API layer',
      'Angular + TypeScript frontend',
      'SQL Server + EF Core data layer',
      'Hosted on Microsoft Azure with Azure DevOps CI/CD',
    ],
    results: 'In active use internally across multiple EPAM teams for campus recruitment tracking and resource management.',
    gallery: [
      {
        alt: 'Campus Internal Tool screenshots',
        status: 'placeholder',
        note: 'Not published, and won’t be — this is a confidential internal EPAM tool.',
      },
    ],
  },
  {
    slug: 'realtime-object-detection',
    title: 'Real-Time Human & Object Detection System',
    tagline: 'A real-time detection pipeline built on YOLOv8, tuned for accuracy and speed together.',
    summary:
      'A YOLOv8 + OpenCV detection pipeline reaching 92% mAP at 30 FPS, improved 10% further through fine-tuning.',
    role: 'Solo developer.',
    stack: ['YOLOv8', 'OpenCV', 'Python', 'Machine Learning'],
    status: 'ready',
    confidential: 'public',
    featured: false,
    timeframe: 'Jan 2025 – Present',
    thumbnail: {
      alt: 'Real-Time Detection System demo',
      status: 'placeholder',
      note: 'Demo GIF coming soon.',
    },
    overview:
      'A real-time detection pipeline built on YOLOv8 and OpenCV, tuned to balance accuracy and throughput for live video streams.',
    problem:
      'Off-the-shelf object detection demos often report accuracy without addressing real-time constraints — a model that’s accurate at 2 FPS isn’t usable for a live system. The goal was a pipeline that held up on both axes at once.',
    approach:
      'I built the detection pipeline around YOLOv8, with OpenCV handling video I/O and preprocessing, then iterated on model fine-tuning and preprocessing specifically to push accuracy up without sacrificing frame rate.',
    architectureSteps: [
      'Video capture & preprocessing via OpenCV',
      'YOLOv8 inference pipeline',
      'Model fine-tuning for accuracy',
      'Throughput optimization for real-time playback',
    ],
    results:
      'Reached 92% mAP accuracy at 30 FPS throughput, with a further 10% accuracy gain from fine-tuning and preprocessing improvements over the initial baseline.',
    gallery: [
      {
        alt: 'Detection pipeline — sample output',
        status: 'placeholder',
        note: 'Demo GIF coming soon.',
      },
    ],
  },
];
