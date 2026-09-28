import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../paths';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onStartProject: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartProject }) => {
  const [times, setTimes] = useState({
    syd: '',
    mel: '',
    lon: '',
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        syd: now.toLocaleTimeString('en-AU', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', hour12: false }),
        mel: now.toLocaleTimeString('en-AU', { timeZone: 'Australia/Melbourne', hour: '2-digit', minute: '2-digit', hour12: false }),
        lon: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }),
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 30000);
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
            <h4 className="text-xs font-mono tracking-wider text-neutral-500 uppercase">Navigation</h4>
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
            <h4 className="text-xs font-mono tracking-wider text-neutral-500 uppercase">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://awwwards.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Awwwards</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Locations & World Clocks */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-wider text-neutral-500 uppercase">Studio Hubs</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                <div>
                  <span className="text-white font-medium block">Sydney (HQ)</span>
                  <span className="text-neutral-500">Design & Development Studio</span>
                </div>
                <span className="font-mono text-neutral-300 tabular-nums">{times.syd || '18:30'} AEST</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                <div>
                  <span className="text-white font-medium block">Melbourne</span>
                  <span className="text-neutral-500">Creative Engineering</span>
                </div>
                <span className="font-mono text-neutral-300 tabular-nums">{times.mel || '18:30'} AEST</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium block">London</span>
                  <span className="text-neutral-500">European Client Office</span>
                </div>
                <span className="font-mono text-neutral-300 tabular-nums">{times.lon || '09:30'} BST</span>
              </div>
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
