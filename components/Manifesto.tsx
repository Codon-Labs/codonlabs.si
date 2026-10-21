'use client';

import { useEffect, useRef } from 'react';
import { manifesto } from '@/lib/content';

// Words light up one by one as the paragraph scrolls through the viewport
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const words = el.querySelectorAll('.w');
    const light = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    addEventListener('scroll', light, { passive: true });
    light();
    return () => removeEventListener('scroll', light);
  }, []);

  return (
    <p className="big" ref={ref}>
      {manifesto.text.split(' ').map((w, i) => (
        <span key={i} className="w">
          {w}{' '}
        </span>
      ))}
      <span className="w hl">{manifesto.highlight}</span>
    </p>
  );
}
