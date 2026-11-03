import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import { site } from '@/lib/content';
import SmoothScroll from '@/components/SmoothScroll';
import { ContactModalProvider } from '@/components/ContactModal';

const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Codon Labs | GxP-ready AI consulting for pharma', template: '%s · Codon Labs' },
  description: site.description,
  openGraph: {
    title: 'Codon Labs: Pharma, translated.',
    description: 'GxP-ready AI consulting and automation for the pharmaceutical industry.',
    url: '/',
    siteName: 'Codon Labs',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#org`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      email: site.email,
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: site.email },
    },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, publisher: { '@id': `${site.url}/#org` } },
  ],
};

export const viewport: Viewport = { themeColor: '#081A33' };

// Play the intro once per visit; skip it for reduced motion, shared links and screenshots
const introScript = `try{var d=document.documentElement;if(location.search.indexOf('shot')>-1){d.classList.add('shot')}if(location.search.indexOf('shot')>-1||location.hash==='#book'||location.hash==='#message'||sessionStorage.getItem('cl-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('no-intro')}sessionStorage.setItem('cl-intro','1')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <ContactModalProvider>
          <SmoothScroll />
          {children}
        </ContactModalProvider>
      </body>
    </html>
  );
}
