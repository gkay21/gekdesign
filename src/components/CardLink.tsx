import React from 'react';

interface CardLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> {
  href: string;
  /** In-app navigation for a plain left click (e.g. opening a case study overlay). */
  onNavigate: () => void;
}

/**
 * A real link for clickable cards: crawlable, keyboard-focusable, and opens in a new tab on
 * ctrl/cmd/middle click, while a plain click still runs the in-app navigation.
 */
export const CardLink: React.FC<CardLinkProps> = ({ href, onNavigate, children, ...rest }) => (
  <a
    href={href}
    onClick={(e) => {
      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
      if (e.defaultPrevented || isModified) return;
      e.preventDefault();
      onNavigate();
    }}
    {...rest}
  >
    {children}
  </a>
);
