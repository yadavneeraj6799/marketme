/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Share2,
  TrendingUp,
  Layers,
  Bot,
  Globe,
  CheckCircle2,
  ArrowRight,
  Tv,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { HarryMascot } from './HarryMascot';
import { trackEvent } from '../utils/analytics';
import { ServiceTab } from '../types';

interface ServicesSectionProps {
  activeTab: ServiceTab;
  onTabChange: (tab: ServiceTab) => void;
  onOpenAuditModal: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  activeTab,
  onTabChange,
  onOpenAuditModal,
}) => {
  const handleTabChange = (tab: ServiceTab) => {
    onTabChange(tab);
    trackEvent('service_viewed', { tabName: tab });
  };

  return (
    <section
      id="services"
      className="py-16 lg:py-24 bg-[#0D0E11] border-b border-neutral-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left max-w-3xl mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-[#F97316] mb-2 flex items-center gap-2">
            <span>Core Disciplines</span>
            <span className="text-neutral-600">/</span>
            <span>Outcome-Focused</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Choose the bottleneck.{' '}
            <span className="text-neutral-400">We engineer the growth system.</span>
          </h2>
          <p className="mt-3 text-base text-neutral-300">
            We don't sell random packages of posts or vanity clicks. Every service is built to
            solve a specific revenue bottleneck with clear deliverables and transparent measurement.
          </p>
        </div>

        {/* Tab Navigation Controls (Interactive Filter Buttons) */}
        <div
          role="tablist"
          aria-label="Services Navigation"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-neutral-800"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'social'}
            onClick={() => handleTabChange('social')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
              activeTab === 'social'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Share2 className={`w-4 h-4 ${activeTab === 'social' ? 'text-[#F97316]' : ''}`} />
            <span>Social Media Marketing</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'performance'}
            onClick={() => handleTabChange('performance')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
              activeTab === 'performance'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 ${activeTab === 'performance' ? 'text-[#F97316]' : ''}`}
            />
            <span>Performance Marketing</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'digital'}
            onClick={() => handleTabChange('digital')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
              activeTab === 'digital'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Layers className={`w-4 h-4 ${activeTab === 'digital' ? 'text-[#F97316]' : ''}`} />
            <span>Full Digital Marketing</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'automation'}
            onClick={() => handleTabChange('automation')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
              activeTab === 'automation'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Bot className={`w-4 h-4 ${activeTab === 'automation' ? 'text-[#F97316]' : ''}`} />
            <span>Marketing Automation</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'cro'}
            onClick={() => handleTabChange('cro')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
              activeTab === 'cro'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Globe className={`w-4 h-4 ${activeTab === 'cro' ? 'text-[#F97316]' : ''}`} />
            <span>Websites & Landing Pages</span>
          </button>
        </div>

        {/* Tab 1: SOCIAL MEDIA MARKETING */}
        {activeTab === 'social' && (
          <div id="services-social" className="space-y-6 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-9 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-mono text-[#F97316] uppercase tracking-wider">
                    Social Media Marketing
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    Build brand credibility, an engaged audience, and active commercial demand.
                  </h3>

                  {/* Who it helps */}
                  <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                      Who this helps:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      Businesses whose social channels look quiet, inconsistent, or disconnected from
                      actual business inquiries. If buyers visit your profile to check legitimacy and
                      find outdated posts, this closes the trust gap.
                    </p>
                  </div>

                  {/* What is delivered */}
                  <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                      What is delivered:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      Structured platform strategy (Instagram, LinkedIn, X, YouTube), content pillars
                      matched to buyer questions, short-form video scripting, high-retention carousels,
                      community response routing, and monthly reach/inquiry reporting.
                    </p>
                  </div>

                  {/* Promotional Support Terms */}
                  <div className="p-3.5 rounded-xl bg-orange-950/20 border border-[#F97316]/30 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#F97316] block">
                        New Client Launch Support
                      </span>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        MarketMe provides up to ₹3,000 in paid media support applied directly toward
                        boosting initial reach and testing audience engagement.
                      </p>
                    </div>
                  </div>

                  {/* Next Step */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => onOpenAuditModal('Social Media Marketing')}
                      className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                    >
                      <span>Request Free Social Media Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-neutral-400">
                      Next step: We review your current profile, content cadence, and bio funnel.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center p-2">
                  <HarryMascot pose="harry-present" size="lg" />
                  <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                    "Content without clear commercial intent is just noise."
                  </span>
                </div>

              </div>
            </div>

            {/* Pillar Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#121318] border border-neutral-800 space-y-2">
                <span className="text-xs font-mono text-[#F97316] font-semibold">01 · Strategic Direction</span>
                <h4 className="text-sm font-bold text-white">Platform Alignment</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We define content pillars based on problems your customers actually pay to solve,
                  avoiding generic filler graphics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121318] border border-neutral-800 space-y-2">
                <span className="text-xs font-mono text-[#F97316] font-semibold">02 · Creative Execution</span>
                <h4 className="text-sm font-bold text-white">Production & Copy</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  High-retention Reels, Shorts, carousels, and problem-aware hooks written to spark
                  genuine engagement and direct message inquiries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121318] border border-neutral-800 space-y-2">
                <span className="text-xs font-mono text-[#F97316] font-semibold">03 · Active Oversight</span>
                <h4 className="text-sm font-bold text-white">Community & Reports</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Daily comment and DM routing to capture interested prospects before they go cold,
                  with transparent monthly growth metrics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PERFORMANCE MARKETING */}
        {activeTab === 'performance' && (
          <div id="services-performance" className="space-y-6 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-9 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-mono text-[#F97316] uppercase tracking-wider">
                    Performance Marketing
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    Turn paid media into qualified leads and measurable business revenue.
                  </h3>

                  {/* Who it helps */}
                  <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                      Who this helps:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      Businesses needing predictable customer acquisition. If organic reach is too slow
                      or your current ads generate curiosity clicks without qualified inquiries, we
                      build structured acquisition systems.
                    </p>
                  </div>

                  {/* What is delivered */}
                  <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                      What is delivered:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      Meta Ads (Instagram & Facebook), Google Ads (High-intent Search & PMax), hands-on
                      JioHotstar OTT campaigns, server-side tracking (GA4, CAPI), creative angle testing,
                      and lead qualification filters.
                    </p>
                  </div>

                  {/* Launch Support */}
                  <div className="p-3.5 rounded-xl bg-orange-950/20 border border-[#F97316]/30 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#F97316] block">
                        New Client Launch Support
                      </span>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        MarketMe provides up to ₹5,000 in testing ad spend credit applied directly toward
                        your initial campaign launch on approved channels.
                      </p>
                    </div>
                  </div>

                  {/* Honest Disclaimer */}
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      We guarantee disciplined testing, clean tracking, and senior strategy. We do not
                      make exaggerated promises of guaranteed ROAS or revenue.
                    </span>
                  </div>

                  {/* Next Step */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => onOpenAuditModal('Performance Marketing')}
                      className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                    >
                      <span>Request Paid Media Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-neutral-400">
                      Next step: We inspect your ad accounts, tracking pixels, and landing page drop-off.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center p-2">
                  <HarryMascot pose="harry-analyse" size="lg" />
                  <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                    "Every rupee spent should be accounted for in the funnel."
                  </span>
                </div>

              </div>
            </div>

            {/* Channel Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#121318] border border-neutral-800 space-y-2">
                <span className="text-xs font-mono text-[#F97316] font-semibold">Meta Ads</span>
                <h4 className="text-sm font-bold text-white">Instagram & Facebook</h4>
                <p className="text-xs text-neutral-400">
                  Targeted creative hooks, qualified lead forms, click-to-WhatsApp flows, and Advantage+ retargeting.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#121318] border border-neutral-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold">Google Ads</span>
                <h4 className="text-sm font-bold text-white">High Intent Capture</h4>
                <p className="text-xs text-neutral-400">
                  High-intent Search keywords and Performance Max campaigns with strict negative keyword pruning.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#121318] border border-[#F97316]/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#F97316] font-semibold">
                  <Tv className="w-3.5 h-3.5" />
                  <span>JioHotstar Advertising</span>
                </div>
                <h4 className="text-sm font-bold text-white">OTT & Live Sports</h4>
                <p className="text-xs text-neutral-400">
                  Hands-on campaign planning, cohort audience targeting, delivery pacing, and Brand Lift Study support.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: FULL DIGITAL MARKETING */}
        {activeTab === 'digital' && (
          <div id="services-digital" className="space-y-6 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-9 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-mono text-[#F97316] uppercase tracking-wider">
                    Full Digital Marketing
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    One unified strategy connecting brand, traffic, and revenue.
                  </h3>

                  <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                      Who this helps:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      Growing companies juggling disconnected agencies or freelancers where ads, social,
                      and websites do not communicate. We eliminate channel silos and finger-pointing.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                      What is delivered:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      End-to-end architecture coordinating social media, search, paid ads, conversion
                      landing pages, automated lead nurture, and central analytics into a single engine.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => onOpenAuditModal('Full Digital Marketing')}
                      className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                    >
                      <span>Request Full System Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-neutral-400">
                      Next step: We map your complete customer journey from first impression to closed deal.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center p-2">
                  <HarryMascot pose="harry-cta" size="lg" />
                  <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                    "Connected channels multiply the impact of every rupee spent."
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tab 4: MARKETING AUTOMATION */}
        {activeTab === 'automation' && (
          <div id="services-automation" className="space-y-6 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-9 relative">
              <div className="max-w-3xl space-y-4">
                <div className="text-xs font-mono text-[#F97316] uppercase tracking-wider">
                  Marketing Automation
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  Fast follow-up pipelines that prevent qualified leads from going cold.
                </h3>

                <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                  <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                    Who this helps:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    Businesses generating inquiries but losing deals because response times are slow
                    or sales teams lack automated reminders and lead context.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                  <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                    What is delivered:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    Instant WhatsApp and email alerts for your sales team, CRM pipeline stages, automated
                    nurture sequences for hesitant prospects, and speed-to-lead workflow triggers.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onOpenAuditModal('Marketing Automation')}
                    className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                  >
                    <span>Request Follow-Up Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-neutral-400">
                    Next step: We review your current lead response time and pipeline drop-off.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: WEBSITES & LANDING PAGES (CRO) */}
        {activeTab === 'cro' && (
          <div id="services-cro" className="space-y-6 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-9 relative">
              <div className="max-w-3xl space-y-4">
                <div className="text-xs font-mono text-[#F97316] uppercase tracking-wider">
                  Websites & Landing Pages (CRO)
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  High-speed, friction-free destinations engineered to convert traffic.
                </h3>

                <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                  <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                    Who this helps:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    Brands whose website visitors bounce without submitting forms. If your traffic is
                    interested but your destination is slow, cluttered, or confusing, conversion drops.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0E0F13] border border-neutral-800 space-y-1">
                  <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold">
                    What is delivered:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    Custom responsive landing pages, sub-second load times, headline and message-match
                    clarity, objection-handling layout, and streamlined inquiry forms.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onOpenAuditModal('Website & CRO Review')}
                    className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#F97316]/20"
                  >
                    <span>Request Landing Page Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-neutral-400">
                    Next step: We perform a mobile teardown of your page speed and value proposition.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
