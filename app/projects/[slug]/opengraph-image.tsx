import { ImageResponse } from 'next/og';
import { projects } from '@/content/projects';
import { site } from '@/content/site';

// Standard 1.91:1 OG card.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — project case study`;

// Mirrors page.tsx's generateStaticParams — without its own copy, this route
// isn't covered by the page's static params and falls back to on-demand
// rendering per request instead of being prerendered at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// params is a Promise in Next 16 — await it, same lookup as the page.
// Deliberately plain: no external font fetch, no network, so it can never fail
// the build. Colors are literal hex from the dark design-token palette
// (globals.css) since Satori resolves neither CSS variables nor Tailwind.
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const title = project?.title ?? site.name;
  const tagline = project?.tagline ?? site.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0c',
          padding: '80px',
          color: '#edeef1',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 4,
            color: '#818cf8',
          }}
        >
          CASE STUDY
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#edeef1',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#9a9fa8',
            }}
          >
            {tagline}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              width: 48,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#6366f1',
            }}
          />
          <div
            style={{
              display: 'flex',
              marginLeft: 16,
              fontSize: 30,
              fontWeight: 600,
              color: '#edeef1',
            }}
          >
            {site.name}
          </div>
          <div style={{ display: 'flex', marginLeft: 14, fontSize: 28, color: '#5b6270' }}>
            {site.role}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
