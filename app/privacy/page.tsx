import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/lib/content';

export const metadata: Metadata = { title: 'Privacy', alternates: { canonical: '/privacy' } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="3 November 2026">
      <p>
        This page explains what personal data Codon Labs (&ldquo;we&rdquo;) collects through this website, why, and what your rights are.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, work email, company (optional) and the message you write.
        </li>
        <li>
          <strong>Booking a call:</strong> the details you enter in our scheduling calendar, which is provided by Google Calendar appointment scheduling.
        </li>
        <li>
          <strong>Email:</strong> anything you send to {site.email}, including your address.
        </li>
        <li>
          <strong>Technical data:</strong> our hosting provider, Vercel, processes standard server logs such as IP address and browser type to deliver and secure the site.
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>We use your details only to reply to you, arrange and hold calls, and run our consulting business. We do not sell your data and we do not use it for advertising.</p>

      <h2>Who processes it</h2>
      <p>We use a small number of service providers to run the site and handle enquiries: Vercel (hosting), Google (forms, email and calendar). They process data on our behalf under their own terms.</p>

      <h2>How long we keep it</h2>
      <p>We keep enquiry details for as long as needed to respond and to follow up on a relationship you start with us, then delete them on request or when they are no longer needed.</p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct or delete your personal data, to restrict or object to its use, or to give you a copy. If you are in the EU or UK, you may also complain to your local data protection authority. To exercise any of these rights,
        email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Cookies</h2>
      <p>This site does not use advertising or tracking cookies. It stores one small flag in your browser session so the intro animation plays only once per visit.</p>

      <h2>Changes</h2>
      <p>If we change this page, we will update the date at the top.</p>
    </LegalPage>
  );
}
