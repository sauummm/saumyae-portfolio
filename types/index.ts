/**
 * Content model for the portfolio.
 *
 * `ContentStatus` and `ConfidentialLevel` exist so that disclosure rules for
 * a given project are enforced by the type system and rendered in the UI,
 * rather than relying on a comment or a human remembering not to post a
 * screenshot. See content/projects.ts for how each of the four projects is
 * classified.
 */

/** Whether a piece of content (usually a project case study) is finished. */
export type ContentStatus = 'ready' | 'placeholder';

/**
 * How much of a project's real substance (screenshots, demos, code) is safe
 * to publish.
 * - `public` — anything goes (own project, no third-party restriction).
 * - `sanitized` — architecture/role/tech are freely discussable, but actual
 *   client/sponsor data or documents must never appear. Demo assets must be
 *   synthetic/dummy data, called out visibly in the UI.
 * - `confidential` — employer-owned internal tool; keep it generic
 *   (role, stack, architecture only), no real screenshots ever.
 */
export type ConfidentialLevel = 'public' | 'sanitized' | 'confidential';

/**
 * An image (or other visual asset) that may not exist yet. When `src` is
 * omitted, components must render a labeled placeholder — never a broken
 * <img> and never a silently blank gap.
 */
export interface Asset {
  src?: string;
  alt: string;
  status: ContentStatus;
  /** Shown alongside the placeholder, or as a caption once ready. */
  note?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  role: string;
  stack: string[];
  status: ContentStatus;
  confidential: ConfidentialLevel;
  /** Surfaced first / highlighted on the home grid. */
  featured: boolean;
  timeframe: string;
  links?: ProjectLinks;
  thumbnail: Asset;
  /** Visible only when confidential !== 'public'; states the restriction plainly. */
  disclosureNote?: string;
  overview: string;
  problem: string;
  approach: string;
  architectureSteps: string[];
  results: string;
  gallery: Asset[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  stack?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  gpa?: string;
  startDate: string;
  endDate: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  description?: string;
  issuer?: string;
  url?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** lucide-react icon name, resolved by the component that renders it. */
  icon: 'github' | 'linkedin' | 'mail' | 'phone' | 'map-pin' | 'file-text';
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  url: string;
  social: SocialLink[];
  /** Resume PDF — status lets the UI hide/disable the download link honestly until one exists. */
  resume: Asset;
}
