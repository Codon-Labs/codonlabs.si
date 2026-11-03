import { faqs } from '@/lib/content';

// Native <details> accordion: works without JavaScript and is keyboard accessible
export default function Faq() {
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <details className="faq reveal" style={{ '--d': `${(i % 4) * 0.05}s` } as React.CSSProperties} key={f.q}>
          <summary>
            <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="faq-q">{f.q}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p className="faq-a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
