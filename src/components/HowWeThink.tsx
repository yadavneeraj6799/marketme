/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HarryMascot } from './HarryMascot';
import { Search, HelpCircle, Check, ArrowRight } from 'lucide-react';

interface Scenario {
  id: string;
  number: string;
  title: string;
  symptom: string;
  investigationAreas: {
    name: string;
    description: string;
  }[];
  verdict: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    number: '01',
    title: 'Ads are getting clicks, but nobody submits a lead.',
    symptom: 'Healthy click-through rates (CTR > 2%), but zero form fills or enquiries.',
    investigationAreas: [
      {
        name: 'Offer & Value Proposition',
        description: 'Is the incentive to reach out genuinely compelling, or are you just asking them to "Book a Call" with zero payoff?',
      },
      {
        name: 'Message Match',
        description: 'Does the landing page headline immediately confirm the exact specific hook promised in the ad creative?',
      },
      {
        name: 'Page Speed & Mobile UX',
        description: 'Does the mobile destination take > 3 seconds to load? More than 50% of paid ad traffic abandons slow pages.',
      },
      {
        name: 'Conversion Friction',
        description: 'Are you requesting unnecessary information like company address or fax before showing them the core solution?',
      },
      {
        name: 'Conversion Tracking Accuracy',
        description: 'Are GA4 and Meta Pixel actually firing on form confirmation, or is broken tracking blinding your numbers?',
      },
    ],
    verdict: 'Do not simply blame the ad algorithm or swap creatives. The leak is almost always between the click and the page confirmation.',
  },
  {
    id: 's2',
    number: '02',
    title: "Leads are pouring in, but sales says they're useless.",
    symptom: 'Low cost per lead (CPL), but sales reps report "unreachable, no budget, or wrong person".',
    investigationAreas: [
      {
        name: 'Targeting & Broad Interception',
        description: 'Are algorithms optimizing for bargain seekers or students because they click forms fastest without intention to buy?',
      },
      {
        name: 'Lead Form Friction Calibration',
        description: 'Instant lead forms with 1-click autofill produce cheap volume at the expense of high-intent friction.',
      },
      {
        name: 'Qualification Questions',
        description: 'Adding 1-2 intentional qualifying drop-downs (e.g. "What is your monthly budget?") filters tire-kickers upfront.',
      },
      {
        name: 'Speed to Lead & Sales Follow-Up',
        description: 'If leads are contacted 12 hours after submitting, interest decays rapidly. Was the lead truly bad, or just cold?',
      },
      {
        name: 'CRM Feedback Loops',
        description: 'Is qualified deal stage data fed back into Meta CAPI and Google Enhanced Conversions to teach the algorithm who to seek?',
      },
    ],
    verdict: 'More leads is rarely the goal. The goal is predictable deals. We adjust form friction to balance lead volume with sales efficiency.',
  },
  {
    id: 's3',
    number: '03',
    title: 'Content gets views & likes, but zero commercial demand.',
    symptom: 'Viral reels or high impression numbers, but zero business DMs, calls, or customers.',
    investigationAreas: [
      {
        name: 'Audience vs. Buyer Intent',
        description: 'Did the content entertain random viewers or did it address a painful problem experienced by paying customers?',
      },
      {
        name: 'Positioning & Authority',
        description: 'Are you recognized as an entertainer or a credible authority capable of solving high-stakes challenges?',
      },
      {
        name: 'The Bridge to Action (CTAs)',
        description: 'Did the video clearly specify what the viewer should do next (e.g., "Comment AUDIT for the breakdown") or just end?',
      },
      {
        name: 'Customer Journey Infrastructure',
        description: 'Is your bio link optimized to capture interest, or does it dump visitors into a confusing 15-link tree?',
      },
      {
        name: 'Problem Relevance',
        description: 'Viral lifestyle topics attract onlookers; specific business pain points attract decision-makers.',
      },
    ],
    verdict: 'Vanity metrics do not pay salaries. We engineer content around commercial intent and clear customer journeys.',
  },
];

export const HowWeThink: React.FC<{ onOpenAuditModal: () => void }> = ({ onOpenAuditModal }) => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);

  return (
    <section id="how-we-think" className="py-20 lg:py-28 bg-[#090A0D] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F97316] mb-3 flex items-center gap-2">
            <span>Critical Thinking & Methodology</span>
            <span className="text-neutral-600">/</span>
            <span>Zero Fluff</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            HOW WE THINK.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            We don't show off rented office spaces or fake logos. We demonstrate how we diagnose,
            troubleshoot, and fix actual marketing challenges.
          </p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {SCENARIOS.map((sc) => {
            const isActive = sc.id === activeScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveScenario(sc)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#18191E] border-[#F97316] ring-1 ring-[#F97316]/40 shadow-lg'
                    : 'bg-[#111216] border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#F97316]' : 'text-neutral-400'}`}>
                    SCENARIO {sc.number}
                  </span>
                  <Search className={`w-3.5 h-3.5 ${isActive ? 'text-[#F97316]' : 'text-neutral-400'}`} />
                </div>
                <h4 className={`text-sm font-semibold line-clamp-2 ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                  {sc.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detailed Scenario Diagnostic Board */}
        <div className="bg-[#121318] border border-neutral-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Diagnostics */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#F97316] uppercase tracking-wider block mb-1">
                  Scenario {activeScenario.number} Breakdown
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeScenario.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-2 flex items-center gap-2">
                  <span className="text-amber-400 font-semibold">Typical Symptom:</span> {activeScenario.symptom}
                </p>
              </div>

              {/* What We Investigate */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Root Cause Investigation Checklist:
                </span>
                <div className="space-y-2.5">
                  {activeScenario.investigationAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0D0E11] border border-neutral-800 flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-white block">
                          {area.name}
                        </span>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The MarketMe Verdict */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#181920] to-[#14151B] border-l-4 border-[#F97316] border border-neutral-800">
                <span className="text-xs font-mono uppercase text-[#F97316] font-bold block mb-1">
                  The MarketMe Verdict
                </span>
                <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed">
                  {activeScenario.verdict}
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={onOpenAuditModal}
                  className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                >
                  <span>Investigate My Marketing Challenges</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Harry Mascot in Thinking Mode */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
              <HarryMascot pose="harry-thinking" size="xl" showSpeechBubble={true} speechText="Look deeper than the surface symptom." />
              <div className="mt-4 text-center">
                <span className="text-xs font-mono text-neutral-400 block">
                  Root-Cause Troubleshooting
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  MarketMe audits systems before prescribing tactics.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
