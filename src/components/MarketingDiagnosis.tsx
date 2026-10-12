/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HarryMascot } from './HarryMascot';
import { DiagnosticState, DiagnosticResult, LeadData } from '../types';
import { saveLead, generateWhatsAppLeadLink, OFFICIAL_WHATSAPP_LINK } from '../utils/leadStore';
import { trackEvent } from '../utils/analytics';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  MessageCircle,
  FileText,
  Building2,
  Phone,
  Mail,
  User,
} from 'lucide-react';

interface MarketingDiagnosisProps {
  onOpenAuditModal: () => void;
}

export const MarketingDiagnosis: React.FC<MarketingDiagnosisProps> = ({ onOpenAuditModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<DiagnosticState>({
    objective: '',
    currentChannels: [],
    biggestProblem: '',
    budgetRange: '',
    businessType: '',
    website: '',
  });

  const [leadForm, setLeadForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadData | null>(null);

  // Question definitions
  const OBJECTIVES = [
    'Qualified leads',
    'Build a complete marketing system',
    'Improve advertising (Meta/Google)',
    'Social growth & brand authority',
    'Improve website conversions',
    'Online sales (Ecommerce)',
    'Brand awareness',
  ];

  const CHANNELS = [
    'Social Media (Organic)',
    'Meta Ads (FB/IG)',
    'Google Ads (Search/PMax)',
    'Website / Landing Pages',
    'SEO',
    'Email Marketing',
    'None consistently',
  ];

  const PROBLEMS = [
    'Leads are low volume',
    'Lead quality is poor / tire-kickers',
    'Ads get clicks but no conversions',
    'Our follow-up / CRM is messy',
    'Low traffic / low awareness',
    'Content views without business inquiries',
    'Unreliable tracking & attribution',
    'Not sure / need an outside eye',
  ];

  const BUDGETS = [
    'Under ₹25,000 / month',
    '₹25,000 - ₹75,000 / month',
    '₹75,000 - ₹2,00,000 / month',
    '₹2,00,000+ / month',
  ];

  const BUSINESS_TYPES = [
    'B2B / Corporate Services',
    'B2C Service Business',
    'Ecommerce / Direct to Consumer',
    'Local / Clinic / Brick & Mortar',
    'Education / Coaching / Real Estate',
    'Other',
  ];

  const toggleChannel = (ch: string) => {
    setAnswers((prev) => {
      const exists = prev.currentChannels.includes(ch);
      const updated = exists
        ? prev.currentChannels.filter((c) => c !== ch)
        : [...prev.currentChannels, ch];
      return { ...prev, currentChannels: updated };
    });
  };

  // Rule-based diagnostic algorithm
  const computeDiagnosis = (): DiagnosticResult => {
    const { biggestProblem, objective } = answers;

    if (biggestProblem.includes('clicks but no conversions') || objective.includes('conversions')) {
      return {
        bottleneck: 'Landing Page & Message Match Friction',
        recommendedService: 'Performance Marketing + Landing Page CRO Review',
        areasToInvestigate: ['Offer clarity', 'Ad-to-page message match', 'Page load speed', 'Form field count'],
        summary: 'Your traffic interest is validated, but visitors encounter hesitation or friction at the destination.',
        suggestedAction: 'Review landing page headline, mobile speed, and value proposition clarity.',
      };
    }

    if (biggestProblem.includes('Lead quality is poor')) {
      return {
        bottleneck: 'Targeting Qualification & Lead Form Design',
        recommendedService: 'Performance Marketing (Targeting Refinement)',
        areasToInvestigate: ['Form qualification friction', 'Offer pricing signals', 'CRM sales feedback loop'],
        summary: 'Current campaigns may be over-optimizing for cheap submissions rather than high-intent buyers.',
        suggestedAction: 'Add 1-2 qualifying filter questions to lead forms and exclude broad curiosity audiences.',
      };
    }

    if (biggestProblem.includes('follow-up') || biggestProblem.includes('CRM')) {
      return {
        bottleneck: 'Lead Nurture & Operational Pipeline Automation',
        recommendedService: 'Marketing Automation & CRM Systems',
        areasToInvestigate: ['Speed to lead', 'Instant WhatsApp notifications', 'Drip email sequences'],
        summary: 'Qualified buyers are losing momentum due to delayed initial outreach.',
        suggestedAction: 'Deploy automated instant notifications to sales and 24/7 lead routing.',
      };
    }

    if (objective.includes('complete marketing system') || answers.currentChannels.length >= 3) {
      return {
        bottleneck: 'System Disconnection & Attribution Silos',
        recommendedService: 'Full Digital Marketing Architecture',
        areasToInvestigate: ['Central CRM attribution', 'Sequential retargeting', 'Cross-channel brand messaging'],
        summary: 'Multiple marketing levers are active simultaneously without a unifying data architecture.',
        suggestedAction: 'Connect ads, organic social, and website into a single automated attribution engine.',
      };
    }

    if (objective.includes('Social growth') || biggestProblem.includes('Content views')) {
      return {
        bottleneck: 'Commercial Intent & Content-to-Offer Bridge',
        recommendedService: 'Social Media Marketing',
        areasToInvestigate: ['Problem-aware content pillars', 'Direct-response CTAs', 'Bio funnel conversion'],
        summary: 'Content is generating superficial reach but lacking explicit bridges to commercial enquiries.',
        suggestedAction: 'Re-align content pillars around high-friction buyer problems and optimize profile bios.',
      };
    }

    // Default recommendation
    return {
      bottleneck: 'Targeted Demand Capture & Acquisition Architecture',
      recommendedService: 'Performance Marketing + Funnel Audit',
      areasToInvestigate: ['Channel selection', 'Offer positioning', 'Conversion tracking', 'Audience segmentation'],
      summary: 'Inconsistent acquisition makes monthly growth unpredictable.',
      suggestedAction: 'Conduct a systematic audit of your primary customer journey and competitor positioning.',
    };
  };

  const diagnosis = computeDiagnosis();

  const handleNextStep = () => {
    if (currentStep === 1 && !answers.objective) return;
    if (currentStep === 2 && answers.currentChannels.length === 0) return;
    if (currentStep === 3 && !answers.biggestProblem) return;
    if (currentStep === 4 && !answers.budgetRange) return;
    if (currentStep === 5 && !answers.businessType) return;

    if (currentStep === 6) {
      trackEvent('diagnosis_completed', {
        objective: answers.objective,
        biggestProblem: answers.biggestProblem,
        bottleneck: diagnosis.bottleneck,
      });
      setCurrentStep(7); // Results step
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    const saved = saveLead({
      name: leadForm.name,
      businessName: leadForm.businessName || 'Business Owner',
      email: leadForm.email,
      phone: leadForm.phone,
      website: answers.website,
      businessType: answers.businessType,
      objective: answers.objective,
      currentChannels: answers.currentChannels,
      biggestProblem: answers.biggestProblem,
      budgetRange: answers.budgetRange,
      recommendedService: diagnosis.recommendedService,
      notes: leadForm.notes,
      source: 'marketing_diagnosis_tool',
    });

    setSubmittedLead(saved);
    setIsSubmitted(true);
  };

  return (
    <section id="diagnosis" className="py-20 lg:py-28 bg-[#090A0D] border-b border-neutral-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Box */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F97316] mb-3 bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Growth Diagnostic</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            WHAT'S ACTUALLY HOLDING BACK YOUR GROWTH?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Answer a few quick questions and we'll suggest where your business may want to
            investigate first.
          </p>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
            * Pragmatic assessment tool — not an automated guarantee.
          </span>
        </div>

        {/* Diagnostic Wizard Container */}
        <div className="bg-[#121318] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Progress Header (Steps 1 to 6) */}
          {currentStep <= 6 && (
            <div className="mb-8 border-b border-neutral-800/80 pb-5">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>QUESTION {currentStep} OF 6</span>
                <span className="text-[#F97316] font-bold">
                  {Math.round((currentStep / 6) * 100)}% COMPLETE
                </span>
              </div>
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F97316] transition-all duration-300"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* QUESTION 1: Objective */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-mono font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  What is your primary marketing objective right now?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OBJECTIVES.map((obj) => (
                  <button
                    key={obj}
                    onClick={() => {
                      setAnswers({ ...answers, objective: obj });
                      handleNextStep();
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.objective === obj
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-[#14151B]'
                    }`}
                  >
                    <span className="text-sm font-semibold">{obj}</span>
                    {answers.objective === obj && <CheckCircle2 className="w-4 h-4 text-[#F97316]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 2: Current Channels */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-mono font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Which channels are currently active?
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Select all that apply.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHANNELS.map((ch) => {
                  const isSelected = answers.currentChannels.includes(ch);
                  return (
                    <button
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                          : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-[#14151B]'
                      }`}
                    >
                      <span className="text-sm font-semibold">{ch}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-neutral-700" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={answers.currentChannels.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-[#F97316] disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* QUESTION 3: Biggest Problem */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-mono font-bold text-sm">
                  3
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  What seems to be your biggest marketing bottleneck?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROBLEMS.map((prob) => (
                  <button
                    key={prob}
                    onClick={() => {
                      setAnswers({ ...answers, biggestProblem: prob });
                      handleNextStep();
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.biggestProblem === prob
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-[#14151B]'
                    }`}
                  >
                    <span className="text-sm font-semibold">{prob}</span>
                    {answers.biggestProblem === prob && <CheckCircle2 className="w-4 h-4 text-[#F97316]" />}
                  </button>
                ))}
              </div>

              <div className="flex justify-start pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>
            </div>
          )}

          {/* QUESTION 4: Monthly Budget */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-mono font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Approximate monthly marketing/ad budget?
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Helps gauge appropriate channel mechanics.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setAnswers({ ...answers, budgetRange: b });
                      handleNextStep();
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.budgetRange === b
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-[#14151B]'
                    }`}
                  >
                    <span className="text-sm font-semibold">{b}</span>
                    {answers.budgetRange === b && <CheckCircle2 className="w-4 h-4 text-[#F97316]" />}
                  </button>
                ))}
              </div>

              <div className="flex justify-start pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>
            </div>
          )}

          {/* QUESTION 5: Business Type */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-mono font-bold text-sm">
                  5
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  What category best describes your business?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    key={bt}
                    onClick={() => {
                      setAnswers({ ...answers, businessType: bt });
                      handleNextStep();
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.businessType === bt
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-[#14151B]'
                    }`}
                  >
                    <span className="text-sm font-semibold">{bt}</span>
                    {answers.businessType === bt && <CheckCircle2 className="w-4 h-4 text-[#F97316]" />}
                  </button>
                ))}
              </div>

              <div className="flex justify-start pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>
            </div>
          )}

          {/* QUESTION 6: Website (Optional) */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-mono font-bold text-sm">
                  6
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    What is your website or primary social handle?
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Optional — helps our strategists view your assets.</p>
                </div>
              </div>

              <div className="max-w-xl">
                <input
                  type="text"
                  placeholder="https://yourbrand.com or @yourhandle"
                  value={answers.website}
                  onChange={(e) => setAnswers({ ...answers, website: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D0E11] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] font-mono text-sm"
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-[#F97316]/20"
                >
                  <span>Generate My Diagnosis</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* RESULTS STEP (Step 7) */}
          {currentStep === 7 && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Diagnosis Outcome Card */}
              <div className="border border-neutral-800 bg-[#0E0F13] rounded-2xl p-6 sm:p-8 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#F97316] tracking-wider block mb-1">
                      Initial Diagnostic Finding
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {diagnosis.bottleneck}
                    </h3>
                  </div>
                  <div className="shrink-0">
                    <HarryMascot pose="harry-analyse" size="sm" />
                  </div>
                </div>

                <div className="py-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">
                      Summary Observation:
                    </span>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {diagnosis.summary}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#14151B] border border-neutral-800/80">
                    <span className="text-xs font-mono uppercase text-[#F97316] font-bold block mb-1">
                      Recommended MarketMe Starting Point:
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {diagnosis.recommendedService}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">
                      Key Areas Worth Investigating:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {diagnosis.areasToInvestigate.map((area, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-700/80 text-xs font-mono text-neutral-300"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Audit Request Form */}
                {!isSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="pt-6 border-t border-neutral-800 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>Get Your Detailed Free Audit Report</span>
                        <Sparkles className="w-4 h-4 text-[#F97316]" />
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Leave your details below. A MarketMe growth strategist will inspect your
                        digital footprint and share tailored recommendations.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-xs text-neutral-400 mb-1 block">Your Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121318] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-neutral-400 mb-1 block">Business Name *</label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                          <input
                            type="text"
                            required
                            placeholder="Acme Brands"
                            value={leadForm.businessName}
                            onChange={(e) => setLeadForm({ ...leadForm, businessName: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121318] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-neutral-400 mb-1 block">Phone / WhatsApp *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                          <input
                            type="tel"
                            required
                            placeholder="9321856109"
                            value={leadForm.phone}
                            onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121318] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-neutral-400 mb-1 block">Work Email</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                          <input
                            type="email"
                            placeholder="you@business.com"
                            value={leadForm.email}
                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121318] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 mb-1 block">Specific notes or context (optional)</label>
                      <textarea
                        rows={2}
                        placeholder="What have you tried so far? Any specific timeline or goals?"
                        value={leadForm.notes}
                        onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs sm:text-sm"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#F97316]/25"
                      >
                        <span>SUBMIT FOR DETAILED AUDIT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={generateWhatsAppLeadLink({
                          businessName: leadForm.businessName || 'Business Owner',
                          objective: answers.objective,
                          biggestProblem: answers.biggestProblem,
                          budgetRange: answers.budgetRange,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-500" />
                        <span>Send to WhatsApp Directly</span>
                      </a>
                    </div>
                  </form>
                ) : (
                  <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      <div>
                        <h4 className="text-lg font-bold text-white">Audit Request Received!</h4>
                        <p className="text-xs text-neutral-300">
                          We've logged your diagnosis reference #{submittedLead?.leadId}.
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400">
                      Our marketing team will review your business parameters ({submittedLead?.businessName}) and follow up via WhatsApp or email within 1 business day.
                    </p>

                    <div className="pt-2">
                      <a
                        href={generateWhatsAppLeadLink(submittedLead || {})}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Fast-Track on WhatsApp: 9321856109</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Reset button */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setIsSubmitted(false);
                  }}
                  className="text-xs font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Restart Diagnostic Questionnaire
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
