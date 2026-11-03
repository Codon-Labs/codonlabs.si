import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LegalPage from '@/components/LegalPage';
import { insights } from '@/lib/insights';
import { site } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = insights.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { title: a.title, description: a.description, type: 'article', publishedTime: a.date, url: `/insights/${a.slug}` },
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = insights.find((x) => x.slug === slug);
  if (!a) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    mainEntityOfPage: `${site.url}/insights/${a.slug}`,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
  };

  return (
    <LegalPage title={a.title} byline={`Published ${a.date}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {a.body.map((b, i) =>
        'h' in b ? (
          <h2 key={i}>{b.h}</h2>
        ) : 'ul' in b ? (
          <ul key={i}>
            {b.ul.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.p}</p>
        ),
      )}
    </LegalPage>
  );
}
