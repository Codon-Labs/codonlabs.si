import type { ReactNode } from 'react';
import { LogoMark } from './Icons';

// Shared shell for the Privacy and Terms pages
export default function LegalPage({ title, updated, byline, children }: { title: string; updated?: string; byline?: string; children: ReactNode }) {
  return (
    <>
      <header className="legal-top">
        <div className="wrap">
          <a href="/" className="brand">
            <LogoMark />
            Codon Labs
          </a>
          <a href="/">Back to home</a>
        </div>
      </header>
      <main className="legal">
        <div className="wrap">
          <h1>{title}</h1>
          <p className="updated">{byline ?? `Last updated: ${updated}`}</p>
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="wrap foot-row">
          <div className="foot-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms &amp; Conditions</a>
          </div>
          <p className="foot-copy">© 2026 Codon Labs · All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
