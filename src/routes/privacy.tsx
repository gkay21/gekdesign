import { PrivacyPage } from '../pages/PrivacyPage';
import { pageTitle, seo } from '../lib/seo';
import { PATHS } from '../paths';

export const meta = () =>
  seo({
    title: pageTitle('Privacy Policy'),
    description:
      'What GEK Design collects through its contact form, how it’s used and stored, and how to ask for your details to be corrected or deleted.',
    path: PATHS.privacy,
  });

export default function Privacy() {
  return <PrivacyPage />;
}
