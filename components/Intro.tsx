'use client';

import { useState } from 'react';

// Logo animation: the three bases pop in, bonds draw, and the triangle "plays" the name
export default function Intro() {
  const [skip, setSkip] = useState(false);
  return (
    <div
      className={`intro${skip ? ' skip' : ''}`}
      aria-hidden="true"
      onClick={() => {
        setSkip(true);
        document.documentElement.style.setProperty('--intro', '0.2s');
      }}
    >
      <div className="intro-lockup">
        <svg className="intro-mark" viewBox="0 0 120 120">
          <path className="bond" d="M36 30L36 90L88 60Z" />
          <circle className="base b1" cx="36" cy="30" r="12.5" />
          <circle className="base b2" cx="36" cy="90" r="12.5" />
          <circle className="base b3" cx="88" cy="60" r="12.5" />
        </svg>
        <div className="intro-word">
          <span>codon labs</span>
        </div>
      </div>
    </div>
  );
}
