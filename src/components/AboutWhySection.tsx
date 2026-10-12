/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Layers, Compass, BarChart2, Cpu, CheckSquare } from 'lucide-react';

export const AboutWhySection: React.FC = () => {
  const differentiators = [
    {
      title: 'STRATEGY FIRST',
      icon: Compass,
      desc: 'We investigate the problem thoroughly before recommending channels or spending money.',
    },
    {
      title: 'FULL-FUNNEL THINKING',
      icon: Layers,
      desc: "Attention is only useful if there's somewhere valuable and conversion-ready for it to go.",
    },
    {
      title: 'CONTENT + PERFORMANCE',
      icon: Target,
      desc: "Brand building and customer acquisition shouldn't operate in isolated departmental silos.",
    },
    {
      title: 'TRACKING MATTERS',
      icon: BarChart2,
      desc: 'Marketing decisions must be backed by clean server-side data, not wishful thinking.',
    },
    {
      title: 'CONNECTED SYSTEMS',
      icon: Cpu,
      desc: 'Ads, websites, CRM, and automated follow-up should compound each other seamlessly.',
    },
    {
      title: 'TRANSPARENT REPORTING',
      icon: CheckSquare,
      desc: 'We focus reporting strictly on numbers that inform decisions — qualified leads and revenue.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#0D0E11] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Philosophy Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F97316] flex items-center gap-2">
              <span>Agency Philosophy</span>
              <span className="text-neutral-600">/</span>
              <span>Truth in Marketing</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              MARKETING SHOULD HAVE <br />
              <span className="text-[#F97316]">A REASON BEHIND IT.</span>
            </h2>
            <div className="space-y-3.5 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                Too much marketing is produced simply because an agency has to check a box or bill
                retainer hours. That results in filler social posts nobody cares about, ad campaigns
                aimed at the wrong metrics, and broken lead handoffs.
              </p>
              <p>
                At <span className="text-white font-semibold">MarketMe</span>, our foundation rests
                on four non-negotiable principles:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#14151B] border border-neutral-800">
                <span className="text-xs font-mono text-[#F97316] font-bold block mb-1">01. DIAGNOSIS</span>
                <p className="text-xs text-neutral-300">Diagnosis before tactics. Always.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14151B] border border-neutral-800">
                <span className="text-xs font-mono text-[#F97316] font-bold block mb-1">02. STRATEGY</span>
                <p className="text-xs text-neutral-300">Strategy before execution.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14151B] border border-neutral-800">
                <span className="text-xs font-mono text-[#F97316] font-bold block mb-1">03. OUTCOMES</span>
                <p className="text-xs text-neutral-300">Business outcomes before vanity metrics.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14151B] border border-neutral-800">
                <span className="text-xs font-mono text-[#F97316] font-bold block mb-1">04. INTEGRATION</span>
                <p className="text-xs text-neutral-300">Connected customer journeys, not disconnected silos.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#121318] border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              What We Actually Manage:
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              MarketMe builds and manages systems across five core disciplines:
            </p>

            <div className="space-y-3">
              {[
                { title: 'Social Media Marketing', desc: 'Brand authority, narrative content, community trust' },
                { title: 'Paid Acquisition & Performance', desc: 'Meta Ads, Google Search/PMax, YouTube, JioHotstar' },
                { title: 'Full Digital Marketing', desc: 'Holistic growth systems coordinating multiple touchpoints' },
                { title: 'Websites & Landing Pages', desc: 'High-speed, friction-free conversion experiences' },
                { title: 'Marketing Automation', desc: 'CRM pipelines, instant WhatsApp alerts, automated nurture' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#0D0E11] border border-neutral-800/80">
                  <div className="w-2 h-2 rounded-full bg-[#F97316] mt-1.5 shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">{item.title}</span>
                    <span className="text-xs text-neutral-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why MarketMe Differentiators Grid */}
        <div className="pt-8">
          <div className="max-w-2xl text-left mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#F97316] block mb-2">
              The MarketMe Difference
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              WHY PARTNER WITH MARKETME?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((d, idx) => {
              const Icon = d.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#121318] border border-neutral-800 hover:border-neutral-700 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#F97316]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-extrabold text-white tracking-wide">
                    {d.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
