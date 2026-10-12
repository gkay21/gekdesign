import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../paths';
import { SOCIAL_LINKS } from '../data/social';
import { ArrowUpRight } from 'lucide-react';

// e.g. "14:05 AEDT": the zone name follows daylight saving instead of being hardcoded.
const SYDNEY_TIME_FORMAT = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZoneName: 'short',
});
const CLOCK_REFRESH_MS = 30_000;

interface FooterProps {
  onStartProject: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartProject }) => {
  // Sydney's local time, set after hydration so the pre-rendered HTML doesn't bake in a build-time clock.
  const [sydneyTime, setSydneyTime] = useState('');

  useEffect(() => {
    const updateTime = () => setSydneyTime(SYDNEY_TIME_FORMAT.format(new Date()));
    updateTime();
    const interval = setInterval(updateTime, CLOCK_REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-neutral-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand & Statement */}
          <div className="md:col-span-5 space-y-4">
            <Link
              to={PATHS.home}
              className="block text-left font-display text-2xl font-bold tracking-tight text-white hover:text-neutral-300 transition-colors focus:outline-none"
            >
              GEK DESIGN
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              An independent creative web design and development agency. We combine strategy, design, and development to create high-performing digital experiences that make brands impossible to ignore.
            </p>
            <div className="pt-2 flex flex-col gap-1.5">
              <a
                href="mailto:george@gekdesign.com.au"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-blue-400 transition-colors"
              >
                <span>george@gekdesign.com.au</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+61400424449"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                <span>+61 400 424 449</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xs font-mono tracking-wider text-neutral-500 uppercase">Navigation</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={PATHS.home}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={PATHS.work}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  to={PATHS.services}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Scope
                </Link>
              </li>
              <li>
                <Link
                  to={PATHS.about}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Studio
                </Link>
              </li>
              <li>
                <Link
                  to={PATHS.insights}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Insights & Journal
                </Link>
              </li>
              <li>
                <button
                  onClick={onStartProject}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Start a Project
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xs font-mono tracking-wider text-neutral-500 uppercase">Connect</h2>
            <ul className="space-y-2 text-sm">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Location & Local Time */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-mono tracking-wider text-neutral-500 uppercase">Studio</h2>
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-white font-medium block">Sydney, Australia</span>
                <span className="text-neutral-500">Design & Development Studio</span>
              </div>
              <span className="font-mono text-neutral-300 tabular-nums">{sydneyTime}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} GEK DESIGN. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Crafted with intentional restraint</span>
            <span>·</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
