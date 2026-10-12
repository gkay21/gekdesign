import React from 'react';

const CONTACT_EMAIL = 'george@gekdesign.com.au';
const LAST_UPDATED = '12 October 2026';

const sections = [
  {
    heading: 'What we collect',
    body: [
      'Only what you enter in the contact form: your name and email address, and if you choose to give them, your company, website and project details, along with the services, budget and timeline you select.',
      'This site has no accounts, sets no cookies and runs no analytics or advertising trackers.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'We use your details to reply to your enquiry and, if you ask for one, to prepare a proposal. We don’t sell or share your details, and we won’t add you to a mailing list.',
    ],
  },
  {
    heading: 'Where it goes',
    body: [
      'The form sends your enquiry to our own mail service on Amazon Web Services, which emails it to us. That service doesn’t keep a copy of your message. The email is then stored in our Google Workspace mailbox.',
      'The site is hosted on Vercel, which, like any web host, keeps short-lived server logs such as IP addresses and browser types.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'We keep enquiries for as long as we need them to respond to you and for our business records. We’ll delete yours sooner if you ask.',
    ],
  },
];

export const PrivacyPage: React.FC = () => (
  <div className="pt-32 sm:pt-40 pb-24 max-w-3xl mx-auto px-6 sm:px-8 space-y-12">
    <div className="space-y-4">
      <span className="text-xs font-mono uppercase tracking-wider text-blue-400">Privacy</span>
      <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
        Privacy Policy
      </h1>
      <p className="text-xs font-mono text-neutral-500">Last updated {LAST_UPDATED}</p>
    </div>

    {sections.map((section) => (
      <section key={section.heading} className="space-y-3">
        <h2 className="font-display text-2xl font-bold text-white">{section.heading}</h2>
        {section.body.map((paragraph) => (
          <p key={paragraph} className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>
    ))}

    <section className="space-y-3">
      <h2 className="font-display text-2xl font-bold text-white">Access, correction and deletion</h2>
      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
        To see, correct or delete the details we hold about you, or to ask anything about this policy, email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-4 hover:text-blue-300">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </section>
  </div>
);
