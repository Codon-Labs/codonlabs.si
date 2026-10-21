'use client';

import { useEffect, useRef } from 'react';

// A twisting ribbon of fine strands that follows the pointer
export default function HeroHelix() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches || location.search.includes('shot');
    let W = 0, H = 0, t = 0, raf = 0, visible = true;
    let tilt = 0, tiltTarget = 0, lift = 0, liftTarget = 0;

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const strands = 48;
      const amp = Math.min(H * 0.17, 150) * (1 + lift * 0.25);
      const depth = amp * 0.22;
      const freq = (2.6 * Math.PI) / W;
      const yAt = (x: number) => H * 0.58 - (x - W / 2) * (0.16 + tilt * 0.06);
      for (let k = 0; k < strands; k++) {
        const ph = (k / (strands - 1)) * Math.PI;
        ctx.beginPath();
        for (let x = -20; x <= W + 20; x += 6) {
          const a = x * freq + t;
          const y = yAt(x) + amp * Math.sin(a) * Math.cos(ph) + depth * Math.cos(a) * Math.sin(ph);
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const edge = Math.abs(Math.cos(ph));
        ctx.strokeStyle = `rgba(143, 176, 255, ${0.05 + 0.32 * edge})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // base pairs where the ribbon crosses
      for (let n = 0; n < 12; n++) {
        const x = ((n + 0.5) * Math.PI - t) / freq;
        const xm = ((x % W) + W) % W;
        ctx.beginPath();
        ctx.arc(xm, yAt(xm) + depth * Math.cos(xm * freq + t), n % 4 === 1 ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = n % 4 === 1 ? '#2F5BFF' : 'rgba(255,255,255,.75)';
        ctx.fill();
      }
    };

    const loop = () => {
      tilt += (tiltTarget - tilt) * 0.04;
      lift += (liftTarget - lift) * 0.04;
      t += 0.0035 + Math.abs(tilt) * 0.002;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      tiltTarget = (e.clientX / innerWidth - 0.5) * 2;
      liftTarget = (e.clientY / innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      size();
      draw();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(loop);
    });

    size();
    addEventListener('resize', onResize);
    if (still) draw();
    else {
      addEventListener('pointermove', onMove, { passive: true });
      io.observe(cv);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener('resize', onResize);
      removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className="helix" aria-hidden="true" />;
}
