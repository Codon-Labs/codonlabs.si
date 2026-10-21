import { ImageResponse } from 'next/og';

export const alt = 'Codon Labs — Pharma, translated.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The preview card shown when the site is shared on LinkedIn, WhatsApp, Slack etc.
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
          padding: 72,
          background: 'radial-gradient(70% 90% at 85% 25%, #1B3A8F 0%, #081A33 70%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 40, fontWeight: 600, letterSpacing: -1.5 }}>
          <svg width="56" height="56" viewBox="0 0 120 120">
            <path d="M36 30L36 90L88 60Z" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
            <circle cx="36" cy="30" r="12.5" fill="#fff" />
            <circle cx="36" cy="90" r="12.5" fill="#fff" />
            <circle cx="88" cy="60" r="12.5" fill="#2F5BFF" />
          </svg>
          codon labs
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 120, fontWeight: 500, letterSpacing: -6, lineHeight: 1 }}>Pharma,</div>
          <div style={{ fontSize: 120, fontWeight: 500, letterSpacing: -6, lineHeight: 1, color: '#8FB0FF' }}>translated.</div>
        </div>
        <div style={{ fontSize: 30, color: 'rgba(255,255,255,.7)' }}>AI-first consulting for the pharmaceutical industry</div>
      </div>
    ),
    size,
  );
}
