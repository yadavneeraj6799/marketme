/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HarryMascot } from './HarryMascot';
import { Check, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ProcessStep {
  number: string;
  name: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    name: 'DIAGNOSE',
    subtitle: 'Uncover the real constraints before touching budget.',
    description:
      'We audit your current market position, historic campaign data, tracking accuracy, audience friction, and competitive dynamics. We identify where money is leaking before recommending new channels.',
    deliverables: [
      'Business & unit economic review',
      'Audience & competitor analysis',
      'Existing funnel & landing page teardown',
      'Analytics & Pixel health audit',
    ],
  },
  {
    number: '02',
    name: 'STRATEGIZE',
    subtitle: 'Architect the acquisition & brand blueprint.',
    description:
      'We translate business goals into a structured commercial plan: target customer segments, channel allocation, high-converting offer angles, content pillars, and tracking protocols.',
    deliverables: [
      'Target persona & offer positioning',
      'Platform channel selection (Meta/Google/OTT)',
      'Content calendar & narrative pillars',
      'Funnel architecture & lead qualification rules',
    ],
  },
  {
    number: '03',
    name: 'BUILD',
    subtitle: 'Engineer the creative, pages, and data pipes.',
    description:
      'Our team produces high-impact video concepts, carousels, ad copy, high-converting landing pages, and server-side tracking before turning on campaign spend.',
    deliverables: [
      'Static & video creative assets',
      'Problem-aware ad copywriting & hooks',
      'High-speed conversion landing pages',
      'GA4, CAPI & CRM automation setup',
    ],
  },
  {
    number: '04',
    name: 'LAUNCH',
    subtitle: 'Execute disciplined go-to-market testing.',
    description:
      'We launch structured campaigns across chosen platforms with controlled budget pacing, testing multiple creative hooks, audiences, and value propositions simultaneously.',
    deliverables: [
      'Systematic creative A/B testing',
      'Bid & budget pacing control',
      'Initial lead qualification verification',
      'Instant sales notification triggers',
    ],
  },
  {
    number: '05',
    name: 'OPTIMIZE',
    subtitle: 'Iterate based on profit and unit economics.',
    description:
      'Marketing is an iterative science. We double down on winning creative angles, prune underperforming ad sets, refine landing page friction, and scale spend profitably.',
    deliverables: [
      'Weekly performance debriefs',
      'Creative fatigue mitigation',
      'Conversion rate optimization (CRO)',
      'Profitable budget scaling framework',
    ],
  },
];

export const ProcessTimeline: React.FC<{ onOpenAuditModal: () => void }> = ({ onOpenAuditModal }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#0D0E11] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F97316] mb-3 flex items-center gap-2">
            <span>Our Five-Stage Execution Process</span>
            <span className="text-neutral-600">/</span>
            <span>How We Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            DISCIPLINED EXECUTION, <br />
            NOT RANDOM EXPERIMENTS.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            A repeatable 5-step framework designed to eliminate guesswork and replace it with
            predictable acquisition mechanics.
          </p>
        </div>

        {/* 5-Step Horizontal Tab Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-10">
          {STEPS.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={s.number}
                onClick={() => {
                  setActiveStepIndex(idx);
                  trackEvent('service_viewed', { processStep: s.name });
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#18191E] border-[#F97316] ring-1 ring-[#F97316]/50 shadow-lg'
                    : 'bg-[#121317] border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#F97316]' : 'text-neutral-400'}`}>
                    STEP {s.number}
                  </span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />}
                </div>
                <span className={`text-sm font-extrabold tracking-wider ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-[#F97316] bg-[#F97316]/10 px-2.5 py-1 rounded border border-[#F97316]/30">
                  Phase {activeStep.number} of 05
                </span>
                <span className="text-xs text-neutral-400 font-mono font-medium">
                  {activeStep.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {activeStep.name}
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {activeStep.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                  Core Phase Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStep.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#0D0E11] border border-neutral-800 flex items-center gap-2.5 text-xs text-neutral-200"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenAuditModal}
                  className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                >
                  <span>Start With Step 01 (Free Audit)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
              <HarryMascot
                pose={activeStepIndex === 0 ? 'harry-analyse' : activeStepIndex === 1 ? 'harry-idea' : activeStepIndex === 2 ? 'harry-walk' : activeStepIndex === 3 ? 'harry-point-right' : 'harry-celebrate'}
                size="xl"
                showSpeechBubble={true}
                speechText={`Step ${activeStep.number}: ${activeStep.name}`}
              />
              <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                MarketMe Structured Rollout Engine
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
