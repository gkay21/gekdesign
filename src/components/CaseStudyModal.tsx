import React, { useEffect, useState } from 'react';
import { X, ArrowRight, ExternalLink, ArrowLeft, CheckCircle2, Monitor, Smartphone } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onStartProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onStartProject,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Find next project
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      {/* Top sticky bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#09090B]/95 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-white tracking-tight">{project.client}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-xs font-mono text-neutral-400">{project.year}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartProject}
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors cursor-pointer"
          >
            Commission Similar Project
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <article className="max-w-5xl mx-auto px-6 sm:px-8 py-10 sm:py-16 space-y-16">
        {/* Header Block */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
            <span>{project.industry}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 font-light max-w-3xl leading-relaxed">
            {project.shortOutcome}
          </p>

          {/* Services list as clean unboxed typography */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-300">
            <span className="text-neutral-500 font-mono">Disciplines:</span>
            {project.services.map((svc, i) => (
              <span key={svc} className="inline-flex items-center">
                <span className="hover:text-white transition-colors">{svc}</span>
                {i < project.services.length - 1 && <span className="ml-2 sm:ml-3 text-neutral-600">/</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Showcase Image */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-neutral-900 group">
          {!imageError ? (
            <img
              src={project.heroImage}
              alt={`${project.title} Interface Preview`}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-auto max-h-[640px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
            />
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 p-8 text-center">
              <span className="font-display text-2xl text-white font-bold mb-2">{project.title}</span>
              <span className="text-sm">{project.client} — Interface Archive</span>
            </div>
          )}
        </div>

        {/* Quantified Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-white/10">
          {project.metrics.map((m) => (
            <div key={m.label} className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
                {m.value}
              </div>
              <div className="text-sm font-medium text-neutral-200">{m.label}</div>
              <div className="text-xs text-neutral-500">{m.subtext}</div>
            </div>
          ))}
        </div>

        {/* The Challenge & Approach Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">01. The Challenge</h2>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              {project.challengeHeading}
            </h3>
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">02. Strategic Approach</h2>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              {project.approachHeading}
            </h3>
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
              {project.approach}
            </p>
          </div>
        </div>

        {/* Interactive Device Viewport Simulation */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">03. Scope at a Glance</h2>
              <h3 className="font-display text-xl font-bold text-white">What was delivered</h3>
            </div>
            {/* Viewport switchers */}
            <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-lg text-xs">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  deviceView === 'desktop' ? 'bg-white/15 text-white font-medium shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (1440px)</span>
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  deviceView === 'mobile' ? 'bg-white/15 text-white font-medium shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (390px)</span>
              </button>
            </div>
          </div>

          {/* Interactive frame */}
          <div className="flex justify-center p-4 sm:p-8 bg-neutral-950 rounded-xl border border-white/10">
            <div
              className={`transition-all duration-300 overflow-hidden border border-white/10 rounded-lg bg-[#0C0C0E] shadow-2xl ${
                deviceView === 'desktop' ? 'w-full max-w-4xl' : 'w-[360px]'
              }`}
            >
              {/* Browser chrome header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-white/10 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-[11px] text-neutral-400 truncate max-w-[200px] sm:max-w-none">
                  {project.liveUrl || 'https://client-preview.gekdesign.com.au'}
                </span>
                {project.uptimeSla ? (
                  <span className="text-[10px] font-mono text-emerald-400" title={project.uptimeSla.detail}>
                    {project.uptimeSla.label}
                  </span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-blue-400 tracking-wider">{project.status}</span>
                  <h4 className="font-display text-2xl font-bold text-white">{project.title}</h4>
                  <p className="text-xs text-neutral-400 max-w-xl">{project.shortOutcome}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/10">
                  {project.deliverables.slice(0, 4).map((d) => (
                    <div key={d} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-neutral-500">{project.stack.join(' · ')}</span>
                  <button
                    onClick={onStartProject}
                    className="inline-flex items-center gap-1 text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors cursor-pointer"
                  >
                    <span>Request Technical Deck</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design System & Tokens */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">04. Brand & Design System</h2>
            <h3 className="font-display text-2xl font-bold text-white">Typography & Colour</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl">
            {/* Color Swatches */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-400">Color Palette</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.designSystem.palette.map((color) => (
                  <div key={color.hex} className="space-y-2">
                    <div
                      className="h-16 rounded-md border border-white/15 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-medium text-white block">{color.name}</span>
                      <span className="text-[11px] font-mono text-neutral-400">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-400">Typography System</span>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-neutral-500 text-xs block">Display Font:</span>
                  <span className="font-display text-xl text-white font-bold">{project.designSystem.fontDisplay}</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-xs block">Body Prose:</span>
                  <span className="text-neutral-300">{project.designSystem.fontBody}</span>
                </div>
                <p className="text-xs text-neutral-400 pt-2 border-t border-white/10">
                  {project.designSystem.designNotes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Endorsement */}
        {project.testimonial && (
          <div className="p-8 sm:p-12 rounded-xl bg-neutral-900 border border-white/10 space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">05. Client Verdict</div>
            <p className="font-display text-xl sm:text-2xl text-white leading-relaxed">
              "{project.testimonial.quote}"
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center font-bold text-white text-sm">
                {project.testimonial.author[0]}
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">{project.testimonial.author}</span>
                <span className="text-xs text-neutral-400">
                  {project.testimonial.role}, {project.testimonial.company}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Next Project Navigator */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <button
            onClick={() => onSelectProject(nextProject)}
            className="group text-left space-y-1 focus:outline-none cursor-pointer"
          >
            <span className="text-xs font-mono text-neutral-500 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
              <span>Next Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="font-display text-2xl font-bold text-white group-hover:text-neutral-300 transition-colors">
              {nextProject.title}
            </div>
            <span className="text-xs text-neutral-400 block">{nextProject.client} · {nextProject.industry}</span>
          </button>

          <button
            onClick={onStartProject}
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
          >
            Start Your Project
          </button>
        </div>
      </article>
    </div>
  );
};
