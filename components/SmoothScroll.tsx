'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Smooth scrolling plus reveal-on-scroll for every `.reveal` element
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 }, lerp: 0.11 });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      lenis?.destroy();
    };
  }, []);

  return null;
}
