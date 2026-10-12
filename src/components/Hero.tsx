/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Eye, Target } from 'lucide-react';
import { HarryMascot } from './HarryMascot';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  onOpenAuditModal: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuditModal, onExploreServices }) => {
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
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden border-b border-neutral-900"
    >
      {/* Background Subtle Tech Grid & Depth Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Subtle Warm Growth Gradient Origin (Controlled, Not Excessive Glow) */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Trust Line */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              <span>Strategy first</span>
              <span className="text-neutral-600">·</span>
              <span>Execution second</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-200 font-semibold">Growth always</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              TURN ATTENTION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
                INTO BUSINESS GROWTH.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              MarketMe connects strategy, content, paid media, websites and marketing systems to
              help businesses build visibility, credibility, brand authority and generate
              opportunities for growth.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  trackEvent('audit_cta_clicked', { source: 'hero_primary' });
                  onOpenAuditModal();
                }}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#F97316]/25 hover:shadow-[#F97316]/40 cursor-pointer active:scale-98"
              >
                <span>GET A FREE MARKETING AUDIT</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={() => {
                  trackEvent('service_viewed', { source: 'hero_secondary' });
                  onExploreServices();
                }}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 hover:border-neutral-700 font-semibold text-sm transition-all cursor-pointer"
              >
                EXPLORE OUR SERVICES
              </button>
            </div>

            {/* Subtle Marketing Indicators Bar */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Eye className="w-4 h-4 text-[#F97316]" />
                <span>Visibility <span className="text-emerald-400 font-bold">↑</span></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                <span>Credibility <span className="text-emerald-400 font-bold">↑</span></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <TrendingUp className="w-4 h-4 text-[#F97316]" />
                <span>Brand Authority <span className="text-emerald-400 font-bold">↑</span></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Target className="w-4 h-4 text-[#F97316]" />
                <span>Qualified Leads <span className="text-emerald-400 font-bold">↑</span></span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered 2D Hero Scene with Harry Fox & Floating Depth Elements */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Visual Frame Container */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Layer 0: Background Stage Disc */}
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-b from-neutral-900 to-[#121318] border border-neutral-800 shadow-2xl transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`
                    : 'none',
                }}
              />

              {/* Layer 1: Harry Fox Mascot Position */}
              <div
                className="relative z-20 transition-transform duration-300 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
                    : 'none',
                }}
              >
                <HarryMascot
                  pose="harry-wave"
                  size="xl"
                  showSpeechBubble={true}
                  speechText="Ready to build your growth system?"
                />
              </div>

              {/* Layer 2: Floating Marketing Dimension Objects (Layered Parallax Depth) */}
              
              {/* Card 1: SOCIAL (Top Left) */}
              <div
                className="absolute top-2 left-2 z-30 transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * -26}px, ${mousePos.y * -26}px, 0)`
                    : 'none',
                }}
              >
                <div className="px-3.5 py-2 rounded-xl bg-[#18191E]/95 border border-neutral-700/80 shadow-xl backdrop-blur-md flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">SOCIAL</span>
                  <span className="text-[10px] text-neutral-400">Demand</span>
                </div>
              </div>

              {/* Card 2: ADS (Top Right) */}
              <div
                className="absolute top-6 right-2 z-30 transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * 22}px, ${mousePos.y * -20}px, 0)`
                    : 'none',
                }}
              >
                <div className="px-3.5 py-2 rounded-xl bg-[#18191E]/95 border border-neutral-700/80 shadow-xl backdrop-blur-md flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">ADS</span>
                  <span className="text-[10px] text-neutral-400">Meta/Google</span>
                </div>
              </div>

              {/* Card 3: SEO (Mid Left) */}
              <div
                className="absolute top-1/2 -left-6 -translate-y-1/2 z-30 transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * -18}px, ${mousePos.y * 14}px, 0)`
                    : 'none',
                }}
              >
                <div className="px-3 py-1.5 rounded-xl bg-[#141519]/90 border border-neutral-800 shadow-lg flex items-center gap-1.5">
                  <span className="text-xs font-mono font-semibold text-neutral-200">SEO</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">+Organic</span>
                </div>
              </div>

              {/* Card 4: LEADS (Mid Right) */}
              <div
                className="absolute top-1/2 -right-4 -translate-y-1/2 z-30 transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * 28}px, ${mousePos.y * 18}px, 0)`
                    : 'none',
                }}
              >
                <div className="px-3.5 py-2 rounded-xl bg-[#18191E]/95 border border-[#F97316]/40 shadow-xl backdrop-blur-md flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">LEADS</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Qualified</span>
                </div>
              </div>

              {/* Card 5: CONTENT (Bottom Left) */}
              <div
                className="absolute bottom-4 left-0 z-30 transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * -20}px, ${mousePos.y * 24}px, 0)`
                    : 'none',
                }}
              >
                <div className="px-3 py-1.5 rounded-xl bg-[#141519]/95 border border-neutral-800 shadow-md flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-neutral-300">CONTENT</span>
                  <span className="text-[10px] text-neutral-400">Authority</span>
                </div>
              </div>

              {/* Card 6: AUTOMATION & ANALYTICS (Bottom Right) */}
              <div
                className="absolute bottom-6 right-2 z-30 transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(${mousePos.x * 20}px, ${mousePos.y * 26}px, 0)`
                    : 'none',
                }}
              >
                <div className="px-3.5 py-2 rounded-xl bg-[#18191E]/95 border border-neutral-800 shadow-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">AUTOMATION</span>
                  <span className="text-[10px] text-neutral-400">CRM</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
