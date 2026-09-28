export const PATHS = {
  home: '/',
  work: '/work',
  services: '/services',
  about: '/about',
  insights: '/insights',
  contact: '/contact',
} as const;

export const contactPath = (service?: string) =>
  service ? `${PATHS.contact}?${new URLSearchParams({ service })}` : PATHS.contact;
