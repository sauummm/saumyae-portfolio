import type { SiteConfig } from '@/types';

/**
 * NOTE on `phone`: kept here (it's on the résumé) but intentionally not
 * rendered anywhere public on the site — a personal cell number on a public
 * page is a spam/scam magnet. Email + the contact form are the public
 * channels. Surface `phone` only if a future private context needs it
 * (e.g. printed on the résumé PDF itself).
 *
 * NOTE on `url`: the live Vercel production URL — swap this for a custom
 * domain later if one gets added; used for `metadataBase` in app/layout.tsx,
 * so OG images and canonical links stay correct as long as this matches.
 */
export const site: SiteConfig = {
  name: 'Saumyae Joshi',
  role: 'Full-Stack Software Engineer',
  tagline:
    'Full-stack engineer building scalable systems end to end — enterprise .NET APIs, Angular/React frontends, and GenAI systems (RAG pipelines, embeddings, vector search, local LLM integration) when the problem calls for it.',
  location: 'Hyderabad, India',
  email: 'saumyae12@icloud.com',
  phone: '+91-9599588492',
  url: 'https://saumyae-portfolio.vercel.app',
  social: [
    { label: 'GitHub', href: 'https://github.com/sauummm', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/saumyae-joshi-774914268',
      icon: 'linkedin',
    },
    { label: 'Email', href: 'mailto:saumyae12@icloud.com', icon: 'mail' },
  ],
  resume: {
    alt: 'Saumyae Joshi — Résumé (PDF)',
    status: 'placeholder',
    note: 'PDF version coming soon',
  },
};
