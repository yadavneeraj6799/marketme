/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Eye,
  Target,
  MessageCircle,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { HarryMascot } from './HarryMascot';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  onOpenAuditModal: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAuditModal,
  onExploreServices,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop) return;
      // Check if user prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const { clientX, clientY, currentTarget } = e;
      const rect = currentTarget.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    },
    [isDesktop]
  );

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] pt-24 pb-14 lg:pt-32 lg:pb-20 flex items-center justify-center overflow-hidden border-b border-neutral-900"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Subtle Glow Accent */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Focused Outcome, Explanation, and 2 Primary CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              <span>Strategy first</span>
              <span className="text-neutral-600">·</span>
              <span>Execution second</span>
              <span className="text-neutral-600">·</span>
              <span className="text-white font-medium">Growth always</span>
            </div>

            {/* Clear Business Outcome Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Turn attention into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
                predictable business revenue.
              </span>
            </h1>

            {/* Concise Explanation */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              MarketMe connects organic content, paid acquisition (Meta, Google, JioHotstar),
              high-converting landing pages, and automated lead nurturing into one unified growth
              system.
            </p>

            {/* 1 Primary Audit CTA + 1 Secondary Service CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => {
                  trackEvent('audit_cta_clicked', { source: 'hero_primary' });
                  onOpenAuditModal();
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-[#F97316]/25 hover:shadow-[#F97316]/40 cursor-pointer active:scale-98"
              >
                <span>GET A FREE MARKETING AUDIT</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={() => {
                  trackEvent('service_viewed', { source: 'hero_secondary' });
                  onExploreServices();
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 hover:border-neutral-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                EXPLORE OUR SERVICES
              </button>
            </div>

            {/* Marketing Outcomes Metric Bar */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#F97316]" />
                <span>Brand Visibility</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                <span>Audience Trust</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#F97316]" />
                <span>Qualified Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#F97316]" />
                <span>Revenue Attribution</span>
              </div>
            </div>
          </div>

          {/* Right Column: Harry Mascot with Meaningful Miniature Marketing Workflow Examples */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px]">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Central Mascot Disc Background */}
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-b from-neutral-900 to-[#121318] border border-neutral-800 shadow-2xl transition-transform duration-500 ease-out motion-reduce:transform-none"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)`
                    : 'none',
                }}
              />

              {/* Harry Mascot (Wave / Welcome Pose) */}
              <div
                className="relative z-20 transition-transform duration-300 ease-out motion-reduce:transform-none"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)`
                    : 'none',
                }}
              >
                <HarryMascot
                  pose="harry-wave"
                  size="xl"
                  showSpeechBubble={true}
                  speechText="Where is your marketing leaking?"
                />
              </div>

              {/* Miniature Example 1: Social Media Creative Card (Top-Left) */}
              <div
                className="absolute top-2 left-0 sm:-left-2 z-30 transition-transform duration-500 ease-out motion-reduce:transform-none"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`
                    : 'none',
                }}
              >
                <div className="p-2.5 rounded-xl bg-[#16171D]/95 border border-neutral-700/80 shadow-xl backdrop-blur-md max-w-[170px] text-left">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mb-1">
                    <span>CAROUSEL</span>
                    <span className="text-emerald-400 font-bold">3.4x watch</span>
                  </div>
                  <p className="text-[11px] font-semibold text-white leading-tight">
                    "Why more ads won't fix poor conversion"
                  </p>
                  <span className="text-[9px] text-[#F97316] font-mono mt-1 block">
                    18 DM Inquiries
                  </span>
                </div>
              </div>

              {/* Miniature Example 2: Performance Ad CAPI Card (Top-Right) */}
              <div
                className="absolute top-4 right-0 sm:-right-2 z-30 transition-transform duration-500 ease-out motion-reduce:transform-none"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * 18}px, ${mousePos.y * -16}px, 0)`
                    : 'none',
                }}
              >
                <div className="p-2.5 rounded-xl bg-[#16171D]/95 border border-neutral-700/80 shadow-xl backdrop-blur-md max-w-[175px] text-left">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mb-1">
                    <span>META + GOOGLE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] font-semibold text-white leading-tight">
                    Server-Side CAPI Verified
                  </p>
                  <span className="text-[9px] text-emerald-400 font-mono mt-1 block">
                    42 Qualified Leads
                  </span>
                </div>
              </div>

              {/* Miniature Example 3: Lead Workflow Automation (Bottom-Left) */}
              <div
                className="absolute bottom-4 left-0 z-30 transition-transform duration-500 ease-out motion-reduce:transform-none"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * -16}px, ${mousePos.y * 18}px, 0)`
                    : 'none',
                }}
              >
                <div className="p-2.5 rounded-xl bg-[#16171D]/95 border border-[#F97316]/40 shadow-xl backdrop-blur-md max-w-[175px] text-left">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono mb-1">
                    <MessageCircle className="w-3 h-3 text-emerald-400" />
                    <span>SPEED TO LEAD</span>
                  </div>
                  <p className="text-[11px] font-semibold text-white leading-tight">
                    Instant WhatsApp Alert
                  </p>
                  <span className="text-[9px] text-neutral-400 font-mono mt-0.5 block">
                    Sales response &lt; 2 min
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
