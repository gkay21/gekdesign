import React from 'react';
import { X, ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { Article } from '../data/articles';
import { useDialog } from '../lib/useDialog';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onStartProject }) => {
  const dialogRef = useDialog<HTMLDivElement>(onClose);

  if (!article) return null;

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl animate-fade-in focus:outline-none"
    >
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#09090B]/95 px-6 py-4 backdrop-blur-md">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Insights</span>
        </button>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <article className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-20 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
            <span className="text-blue-400">{article.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="w-9 h-9 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center font-bold text-white text-xs">
              {article.author.name[0]}
            </div>
            <div>
              <span className="text-sm font-medium text-white block">{article.author.name}</span>
              <span className="text-xs text-neutral-400">{article.author.role}</span>
            </div>
          </div>
        </div>

        <div className="text-lg text-neutral-300 font-light leading-relaxed border-l-2 border-blue-500 pl-4 py-1 italic">
          {article.summary}
        </div>

        <div className="space-y-10 text-neutral-300 leading-relaxed font-normal">
          {article.content.map((sec, i) => (
            <div key={i} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                {sec.sectionHeading}
              </h2>
              {sec.body.map((para, pIdx) => (
                <p key={pIdx} className="text-base text-neutral-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Closing box */}
        <div className="p-8 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <h3 className="font-display text-xl font-bold text-white">Looking to elevate your digital presence?</h3>
          <p className="text-sm text-neutral-400">
            We partner with a limited roster of ambitious brands each quarter. Discuss your vision directly with our design leadership.
          </p>
          <button
            onClick={onStartProject}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
          >
            Start a Conversation
          </button>
        </div>
      </article>
    </div>
  );
};
