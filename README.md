# Saumyae Joshi — Portfolio

Personal portfolio site. Next.js App Router + TypeScript + Tailwind CSS v4, deployed on Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** — CSS-first tokens in `app/globals.css` (no `tailwind.config.js`); class-based dark mode via `next-themes`
- **react-hook-form** + **Zod** for the contact form's client UX and server-side validation
- **Resend** for contact-form email delivery via a Server Action (`lib/actions.ts`) — no separate backend
- **lucide-react** for icons; `@vercel/analytics` + `@vercel/speed-insights` wired into the root layout

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Resend values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run build` runs a full type-check + lint + static-page generation pass — the fastest signal something is broken.

## Environment variables

See `.env.example`. All three are required for the contact form to actually send mail (it fails gracefully with a generic error message if any are missing, and logs the specifics server-side):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Inbox that receives contact-form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender address (Resend's shared `onboarding@resend.dev` works with zero setup) |

## Content model

Site content lives in typed data files under `content/*.ts`, validated against the interfaces in `types/index.ts` — not MDX. The data is structured and uniform enough (projects, experience, skills, education) that plain objects are simpler than a content-rendering pipeline; revisit this if case-study prose grows substantially.

Two union types encode disclosure rules **in the type system**, so they show up in the UI rather than depending on a comment or memory:

- `ContentStatus` (`'ready' | 'placeholder'`) — drives honest empty states. Missing `Asset.src` always renders a labeled placeholder, never a broken `<img>` or a silently blank gap. Missing `links.github`/`links.demo` renders as absent, never a dead `href="#"`.
- `ConfidentialLevel` (`'public' | 'sanitized' | 'confidential'`) — a project's `disclosureNote` renders as a visible banner on its case-study page whenever this isn't `'public'`. For the offline RAG chatbot (`sanitized`), that banner states plainly that sponsor-provided data/documents are never shown — architecture, role, and tech choices are freely discussable, the underlying documents are not. For the EPAM campus tool (`confidential`), it stays generic (role/stack/architecture only) with no real screenshots, ever.

Changing either constraint means editing `content/projects.ts`, not hunting through component code.

## Deferred-asset tracker

Nothing below is a bug — each is a real gap the UI already handles honestly (placeholder badge, disabled affordance with a tooltip, or an absent link) until the asset exists. Tracked here so nothing ships as silently "finished" when it isn't:

- [ ] **Résumé PDF** — only a `.docx` exists today. `site.resume` stays `status: 'placeholder'` until a PDF is in hand; the Hero's résumé button is disabled with a tooltip until then.
- [ ] **Headshot photo** — `components/sections/About.tsx` renders an honest placeholder; decision on whether to use one at all is still open.
- [ ] **E-Commerce Microservices** — needs a real GitHub link (and demo link, if one exists).
- [ ] **Real-Time Object Detection (YOLOv8)** — needs a real GitHub link (and a demo GIF/clip, if one exists).
- [ ] **Offline RAG Chatbot demo assets** — needs sanitized/synthetic screenshots or a recording. **Sponsor-provided data/documents are permanently excluded — do not source demo assets from the actual SCDM Hackathon submission.**
- [ ] **Custom domain** — currently ships to `*.vercel.app`. `site.url` in `content/site.ts` must be updated the moment a real URL is final (it feeds `metadataBase`, OG tags, and canonical links — wrong until it matches reality).

## Deploy

Builds and deploys on Vercel. `app/robots.ts` / `app/sitemap.ts` / `app/icon.tsx` / `app/opengraph-image.tsx` all read from `content/site.ts`'s `url` field — see the custom-domain item above.
