import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { insights } from '@/lib/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];
  if (insights.length) {
    pages.push({ url: `${site.url}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
    for (const a of insights) pages.push({ url: `${site.url}/insights/${a.slug}`, lastModified: new Date(a.date), changeFrequency: 'yearly', priority: 0.6 });
  }
  return pages;
}
