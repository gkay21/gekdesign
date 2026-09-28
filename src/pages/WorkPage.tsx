import React, { useState } from 'react';
import { ArrowUpRight, Search, Filter } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';

interface WorkPageProps {
  onSelectProject: (project: Project) => void;
  onStartProject: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onSelectProject, onStartProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Healthcare & Services', 'E-commerce', 'SaaS & Platforms'];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pt-32 sm:pt-40 pb-24 space-y-16 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Header */}
      <div className="space-y-6 max-w-4xl">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Portfolio & Archives</span>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          Selected Work
        </h1>
        <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
          A curated selection of digital flagships, institutional SaaS platforms, and bespoke brand architectures engineered for sustained commercial impact.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4 border-y border-white/10">
        {/* Interactive category buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, industry, service..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0C0C0E] overflow-hidden hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="overflow-hidden relative h-72 sm:h-96">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="p-8 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>{project.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.shortOutcome}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-white font-semibold">
                    {project.metrics[0].value} <span className="text-neutral-400 font-normal">{project.metrics[0].label}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-neutral-400 group-hover:text-white">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-neutral-400 text-sm">No case studies found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs text-white bg-blue-600 rounded-md cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Client Archive Table */}
      <div className="pt-12 space-y-6 border-t border-white/10">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Historical Commissions</span>
          <h2 className="font-display text-2xl font-bold text-white">Full Client Directory (2020 – 2026)</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-500 font-mono">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Disciplines</th>
                <th className="py-3 px-4 text-right">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-normal text-neutral-300">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">Fairfield Dental Care</td>
                <td className="py-3.5 px-4 text-neutral-400">Healthcare & Dentistry</td>
                <td className="py-3.5 px-4 font-mono">2024</td>
                <td className="py-3.5 px-4">Web Design · Static Next.js Build · Ongoing Support</td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">12 Treatment Guides</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">Mini Minds Early Learning Centre</td>
                <td className="py-3.5 px-4 text-neutral-400">Early Childhood Education</td>
                <td className="py-3.5 px-4 font-mono">2026</td>
                <td className="py-3.5 px-4">Web Design · Performance · Local SEO</td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">92 Mobile Lighthouse</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">FDJ United (Unibet)</td>
                <td className="py-3.5 px-4 text-neutral-400">Online Sports Betting & Gaming</td>
                <td className="py-3.5 px-4 font-mono">2025–2026</td>
                <td className="py-3.5 px-4">Performance · TypeScript · .NET · Kafka · Kubernetes</td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">10×+ Bet Placement</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">Stan</td>
                <td className="py-3.5 px-4 text-neutral-400">Streaming & Entertainment</td>
                <td className="py-3.5 px-4 font-mono">2024</td>
                <td className="py-3.5 px-4">Video Lead · Go · Live Sport Automation</td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">Paris 2024 Olympics</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">Vodafone Australia</td>
                <td className="py-3.5 px-4 text-neutral-400">Telecommunications</td>
                <td className="py-3.5 px-4 font-mono">2020</td>
                <td className="py-3.5 px-4">Next.js Shop · React · E-commerce</td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">&lt;1s Page Loads</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">Atlassian (Jira)</td>
                <td className="py-3.5 px-4 text-neutral-400">Software & Developer Tools</td>
                <td className="py-3.5 px-4 font-mono">2020–2021</td>
                <td className="py-3.5 px-4">React · Redux · SSR · Legacy Migration</td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">Issue & Board Views</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Start Project Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-display text-2xl font-bold text-white">Looking for a bespoke digital solution?</h3>
          <p className="text-sm text-neutral-400">Explore our engagement models and receive a tailored proposal in 24 hours.</p>
        </div>
        <button
          onClick={onStartProject}
          className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Start a Project
        </button>
      </div>
    </div>
  );
};
