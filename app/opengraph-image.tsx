import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

// Standard 1.91:1 OG card — same design language as app/projects/[slug]/opengraph-image.tsx.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — ${site.role}`;

// Deliberately plain: no external font fetch, no network, so it can never
// fail the build. Colors are literal hex from the dark design-token palette
// (globals.css) since Satori resolves neither CSS variables nor Tailwind.
export default function OpengraphImage() {
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
          {site.role.toUpperCase()}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#edeef1',
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#9a9fa8',
              maxWidth: 860,
            }}
          >
            {site.tagline}
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
          <div style={{ display: 'flex', marginLeft: 16, fontSize: 28, color: '#5b6270' }}>
            {site.location}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
