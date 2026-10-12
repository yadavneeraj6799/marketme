/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HarryMascot } from './HarryMascot';
import { X, MessageSquare, ArrowRight, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { OFFICIAL_WHATSAPP_LINK, generateWhatsAppLeadLink } from '../utils/leadStore';

interface AskHarryProps {
  onOpenAuditModal: (context?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

interface DialogueNode {
  id: string;
  question: string;
  pose: 'harry-wave' | 'harry-thinking' | 'harry-analyse' | 'harry-idea' | 'harry-cta' | 'harry-present';
  options: {
    label: string;
    nextNodeId?: string;
    action?: 'audit' | 'whatsapp' | 'service';
    serviceId?: string;
  }[];
  advice?: string;
  recommendedService?: string;
}

const TREE: Record<string, DialogueNode> = {
  root: {
    id: 'root',
    question: "Hey! I'm Harry. What are we trying to improve for your business?",
    pose: 'harry-wave',
    options: [
      { label: 'Get more qualified leads', nextNodeId: 'leads' },
      { label: 'Improve our social media presence', nextNodeId: 'social' },
      { label: 'Fix underperforming ads', nextNodeId: 'ads' },
      { label: 'Improve website conversions', nextNodeId: 'website' },
      { label: 'Automate sales & lead follow-up', nextNodeId: 'automation' },
      { label: 'Build a complete marketing system', nextNodeId: 'system' },
      { label: "I'm not sure where to start", nextNodeId: 'unsure' },
    ],
  },
  leads: {
    id: 'leads',
    question: "Got it. When it comes to leads, what is the biggest headache?",
    pose: 'harry-analyse',
    options: [
      { label: 'Volume is too low', nextNodeId: 'leads_volume' },
      { label: "Sales says leads are poor quality / tire-kickers", nextNodeId: 'leads_quality' },
      { label: 'Cost per lead is through the roof', nextNodeId: 'leads_cpl' },
    ],
  },
  leads_volume: {
    id: 'leads_volume',
    question: "Understood. Low volume usually means either under-invested acquisition or relying only on unpredictable organic reach.",
    pose: 'harry-present',
    advice: "We build structured Performance Marketing engines (Meta, Google, JioHotstar) that reliably generate high-intent inquiries.",
    recommendedService: 'Performance Marketing',
    options: [
      { label: 'Get a Free Marketing Audit', action: 'audit' },
      { label: 'Chat with Harry on WhatsApp', action: 'whatsapp' },
      { label: 'View Performance Marketing Details', action: 'service', serviceId: 'services-performance' },
    ],
  },
  leads_quality: {
    id: 'leads_quality',
    question: "That's common! If lead forms are too easy or targeting is too broad, you get bargain hunters.",
    pose: 'harry-idea',
    advice: "We introduce intentional qualification steps on landing pages and calibrate ad targeting to exclude low-intent clicks.",
    recommendedService: 'Lead Qualification & Landing Page CRO',
    options: [
      { label: 'Audit My Lead Funnel', action: 'audit' },
      { label: 'Talk to Our Strategist on WhatsApp', action: 'whatsapp' },
    ],
  },
  leads_cpl: {
    id: 'leads_cpl',
    question: "High CPL happens when ad creatives fatigue or your landing page fails to convert paid traffic.",
    pose: 'harry-analyse',
    advice: "We fix message match and run rapid creative testing to bring unit costs back in line.",
    recommendedService: 'Performance Marketing & Creative Strategy',
    options: [
      { label: 'Audit My Ad Spend & CPL', action: 'audit' },
      { label: 'Discuss on WhatsApp', action: 'whatsapp' },
    ],
  },
  social: {
    id: 'social',
    question: "What is currently lacking in your social media?",
    pose: 'harry-thinking',
    options: [
      { label: 'We look inactive & inconsistent', nextNodeId: 'social_inactive' },
      { label: 'We get views but zero business enquiries', nextNodeId: 'social_views' },
      { label: 'We need creative direction & reels/shorts', nextNodeId: 'social_creative' },
    ],
  },
  social_inactive: {
    id: 'social_inactive',
    question: "Inactivity hurts credibility. Prospects check your profiles before buying to make sure you're alive and legitimate.",
    pose: 'harry-present',
    advice: "Our Social Media Marketing system ensures consistent brand voice, weekly content pillars, and active management.",
    recommendedService: 'Social Media Marketing (Launch Support up to ₹3,000 available)',
    options: [
      { label: 'Explore Social Media Marketing', action: 'service', serviceId: 'services-social' },
      { label: 'Get Free Social Audit', action: 'audit' },
    ],
  },
  social_views: {
    id: 'social_views',
    question: "Viral views that don't convert are vanity metrics. Content needs commercial intent.",
    pose: 'harry-idea',
    advice: "We engineer content around customer pain points, offer bridges, and optimized bio conversion funnels.",
    recommendedService: 'Demand-Engineered Social Media',
    options: [
      { label: 'Fix Content-To-Demand Flow', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
    ],
  },
  social_creative: {
    id: 'social_creative',
    question: "Creative is your new targeting. High-performing hooks stop the scroll.",
    pose: 'harry-cta',
    advice: "We script, design, and direct high-retention carousels, UGC, and short-form video concepts.",
    recommendedService: 'Social Creative & Production',
    options: [
      { label: 'Start Free Social Audit', action: 'audit' },
      { label: 'View Service Details', action: 'service', serviceId: 'services-social' },
    ],
  },
  ads: {
    id: 'ads',
    question: "Which ad platform is causing issues?",
    pose: 'harry-analyse',
    options: [
      { label: 'Meta Ads (Facebook & Instagram)', nextNodeId: 'ads_meta' },
      { label: 'Google Ads (Search & PMax)', nextNodeId: 'ads_google' },
      { label: 'OTT / JioHotstar Advertising', nextNodeId: 'ads_jio' },
    ],
  },
  ads_meta: {
    id: 'ads_meta',
    question: "Meta requires constant creative variation and robust CAPI tracking.",
    pose: 'harry-idea',
    advice: "We build structured testing pipelines that isolate winning hooks and scale spend sustainably.",
    recommendedService: 'Meta Ads Acquisition System',
    options: [
      { label: 'Audit My Meta Ad Account', action: 'audit' },
      { label: 'Ask a Question on WhatsApp', action: 'whatsapp' },
    ],
  },
  ads_google: {
    id: 'ads_google',
    question: "Google is high-intent intent capture. The key is search term hygiene and negative keywords.",
    pose: 'harry-analyse',
    advice: "We eliminate wasted spend on irrelevant queries and build dedicated conversion pages.",
    recommendedService: 'Google Ads & Intent Capture',
    options: [
      { label: 'Audit My Google Ads', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
    ],
  },
  ads_jio: {
    id: 'ads_jio',
    question: "JioHotstar offers massive scale during live sports and marquee shows.",
    pose: 'harry-present',
    advice: "MarketMe has hands-on experience running JioHotstar campaigns, media planning, and Brand Lift Studies.",
    recommendedService: 'JioHotstar Advertising Execution',
    options: [
      { label: 'Inquire About JioHotstar Ads', action: 'audit' },
      { label: 'Direct WhatsApp Inquiry', action: 'whatsapp' },
    ],
  },
  website: {
    id: 'website',
    question: "If traffic lands but leaves without submitting, there's friction on the page.",
    pose: 'harry-analyse',
    advice: "We audit mobile speed, value proposition clarity, social proof placement, and form friction.",
    recommendedService: 'Websites & Landing Page CRO',
    options: [
      { label: 'Request Free Website Teardown', action: 'audit' },
      { label: 'View Website Services', action: 'service', serviceId: 'services-cro' },
    ],
  },
  automation: {
    id: 'automation',
    question: "Speed to lead is everything. Every hour of delay cuts conversion in half.",
    pose: 'harry-idea',
    advice: "We set up automated WhatsApp alerts, CRM deal stages, and automated email follow-ups.",
    recommendedService: 'Marketing Automation & CRM',
    options: [
      { label: 'Automate My Follow-up System', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
    ],
  },
  system: {
    id: 'system',
    question: "That's MarketMe's bread and butter: connecting every channel into one revenue engine.",
    pose: 'harry-present',
    advice: "We unite Social + Search + Ads + Landers + CRM so your marketing compounds rather than competes with itself.",
    recommendedService: 'Full Digital Marketing Growth System',
    options: [
      { label: 'Get a Complete System Audit', action: 'audit' },
      { label: 'Chat Directly on WhatsApp', action: 'whatsapp' },
      { label: 'Explore The Full System', action: 'service', serviceId: 'services-digital' },
    ],
  },
  unsure: {
    id: 'unsure',
    question: "No problem at all! That's why we start with diagnosis before prescribing anything.",
    pose: 'harry-wave',
    advice: "Let us review your business, competitor landscape, and current assets with a zero-cost Marketing Audit.",
    recommendedService: 'Comprehensive Diagnostic Audit',
    options: [
      { label: 'Claim Free Marketing Audit', action: 'audit' },
      { label: 'Have a Quick Chat on WhatsApp', action: 'whatsapp' },
    ],
  },
};

export const AskHarry: React.FC<AskHarryProps> = ({ onOpenAuditModal, onNavigateToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');

  const currentNode = TREE[currentNodeId] || TREE.root;

  const handleToggle = () => {
    if (!isOpen) {
      trackEvent('ask_harry_opened');
    }
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DialogueNode['options'][0]) => {
    if (option.action === 'audit') {
      onOpenAuditModal(currentNode.recommendedService || 'Ask Harry recommendation');
      setIsOpen(false);
      return;
    }
    if (option.action === 'whatsapp') {
      const link = generateWhatsAppLeadLink(
        {},
        `Hi MarketMe! Harry recommended I chat with you about: ${currentNode.recommendedService || 'Marketing Growth'}`
      );
      window.open(link, '_blank');
      setIsOpen(false);
      return;
    }
    if (option.action === 'service' && option.serviceId) {
      onNavigateToSection(option.serviceId);
      setIsOpen(false);
      return;
    }

    if (option.nextNodeId) {
      setCurrentNodeId(option.nextNodeId);
      trackEvent('ask_harry_recommendation', { node: option.nextNodeId });
    }
  };

  const handleReset = () => {
    setCurrentNodeId('root');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={handleToggle}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#16171D] border border-neutral-700/80 hover:border-[#F97316] text-white shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Ask Harry - Mascot Assistant"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-900 border border-[#F97316]/60 flex items-center justify-center shrink-0">
              <HarryMascot pose="harry-wave" size="xs" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white group-hover:text-[#F97316] transition-colors flex items-center gap-1">
                ASK HARRY <Sparkles className="w-3 h-3 text-[#F97316]" />
              </span>
              <span className="text-[10px] text-neutral-400">Brand Guide</span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Assistant Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] bg-[#14151A] border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="px-4 py-3 bg-[#181920] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-[#F97316] flex items-center justify-center">
                <HarryMascot pose={currentNode.pose} size="xs" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  Harry Fox <span className="text-[10px] text-[#F97316] font-mono">MarketMe Guide</span>
                </span>
                <span className="text-[10px] text-neutral-400 block">Decision-Tree Assistant</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart conversation"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dialogue Content */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
            
            {/* Harry's Message Bubble */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                <HarryMascot pose={currentNode.pose} size="sm" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#1C1D24] border border-neutral-700/80 text-neutral-200 text-xs sm:text-sm leading-relaxed">
                <p>{currentNode.question}</p>
                {currentNode.advice && (
                  <p className="mt-2 text-neutral-300 font-medium border-t border-neutral-700/60 pt-2 text-xs">
                    💡 {currentNode.advice}
                  </p>
                )}
                {currentNode.recommendedService && (
                  <div className="mt-2.5 p-2 rounded-lg bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-[11px] font-bold">
                    Target System: {currentNode.recommendedService}
                  </div>
                )}
              </div>
            </div>

            {/* Decision Options */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block px-1">
                Choose an option:
              </span>
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs cursor-pointer flex items-center justify-between ${
                    opt.action === 'audit'
                      ? 'bg-[#F97316] hover:bg-[#EA580C] text-white font-bold border-transparent'
                      : opt.action === 'whatsapp'
                      ? 'bg-neutral-900 border-neutral-700 hover:border-emerald-500 text-emerald-400 font-semibold'
                      : 'bg-[#121318] hover:bg-[#181920] border-neutral-800 hover:border-neutral-700 text-neutral-200 font-medium'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.action === 'whatsapp' ? (
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* Footer note */}
          <div className="px-4 py-2 bg-[#0E0F13] border-t border-neutral-800 text-[10px] text-neutral-400 text-center font-mono">
            WhatsApp: 9321856109 · Free Strategy Audits
          </div>

        </div>
      )}
    </>
  );
};
