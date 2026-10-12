/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HarryMascot } from './HarryMascot';
import { ArrowRight, MessageCircle, Instagram, Linkedin, PhoneCall, Sparkles } from 'lucide-react';
import { OFFICIAL_WHATSAPP_LINK } from '../utils/leadStore';
import { trackEvent } from '../utils/analytics';

interface FinalCTAProps {
  onOpenAuditModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0D0E11] relative overflow-hidden border-b border-neutral-900">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#14151A] border border-neutral-800 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Pressure · Pragmatic Review</span>
              </div>

              <div>
                <span className="text-sm font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                  YOU'VE SEEN HOW WE THINK.
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  NOW LET'S LOOK AT <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
                    YOUR BUSINESS.
                  </span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
                Tell us what's working, what's not, and where you want to go. We'll help identify
                where your marketing deserves attention first — without fluff or aggressive sales pitches.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => {
                    trackEvent('audit_cta_clicked', { source: 'final_cta_primary' });
                    onOpenAuditModal();
                  }}
                  className="px-7 py-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#F97316]/25 hover:shadow-[#F97316]/40 cursor-pointer active:scale-98"
                >
                  <span>GET A FREE MARKETING AUDIT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={OFFICIAL_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_clicked', { source: 'final_cta_secondary' })}
                  className="px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>

              {/* Direct Channels */}
              <div className="pt-8 border-t border-neutral-800/80 flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-mono">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span className="text-neutral-300">WhatsApp: +91 9321856109</span>
                </div>

                <a
                  href="https://www.instagram.com/marketme.ny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#F97316]" />
                  <span>@marketme.ny</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/marketme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn: MarketMe</span>
                </a>
              </div>
            </div>

            {/* Right Harry Mascot */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
              <HarryMascot
                pose="harry-cta"
                size="xl"
                showSpeechBubble={true}
                speechText="Let's find your revenue leak!"
              />
              <span className="text-xs font-mono text-neutral-400 mt-2 text-center">
                Harry Fox · MarketMe Brand Guide
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
