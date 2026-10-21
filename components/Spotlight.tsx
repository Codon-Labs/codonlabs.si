'use client';

import type { ReactNode } from 'react';

// Cards inside get a soft light that follows the pointer (`.spot` elements)
export default function Spotlight({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const card = (e.target as HTMLElement).closest('.spot') as HTMLElement | null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
