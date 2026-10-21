import type { CSSProperties } from 'react';
import { engagements, founders, hero, manifesto, principles, services, site } from '@/lib/content';
import Nav from '@/components/Nav';
import HeroScene from '@/components/HeroScene';
import Decoder from '@/components/Decoder';
import Manifesto from '@/components/Manifesto';
import UseCases from '@/components/UseCases';
import Approach from '@/components/Approach';
import Spotlight from '@/components/Spotlight';
import { ModalButton } from '@/components/ContactModal';
import { Arrow, LinkedIn, LogoMark } from '@/components/Icons';

const d = (delay: string) => ({ '--d': delay }) as CSSProperties;

// A fixed strand of codons for the scrolling band, with every start codon highlighted
const sequence = (() => {
  let s = 42;
  const rand = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
  return Array.from({ length: 70 }, (_, i) =>
    i % 9 === 4 ? 'ATG' : Array.from({ length: 3 }, () => 'ACGT'[Math.floor(rand() * 4)]).join(''),
  );
})();

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* Hero */}
        <HeroScene
          lockup={
            <>
              <span className="lk-word">codon labs</span>
              <span className="lk-tag">AI-first consulting for pharma</span>
            </>
          }
        >
          <div className="wrap hero-inner">
            <span className="tag rise">
              <i />
              {hero.tag}
            </span>
            <h1 className="rise" style={d('.08s')}>
              Pharma, <span className="soft">translated.</span>
            </h1>
            <p className="hero-lede rise" style={d('.18s')}>
              {hero.lede}
            </p>
            <div className="actions rise" style={d('.26s')}>
              <ModalButton tab="book" className="btn btn-light">
                Book a call <Arrow />
              </ModalButton>
              <a href="#services" className="btn btn-ghost">
                What we do
              </a>
            </div>
            <div className="hero-foot rise" style={d('.36s')}>
              <Decoder />
              <div className="scroll-cue">
                <span />
                Scroll to assemble
              </div>
            </div>
          </div>
        </HeroScene>
        <section className="seq-band" aria-hidden="true">
          <div className="sequence">
            <div className="seq-track">
              {[...sequence, ...sequence].map((c, i) => (
                <span key={i} className={c === 'ATG' ? 'start' : undefined}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="block manifesto">
          <div className="wrap">
            <p className="label">Why we exist</p>
            <Manifesto />
            <div className="shifts">
              {manifesto.shifts.map((s, i) => (
                <div className="shift reveal" style={d(`${i * 0.08}s`)} key={s.to}>
                  <span className="from">{s.from}</span>
                  <Arrow />
                  <span className="to">{s.to}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="block services" id="services">
          <div className="wrap">
            <div className="head">
              <p className="label reveal">What we do</p>
              <h2 className="reveal">
                One partner, from <span>first idea to validated system.</span>
              </h2>
            </div>
            <Spotlight className="svc-grid">
              {services.map((s, i) => (
                <article className="svc spot reveal" style={d(`${(i % 2) * 0.08}s`)} key={s.title}>
                  <div className="svc-top">
                    <span className="svc-num">0{i + 1}</span>
                    <span className="codon">
                      {[0, 1, 2].map((n) => (
                        <i key={n} className={n <= i % 3 ? 'on' : undefined} />
                      ))}
                    </span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </Spotlight>
          </div>
        </section>

        {/* Use cases */}
        <section className="block usecases" id="use-cases">
          <div className="wrap">
            <div className="head">
              <p className="label reveal">Use cases</p>
              <h2 className="reveal">
                Where AI pays off <span>first.</span>
              </h2>
            </div>
            <UseCases />
          </div>
        </section>

        {/* Approach */}
        <section className="block approach" id="approach">
          <div className="wrap">
            <Approach />
          </div>
        </section>

        {/* Principles */}
        <section className="block principles" id="principles">
          <div className="wrap">
            <div className="head">
              <p className="label reveal">How we build</p>
              <h2 className="reveal">
                AI an inspector <span>can follow.</span>
              </h2>
            </div>
            <Spotlight className="pr-grid">
              {principles.map(([title, text], i) => (
                <div className="pr spot reveal" style={d(`${(i % 3) * 0.08}s`)} key={title}>
                  <span className="pr-num">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </Spotlight>
          </div>
        </section>

        {/* Engagements */}
        <section className="block engage" id="engage">
          <div className="wrap">
            <div className="head">
              <p className="label reveal">Working together</p>
              <h2 className="reveal">
                Three ways <span>to start.</span>
              </h2>
            </div>
            <div className="en-grid">
              {engagements.map((e, i) => (
                <div className={`en reveal${i === 0 ? ' featured' : ''}`} style={d(`${i * 0.08}s`)} key={e.name}>
                  <span className="en-tag">{e.tag}</span>
                  <h3>{e.name}</h3>
                  <p>{e.text}</p>
                  <ModalButton tab="book" className="en-link">
                    Discuss a {e.name.toLowerCase()} <Arrow />
                  </ModalButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="block founders" id="founders">
          <div className="wrap">
            <div className="head">
              <p className="label reveal">Founders</p>
              <h2 className="reveal">
                The people <span>behind the sequence.</span>
              </h2>
            </div>
            <div className="people">
              {founders.map((f, i) => (
                <div className={`person reveal${i ? ' co' : ''}`} style={d(`${i * 0.1}s`)} key={f.name}>
                  <div className="initials">{f.initials}</div>
                  <div className="who">
                    <h3>{f.name}</h3>
                    <p className="role">{f.role}</p>
                    <div className="person-links">
                      <a className="li" href={f.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedIn />
                        LinkedIn
                      </a>
                      <a className="li" href={`mailto:${f.email}`}>
                        {f.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="block contact" id="contact">
          <div className="wrap">
            <p className="label">Contact</p>
            <h2 className="reveal">
              Let&apos;s find your <span>start codon.</span>
            </h2>
            <div className="contact-row reveal">
              <p>
                Tell us where your teams lose the most time. In 30 minutes we&apos;ll show you where AI can help first.
                <br />
                Or write to us at{' '}
                <a className="contact-mail" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
              <div className="contact-actions">
                <ModalButton tab="book" className="btn btn-light">
                  Book a call <Arrow />
                </ModalButton>
                <ModalButton tab="message" className="btn btn-ghost">
                  Send us a message
                </ModalButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="foot-top">
            <a href="#top" className="brand">
              <LogoMark />
              codon labs
            </a>
            <div className="foot-links">
              <a href="#services">Services</a>
              <a href="#use-cases">Use cases</a>
              <a href="#approach">Approach</a>
              <a href="#founders">Founders</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div className="foot-word" aria-hidden="true">
            codon labs
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Codon Labs</span>
            <span>AI-first consulting for pharma</span>
          </div>
        </div>
      </footer>
    </>
  );
}
