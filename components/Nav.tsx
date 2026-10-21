'use client';

import { useEffect, useState } from 'react';
import { nav } from '@/lib/content';
import { LogoMark } from './Icons';
import { ModalButton } from './ContactModal';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero, .hero3d') as HTMLElement | null;
    const onScroll = () => setSolid(scrollY > (hero ? hero.offsetHeight - 80 : 40));
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menu);
  }, [menu]);

  return (
    <nav className={`nav${solid ? ' solid' : ''}${menu ? ' menu' : ''}`}>
      <div className="wrap nav-row">
        <a href="#top" className="brand" aria-label="Codon Labs home" onClick={() => setMenu(false)}>
          <LogoMark />
          codon labs
        </a>
        <div className="links">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <ModalButton tab="book" className="btn btn-blue">
            Book a call
          </ModalButton>
        </div>
        <button type="button" className="burger" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <span />
          <span />
        </button>
      </div>
      <div className="mobile-menu" onClick={() => setMenu(false)}>
        {nav.map((l, i) => (
          <a key={l.href} href={l.href} style={{ transitionDelay: `${0.05 + i * 0.04}s` }}>
            {l.label}
          </a>
        ))}
        <ModalButton tab="book" className="btn btn-blue">
          Book a call
        </ModalButton>
      </div>
    </nav>
  );
}
