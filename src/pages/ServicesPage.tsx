import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Layers, Sparkles, Sliders } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/services';

interface ServicesPageProps {
  onStartProject: (initialService?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onStartProject }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('web-design');
  // Interactive Scope Estimator state
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([
    'Web Design',
    'Web Development',
  ]);

  const activeService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const allCapabilities = [
    { name: 'Brand Strategy & Messaging', baseWeeks: 1.5, tier: 'Strategy' },
    { name: 'Web Design & Art Direction', baseWeeks: 2, tier: 'Design' },
    { name: 'Full-Stack Web Development', baseWeeks: 2.5, tier: 'Engineering' },
    { name: 'Headless E-commerce (Shopify Plus)', baseWeeks: 3, tier: 'Commerce' },
    { name: '3D Configurator / Custom WebGL', baseWeeks: 2, tier: 'Creative Tech' },
    { name: 'Design System & Component Library', baseWeeks: 1.5, tier: 'Design' },
    { name: 'Technical SEO & Performance Audit', baseWeeks: 0.5, tier: 'Engineering' },
  ];

  const toggleDiscipline = (name: string) => {
    if (selectedDisciplines.includes(name)) {
      if (selectedDisciplines.length > 1) {
        setSelectedDisciplines(selectedDisciplines.filter((d) => d !== name));
      }
    } else {
      setSelectedDisciplines([...selectedDisciplines, name]);
    }
  };

  // Calculate estimated duration
  const totalWeeks = Math.max(
    2,
    Math.round(
      selectedDisciplines.reduce((acc, curr) => {
        const item = allCapabilities.find((c) => c.name === curr);
        return acc + (item ? item.baseWeeks * 0.75 : 1);
      }, 1)
    )
  );

  return (
    <div className="pt-32 sm:pt-40 pb-24 space-y-20 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Header */}
      <div className="space-y-6 max-w-4xl">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Core Capabilities</span>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          Services & Technical Craft
        </h1>
        <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
          We do not sell generic hours or off-the-shelf templates. We deliver transformational digital assets with measurable commercial outcomes.
        </p>
      </div>

      {/* Services Grid with Interactive Detail Explorer */}
      <div className="space-y-8">
        {/* Discipline Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-white/10">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedServiceId(s.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                selectedServiceId === s.id
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {s.number}. {s.title}
            </button>
          ))}
        </div>

        {/* Selected Discipline Deep-Dive Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-8 sm:p-12 space-y-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400">{activeService.number} / {activeService.tagline}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                {activeService.title}
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs font-mono text-neutral-500 block">Typical Delivery</span>
                <span className="font-display text-lg font-bold text-white">{activeService.timeline}</span>
              </div>
              <button
                onClick={() => onStartProject(activeService.title)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
              >
                Inquire for {activeService.title}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Description & Business Impact */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Outcome & Methodology</h3>
                <p className="text-base text-neutral-300 leading-relaxed font-normal">
                  {activeService.outcomeDescription}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-xs font-mono text-blue-400 uppercase tracking-wider">Business Impact</h4>
                <p className="text-sm text-neutral-200">
                  {activeService.businessImpact}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">Ideal For</span>
                <p className="text-xs text-neutral-300">
                  {activeService.idealFor}
                </p>
              </div>
            </div>

            {/* Right: Deliverables & Tech */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Core Deliverables</h3>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {activeService.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2.5 p-2 rounded-md bg-white/5 border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-neutral-500 block">Tools & Tech Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeService.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-neutral-900 border border-white/10 text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Project Scope Estimator */}
      <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#121216] to-[#0A0A0C] p-8 sm:p-12 space-y-8">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
          <Sliders className="w-4 h-4" />
          <span>Interactive Estimator</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Scope & Timeline Estimator
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl">
            Select the capabilities your upcoming initiative requires to evaluate estimated timeline parameters and resource allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allCapabilities.map((cap) => {
            const isSelected = selectedDisciplines.includes(cap.name);
            return (
              <button
                key={cap.name}
                onClick={() => toggleDiscipline(cap.name)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-500/50 bg-blue-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">{cap.tier}</span>
                  <span className="text-xs font-medium block">{cap.name}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    isSelected ? 'border-blue-400 bg-blue-500 text-white' : 'border-white/20'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Estimation Readout */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-400">Estimated Project Trajectory</span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              ~{totalWeeks} Weeks <span className="text-sm font-normal text-neutral-400">({selectedDisciplines.length} Integrated Capabilities)</span>
            </div>
            <p className="text-xs text-neutral-500">
              Includes Discover, UX Architecture, Iterative Design, Production Build & QA Launch phases.
            </p>
          </div>

          <button
            onClick={() => onStartProject(`Scope: ${selectedDisciplines.join(', ')}`)}
            className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Inquire with this Scope
          </button>
        </div>
      </div>

      {/* Engagement Models */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Partnership Structures</span>
          <h2 className="font-display text-3xl font-bold text-white">Three Ways to Work With Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl border border-white/10 bg-[#0C0C0E] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-500">Structure 01</span>
              <h3 className="font-display text-xl font-bold text-white">Strategic Project Sprint</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Focused sprint for a specific, high-stakes objective: website redesign, MVP application launch, or brand re-positioning.
              </p>
              <ul className="space-y-2 text-xs text-neutral-400 pt-2 border-t border-white/10">
                <li>· Fixed scope, timeline, and budget</li>
                <li>· 2 to 4 weeks delivery</li>
                <li>· Dedicated senior design & dev team</li>
              </ul>
            </div>
            <button
              onClick={() => onStartProject('Sprint Model')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            >
              Select Sprint
            </button>
          </div>

          <div className="p-8 rounded-xl border border-blue-500/40 bg-blue-500/5 space-y-6 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-blue-600 text-white font-semibold">
              Most Popular
            </span>
            <div className="space-y-4">
              <span className="text-xs font-mono text-blue-400">Structure 02</span>
              <h3 className="font-display text-xl font-bold text-white">Flagship Digital Platform</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Comprehensive digital transformation. End-to-end strategy, custom design system, headless commerce, 3D WebGL, and global localization.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-white/10">
                <li>· Complete brand & full-stack development</li>
                <li>· 4 to 8 weeks delivery</li>
                <li>· Full post-launch CRO & support</li>
              </ul>
            </div>
            <button
              onClick={() => onStartProject('Flagship Platform')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
            >
              Commission Flagship
            </button>
          </div>

          <div className="p-8 rounded-xl border border-white/10 bg-[#0C0C0E] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-500">Structure 03</span>
              <h3 className="font-display text-xl font-bold text-white">Quarterly Studio Retainer</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Ongoing embedded creative and engineering partnership. Ideal for post-Series A/B companies requiring continuous velocity.
              </p>
              <ul className="space-y-2 text-xs text-neutral-400 pt-2 border-t border-white/10">
                <li>· Dedicated hours per month</li>
                <li>· Bi-weekly sprint deployments</li>
                <li>· Direct Slack & Linear integration</li>
              </ul>
            </div>
            <button
              onClick={() => onStartProject('Quarterly Retainer')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            >
              Inquire for Retainer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
