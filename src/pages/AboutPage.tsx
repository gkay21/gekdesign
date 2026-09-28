import React from 'react';
import { ArrowRight, Award, Compass, HeartHandshake, ShieldCheck, Zap } from 'lucide-react';
import studioWorkspace from '../assets/images/studio_creative_workspace_1790321300104.jpg';

interface AboutPageProps {
  onStartProject: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartProject }) => {
  const leadership = [
    {
      name: 'George El-Khoury',
      role: 'Founder & Design Director',
      bio: 'Over a decade leading bespoke web design, commercial brand architectures, and high-performance digital flagships for ambitious brands and global institutions.',
      initials: 'GEK',
      location: 'Sydney, Australia'
    },
  ];

  const values = [
    {
      icon: Compass,
      title: 'Craft Over Templates',
      description: 'We reject generic UI kits and cookie-cutter themes. Every brand carries a unique commercial narrative that deserves a bespoke visual and architectural solution.'
    },
    {
      icon: ShieldCheck,
      title: 'Commercial Rigor',
      description: 'Aesthetic excellence is only half the mandate. If an interface does not convert visitors into high-value clients or revenue, the design has failed.'
    },
    {
      icon: Zap,
      title: 'Performance as an Aesthetic',
      description: 'Bloated scripts and sluggish transitions degrade user trust. We treat sub-second load times and 60fps frame rates as fundamental design principles.'
    },
    {
      icon: HeartHandshake,
      title: 'Direct Maker Access',
      description: 'We do not employ layers of account executives. Our clients communicate directly with the senior designers and engineers executing the work.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-40 pb-24 space-y-24 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Header */}
      <div className="space-y-6 max-w-4xl">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">About GEK Design</span>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          We believe the best digital experiences are built at the intersection of taste and engineering.
        </h1>
        <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
          Founded in 2015 in Sydney, Australia, GEK Design is an independent creative web design and development agency. We collaborate with visionary founders and global leaders to build web platforms and brand systems that command industry attention.
        </p>
      </div>

      {/* Studio Workspace Showcase */}
      <div className="rounded-2xl border border-white/10 overflow-hidden relative group">
        <img
          src={studioWorkspace}
          alt="GEK Design Creative Studio Workspace"
          referrerPolicy="no-referrer"
          className="w-full h-[360px] sm:h-[500px] object-cover object-center"
        />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-300 gap-2">
          <span>Design Direction & Creative Engineering — Sydney, Australia (HQ)</span>
          <span className="font-mono text-neutral-400">Available Globally</span>
        </div>
      </div>

      {/* Studio Values */}
      <div className="space-y-12">
        <div className="space-y-2 border-b border-white/10 pb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Our Ethos</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Principles That Govern Our Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="p-8 rounded-xl border border-white/10 bg-[#0C0C0E] space-y-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{v.title}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership */}
      <div className="space-y-12">
        <div className="space-y-2 border-b border-white/10 pb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Leadership</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">The Minds Behind the Studio</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader) => (
            <div key={leader.name} className="p-8 rounded-xl border border-white/10 bg-[#0C0C0E] space-y-5">
              <div className="w-16 h-16 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center font-display text-xl font-bold text-white">
                {leader.initials}
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-white">{leader.name}</h3>
                <span className="text-xs text-blue-400 font-mono block">{leader.role}</span>
                <span className="text-[11px] text-neutral-500 font-mono block">{leader.location}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Global Presence */}
      <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-white/10 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Reach & Availability</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Studio Presence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
          <div className="space-y-2 p-5 rounded-xl bg-white/5 border border-white/5">
            <h3 className="font-display text-base font-bold text-white">Sydney Studio (HQ)</h3>
            <p className="text-neutral-400">Sydney, Australia</p>
            <span className="text-neutral-300 font-mono block">+61 400 424 449</span>
            <span className="text-neutral-500 font-mono block">george@gekdesign.com.au</span>
          </div>
          <div className="space-y-2 p-5 rounded-xl bg-white/5 border border-white/5">
            <h3 className="font-display text-base font-bold text-white">Melbourne Studio</h3>
            <p className="text-neutral-400">Melbourne, Australia</p>
            <span className="text-neutral-500 font-mono block">melbourne@gekdesign.com.au</span>
          </div>
          <div className="space-y-2 p-5 rounded-xl bg-white/5 border border-white/5">
            <h3 className="font-display text-base font-bold text-white">International & Remote</h3>
            <p className="text-neutral-400">London & European Partners</p>
            <span className="text-neutral-500 font-mono block">london@gekdesign.com.au</span>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center border-t border-white/10">
          <span className="text-xs text-neutral-400">Ready to discuss your project?</span>
          <button
            onClick={onStartProject}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
          >
            Start a Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
