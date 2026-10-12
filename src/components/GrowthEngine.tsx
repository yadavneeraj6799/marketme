/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HarryMascot } from './HarryMascot';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

import { ServiceTab } from '../types';

interface GrowthEngineProps {
  onSelectService: (serviceTab: ServiceTab) => void;
  onOpenAuditModal: () => void;
}

interface StageDetail {
  id: string;
  step: string;
  name: string;
  tagline: string;
  channels: string[];
  serviceMap: string;
  metric: string;
  frictionPoint: string;
}

const STAGES: StageDetail[] = [
  {
    id: 'attention',
    step: '01',
    name: 'ATTENTION',
    tagline: 'Earn mindshare before demanding a transaction.',
    channels: ['Social Media', 'Content Strategy', 'SEO', 'Brand Positioning'],
    serviceMap: 'Social Media Marketing & Brand Strategy',
    metric: 'Reach, Impressions, Brand Recall, Video Views',
    frictionPoint: 'Vanilla messaging that looks like every other competitor in the feed.',
  },
  {
    id: 'traffic',
    step: '02',
    name: 'TRAFFIC',
    tagline: 'Direct qualified eyeballs to commercial destinations.',
    channels: ['Meta Ads (IG/FB)', 'Google Search & PMax', 'YouTube Ads', 'JioHotstar Ads', 'Organic Search'],
    serviceMap: 'Performance Marketing',
    metric: 'Qualified Clicks, CTR, CPC, Intent Quality',
    frictionPoint: 'Paying for clicks that land on unoptimized pages or wrong geographies.',
  },
  {
    id: 'leads',
    step: '03',
    name: 'LEADS',
    tagline: 'Capture actionable intent with clear value exchange.',
    channels: ['High-Converting Landing Pages', 'Lead Gen Forms', 'WhatsApp Click-to-Chat', 'Direct Messages'],
    serviceMap: 'Performance Marketing & Websites/CRO',
    metric: 'Conversion Rate, Cost Per Lead, Lead Volume',
    frictionPoint: 'Asking for 12 form fields or providing no clear answer to "What happens next?".',
  },
  {
    id: 'nurture',
    step: '04',
    name: 'NURTURE',
    tagline: 'Guide prospects from curiosity to buying readiness.',
    channels: ['CRM Pipeline Workflows', 'WhatsApp Automated Reminders', 'Email Sequences', 'Dynamic Retargeting'],
    serviceMap: 'Marketing Automation',
    metric: 'Speed to Lead, Engagement Rate, MQL to SQL %',
    frictionPoint: 'Leads going cold because sales takes 24 hours to follow up.',
  },
  {
    id: 'customers',
    step: '05',
    name: 'CUSTOMERS',
    tagline: 'Turn qualified enquiries into paying clients.',
    channels: ['Sales Enablement', 'Offer Packaging', 'Checkout / Agreement Flow', 'Conversion Optimization'],
    serviceMap: 'Full Digital Marketing & CRO',
    metric: 'Customer Acquisition Cost (CAC), Close Rate',
    frictionPoint: 'Friction in final payment or proposal stage after marketing worked hard.',
  },
  {
    id: 'revenue',
    step: '06',
    name: 'REVENUE',
    tagline: 'Measure real unit economics and reinvest profitably.',
    channels: ['GA4 Attribution', 'CAPI Tracking', 'LTV Expansion', 'Campaign Scaling'],
    serviceMap: 'Full Digital Marketing',
    metric: 'ROAS, Net Margin, Customer Lifetime Value',
    frictionPoint: 'Making campaign budget decisions based on vanity clicks instead of real revenue.',
  },
];

export const GrowthEngine: React.FC<GrowthEngineProps> = ({
  onSelectService,
  onOpenAuditModal,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to LEADS
  const activeStage = STAGES[activeStageIndex];

  const handleStageClick = (idx: number) => {
    setActiveStageIndex(idx);
    trackEvent('service_viewed', { stageName: STAGES[idx].name, step: STAGES[idx].step });
  };

  return (
    <section id="growth-system" className="py-20 lg:py-28 bg-[#090A0D] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F97316] mb-3 flex items-center gap-2">
            <span>The Connected Architecture</span>
            <span className="text-neutral-600">/</span>
            <span>Zero Silos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            MARKETING WORKS BETTER <br className="hidden sm:block" />
            WHEN THE PIECES CONNECT.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Most businesses manage social, ads, website, and CRM as isolated activities.
            MarketMe engineers them into a unified pipeline where every rupee spent feeds the next stage.
          </p>
        </div>

        {/* Interactive Growth Pipeline Track */}
        <div className="mb-12">
          {/* Desktop & Tablet Stage Timeline */}
          <div className="relative">
            {/* Progress Track Line */}
            <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-neutral-800 -translate-y-1/2 z-0">
              <div
                className="h-full bg-gradient-to-r from-[#F97316] to-[#EA580C] transition-all duration-500"
                style={{
                  width: `${(activeStageIndex / (STAGES.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Stage Selector Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 relative z-10">
              {STAGES.map((s, idx) => {
                const isActive = activeStageIndex === idx;
                const isPassed = idx < activeStageIndex;

                return (
                  <button
                    key={s.id}
                    onClick={() => handleStageClick(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#18191F] border-[#F97316] shadow-xl shadow-[#F97316]/15 ring-2 ring-[#F97316]/30'
                        : isPassed
                        ? 'bg-[#121317] border-neutral-700/80 hover:border-neutral-600'
                        : 'bg-[#0E0F13] border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#F97316]' : 'text-neutral-500'}`}>
                        {s.step}
                      </span>
                      {isPassed ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : isActive ? (
                        <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                      ) : null}
                    </div>

                    <div>
                      <span className={`text-xs font-mono font-extrabold tracking-wider block ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                        {s.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                        {s.channels[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Active Stage Breakdown Card */}
        <div className="bg-[#121318] border border-neutral-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Stage watermark number */}
          <div className="absolute right-6 top-4 text-7xl sm:text-9xl font-mono font-black text-neutral-800/20 select-none pointer-events-none">
            {activeStage.step}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#F97316] bg-[#F97316]/10 px-2.5 py-1 rounded-md border border-[#F97316]/30">
                  Stage {activeStage.step} of 06
                </span>
                <span className="text-xs text-neutral-400 font-mono">·</span>
                <span className="text-xs text-neutral-300 font-medium">
                  {activeStage.serviceMap}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {activeStage.name}: {activeStage.tagline}
              </h3>

              {/* Channels in this Stage */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                  Mapped Channels & Mechanisms:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStage.channels.map((ch, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#18191E] border border-neutral-700/80 text-white font-medium flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics & Friction Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[#0D0E11] border border-neutral-800">
                  <span className="text-[11px] font-mono uppercase text-emerald-400 block mb-1">
                    Primary Metrics Monitored
                  </span>
                  <p className="text-xs text-neutral-300 font-mono">
                    {activeStage.metric}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D0E11] border border-neutral-800">
                  <span className="text-[11px] font-mono uppercase text-amber-400 block mb-1">
                    Common Bottleneck
                  </span>
                  <p className="text-xs text-neutral-300">
                    {activeStage.frictionPoint}
                  </p>
                </div>
              </div>

              {/* CTA row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const targetService: ServiceTab =
                      activeStage.id === 'attention'
                        ? 'social'
                        : activeStage.id === 'traffic'
                        ? 'performance'
                        : activeStage.id === 'leads'
                        ? 'performance'
                        : activeStage.id === 'nurture'
                        ? 'automation'
                        : 'digital';
                    onSelectService(targetService);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>See How We Build This Stage</span>
                  <ArrowRight className="w-4 h-4 text-[#F97316]" />
                </button>

                <button
                  onClick={onOpenAuditModal}
                  className="px-4 py-2.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Audit Our {activeStage.name} Flow</span>
                </button>
              </div>
            </div>

            {/* Right Mascot Presence */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
              <HarryMascot
                pose={activeStageIndex <= 1 ? 'harry-point-right' : activeStageIndex <= 3 ? 'harry-present' : 'harry-celebrate'}
                size="lg"
                showSpeechBubble={true}
                speechText={`Step ${activeStage.step}: ${activeStage.name}`}
              />
              <span className="text-[11px] font-mono text-neutral-400 mt-2 text-center">
                Stage {activeStageIndex + 1} of 6 in the MarketMe Engine
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
