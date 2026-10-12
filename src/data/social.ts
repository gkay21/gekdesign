export interface SocialLink {
  label: string;
  href: string;
}

// Shown in the footer and listed as `sameAs` in the site-wide JSON-LD (src/root.tsx).
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/george-el-khoury/' },
  { label: 'GitHub', href: 'https://github.com/gkay21' },
  // Add these back once the profile URLs are ready:
  // { label: 'X (Twitter)', href: 'https://x.com/…' },
  // { label: 'Instagram', href: 'https://www.instagram.com/…' },
  // { label: 'Awwwards', href: 'https://www.awwwards.com/…' },
];
