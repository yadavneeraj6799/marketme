/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HarryMascot } from './HarryMascot';
import { DiagnosticState, DiagnosticResult, LeadData } from '../types';
import {
  submitLeadToServer,
  generateWhatsAppLeadLink,
  SubmitResult,
} from '../utils/leadStore';
import { trackEvent } from '../utils/analytics';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  MessageCircle,
  Loader2,
  RefreshCw,
  Building2,
  Phone,
  Mail,
  User,
  ShieldCheck,
} from 'lucide-react';

interface MarketingDiagnosisProps {
  onOpenAuditModal: () => void;
}

export const MarketingDiagnosis: React.FC<MarketingDiagnosisProps> = ({
  onOpenAuditModal,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<DiagnosticState>({
    objective: '',
    currentChannels: [],
    biggestProblem: '',
    budgetRange: '', // Strictly set only when visitor chooses
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

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'pending' | 'success' | 'error' | 'duplicate'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [confirmedLead, setConfirmedLead] = useState<LeadData | null>(null);

  const OBJECTIVES = [
    'Qualified lead generation',
    'Build a connected marketing system',
    'Optimize paid ads (Meta & Google)',
    'Social media presence & credibility',
    'Improve website landing page conversion',
    'E-commerce customer acquisition',
  ];

  const CHANNELS = [
    'Organic Social Media',
    'Meta Ads (Instagram & Facebook)',
    'Google Ads (Search & PMax)',
    'Landing Pages / Website',
    'Email Marketing',
    'None consistently',
  ];

  const PROBLEMS = [
    'Lead volume is too low',
    'Lead quality is poor / tire-kickers',
    'Ads get clicks but fail to convert',
    'Follow-up and lead routing is messy',
    'Low traffic and market awareness',
    'Content views without inquiries',
    'Unreliable tracking and attribution',
  ];

  const BUDGETS = [
    'Under ₹25,000 / month',
    '₹25,000 to ₹75,000 / month',
    '₹75,000 to ₹2,00,000 / month',
    '₹2,00,000+ / month',
    'Prefer not to disclose yet',
  ];

  const BUSINESS_TYPES = [
    'B2B / Professional Services',
    'B2C Service / Local Business',
    'E-commerce Brand',
    'Coaching / Education',
    'Real Estate / High-Ticket',
    'Other Business',
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

  const computeDiagnosis = (): DiagnosticResult => {
    const { biggestProblem, objective } = answers;

    if (
      biggestProblem.includes('clicks but fail') ||
      objective.includes('landing page conversion')
    ) {
      return {
        bottleneck: 'Landing Page & Message Match Friction',
        recommendedService: 'Websites & Landing Page CRO Review',
        areasToInvestigate: [
          'Value proposition clarity',
          'Ad-to-page message match',
          'Mobile loading speed',
          'Friction in form fields',
        ],
        summary:
          'Your initial ad curiosity is validated, but visitors encounter hesitation or friction at the landing destination.',
        suggestedAction:
          'Inspect headline clarity, mobile page load latency, and form friction.',
      };
    }

    if (biggestProblem.includes('Lead quality is poor')) {
      return {
        bottleneck: 'Lead Qualification & Audience Calibration',
        recommendedService: 'Performance Marketing (Targeting & Filters)',
        areasToInvestigate: [
          'Form qualification friction',
          'Offer pricing transparency',
          'Audience exclusion lists',
          'CRM feedback loop to ad pixels',
        ],
        summary:
          'Your campaigns may be over-optimizing for cheap volume rather than high-intent buyers.',
        suggestedAction:
          'Introduce qualifying questions in lead forms and exclude broad curiosity audiences.',
      };
    }

    if (biggestProblem.includes('Follow-up')) {
      return {
        bottleneck: 'Lead Nurture & Operational Follow-Up',
        recommendedService: 'Marketing Automation & Pipeline Workflows',
        areasToInvestigate: [
          'Speed to lead response',
          'Instant WhatsApp alerts',
          'Automated nurture sequence',
          'Sales deal stages',
        ],
        summary:
          'Qualified prospects lose momentum because initial response time exceeds a few hours.',
        suggestedAction:
          'Set up automated WhatsApp notifications for your sales team the moment a lead arrives.',
      };
    }

    if (
      objective.includes('connected marketing') ||
      answers.currentChannels.length >= 3
    ) {
      return {
        bottleneck: 'Siloed Channels & Attribution Blindspots',
        recommendedService: 'Full Digital Marketing Growth Architecture',
        areasToInvestigate: [
          'Cross-channel attribution',
          'Sequential retargeting',
          'Central CRM alignment',
        ],
        summary:
          'Multiple channels are operating independently without a single data architecture uniting them.',
        suggestedAction:
          'Connect ads, social, and landers into one synchronized growth engine.',
      };
    }

    return {
      bottleneck: 'Inconsistent Acquisition & Demand Capture',
      recommendedService: 'Performance Marketing & Social Strategy',
      areasToInvestigate: [
        'Channel prioritization',
        'Offer positioning',
        'Conversion tracking setup',
        'Audience segmentation',
      ],
      summary:
        'Inconsistent marketing channels create unpredictable monthly revenue.',
      suggestedAction:
        'Audit your primary customer acquisition path and competitor positioning.',
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
      setCurrentStep(7);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const digitsOnly = leadForm.phone.replace(/\D/g, '');
    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      setPhoneError('Please enter a valid phone number (at least 8-10 digits).');
      return;
    }
    setPhoneError('');

    setSubmitStatus('pending');
    setErrorMessage('');

    const payload = {
      name: leadForm.name.trim(),
      businessName: leadForm.businessName.trim() || undefined,
      phone: leadForm.phone.trim(),
      email: leadForm.email.trim() || undefined,
      website: answers.website.trim() || undefined,
      businessType: answers.businessType || undefined,
      objective: answers.objective || undefined,
      currentChannels: answers.currentChannels,
      businessProblem: answers.biggestProblem,
      selectedService: diagnosis.recommendedService,
      budgetRange:
        answers.budgetRange === 'Prefer not to disclose yet'
          ? undefined
          : answers.budgetRange || undefined,
      notes: leadForm.notes.trim() || undefined,
      source: 'Marketing Diagnosis Tool',
    };

    const res: SubmitResult = await submitLeadToServer(payload);

    if (res.success && res.lead) {
      setConfirmedLead(res.lead);
      setSubmitStatus('success');
    } else if (res.duplicate) {
      setSubmitStatus('duplicate');
      setErrorMessage(
        res.error ||
          'We have already received an audit request with this number recently. Our team will contact you shortly.'
      );
    } else {
      setSubmitStatus('error');
      setErrorMessage(
        res.error ||
          'Could not connect to the server. Your request has not been sent yet.'
      );
    }
  };

  return (
    <section
      id="diagnosis"
      className="py-16 lg:py-24 bg-[#090A0D] border-b border-neutral-900 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F97316] mb-2.5 bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Diagnosis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What is holding back your marketing?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-300">
            Answer a few quick questions to identify where your marketing engine may be leaking
            revenue.
          </p>
        </div>

        {/* Questionnaire Box */}
        <div className="bg-[#121318] border border-neutral-800 rounded-2xl p-5 sm:p-9 shadow-2xl relative overflow-hidden">
          
          {/* Progress Indicator */}
          {currentStep <= 6 && (
            <div className="mb-6 border-b border-neutral-800/80 pb-4">
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

          {/* Q1: Objective */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                What is your primary commercial objective?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OBJECTIVES.map((obj) => (
                  <button
                    key={obj}
                    onClick={() => {
                      setAnswers({ ...answers, objective: obj });
                      handleNextStep();
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.objective === obj
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">{obj}</span>
                    {answers.objective === obj && (
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q2: Active Channels */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Which channels are currently active?
                </h3>
                <span className="text-xs text-neutral-400">Select all that apply.</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CHANNELS.map((ch) => {
                  const isSelected = answers.currentChannels.includes(ch);
                  return (
                    <button
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                          : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium">{ch}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-neutral-700" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={answers.currentChannels.length === 0}
                  className="px-5 py-2 rounded-xl bg-[#F97316] disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Q3: Bottleneck */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                What seems to be your biggest marketing bottleneck?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PROBLEMS.map((prob) => (
                  <button
                    key={prob}
                    onClick={() => {
                      setAnswers({ ...answers, biggestProblem: prob });
                      handleNextStep();
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.biggestProblem === prob
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">{prob}</span>
                    {answers.biggestProblem === prob && (
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>
            </div>
          )}

          {/* Q4: Budget Range (Strictly visitor-selected) */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Approximate monthly marketing / ad budget?
                </h3>
                <span className="text-xs text-neutral-400">
                  Used strictly to recommend channels that fit your testing capacity.
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setAnswers({ ...answers, budgetRange: b });
                      handleNextStep();
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.budgetRange === b
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">{b}</span>
                    {answers.budgetRange === b && (
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>
            </div>
          )}

          {/* Q5: Business Type */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                What category best describes your business?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    key={bt}
                    onClick={() => {
                      setAnswers({ ...answers, businessType: bt });
                      handleNextStep();
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      answers.businessType === bt
                        ? 'bg-[#181920] border-[#F97316] text-white ring-1 ring-[#F97316]/50'
                        : 'bg-[#0E0F13] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">{bt}</span>
                    {answers.businessType === bt && (
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>
            </div>
          )}

          {/* Q6: Website (Optional) */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  What is your website or primary social handle?
                </h3>
                <span className="text-xs text-neutral-400">
                  Optional — helps our strategists view your landing pages and active profiles.
                </span>
              </div>

              <div className="max-w-lg">
                <input
                  type="text"
                  placeholder="https://yourbrand.com or @yourhandle"
                  value={answers.website}
                  onChange={(e) =>
                    setAnswers({ ...answers, website: e.target.value })
                  }
                  className="w-full px-3.5 py-3 rounded-xl bg-[#0D0E11] border border-neutral-700 text-white placeholder-neutral-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-[#F97316]/20"
                >
                  <span>Generate Diagnostic Result</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Q7: Results & Real Lead Submission */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Finding Box */}
              <div className="border border-neutral-800 bg-[#0E0F13] rounded-2xl p-5 sm:p-7 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#F97316] tracking-wider block mb-1">
                      Identified Bottleneck
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {diagnosis.bottleneck}
                    </h3>
                  </div>
                  <div className="shrink-0">
                    <HarryMascot pose="harry-analyse" size="sm" />
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {diagnosis.summary}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#14151B] border border-neutral-800/80">
                    <span className="text-xs font-mono uppercase text-[#F97316] font-semibold block mb-1">
                      Recommended MarketMe Starting Point:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {diagnosis.recommendedService}
                    </p>
                  </div>
                </div>

                {/* Form or Confirmed State */}
                {submitStatus === 'success' && confirmedLead ? (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3 mt-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">
                      Audit Request Confirmed & Logged
                    </h4>
                    <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                      Thank you, {confirmedLead.name}. Your details have been received under reference{' '}
                      <span className="font-mono text-emerald-400 font-semibold">
                        {confirmedLead.leadId}
                      </span>
                      . A strategist will contact you within 1 business day.
                    </p>

                    <div className="pt-2">
                      <a
                        href={generateWhatsAppLeadLink(confirmedLead)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp (+91 9321856109)</span>
                      </a>
                    </div>
                  </div>
                ) : submitStatus === 'duplicate' ? (
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center space-y-2 mt-4">
                    <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Already Logged Recently</h4>
                    <p className="text-xs text-neutral-300">{errorMessage}</p>
                    <a
                      href={generateWhatsAppLeadLink({
                        selectedService: diagnosis.recommendedService,
                        businessProblem: answers.biggestProblem,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F97316] text-white font-bold text-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form
                    onSubmit={handleLeadSubmit}
                    className="pt-5 border-t border-neutral-800 space-y-3.5 mt-4"
                  >
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Send this diagnosis to our team for a free detailed review:
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        A MarketMe strategist will review your parameters and provide customized recommendations.
                      </p>
                    </div>

                    {/* Server Error Alert */}
                    {submitStatus === 'error' && (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 space-y-2 text-xs text-red-200">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <strong>Request Not Sent:</strong> {errorMessage}
                          </div>
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row gap-2">
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Retry Submission</span>
                          </button>
                          <a
                            href={generateWhatsAppLeadLink({
                              name: leadForm.name,
                              selectedService: diagnosis.recommendedService,
                              businessProblem: answers.biggestProblem,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Send via WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="diag-name"
                          className="text-xs font-medium text-neutral-300 mb-1 block"
                        >
                          Your Name <span className="text-[#F97316]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                          <input
                            id="diag-name"
                            type="text"
                            required
                            placeholder="Alex Morgan"
                            value={leadForm.name}
                            onChange={(e) =>
                              setLeadForm({ ...leadForm, name: e.target.value })
                            }
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121318] border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F97316]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="diag-business"
                          className="text-xs font-medium text-neutral-300 mb-1 block"
                        >
                          Business Name
                        </label>
                        <div className="relative">
                          <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                          <input
                            id="diag-business"
                            type="text"
                            placeholder="Brand Name"
                            value={leadForm.businessName}
                            onChange={(e) =>
                              setLeadForm({
                                ...leadForm,
                                businessName: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121318] border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F97316]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="diag-phone"
                          className="text-xs font-medium text-neutral-300 mb-1 block"
                        >
                          Phone / WhatsApp <span className="text-[#F97316]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                          <input
                            id="diag-phone"
                            type="tel"
                            required
                            placeholder="9321856109"
                            value={leadForm.phone}
                            onChange={(e) => {
                              setLeadForm({ ...leadForm, phone: e.target.value });
                              if (phoneError) setPhoneError('');
                            }}
                            className={`w-full pl-9 pr-3 py-2 rounded-xl bg-[#121318] border text-white text-xs focus:outline-none ${
                              phoneError
                                ? 'border-red-500'
                                : 'border-neutral-700 focus:border-[#F97316]'
                            }`}
                          />
                        </div>
                        {phoneError && (
                          <p className="text-[11px] text-red-400 mt-1">
                            {phoneError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="diag-email"
                          className="text-xs font-medium text-neutral-300 mb-1 block"
                        >
                          Work Email
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                          <input
                            id="diag-email"
                            type="email"
                            placeholder="alex@business.com"
                            value={leadForm.email}
                            onChange={(e) =>
                              setLeadForm({ ...leadForm, email: e.target.value })
                            }
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121318] border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F97316]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-[11px] text-neutral-400 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                      <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      <span>
                        Your contact details will strictly be used to review your audit parameters
                        and provide tailored feedback. No spam.
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                      <button
                        type="submit"
                        disabled={submitStatus === 'pending'}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-60 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                      >
                        {submitStatus === 'pending' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending to Server...</span>
                          </>
                        ) : (
                          <>
                            <span>SUBMIT AUDIT REQUEST</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <a
                        href={generateWhatsAppLeadLink({
                          name: leadForm.name,
                          selectedService: diagnosis.recommendedService,
                          businessProblem: answers.biggestProblem,
                          budgetRange: answers.budgetRange,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Chat Directly on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSubmitStatus('idle');
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
