import React, { useState } from 'react';
import { ArrowUpRight, Clock, Calendar, BookOpen } from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';

interface InsightsPageProps {
  onSelectArticle: (article: Article) => void;
  onStartProject: () => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onSelectArticle, onStartProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Design Philosophy', 'Engineering', 'Product Strategy'];

  const filteredArticles = ARTICLES.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  return (
    <div className="pt-32 sm:pt-40 pb-24 space-y-16 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Header */}
      <div className="space-y-6 max-w-4xl">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Journal & Perspectives</span>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          Insights on Digital Craft
        </h1>
        <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
          Essays and technical retrospectives on digital typography, headless performance engineering, conversion architecture, and brand strategy.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-y border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0C0C0E] p-8 flex flex-col justify-between space-y-8 hover:border-white/25 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span className="text-blue-400">{article.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {article.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center font-bold text-white text-[10px]">
                  {article.author.name[0]}
                </div>
                <span className="text-neutral-400">{article.author.name}</span>
              </div>

              <span className="inline-flex items-center gap-1 font-mono text-neutral-300 group-hover:text-white">
                <span>Read Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter / Publication Box */}
      <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-white/10 space-y-6 max-w-3xl mx-auto text-center">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold text-white">The GEK Design Dispatch</h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            A private, four-times-a-year brief dissecting digital design, headless architecture, and commercial conversion. Zero spam.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing to The Forma Quarterly.');
          }}
          className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your professional email..."
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
