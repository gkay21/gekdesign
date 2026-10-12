import React, { useState } from 'react';
import { Check, CheckCircle2, ArrowRight, ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';
import {
  buildMailerPayload,
  sendToMailer,
  validateContactBrief,
  type ContactBrief,
  type ContactField,
  type ContactFieldErrors,
} from '../lib/contact';

const INPUT_CLASS =
  'w-full px-4 py-2.5 bg-white/5 border rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none';
const inputClass = (hasError: boolean) =>
  `${INPUT_CLASS} ${hasError ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-white/30'}`;

interface ContactPageProps {
  initialService?: string;
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialService, onNavigateHome }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : ['Web Design & Art Direction', 'Full-Stack Web Development']
  );
  const [selectedBudget, setSelectedBudget] = useState<string>('$50,000 – $100,000');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('4 – 6 Weeks');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submitError, setSubmitError] = useState<string>('');

  const availableServices = [
    'Web Design & Art Direction',
    'Full-Stack Web Development',
    'Brand Strategy & Positioning',
    'UI/UX & Product Design',
    'Headless E-commerce (Shopify Plus)',
    '3D WebGL & Creative Direction',
  ];

  const budgetTiers = [
    { label: '< $25,000', note: 'Focused design or audit sprint' },
    { label: '$25,000 – $50,000', note: 'Standard custom website redesign' },
    { label: '$50,000 – $100,000', note: 'Comprehensive digital flagship & branding' },
    { label: '$100,000+', note: 'Enterprise platform, 3D WebGL & continuous retainer' },
  ];

  const timelines = [
    { label: 'Immediate (< 2 weeks)', note: 'Expedited dedicated sprint' },
    { label: '2 – 4 Weeks', note: 'Standard project velocity' },
    { label: '4 – 6 Weeks', note: 'Flagship build with discovery' },
    { label: 'Flexible / Q1 2027', note: 'Planning phase' },
  ];

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field as ContactField]) {
      setFieldErrors({ ...fieldErrors, [field]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const brief: ContactBrief = {
      ...formData,
      services: selectedServices,
      budget: selectedBudget,
      timeline: selectedTimeline,
    };
    const errors = validateContactBrief(brief);
    setFieldErrors(errors);
    setSubmitError('');
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await sendToMailer(buildMailerPayload(brief));
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 space-y-16 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-400">Start an Initiative</span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
          Let’s build something extraordinary.
        </h1>
        <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
          Tell us about your brand vision, requirements, and target timeline. We will review your briefing and respond within 24 business hours.
        </p>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Form Multi-Step Wizard (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#0C0C0E] p-6 sm:p-12 space-y-10">
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                  1
                </span>
                <span className={step >= 1 ? 'text-white' : 'text-neutral-500'}>Services</span>
              </div>
              <div className="w-12 h-[1px] bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                  2
                </span>
                <span className={step >= 2 ? 'text-white' : 'text-neutral-500'}>Scope & Budget</span>
              </div>
              <div className="w-12 h-[1px] bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                  3
                </span>
                <span className={step >= 3 ? 'text-white' : 'text-neutral-500'}>Details</span>
              </div>
            </div>

            {/* Step 1: Select Services */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h2 className="font-display text-2xl font-bold text-white">What capabilities do you require?</h2>
                  <p className="text-xs text-neutral-400">Select all that apply to your upcoming initiative.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableServices.map((svc) => {
                    const isSelected = selectedServices.includes(svc);
                    return (
                      <button
                        type="button"
                        key={svc}
                        aria-pressed={isSelected}
                        onClick={() => toggleService(svc)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-500/60 bg-blue-500/10 text-white font-medium'
                            : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xs">{svc}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'border-blue-400 bg-blue-500 text-white' : 'border-white/20'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Next: Budget & Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget & Timeline */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                {/* Budget */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="font-display text-2xl font-bold text-white">What is your expected investment tier?</h2>
                    <p className="text-xs text-neutral-400">This helps us allocate the proper senior team & resources.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {budgetTiers.map((b) => (
                      <button
                        type="button"
                        key={b.label}
                        aria-pressed={selectedBudget === b.label}
                        onClick={() => setSelectedBudget(b.label)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedBudget === b.label
                            ? 'border-blue-500/60 bg-blue-500/10 text-white font-medium'
                            : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <div className="font-display text-sm font-bold block">{b.label}</div>
                        <span className="text-[11px] text-neutral-400">{b.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-white">Target launch window?</h3>
                    <p className="text-xs text-neutral-400">When does the digital platform need to be live?</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timelines.map((t) => (
                      <button
                        type="button"
                        key={t.label}
                        aria-pressed={selectedTimeline === t.label}
                        onClick={() => setSelectedTimeline(t.label)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedTimeline === t.label
                            ? 'border-blue-500/60 bg-blue-500/10 text-white font-medium'
                            : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <div className="font-display text-sm font-bold block">{t.label}</div>
                        <span className="text-[11px] text-neutral-400">{t.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Services</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Vision Details */}
            {step === 3 && (
              <form onSubmit={handleSubmit} noValidate className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h2 className="font-display text-2xl font-bold text-white">Your details & project vision</h2>
                  <p className="text-xs text-neutral-400">Our principals will review this briefing prior to our introductory call.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-neutral-300">Your Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      aria-invalid={Boolean(fieldErrors.name)}
                      placeholder="e.g. Jane Smith"
                      className={inputClass(Boolean(fieldErrors.name))}
                    />
                    {fieldErrors.name && <p className="text-[11px] font-mono text-red-400">{fieldErrors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-neutral-300">Work Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      aria-invalid={Boolean(fieldErrors.email)}
                      placeholder="e.g. jane@company.com"
                      className={inputClass(Boolean(fieldErrors.email))}
                    />
                    {fieldErrors.email && <p className="text-[11px] font-mono text-red-400">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-company" className="text-xs font-mono text-neutral-300">Company / Brand Name</label>
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="e.g. Your Company Pty Ltd"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-website" className="text-xs font-mono text-neutral-300">Current Website / Deck URL</label>
                    <input
                      id="contact-website"
                      type="url"
                      autoComplete="url"
                      value={formData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-neutral-300">Brief Overview of Goals & Challenges</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Describe your current site limitations, desired outcomes, key milestones, or specific reference sites you admire..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                {submitError && (
                  <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                    {submitError}
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Budget</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/20 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                  >
                    {isSubmitting ? 'Sending Brief…' : 'Submit Project Brief'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Live Brief Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Brief Summary</span>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-neutral-500 block">Requested Disciplines:</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {selectedServices.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-neutral-500 block">Target Investment:</span>
                  <span className="font-semibold text-white font-mono text-sm">{selectedBudget}</span>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-neutral-500 block">Timeline Window:</span>
                  <span className="font-semibold text-white font-mono text-sm">{selectedTimeline}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>SLA: 24h Response by Senior Director</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Strict NDA upon request</span>
                </div>
              </div>
            </div>

            {/* Direct Contacts Card */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 space-y-4 text-xs">
              <span className="text-neutral-400 font-mono uppercase block">Direct Studio Dispatch</span>
              <div className="space-y-2 text-neutral-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:george@gekdesign.com.au" className="hover:text-white">george@gekdesign.com.au</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href="tel:+61400424449" className="hover:text-white font-mono">+61 400 424 449</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Sydney, Australia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Submission Success View */
        <div className="max-w-2xl mx-auto rounded-3xl border border-white/15 bg-gradient-to-b from-[#141418] to-[#0A0A0C] p-10 sm:p-16 text-center space-y-8 animate-fade-in shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Brief Successfully Received</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Thank you, {formData.name || 'there'}.
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
              Our principal George and the design leadership have received your brief. We will review your project parameters and send an initial evaluation to <span className="text-white font-mono">{formData.email}</span> within 24 hours.
            </p>
          </div>

          <button
            onClick={onNavigateHome}
            className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
          >
            Return to Studio Homepage
          </button>
        </div>
      )}
    </div>
  );
};
