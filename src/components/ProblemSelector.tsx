/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProblemOption, ServiceTab } from '../types';
import { HarryMascot } from './HarryMascot';
import { ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ProblemSelectorProps {
  onSelectService: (serviceId: ServiceTab) => void;
  onOpenAuditModal: (contextProblem?: string) => void;
}

const PROBLEMS: ProblemOption[] = [
  {
    id: 'p1',
    problem: 'Nobody knows our brand.',
    category: 'social',
    bottleneck: 'Brand Visibility & Market Familiarity',
    recommendedService: 'Social Media Marketing',
    serviceId: 'social',
    investigateAreas: ['Platform presence', 'Content pillars', 'Organic reach', 'Brand voice', 'Awareness campaigns'],
    explanation:
      'If buyers do not encounter your business consistently, conversion-focused ads must do all the heavy lifting in cold territory. Building audience familiarity lowers acquisition friction.',
  },
  {
    id: 'p2',
    problem: 'Our social media looks inactive.',
    category: 'social',
    bottleneck: 'Brand Credibility & Trust Perception',
    recommendedService: 'Social Media Marketing',
    serviceId: 'social',
    investigateAreas: ['Publishing cadence', 'Proof assets', 'Profile optimization', 'Community activity', 'Content hygiene'],
    explanation:
      'Prospects check your social profiles to verify you are currently active and legitimate. Inactivity introduces hesitation right before a buying decision.',
  },
  {
    id: 'p3',
    problem: "We're posting but not generating enquiries.",
    category: 'social',
    bottleneck: 'Content Intent & Commercial Alignment',
    recommendedService: 'Social Media Marketing',
    serviceId: 'social',
    investigateAreas: ['Audience problem match', 'Hook-to-offer bridge', 'Call-to-action clarity', 'DM funnels', 'Offer positioning'],
    explanation:
      'Views and likes do not automatically translate to commercial demand unless content is specifically engineered around problems buyers pay to solve.',
  },
  {
    id: 'p4',
    problem: 'We need qualified leads.',
    category: 'performance',
    bottleneck: 'Targeted Demand Generation',
    recommendedService: 'Performance Marketing',
    serviceId: 'performance',
    investigateAreas: ['Paid channel mix', 'Audience segmentation', 'Intent capture (Search)', 'High-intent offers', 'Tracking & attribution'],
    explanation:
      'When organic alone is too slow or unpredictable, deliberate paid acquisition systems (Meta, Google, JioHotstar) can reliably test and capture high-intent demand.',
  },
  {
    id: 'p5',
    problem: 'Our ads get clicks but don’t convert.',
    category: 'performance',
    bottleneck: 'Landing Page & Message Match Friction',
    recommendedService: 'Performance Marketing & Landing Pages',
    serviceId: 'cro',
    investigateAreas: ['Ad-to-page message match', 'Offer clarity', 'Page load speed', 'Form friction', 'Mobile UX'],
    explanation:
      'Clicks prove initial curiosity; lack of conversions reveals a broken bridge between what the ad promised and what the destination page delivers.',
  },
  {
    id: 'p6',
    problem: "We're generating leads but sales quality is poor.",
    category: 'performance',
    bottleneck: 'Lead Qualification & Targeting Alignment',
    recommendedService: 'Performance Marketing',
    serviceId: 'performance',
    investigateAreas: ['Form friction level', 'Offer pricing transparency', 'Exclusion audiences', 'Qualification questions', 'CRM feedback loop'],
    explanation:
      'Over-optimizing for cheap leads often attracts bargain hunters. Introducing intentional qualification questions weeds out low-fit submissions before they reach sales.',
  },
  {
    id: 'p7',
    problem: "Our website isn't converting.",
    category: 'cro',
    bottleneck: 'Conversion Rate & Value Articulation',
    recommendedService: 'Website Strategy & CRO',
    serviceId: 'cro',
    investigateAreas: ['Headline clarity', 'Social proof hierarchy', 'Call-to-action placement', 'Technical friction', 'Objection handling'],
    explanation:
      'Websites fail to convert when visitors cannot understand what you do, who you help, and why you are the credible choice within 5 seconds of landing.',
  },
  {
    id: 'p8',
    problem: 'Our follow-up process is messy.',
    category: 'automation',
    bottleneck: 'Lead Nurture & Operational Automation',
    recommendedService: 'Marketing Automation',
    serviceId: 'automation',
    investigateAreas: ['CRM integration', 'Instant WhatsApp notifications', 'Email drip sequences', 'Sales assignment rules', 'Speed to lead'],
    explanation:
      'Lead response time is the single highest predictor of close rate. Leads that sit untouched for hours quickly lose interest or buy from a competitor.',
  },
  {
    id: 'p9',
    problem: 'Our marketing channels aren’t connected.',
    category: 'digital',
    bottleneck: 'Full-Funnel System Disconnection',
    recommendedService: 'Full Digital Marketing',
    serviceId: 'digital',
    investigateAreas: ['Omnichannel attribution', 'Audience retargeting pools', 'Central CRM data', 'Unified messaging', 'Multi-touch journey'],
    explanation:
      'Running ads, social, email, and web as siloed projects wastes budget. When channels share data and retarget sequentially, overall efficiency compounds.',
  },
];

export const ProblemSelector: React.FC<ProblemSelectorProps> = ({
  onSelectService,
  onOpenAuditModal,
}) => {
  const [selectedProblem, setSelectedProblem] = useState<ProblemOption>(PROBLEMS[3]); // Default to 'We need qualified leads'

  const handleCardClick = (p: ProblemOption) => {
    setSelectedProblem(p);
    trackEvent('diagnosis_started', { problemId: p.id, problemTitle: p.problem });
  };

  return (
    <section id="problems" className="py-20 lg:py-28 bg-[#0D0E11] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F97316] mb-3 flex items-center gap-2">
            <span>Root Cause Analysis</span>
            <span className="text-neutral-600">/</span>
            <span>Diagnosis First</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            MORE MARKETING ISN'T <br className="hidden sm:block" />
            ALWAYS THE ANSWER.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            First, figure out what's actually stopping growth. Click a challenge below to inspect
            the likely operational bottleneck.
          </p>
        </div>

        {/* Grid: Problem Cards & Diagnostic Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 9 Interactive Problem Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {PROBLEMS.map((item) => {
              const isSelected = selectedProblem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#18191E] border-[#F97316] shadow-lg shadow-[#F97316]/10 ring-1 ring-[#F97316]/40'
                      : 'bg-[#121317] border-neutral-800/90 hover:border-neutral-700 hover:bg-[#16171D]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono text-neutral-400">
                      {item.id.toUpperCase()}
                    </span>
                    {isSelected ? (
                      <span className="text-[11px] font-mono text-[#F97316] font-semibold flex items-center gap-1">
                        Selected <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-neutral-400">Inspect</span>
                    )}
                  </div>
                  <p className={`mt-2 text-sm font-semibold leading-snug ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                    "{item.problem}"
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Bottleneck & Recommendation Panel */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] to-[#FB923C]" />

              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    System Investigation
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {selectedProblem.bottleneck}
                  </h3>
                </div>
                <div className="shrink-0">
                  <HarryMascot pose="harry-analyse" size="sm" />
                </div>
              </div>

              {/* Core Explanation */}
              <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800/80 mb-5">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {selectedProblem.explanation}
                  </p>
                </div>
              </div>

              {/* Recommended Service */}
              <div className="mb-5 space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Recommended MarketMe Service
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] font-semibold text-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedProblem.recommendedService}</span>
                </div>
              </div>

              {/* Areas to Investigate */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2.5">
                  Possible Areas Worth Investigating:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProblem.investigateAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frame results reminder / disclaimer */}
              <p className="text-[11px] text-neutral-400 mb-6 italic border-t border-neutral-800/80 pt-3">
                * Note: This highlights likely system vulnerabilities worth investigating, not a definitive generic diagnosis. Every market context varies.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => onSelectService(selectedProblem.serviceId)}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Explore {selectedProblem.recommendedService}</span>
                  <ArrowRight className="w-4 h-4 text-[#F97316]" />
                </button>

                <button
                  onClick={() => onOpenAuditModal(selectedProblem.problem)}
                  className="w-full py-3 px-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#F97316]/20 cursor-pointer"
                >
                  Audit This Problem For My Business
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
