import React from 'react';
import { Link } from 'react-router';
import { PATHS } from '../paths';

interface NotFoundProps {
  title?: string;
  message?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  title = 'Page not found',
  message = 'The page you’re looking for has moved or never existed.',
}) => (
  <div className="pt-40 pb-32 max-w-3xl mx-auto px-6 sm:px-8 space-y-6">
    <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase">404</span>
    <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
      {title}
    </h1>
    <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">{message}</p>
    <div className="flex flex-wrap gap-3 pt-4">
      <Link
        to={PATHS.home}
        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
      >
        Back to homepage
      </Link>
      <Link
        to={PATHS.work}
        className="px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors"
      >
        View selected work
      </Link>
    </div>
  </div>
);
