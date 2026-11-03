import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/lib/content';

export const metadata: Metadata = { title: 'Terms & Conditions', alternates: { canonical: '/terms' } };

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated="3 November 2026">
      <p>These terms apply to your use of the Codon Labs website. By using the site, you agree to them.</p>

      <h2>About this site</h2>
      <p>
        This website describes the consulting services of Codon Labs. The information on it is general and is not a binding offer. Any engagement with us is governed by a separate written agreement.
      </p>

      <h2>No professional or regulatory advice</h2>
      <p>
        Content here is for information only. It is not legal, regulatory, medical or quality advice, and you should not rely on it as a substitute for advice specific to your situation. References to standards and regulations are for context and do not guarantee compliance.
      </p>

      <h2>Intellectual property</h2>
      <p>The text, design, logo and code of this site belong to Codon Labs or its licensors. You may view and share links to the site, but you may not copy or reuse its content without our written permission.</p>

      <h2>Acceptable use</h2>
      <p>Do not misuse the site: no attempts to disrupt it, gain unauthorised access, send spam through the contact form, or use automated tools to harvest content.</p>

      <h2>Links to other sites</h2>
      <p>The site may link to third-party services, such as our booking calendar. We are not responsible for their content or practices.</p>

      <h2>Liability</h2>
      <p>The site is provided &ldquo;as is&rdquo;. To the extent the law allows, Codon Labs is not liable for any loss arising from your use of or reliance on this website.</p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms from time to time; the date above shows the latest version. Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
