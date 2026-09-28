import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ContactPage } from '../pages/ContactPage';
import { useSiteNavigation } from '../lib/navigation';
import { pageTitle, seo } from '../lib/seo';
import { PATHS } from '../paths';

export const meta = () =>
  seo({
    title: pageTitle('Start a Project'),
    description:
      'Tell us about your brand vision, requirements, and timeline. We review every brief and respond within 24 business hours.',
    path: PATHS.contact,
  });

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { navigate } = useSiteNavigation();
  // The pre-rendered HTML has no query string, so apply ?service= after hydration to avoid a mismatch.
  const [service, setService] = useState<string | undefined>(undefined);

  useEffect(() => {
    setService(searchParams.get('service') ?? undefined);
  }, [searchParams]);

  return (
    <ContactPage
      key={service ?? ''}
      initialService={service}
      onNavigateHome={() => navigate(PATHS.home)}
    />
  );
}
