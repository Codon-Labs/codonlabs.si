'use client';

import { useEffect, useRef, useState } from 'react';
import { approach } from '@/lib/content';

// Sticky heading on the left; the codon fills in as each stage scrolls past
export default function Approach() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ap">
      <div className="ap-side">
        <div className="ap-sticky">
          <p className="label">Our approach</p>
          <h2>
            Consulting first. <span>Automation follows.</span>
          </h2>
          <div className="ap-codon" aria-hidden="true">
            {approach.map((s, i) => (
              <div key={s.name} className={`ap-base${i <= active ? ' on' : ''}${i === approach.length - 1 ? ' last' : ''}`}>
                <i />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ap-steps">
        {approach.map((s, i) => (
          <div
            key={s.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            className={`ap-step${i === active ? ' active' : ''}`}
          >
            <span className="ap-num">Stage 0{i + 1}</span>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
            <ul>
              {s.outputs.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
