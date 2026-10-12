/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  BarChart3,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { HarryMascot } from './HarryMascot';
import { trackEvent } from '../utils/analytics';

interface ServicesSectionProps {
  onOpenAuditModal: (serviceName?: string) => void;
  initialTab?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenAuditModal,
  initialTab = 'social',
}) => {
  const [activeTab, setActiveTab] = useState<'social' | 'performance' | 'digital' | 'automation' | 'cro'>(
    (initialTab as any) || 'social'
  );

  const handleTabChange = (tab: 'social' | 'performance' | 'digital' | 'automation' | 'cro') => {
    setActiveTab(tab);
    trackEvent('service_viewed', { tabName: tab });
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0D0E11] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F97316] mb-3 flex items-center gap-2">
            <span>Specialized Capabilities</span>
            <span className="text-neutral-600">/</span>
            <span>Outcome Engineered</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            CHOOSE THE PROBLEM. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              WE'LL BUILD THE SYSTEM AROUND IT.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            We don't sell random packages of posts or vanity clicks. Every service is built around
            clearing specific revenue bottlenecks.
          </p>
        </div>

        {/* Tab Navigation Controls (Interactive Filter Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-neutral-800">
          <button
            onClick={() => handleTabChange('social')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'social'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Share2 className={`w-4 h-4 ${activeTab === 'social' ? 'text-[#F97316]' : ''}`} />
            Social Media Marketing
          </button>

          <button
            onClick={() => handleTabChange('performance')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'performance'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <TrendingUp className={`w-4 h-4 ${activeTab === 'performance' ? 'text-[#F97316]' : ''}`} />
            Performance Marketing
          </button>

          <button
            onClick={() => handleTabChange('digital')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'digital'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Layers className={`w-4 h-4 ${activeTab === 'digital' ? 'text-[#F97316]' : ''}`} />
            Full Digital Marketing
          </button>

          <button
            onClick={() => handleTabChange('automation')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'automation'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Bot className={`w-4 h-4 ${activeTab === 'automation' ? 'text-[#F97316]' : ''}`} />
            Marketing Automation
          </button>

          <button
            onClick={() => handleTabChange('cro')}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'cro'
                ? 'bg-[#1C1D24] text-white border border-[#F97316] shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Globe className={`w-4 h-4 ${activeTab === 'cro' ? 'text-[#F97316]' : ''}`} />
            Websites & Landing Pages
          </button>
        </div>

        {/* Tab 1: SOCIAL MEDIA MARKETING */}
        {activeTab === 'social' && (
          <div id="services-social" className="space-y-8 animate-fadeIn">
            {/* Top Overview Box */}
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F97316] uppercase tracking-wider">
                    <span>Visibility · Credibility · Brand Authority</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    BUILD THE BRAND. <br />
                    BUILD THE AUDIENCE. <br />
                    <span className="text-[#F97316]">BUILD DEMAND.</span>
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    A complete social media system designed to make businesses look active,
                    credible, trusted, and enquiry-ready. We bridge high-converting visual storytelling
                    with audience nurturing across key platforms.
                  </p>

                  {/* Platforms Supported */}
                  <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
                    <span className="font-mono text-neutral-500 uppercase">Core Platforms:</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">Instagram</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">LinkedIn</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">X (Twitter)</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">YouTube</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">TikTok</span>
                  </div>

                  {/* Launch Support Offer Callout */}
                  <div className="mt-4 p-4 rounded-xl bg-orange-950/20 border border-[#F97316]/30 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#F97316] tracking-wider block">
                        New Client Launch Support
                      </span>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Eligible new Social Media Marketing clients can receive up to ₹3,000 in
                        paid media support to help kick-start campaign reach.
                        <span className="text-neutral-500 italic block mt-1">
                          * Applied as credited ad spend directly toward promotional testing, not cash payouts.
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => onOpenAuditModal('Social Media Marketing')}
                      className="px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-[#F97316]/20 cursor-pointer"
                    >
                      <span>BUILD MY SOCIAL PRESENCE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <HarryMascot pose="harry-present" size="lg" />
                  <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                    "Content without distribution is just an expensive hobby."
                  </span>
                </div>

              </div>
            </div>

            {/* 4 Pillars of Social Media System */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-[#121318] border border-neutral-800 space-y-3">
                <span className="text-xs font-mono text-[#F97316] font-semibold">01 · STRATEGY</span>
                <h4 className="text-base font-bold text-white">Research & Blueprint</h4>
                <ul className="text-xs text-neutral-400 space-y-2">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Social profile audit</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Competitor analysis</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Audience research</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Platform content pillars</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Brand voice & guidelines</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#121318] border border-neutral-800 space-y-3">
                <span className="text-xs font-mono text-[#F97316] font-semibold">02 · CREATIVE PRODUCTION</span>
                <h4 className="text-base font-bold text-white">High-Impact Content</h4>
                <ul className="text-xs text-neutral-400 space-y-2">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Reels & Shorts direction</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> High-retention carousels</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> UGC-style content & scripts</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Problem-aware hooks & copy</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Conversion-focused CTAs</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#121318] border border-neutral-800 space-y-3">
                <span className="text-xs font-mono text-[#F97316] font-semibold">03 · MANAGEMENT</span>
                <h4 className="text-base font-bold text-white">Daily Operations</h4>
                <ul className="text-xs text-neutral-400 space-y-2">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Scheduling & publishing</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Community engagement</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Comment & DM routing</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Brand reputation oversight</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fast trend monitoring</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#121318] border border-neutral-800 space-y-3">
                <span className="text-xs font-mono text-[#F97316] font-semibold">04 · REPORTING</span>
                <h4 className="text-base font-bold text-white">Useful Metrics</h4>
                <ul className="text-xs text-neutral-400 space-y-2">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Reach & true impressions</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Engagement quality</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Profile clicks & bio visits</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Organic inbound enquiries</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Monthly strategic debrief</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PERFORMANCE MARKETING */}
        {activeTab === 'performance' && (
          <div id="services-performance" className="space-y-8 animate-fadeIn">
            {/* Top Performance Box */}
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F97316] uppercase tracking-wider">
                    <span>Meta · Google · JioHotstar Advertising</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    DON'T JUST BUY CLICKS. <br />
                    <span className="text-[#F97316]">BUILD A PATH TO REVENUE.</span>
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    Performance marketing isn't about setting up ad campaigns and praying. It's an
                    engineered pipeline balancing ad psychology, qualification funnels, conversion
                    APIs, and rapid creative testing.
                  </p>

                  {/* Visual Revenue Path */}
                  <div className="p-3.5 rounded-xl bg-[#0D0E11] border border-neutral-800">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                      The Acquisition Flow We Optimize:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                      <span className="px-2 py-1 rounded bg-neutral-900 text-neutral-300">AD SPEND</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
                      <span className="px-2 py-1 rounded bg-neutral-900 text-neutral-300">LEADS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
                      <span className="px-2 py-1 rounded bg-neutral-900 text-emerald-400 font-bold">QUALIFIED LEADS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
                      <span className="px-2 py-1 rounded bg-neutral-900 text-neutral-300">SALES</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
                      <span className="px-2 py-1 rounded bg-[#F97316]/20 text-[#F97316] font-bold">REVENUE</span>
                    </div>
                  </div>

                  {/* Launch Support Offer Callout */}
                  <div className="mt-4 p-4 rounded-xl bg-orange-950/20 border border-[#F97316]/30 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#F97316] tracking-wider block">
                        New Client Launch Support
                      </span>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Eligible new Performance Marketing clients can receive up to ₹5,000 in
                        paid media support for initial testing across approved platforms.
                        <span className="text-neutral-500 italic block mt-1">
                          * Provided as an ad-spend match/credit towards initial testing, not cash payouts.
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Strict Honesty Disclaimer */}
                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      We believe in clear numbers, not hype. MarketMe does not promise guaranteed ROAS, leads, or revenue. We guarantee rigorous testing, disciplined tracking, and transparent execution.
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenAuditModal('Performance Marketing')}
                      className="px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-[#F97316]/20 cursor-pointer"
                    >
                      <span>BUILD MY ACQUISITION SYSTEM</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <HarryMascot pose="harry-analyse" size="lg" />
                  <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                    "Every rupee spent must earn its place in the equation."
                  </span>
                </div>

              </div>
            </div>

            {/* Platform Breakdowns: Meta, Google, JioHotstar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Meta Ads */}
              <div className="p-6 rounded-2xl bg-[#121318] border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">META ADS</h4>
                  <span className="text-[11px] font-mono text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded">
                    FB & IG
                  </span>
                </div>
                <p className="text-xs text-neutral-300">
                  Targeted interruption marketing built on disruptive creative hooks, granular interest segmentation, and Advantage+ scaling.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div>· High-converting Lead Generation forms</div>
                  <div>· Direct-to-WhatsApp click campaigns</div>
                  <div>· Dynamic Retargeting & custom lookalikes</div>
                  <div>· E-commerce catalog & conversion ads</div>
                  <div>· CAPI & server-side Pixel setup</div>
                </div>
              </div>

              {/* Google Ads */}
              <div className="p-6 rounded-2xl bg-[#121318] border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">GOOGLE ADS</h4>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    High Intent
                  </span>
                </div>
                <p className="text-xs text-neutral-300">
                  Capturing users right when they are actively searching for solutions with their credit card or enquiry ready.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div>· High-intent Search keyword campaigns</div>
                  <div>· Performance Max (PMax) asset groups</div>
                  <div>· YouTube Video Action campaigns</div>
                  <div>· Negative keyword pruning & match type control</div>
                  <div>· GA4 Enhanced Conversions & Tag Manager</div>
                </div>
              </div>

              {/* JioHotstar Advertising */}
              <div className="p-6 rounded-2xl bg-[#121318] border border-[#F97316]/40 shadow-lg relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tv className="w-5 h-5 text-[#F97316]" />
                    <h4 className="text-lg font-bold text-white">JIOHOTSTAR ADS</h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#F97316] bg-[#F97316]/20 px-2 py-0.5 rounded font-semibold">
                    Hands-On
                  </span>
                </div>
                <p className="text-xs text-neutral-300">
                  Specialized OTT advertising across live sports, premium entertainment, and high-engagement connected TV audiences.
                </p>
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div>· Complete Campaign Planning & Media Strategy</div>
                  <div>· Audience Cohort & Regional Targeting</div>
                  <div>· Mid-roll & Pre-roll video execution</div>
                  <div>· Budget, pacing & delivery monitoring</div>
                  <div>· Brand Lift Study (BLS) setup & reporting</div>
                </div>
              </div>
            </div>

            {/* Tracking & Attribution Stack */}
            <div className="p-5 rounded-xl bg-[#101115] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#F97316] block">
                  Tracking & Infrastructure Included:
                </span>
                <p className="text-xs text-neutral-300 mt-1">
                  Google Analytics 4 (GA4) · Google Tag Manager (GTM) · Meta Conversions API (CAPI) · Clean UTM Architecture · CRM Pipeline Webhooks
                </p>
              </div>
              <button
                onClick={() => onOpenAuditModal('Tracking & Analytics Audit')}
                className="shrink-0 px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer"
              >
                Audit My Tracking Setup
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: FULL DIGITAL MARKETING */}
        {activeTab === 'digital' && (
          <div id="services-digital" className="space-y-8 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F97316] uppercase tracking-wider">
                    <span>The Complete Ecosystem</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    ONE STRATEGY. <br />
                    <span className="text-[#F97316]">ONE CONNECTED GROWTH SYSTEM.</span>
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    Most companies hire three separate freelancers or agencies: one for social,
                    one for ads, and one for website updates. None of them talk to each other,
                    and they blame each other when sales stall.
                  </p>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    MarketMe operates as your singular growth partner, architecting all channels
                    around a single source of truth.
                  </p>

                  {/* Connected System Pipeline Visual */}
                  <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800 space-y-2">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block">
                      The Unified Architecture:
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-200">SOCIAL + SEARCH + ADS</span>
                      <span className="text-[#F97316] font-bold">→</span>
                      <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-200">WEBSITE</span>
                      <span className="text-[#F97316] font-bold">→</span>
                      <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-200">LEAD</span>
                      <span className="text-[#F97316] font-bold">→</span>
                      <span className="px-2.5 py-1 rounded bg-neutral-900 text-emerald-400 font-bold">QUALIFIED LEAD</span>
                      <span className="text-[#F97316] font-bold">→</span>
                      <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-200">CUSTOMER</span>
                      <span className="text-[#F97316] font-bold">→</span>
                      <span className="px-2.5 py-1 rounded bg-[#F97316]/20 text-[#F97316] font-bold">REVENUE</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => onOpenAuditModal('Full Digital Marketing System')}
                      className="px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-[#F97316]/20 cursor-pointer"
                    >
                      <span>BUILD MY MARKETING SYSTEM</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <HarryMascot pose="harry-cta" size="lg" />
                  <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                    "When marketing is unified, every touchpoint amplifies the rest."
                  </span>
                </div>

              </div>
            </div>

            {/* Scope Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Social Media', sub: 'Organic & brand presence' },
                { label: 'Paid Acquisition', sub: 'Meta, Google, JioHotstar' },
                { label: 'SEO & Content', sub: 'Long-term organic authority' },
                { label: 'Conversion Pages', sub: 'Engineered landers' },
                { label: 'CRM & Automation', sub: 'Zero lead drop-off' },
                { label: 'Analytics & Attribution', sub: 'Single source of truth' },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#121318] border border-neutral-800">
                  <span className="text-xs font-bold text-white block mb-0.5">{item.label}</span>
                  <span className="text-[11px] text-neutral-400 block">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: MARKETING AUTOMATION */}
        {activeTab === 'automation' && (
          <div id="services-automation" className="space-y-6 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono uppercase text-[#F97316]">
                  Speed to Lead & Operational Nurture
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  STOP LOSING REVENUE TO SLOW FOLLOW-UPS.
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Generating leads is only half the battle. If a prospect waits 4 hours for someone
                  to contact them, conversion rates drop by over 80%. We build automated notification,
                  qualification, and nurture pipelines that work 24/7.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-[#F97316] font-semibold">01. INSTANT NOTIFICATIONS</span>
                    <h5 className="text-sm font-bold text-white">WhatsApp & Slack Alerts</h5>
                    <p className="text-xs text-neutral-400">Your sales team gets notified in seconds with lead context.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-[#F97316] font-semibold">02. DRIP SEQUENCING</span>
                    <h5 className="text-sm font-bold text-white">Email & Message Workflows</h5>
                    <p className="text-xs text-neutral-400">Nurture cold or hesitant leads with case insights and FAQs.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-[#F97316] font-semibold">03. CRM PIPELINE</span>
                    <h5 className="text-sm font-bold text-white">Clean Deal Stages</h5>
                    <p className="text-xs text-neutral-400">HubSpot, Zoho, or custom CRM mapping to eliminate dropped deals.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenAuditModal('Marketing Automation')}
                    className="px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>AUTOMATE MY LEAD FOLLOW-UP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: WEBSITES & LANDING PAGES (CRO) */}
        {activeTab === 'cro' && (
          <div id="services-cro" className="space-y-6 animate-fadeIn">
            <div className="bg-[#14151A] border border-neutral-800 rounded-2xl p-6 sm:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono uppercase text-[#F97316]">
                  High-Performance Conversion Architecture
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  WEBSITES BUILT TO CONVERT, NOT JUST TO SIT PRETTY.
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Too many agency websites are bloated, slow, and confusing. We design landing pages
                  and responsive sites that load in under a second, clarify your offer within 5 seconds,
                  and guide visitors seamlessly into the enquiry flow.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-[#F97316] font-semibold">01. SPEED & MOBILE</span>
                    <h5 className="text-sm font-bold text-white">Sub-Second Load Times</h5>
                    <p className="text-xs text-neutral-400">Every 100ms delay costs conversion rate. Zero bloat.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-[#F97316] font-semibold">02. MESSAGE MATCH</span>
                    <h5 className="text-sm font-bold text-white">Ad-to-Page Consistency</h5>
                    <p className="text-xs text-neutral-400">The headline matches what the ad promised, keeping intent high.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0D0E11] border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-[#F97316] font-semibold">03. FRICTION REMOVAL</span>
                    <h5 className="text-sm font-bold text-white">Frictionless Forms</h5>
                    <p className="text-xs text-neutral-400">Smart progressive forms and direct WhatsApp entry paths.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenAuditModal('Website & CRO Review')}
                    className="px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>AUDIT MY WEBSITE CONVERSIONS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
