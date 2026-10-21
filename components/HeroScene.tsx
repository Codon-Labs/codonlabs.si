'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// 3D particle double helix that reassembles into the Codon Labs logo as you scroll.
// The section is taller than the screen; its inner layer sticks while scroll drives `--p` (0 → 1).

const vertex = /* glsl */ `
  attribute vec3 aPosB;
  attribute vec3 aColA;
  attribute vec3 aColB;
  attribute float aDelay;
  attribute float aSize;
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixel;
  uniform vec2 uPointer;
  varying vec3 vColor;
  varying float vAlpha;

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }

  void main() {
    float t = smoothstep(aDelay * 0.45, aDelay * 0.45 + 0.55, uProgress);
    vec3 a = rotX(uTime * 0.35) * position;
    a = rotY(uPointer.x * 0.3) * rotX(-uPointer.y * 0.25) * a;
    vec3 b = aPosB;
    b.xy += vec2(sin(uTime * 0.8 + aDelay * 20.), cos(uTime * 0.7 + aDelay * 17.)) * 0.025;
    vec3 p = mix(a, b, t);
    float burst = sin(t * 3.14159);
    p += normalize(vec3(sin(aDelay * 91.), cos(aDelay * 57.), sin(aDelay * 33.) + 0.001)) * burst * 1.4;
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixel * (10. / -mv.z);
    vColor = mix(aColA, aColB, t);
    vAlpha = mix(0.8, 1.0, t);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, d) * vAlpha);
  }
`;

// Logo geometry in SVG units (viewBox 0 0 120 120), centred on the triangle
const V = [[36, 30], [36, 90], [88, 60]].map(([x, y]) => [(x - 53) / 16.5, (60 - y) / 16.5]);
const DOT_R = 12.5 / 16.5;
const STROKE = 5 / 16.5;

export default function HeroScene({ children, lockup }: { children: ReactNode; lockup: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed) return;
      const el = section.current!;
      const cv = canvas.current!;
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches || location.search.includes('shot');
      const small = innerWidth < 760;
      const N = small ? 3800 : 7000;

      const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: true, powerPreference: 'high-performance' });
      const dpr = Math.min(devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.z = 12;

      const posA = new Float32Array(N * 3);
      const posB = new Float32Array(N * 3);
      const colA = new Float32Array(N * 3);
      const colB = new Float32Array(N * 3);
      const delay = new Float32Array(N);
      const sizes = new Float32Array(N);
      const R = 1.35, LEN = 8, TURNS = 3.2, RUNGS = 46;

      // Logo placement: left of centre on wide screens, above centre on narrow ones
      const layout = () => {
        const aspect = innerWidth / innerHeight;
        // The triangle's bounding box is off-centre (the tip dot sticks out), hence the -0.52 nudge
        if (aspect < 1) return { x: -0.52 * 0.55, y: 1.0, s: 0.55 };
        const s = 0.72;
        return { x: Math.max(-3.9, -1.55 * aspect) - 0.52 * s, y: 0, s };
      };
      let L = layout();

      const fillLogo = () => {
        for (let i = 0; i < N; i++) {
          const r = (i * 0.6180339) % 1;
          let x: number, y: number, tip = false;
          if (r < 0.66) {
            const k = r < 0.22 ? 0 : r < 0.44 ? 1 : 2;
            tip = k === 2;
            const a = Math.random() * Math.PI * 2, d = DOT_R * Math.sqrt(Math.random());
            x = V[k][0] + Math.cos(a) * d;
            y = V[k][1] + Math.sin(a) * d;
          } else {
            const e = Math.floor(Math.random() * 3);
            const [p, q] = [V[e], V[(e + 1) % 3]];
            const s = Math.random();
            const nx = -(q[1] - p[1]), ny = q[0] - p[0], nl = Math.hypot(nx, ny);
            const w = (Math.random() - 0.5) * STROKE;
            x = p[0] + (q[0] - p[0]) * s + (nx / nl) * w;
            y = p[1] + (q[1] - p[1]) * s + (ny / nl) * w;
          }
          posB[i * 3] = L.x + x * L.s;
          posB[i * 3 + 1] = L.y + y * L.s;
          posB[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
          const c = tip ? [0.22, 0.42, 1.0] : [0.82, 0.86, 0.98];
          colB.set(c, i * 3);
        }
      };

      for (let i = 0; i < N; i++) {
        const u = Math.random() * 2 - 1;
        const isRung = i % 4 === 3;
        let x: number, y: number, z: number;
        if (isRung) {
          const k = Math.floor(Math.random() * RUNGS);
          const uu = (k / (RUNGS - 1)) * 2 - 1;
          const ang = uu * TURNS * Math.PI * 2;
          const s = Math.random() * 2 - 1;
          x = uu * LEN;
          y = Math.cos(ang) * R * s;
          z = Math.sin(ang) * R * s;
          colA.set([0.24, 0.34, 0.85], i * 3);
        } else {
          const strand = i % 2;
          const ang = u * TURNS * Math.PI * 2 + strand * Math.PI;
          // Gaussian-ish spread gives each strand a soft, tube-like body
          const j = 0.16 * (Math.random() + Math.random() - 1);
          const k = 0.16 * (Math.random() + Math.random() - 1);
          x = u * LEN;
          y = Math.cos(ang) * (R + j) + k * 0.4;
          z = Math.sin(ang) * (R + j) + k;
          colA.set(strand ? [0.62, 0.74, 1.0] : [0.36, 0.52, 1.0], i * 3);
        }
        posA.set([x, y, z], i * 3);
        delay[i] = Math.random();
        sizes[i] = 2.2 + Math.random() * 2.6;
      }
      fillLogo();

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(posA, 3));
      geo.setAttribute('aPosB', new THREE.BufferAttribute(posB, 3));
      geo.setAttribute('aColA', new THREE.BufferAttribute(colA, 3));
      geo.setAttribute('aColB', new THREE.BufferAttribute(colB, 3));
      geo.setAttribute('aDelay', new THREE.BufferAttribute(delay, 1));
      geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

      const uniforms = {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixel: { value: dpr },
        uPointer: { value: new THREE.Vector2() },
      };
      const mat = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.Points(geo, mat));

      // Place the HTML wordmark right next to (or under) the particle logo
      const placeLockup = () => {
        camera.updateMatrixWorld();
        const tipEdge = new THREE.Vector3(L.x + (V[2][0] + DOT_R) * L.s, L.y, 0).project(camera);
        const top = new THREE.Vector3(L.x, L.y + (V[0][1] + DOT_R) * L.s, 0).project(camera);
        const bottom = new THREE.Vector3(L.x, L.y + (V[1][1] - DOT_R) * L.s, 0).project(camera);
        const h = cv.clientHeight, w = cv.clientWidth;
        el.style.setProperty('--lx', `${((tipEdge.x + 1) / 2) * w}px`);
        el.style.setProperty('--ly', `${((1 - top.y) / 2) * h}px`);
        el.style.setProperty('--lb', `${((1 - bottom.y) / 2) * h}px`);
        el.style.setProperty('--lh', `${((top.y - bottom.y) / 2) * h}px`);
      };

      const resize = () => {
        const w = cv.clientWidth, h = cv.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const next = layout();
        if (next.x !== L.x || next.s !== L.s) {
          L = next;
          fillLogo();
          geo.attributes.aPosB.needsUpdate = true;
          geo.attributes.aColB.needsUpdate = true;
        }
        placeLockup();
      };

      let target = 0, progress = 0, raf = 0, visible = true;
      const pointer = new THREE.Vector2(), pointerTarget = new THREE.Vector2();
      const onScroll = () => {
        const r = el.getBoundingClientRect();
        target = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
        // Screenshot helper: ?shot&p=0.5 freezes the morph at that point
        const forced = new URLSearchParams(location.search).get('p');
        if (still && forced) target = Number(forced);
        if (still) render();
      };
      const onMove = (e: PointerEvent) => pointerTarget.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
      const start = performance.now();
      const render = () => {
        progress += (target - progress) * (still ? 1 : 0.08);
        pointer.lerp(pointerTarget, 0.05);
        uniforms.uProgress.value = progress;
        uniforms.uPointer.value.copy(pointer);
        if (!still) uniforms.uTime.value = (performance.now() - start) / 1000;
        el.style.setProperty('--p', progress.toFixed(4));
        renderer.render(scene, camera);
      };
      const loop = () => {
        render();
        raf = visible ? requestAnimationFrame(loop) : 0;
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf && !still) raf = requestAnimationFrame(loop);
      });

      resize();
      onScroll();
      addEventListener('resize', resize);
      addEventListener('scroll', onScroll, { passive: true });
      if (still) render();
      else {
        addEventListener('pointermove', onMove, { passive: true });
        io.observe(el);
        raf = requestAnimationFrame(loop);
      }
      el.classList.add('ready');

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        removeEventListener('resize', resize);
        removeEventListener('scroll', onScroll);
        removeEventListener('pointermove', onMove);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section className="hero3d" ref={section}>
      <div className="hero3d-sticky hero">
        <canvas ref={canvas} className="hero3d-canvas" aria-hidden="true" />
        <div className="hero3d-copy">{children}</div>
        <div className="hero3d-lockup" aria-hidden="true">
          {lockup}
        </div>
        <div className="hero3d-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
