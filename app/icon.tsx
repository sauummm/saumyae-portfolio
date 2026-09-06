import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Plain initials mark, no external font/network call — matches the
// no-network constraint used in the project opengraph-image.tsx files.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#4f46e5',
          color: '#fff',
          fontSize: 20,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        SJ
      </div>
    ),
    { ...size }
  );
}
