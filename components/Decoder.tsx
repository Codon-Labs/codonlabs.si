'use client';

import { useEffect, useState } from 'react';
import { decoderPairs } from '@/lib/content';

// Cycles codons into outcomes with a short scramble
export default function Decoder() {
  const [idx, setIdx] = useState(0);
  const [word, setWord] = useState(decoderPairs[0][1]);

  useEffect(() => {
    const cycle = setInterval(() => setIdx((prev) => (prev + 1) % decoderPairs.length), 2600);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const target = decoderPairs[idx][1];
    let frame = 0;
    const scramble = setInterval(() => {
      frame++;
      const done = Math.floor((frame / 16) * target.length);
      let out = target.slice(0, done);
      for (let i = done; i < target.length; i++) out += 'acgt'[Math.floor(Math.random() * 4)];
      setWord(frame >= 16 ? target : out);
      if (frame >= 16) clearInterval(scramble);
    }, 38);
    return () => clearInterval(scramble);
  }, [idx]);

  const codon = decoderPairs[idx][0];
  return (
    <div className="decoder" aria-label="Codon to outcome">
      <div className="dec-col">
        <span className="dec-label">Codon</span>
        <span className="dec-codon">{idx === 0 ? <b>{codon}</b> : codon}</span>
      </div>
      <svg className="dec-arrow" viewBox="0 0 36 12" aria-hidden="true">
        <path d="M0 6H34M29 1L34 6L29 11" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <div className="dec-col">
        <span className="dec-label">Expressed as</span>
        <span className="dec-word">{word}</span>
      </div>
    </div>
  );
}
