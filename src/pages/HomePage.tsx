import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, CheckCircle2, ChevronRight, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';
import { SERVICES, PROCESS_STEPS, CREDIBILITY_METRICS } from '../data/services';
import { CardLink } from '../components/CardLink';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { projectPath } from '../paths';
import studioWorkspace from '../assets/images/studio_creative_workspace_1790321300104.jpg?responsive';

interface HomePageProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (page: string) => void;
  onStartProject: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProject,
  onNavigate,
  onStartProject,
}) => {
  const [activeHeroTab, setActiveHeroTab] = useState<number>(0);
  const [heroDevice, setHeroDevice] = useState<'desktop' | 'mobile'>('desktop');

  const featuredProjects = PROJECTS.slice(0, 4);
  const activeProject = featuredProjects[activeHeroTab] || featuredProjects[0];

  return (
    <div className="space-y-24 sm:space-y-36 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 overflow-hidden">
        {/* Subtle architectural ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-12">
          {/* Top Editorial Kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Creative Web Design & Full-Stack Engineering Agency</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Sydney, Australia</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 max-w-5xl">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] text-balance">
              Websites built to make brands <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">impossible to ignore.</span>
            </h1>

            <p className="text-lg sm:text-2xl text-neutral-300 font-normal max-w-3xl leading-relaxed text-balance">
              We combine strategic rigor, distinctive editorial design, and modern engineering to build high-performing digital experiences that command commercial authority.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('work')}
              className="px-6 sm:px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/20 cursor-pointer flex items-center gap-2 group active:scale-[0.98]"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onStartProject}
              className="px-6 sm:px-8 py-3.5 text-sm font-semibold text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Start a Project
            </button>
          </div>

          {/* Interactive Project Preview Deck */}
          <div className="pt-10">
            <div className="rounded-2xl border border-white/10 bg-[#0C0C0E] overflow-hidden shadow-2xl">
              {/* Preview Navigation Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-white/10 px-4 py-3 bg-neutral-900/80 gap-3">
                {/* Project selector tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
                  {featuredProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveHeroTab(idx)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                        activeHeroTab === idx
                          ? 'bg-white/15 text-white shadow-xs'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                      }`}
                    >
                      {p.client}
                    </button>
                  ))}
                </div>

                {/* Device viewport toggle */}
                <div className="flex items-center justify-end gap-3">
                  <div className="hidden sm:flex items-center gap-1 p-0.5 bg-black/40 rounded-md border border-white/10 text-xs">
                    <button
                      onClick={() => setHeroDevice('desktop')}
                      className={`p-1.5 rounded cursor-pointer ${heroDevice === 'desktop' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'}`}
                      aria-label="Desktop Preview"
                      title="Desktop Preview"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setHeroDevice('mobile')}
                      className={`p-1.5 rounded cursor-pointer ${heroDevice === 'mobile' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'}`}
                      aria-label="Mobile Preview"
                      title="Mobile Preview"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <CardLink
                    href={projectPath(activeProject.slug)}
                    onNavigate={() => onSelectProject(activeProject)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </CardLink>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="relative bg-neutral-950 p-4 sm:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[500px]">
                <CardLink
                  href={projectPath(activeProject.slug)}
                  onNavigate={() => onSelectProject(activeProject)}
                  tabIndex={-1}
                  className={`block transition-all duration-500 overflow-hidden rounded-xl border border-white/10 shadow-2xl relative group cursor-pointer ${
                    heroDevice === 'desktop' ? 'w-full max-w-5xl' : 'w-[320px]'
                  }`}
                >
                  <ResponsiveImage
                    picture={activeProject.heroImage}
                    alt={activeProject.title}
                    sizes="(min-width: 1100px) 1024px, 100vw"
                    priority
                    className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Overlay banner with project details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 transition-opacity duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                        <span>{activeProject.client}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeProject.industry}</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {activeProject.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                        {activeProject.shortOutcome}
                      </p>
                    </div>
                  </div>
                </CardLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELECTED WORK (EDITORIAL GRID) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Selected Portfolio</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <button
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Explore All Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Varied Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
          {/* Card 1: Wide Marquee Card (Col 12) */}
          <CardLink
            href={projectPath(featuredProjects[0].slug)}
            onNavigate={() => onSelectProject(featuredProjects[0])}
            className="block md:col-span-12 group cursor-pointer rounded-2xl border border-white/10 bg-[#0C0C0E] overflow-hidden hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 overflow-hidden relative min-h-[320px] sm:min-h-[440px]">
                <ResponsiveImage
                  picture={featuredProjects[0].heroImage}
                  alt={featuredProjects[0].title}
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <span>{featuredProjects[0].client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredProjects[0].industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredProjects[0].year}</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {featuredProjects[0].title}
                  </h3>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {featuredProjects[0].shortOutcome}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-400">
                    {featuredProjects[0].services.map((s, idx) => (
                      <span key={s} className="inline-flex items-center">
                        <span>{s}</span>
                        {idx < featuredProjects[0].services.length - 1 && <span className="ml-2 text-neutral-600">/</span>}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="font-mono text-sm font-semibold text-white">
                    {featuredProjects[0].metrics[0].value} <span className="text-xs text-neutral-400 font-normal">{featuredProjects[0].metrics[0].label}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-300 group-hover:text-white">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>
          </CardLink>

          {/* Card 2: 7 cols */}
          <CardLink
            href={projectPath(featuredProjects[1].slug)}
            onNavigate={() => onSelectProject(featuredProjects[1])}
            className="md:col-span-7 group cursor-pointer rounded-2xl border border-white/10 bg-[#0C0C0E] overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="overflow-hidden relative h-72 sm:h-96">
              <ResponsiveImage
                picture={featuredProjects[1].heroImage}
                alt={featuredProjects[1].title}
                sizes="(min-width: 1280px) 700px, (min-width: 768px) 58vw, 100vw"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>{featuredProjects[1].client}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredProjects[1].industry}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {featuredProjects[1].title}
              </h3>
              <p className="text-neutral-300 text-sm">{featuredProjects[1].shortOutcome}</p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-xs">
                <span className="font-mono text-white font-semibold">
                  {featuredProjects[1].metrics[0].value} <span className="text-neutral-400 font-normal">{featuredProjects[1].metrics[0].label}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-mono text-neutral-400 group-hover:text-white">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </CardLink>

          {/* Card 3: 5 cols */}
          <CardLink
            href={projectPath(featuredProjects[2].slug)}
            onNavigate={() => onSelectProject(featuredProjects[2])}
            className="md:col-span-5 group cursor-pointer rounded-2xl border border-white/10 bg-[#0C0C0E] overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="overflow-hidden relative h-72 sm:h-96">
              <ResponsiveImage
                picture={featuredProjects[2].heroImage}
                alt={featuredProjects[2].title}
                sizes="(min-width: 1280px) 500px, (min-width: 768px) 42vw, 100vw"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>{featuredProjects[2].client}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredProjects[2].industry}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {featuredProjects[2].title}
              </h3>
              <p className="text-neutral-300 text-sm">{featuredProjects[2].shortOutcome}</p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-xs">
                <span className="font-mono text-white font-semibold">
                  {featuredProjects[2].metrics[0].value} <span className="text-neutral-400 font-normal">{featuredProjects[2].metrics[0].label}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-mono text-neutral-400 group-hover:text-white">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </CardLink>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Capabilities</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Services & Outcomes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Scope & Pricing Guide</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Capabilities in Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="p-8 rounded-xl border border-white/10 bg-[#0C0C0E] hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500 font-semibold">{svc.number}</span>
                  <span className="text-[11px] font-mono text-neutral-500">{svc.timeline}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs font-medium text-neutral-400">
                  {svc.tagline}
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {svc.outcomeDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono text-neutral-500 block">Deliverables include:</span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {svc.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AGENCY PHILOSOPHY & CREDIBILITY */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-8 sm:p-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Studio Philosophy</span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Where strategic thinking, distinctive design, and thoughtful engineering meet.
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                We believe the most memorable digital brands are not born from generic templates or vanity animations. They are forged through intentional restraint, deep commercial empathy, and clean code that performs effortlessly on every screen.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <span>Read our story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Studio Workspace Image */}
            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-white/10">
              <ResponsiveImage
                picture={studioWorkspace}
                alt="GEK Design Creative Studio"
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                className="w-full h-80 object-cover object-center"
              />
            </div>
          </div>

          {/* Credibility Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
            {CREDIBILITY_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <div className="font-display text-3xl sm:text-5xl font-bold text-white tabular-nums tracking-tight">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-neutral-200">{metric.label}</div>
                <div className="text-xs text-neutral-500">{metric.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="space-y-2 border-b border-white/10 pb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Methodology</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            How We Partner
          </h2>
          <p className="text-neutral-400 text-sm max-w-2xl">
            A battle-tested four-stage delivery model structured for momentum, clarity, and zero surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-8 rounded-xl border border-white/10 bg-[#0C0C0E] space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-mono text-2xl font-bold text-neutral-500">{step.step}</span>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">{step.name}</h3>
                <span className="text-xs font-mono text-neutral-400 block">{step.subtitle}</span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-2">Key Outputs:</span>
                <ul className="space-y-1 text-xs text-neutral-400">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#141418] to-[#0A0A0C] p-10 sm:p-20 text-center space-y-8 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-600/5 blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Next Step</span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Have a project in mind?
            </h2>
            <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              We partner with visionary founders, global brands, and high-growth companies. Let’s create something impossible to ignore.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <button
              onClick={onStartProject}
              className="px-8 py-4 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-xl shadow-blue-600/20 cursor-pointer active:scale-[0.98]"
            >
              Start a Project
            </button>
            <a
              href="mailto:george@gekdesign.com.au"
              className="px-8 py-4 text-sm sm:text-base font-semibold text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
            >
              Email Us Directly
            </a>
          </div>

          <div className="pt-6 text-xs text-neutral-500 font-mono relative z-10">
            Typical response within 24 hours · Currently booking Q4 & Q1 projects
          </div>
        </div>
      </section>
    </div>
  );
};
