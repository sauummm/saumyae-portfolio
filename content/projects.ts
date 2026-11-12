import type { Project } from '@/types';

/**
 * Disclosure posture per project (see plan / types/index.ts for the
 * ContentStatus / ConfidentialLevel mechanics):
 *
 * - sai-residency-website → status: ready,      confidential: public       (live site; source repo is private)
 * - offline-rag-chatbot   → status: ready,       confidential: sanitized    (SCDM Accelerator — live platform linked)
 * - ecommerce-microservices → status: ready,     confidential: public       (links pending from user)
 * - realtime-object-detection → status: ready,   confidential: public       (links pending from user)
 *
 * "ready" here describes the case-study *text* only — none of these
 * projects carries image assets (thumbnail/gallery were removed; no photos
 * anywhere on the site, per instruction).
 */
export const projects: Project[] = [
  {
    slug: 'sai-residency-website',
    title: 'Sai Residency — Real-Estate Township Website',
    tagline:
      'A production marketing site for a Haryana plotted-township developer — designed into code and shipped live.',
    summary:
      'Built and launched the client’s website end to end: data-driven township pages, an enquiry funnel, and automated deploys — a fast static Next.js site with no server to maintain.',
    role: 'Solo developer — built the site from the client’s design PDFs through to production deployment.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Static Export', 'GitHub Actions'],
    status: 'ready',
    confidential: 'public',
    featured: true,
    timeframe: 'Oct 2026 · live',
    accentColor: 'amber',
    links: {
      demo: 'https://taleofkaran.com/',
    },
    overview:
      'Sai Residency is a developer of gated, RERA- and DDJAY-approved plotted townships across Karnal and Ambala in Haryana. I built and shipped their public website — homepage, about page, a page for every township, legal/approval pages, and an enquiry form — turning the client’s design PDFs into a responsive, production site.',
    problem:
      'The client had static design mockups and a growing portfolio of townships, each with its own status, location, amenities, and approvals. They needed a site that looked exactly like the approved design, made it easy to add or update a township without touching layout code, and captured buyer enquiries — without the cost and upkeep of running a backend.',
    approach:
      'I chose a Next.js static export with Tailwind CSS, so the whole site ships as plain HTML/CSS/JS to shared hosting. Every township lives in its own typed TypeScript data file, and a single shared component tree renders all of them — adding a new project is a data change, not a code change. The enquiry form posts to a third-party form endpoint, so leads arrive without any server of my own. GitHub Actions builds and uploads the site to the client’s host on every push, with a separate workflow that publishes a redesign branch to a /v2 preview path for client review.',
    architectureSteps: [
      'Design PDFs translated into a reusable, responsive component library (Next.js + Tailwind CSS).',
      'Per-township typed data files rendered through one shared page template.',
      'Enquiry form (project, budget, timeline, consent) posting to a hosted form endpoint — no backend.',
      'Static export deployed to the client’s hosting via GitHub Actions, with a /v2 preview channel for redesign reviews.',
    ],
    results:
      'Live in production at taleofkaran.com, presenting every current and upcoming Sai Residency township with a working enquiry funnel and WhatsApp contact — and a content model the client can extend one data file at a time.',
  },
  {
    slug: 'offline-rag-chatbot',
    title: 'SCDM Accelerator — AI Chatbot & Backend',
    tagline:
      'A fully offline, retrieval-augmented chatbot and the backend behind it — from vector store to generation.',
    summary:
      'Built the chatbot and the backend for the SCDM Accelerator platform: recursive document ingestion, pgvector similarity search, and local LLM generation, with zero third-party API calls.',
    role: 'Built the RAG chatbot end to end (ingestion, embeddings, vector search, local generation) and the platform backend; collaborated with the team on the frontend.',
    stack: ['Python', 'PostgreSQL', 'pgvector', 'RAG', 'Embeddings', 'Local/Offline LLM Inference'],
    status: 'ready',
    confidential: 'sanitized',
    featured: true,
    timeframe: '2026 · Hackathon 2026',
    accentColor: 'emerald',
    links: {
      demo: 'https://scdm-accelerator.org',
    },
    disclosureNote:
      'Built for a clinical-data-management hackathon in 2026. Architecture, role, and tech choices are freely discussable — but sponsor-provided documents and data are confidential and will never appear in a screenshot, recording, or shared code. Any demo assets shown here use synthetic/sanitized documents only.',
    overview:
      'SCDM Accelerator is a team platform built for a clinical-data-management hackathon in 2026. Within a small team, I designed and built the platform’s chatbot — a retrieval-augmented assistant that lets users query a large corpus of clinical-data-management documents entirely offline, with no data ever leaving the local environment — along with the backend that powers it. I also worked with teammates on the frontend.',
    problem:
      'Clinical data management teams work with sensitive, often sponsor-owned documents that can’t be sent to a third-party AI API for search or summarization — yet teams still need fast, conversational access to what’s buried in those documents. The hackathon platform needed a chatbot that could answer questions grounded in a large, evolving document set without any external network calls, so sponsor data would never leave the environment it was ingested in.',
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
    accentColor: 'blue',
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
    accentColor: 'rose',
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
  },
];
