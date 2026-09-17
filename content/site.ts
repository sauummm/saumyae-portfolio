import type { SiteConfig } from '@/types';

/**
 * NOTE on `phone`: surfaced publicly by request, for WhatsApp/call contact —
 * the `wa.me` and `tel:` hrefs below are derived from this one string rather
 * than duplicated as raw digits, so it only needs updating in one place.
 *
 * NOTE on `url`: the live Vercel production URL — swap this for a custom
 * domain later if one gets added; used for `metadataBase` in app/layout.tsx,
 * so OG images and canonical links stay correct as long as this matches.
 */
const phone = '+91-9599588492';

export const site: SiteConfig = {
  name: 'Saumyae Joshi',
  role: 'Full-Stack Software Engineer',
  tagline:
    'I build production software end to end — enterprise .NET APIs, Angular/React frontends, and the GenAI systems (RAG pipelines, embeddings, vector search, local LLM integration) in between when the problem calls for it.',
  location: 'Hyderabad, India',
  email: 'saumyae12@icloud.com',
  phone,
  url: 'https://saumyae-portfolio.vercel.app',
  social: [
    { label: 'GitHub', href: 'https://github.com/sauummm', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/saumyae-joshi-774914268',
      icon: 'linkedin',
    },
    { label: 'Email', href: 'mailto:saumyae12@icloud.com', icon: 'mail' },
    { label: 'WhatsApp', href: `https://wa.me/${phone.replace(/\D/g, '')}`, icon: 'whatsapp' },
    { label: 'Call', href: `tel:${phone}`, icon: 'phone' },
  ],
  resume: {
    alt: 'Saumyae Joshi — Résumé (PDF)',
    status: 'placeholder',
    note: 'PDF version coming soon',
  },
};
