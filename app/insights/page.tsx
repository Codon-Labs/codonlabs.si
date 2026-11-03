import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { insights } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Practical writing on GxP-ready AI, validation and automation for pharma teams.',
  alternates: { canonical: '/insights' },
  // Stay out of Google until there is something to read
  robots: insights.length ? undefined : { index: false, follow: true },
};

export default function InsightsIndex() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <LegalPage title="Insights" byline="Practical writing on GxP-ready AI, validation and automation for pharma teams.">
      {sorted.length === 0 ? (
        <p>Articles are coming soon.</p>
      ) : (
        <ul className="ins-list">
          {sorted.map((a) => (
            <li key={a.slug}>
              <a href={`/insights/${a.slug}`}>
                <time dateTime={a.date}>{a.date}</time>
                <h2>{a.title}</h2>
                <p>{a.description}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </LegalPage>
  );
}
