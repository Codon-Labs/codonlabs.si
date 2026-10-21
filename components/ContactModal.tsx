'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { site } from '@/lib/content';
import { Arrow } from './Icons';

type Tab = 'book' | 'message';
const ModalContext = createContext<(tab: Tab) => void>(() => {});

export function useContactModal() {
  return useContext(ModalContext);
}

export function ModalButton({ tab, className, children }: { tab: Tab; className?: string; children: ReactNode }) {
  const open = useContactModal();
  return (
    <a
      href={`#${tab}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        open(tab);
      }}
    >
      {children}
    </a>
  );
}

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<Tab>('book');
  const [frameLoaded, setFrameLoaded] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((next: Tab) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setTab(next);
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    document.body.style.overflow = 'hidden';
    lenis()?.stop();
    history.replaceState(null, '', `#${next}`);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = '';
    lenis()?.start();
    history.replaceState(null, '', location.pathname + location.search);
    setTimeout(() => {
      setMounted(false);
      lastFocus.current?.focus();
    }, 320);
  }, []);

  // Shareable links: codonlabs.si/#book and codonlabs.si/#message
  useEffect(() => {
    const h = location.hash;
    if (h === '#book' || h === '#message') {
      document.documentElement.classList.add('no-intro');
      open(h.slice(1) as Tab);
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [mounted, close]);

  useEffect(() => {
    if (tab === 'book') setFrameLoaded(true);
  }, [tab]);

  return (
    <ModalContext.Provider value={open}>
      {children}
      {mounted && (
        <div className={`modal${visible ? ' open' : ''}`}>
          <div className="modal-backdrop" onClick={close} />
          <div className="modal-panel" role="dialog" aria-modal="true" aria-label="Contact Codon Labs" data-lenis-prevent>
            <div className="modal-head">
              <div className="tabs" role="tablist">
                <button type="button" role="tab" aria-selected={tab === 'book'} onClick={() => setTab('book')}>
                  Book a call
                </button>
                <button type="button" role="tab" aria-selected={tab === 'message'} onClick={() => setTab('message')}>
                  Send a message
                </button>
              </div>
              <button type="button" className="modal-x" onClick={close} aria-label="Close">
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            <div className="pane" hidden={tab !== 'book'}>
              <p className="pane-note">
                <span>Video call on Google Meet</span>
                <span>Available 9 AM – 9 PM IST, every day</span>
                <span>Times are shown in your time zone</span>
              </p>
              {frameLoaded && <iframe src={site.bookingUrl} title="Book a call with Codon Labs" />}
              <div className="book-done">
                <p>After you book, a confirmation email with your Google Meet link arrives straight away.</p>
                <button type="button" className="btn btn-navy" onClick={close}>
                  Done
                </button>
              </div>
            </div>

            <div className="pane" hidden={tab !== 'message'}>
              <MessageForm />
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

function MessageForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError('');
    if (!form.checkValidity()) {
      setError('Please fill in your name, a valid email and a message.');
      (form.querySelector(':invalid') as HTMLElement | null)?.focus();
      return;
    }
    setState('sending');
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
      const res = await fetch(site.formEndpoint, { method: 'POST', body });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'failed');
      setState('sent');
    } catch {
      setState('idle');
      setError(`Something went wrong. Please email us at ${site.fallbackEmail}.`);
    }
  }

  if (state === 'sent') {
    return (
      <div className="form-wrap">
        <div className="sent">
          <div className="tick">
            <svg viewBox="0 0 26 26" aria-hidden="true">
              <path d="M5 13.5L10.5 19L21 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3>Message received.</h3>
          <p>Thank you. Rohan or Shambhavi will reply to you by email shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrap">
      <form onSubmit={onSubmit} noValidate>
        <h3>Tell us what&apos;s slowing you down.</h3>
        <p>Share a little about your team and the process you&apos;d like to fix. We&apos;ll get back to you shortly.</p>
        <div className="fields">
          <div className="field">
            <label htmlFor="f-name">Name</label>
            <input id="f-name" name="name" autoComplete="name" required maxLength={200} autoFocus />
          </div>
          <div className="field">
            <label htmlFor="f-email">Work email</label>
            <input id="f-email" name="email" type="email" autoComplete="email" required maxLength={200} />
          </div>
          <div className="field full">
            <label htmlFor="f-company">
              Company <small>(optional)</small>
            </label>
            <input id="f-company" name="company" autoComplete="organization" maxLength={200} />
          </div>
          <div className="field full">
            <label htmlFor="f-message">How can we help?</label>
            <textarea id="f-message" name="message" required maxLength={5000} />
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-website">Website</label>
            <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
        </div>
        <div className="form-foot">
          <span className={`form-status${error ? ' err' : ''}`} role="status">
            {state === 'sending' ? 'Sending…' : error}
          </span>
          <button type="submit" className="btn btn-navy" disabled={state === 'sending'}>
            Send message <Arrow />
          </button>
        </div>
      </form>
    </div>
  );
}
