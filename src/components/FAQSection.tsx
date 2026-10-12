/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'What does MarketMe do?',
    a: 'MarketMe is a digital marketing agency that connects strategy, creative content, paid acquisition (Meta, Google, JioHotstar), high-converting landing pages, and automated lead nurturing into one unified growth system. We focus on business outcomes and qualified demand rather than isolated vanity metrics.',
  },
  {
    q: 'Which service should I choose?',
    a: 'It depends on your current bottleneck. If nobody knows you or your profiles look dead, start with Social Media Marketing. If you have an established offer and need a reliable flow of qualified leads, Performance Marketing is the answer. If your channels feel chaotic and disconnected, our Full Digital Marketing system connects the entire pipeline.',
  },
  {
    q: 'Do you manage social media?',
    a: 'Yes. Our Social Media Marketing service handles audience research, brand voice, content calendars, Reels/Shorts creative direction, high-retention carousels, daily community management, and monthly performance reporting across Instagram, LinkedIn, X, and YouTube.',
  },
  {
    q: 'Do you run Meta Ads?',
    a: 'Yes. We build full-funnel Meta advertising campaigns across Facebook and Instagram, spanning top-of-funnel creative testing, lead generation forms, click-to-WhatsApp campaigns, and dynamic catalog retargeting, backed by server-side Meta Conversions API (CAPI).',
  },
  {
    q: 'Do you run Google Ads?',
    a: 'Yes. We manage high-intent Google Search campaigns, Performance Max (PMax) asset groups, and Remarketing. We focus heavily on search term hygiene and negative keyword pruning so you do not waste ad spend on curiosity clicks.',
  },
  {
    q: 'Do you run YouTube Ads?',
    a: 'Yes. We plan and manage YouTube Video Action campaigns for businesses with compelling video assets or clear visual demonstrations that benefit from longer-form narrative.',
  },
  {
    q: 'Do you work with JioHotstar advertising?',
    a: 'Yes, MarketMe has hands-on experience running JioHotstar advertising. We support end-to-end OTT campaign planning, audience targeting, live sports/entertainment inventory planning, delivery pacing, optimization, and Brand Lift Study (BLS) reporting.',
  },
  {
    q: 'Can you help with websites and landing pages?',
    a: 'Yes. High ad spend is wasted if visitors bounce off a confusing landing page. We design and build ultra-fast, mobile-optimized landing pages engineered for conversion clarity and friction-free inquiry submission.',
  },
  {
    q: 'Do you provide marketing automation?',
    a: 'Yes. We implement CRM pipeline workflows, instant WhatsApp/Slack alerts for your sales team the moment a lead arrives, and automated email drip sequences to nurture leads who need more time.',
  },
  {
    q: 'How much advertising budget do I need?',
    a: 'We generally recommend a minimum paid testing budget of ₹25,000 to ₹50,000 per month for performance campaigns so the ad platform algorithms have enough data points to exit the learning phase. For larger brands, we scale budgets to multiple lakhs based on proven unit economics.',
  },
  {
    q: 'How long does marketing take to work?',
    a: 'Paid acquisition (Meta and Google Ads) can start generating initial inquiries within days of launch. Brand authority and organic social momentum compound over 60 to 90 days. Full growth systems typically require a 3-month cycle to test, gather data, optimize friction points, and scale predictably.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No, and any agency that promises guaranteed ROAS, sales, or viral follower counts is misleading you. Ad costs fluctuate, algorithms change, and external market factors vary. What MarketMe guarantees is senior strategic attention, rigorous testing, clean tracking infrastructure, and brutal honesty about your numbers.',
  },
  {
    q: 'Can MarketMe handle complete digital marketing?',
    a: 'Yes. Many clients hire us as their unified growth partner to manage strategy, content, paid media, landing pages, CRM automation, and attribution together, eliminating the finger-pointing that happens between multiple vendors.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#090A0D] border-b border-neutral-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F97316] mb-3 flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            TRANSPARENT ANSWERS.
          </h2>
          <p className="mt-3 text-base text-neutral-300">
            Clear, realistic answers about our services, timelines, pricing, and expectations.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-[#14151B] border-[#F97316]/50 shadow-md'
                    : 'bg-[#101115] border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-white' : 'text-neutral-200'}`}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#F97316]' : 'text-neutral-500'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-neutral-800/60 mt-1 animate-fadeIn">
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-3">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
