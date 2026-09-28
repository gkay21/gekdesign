import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import { PATHS } from '../paths';

interface NavbarProps {
  pathname: string;
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pathname,
  onStartProject,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: PATHS.work, label: 'Work' },
    { to: PATHS.services, label: 'Services' },
    { to: PATHS.about, label: 'About' },
    { to: PATHS.insights, label: 'Insights' },
  ];

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090B]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-sm'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to={PATHS.home}
            onClick={closeMobileMenu}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="GEK Design Home"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              GEK DESIGN
            </span>
          </Link>

          {/* Zone 2: 4-6 text links with subtle hover underlines */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-1 cursor-pointer transition-colors duration-200 focus:outline-none ${
                    active ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Primary Action Button */}
            <button
              onClick={onStartProject}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              Start a Project
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#09090B]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="flex flex-col space-y-6">
            <Link
              to={PATHS.home}
              onClick={closeMobileMenu}
              className="text-left text-2xl font-display font-medium text-white py-2 border-b border-white/10"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={`text-left text-2xl font-display font-medium py-2 border-b border-white/10 ${
                  isActive(link.to) ? 'text-white' : 'text-neutral-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <button
              onClick={() => {
                onStartProject();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg"
            >
              Start a Project
            </button>
            <div className="text-xs text-neutral-500 flex items-center justify-between pt-2">
              <span>Sydney, Australia</span>
              <span className="font-mono">george@gekdesign.com.au</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
