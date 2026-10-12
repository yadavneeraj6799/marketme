/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HarryMascot } from './HarryMascot';
import {
  X,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { generateWhatsAppLeadLink } from '../utils/leadStore';
import { AuditContext, ServiceTab } from '../types';

interface AskHarryProps {
  onOpenAuditModal: (context: AuditContext) => void;
  onNavigateToSection: (sectionId: string, serviceTab?: ServiceTab) => void;
}

interface DialogueNode {
  id: string;
  question: string;
  pose:
    | 'harry-wave'
    | 'harry-thinking'
    | 'harry-analyse'
    | 'harry-idea'
    | 'harry-cta'
    | 'harry-present';
  options: {
    label: string;
    nextNodeId?: string;
    action?: 'audit' | 'whatsapp' | 'service';
    serviceTab?: ServiceTab;
  }[];
  advice?: string;
  recommendedStartingPoint?: string;
}

const TREE: Record<string, DialogueNode> = {
  root: {
    id: 'root',
    question: "Hey! I'm Harry. What is the main growth priority for your business right now?",
    pose: 'harry-wave',
    options: [
      { label: 'Get more qualified leads', nextNodeId: 'followup_leads_type' },
      { label: 'Fix inactive or low-reach social media', nextNodeId: 'followup_social_goal' },
      { label: 'Improve underperforming ad spend', nextNodeId: 'followup_ads_platform' },
      { label: 'Fix a website that gets traffic but no conversions', nextNodeId: 'followup_website_friction' },
      { label: 'Automate sales follow-up and lead routing', nextNodeId: 'automation_result' },
      { label: 'Connect all marketing into one growth system', nextNodeId: 'system_result' },
      { label: "I'm not sure where the leak is", nextNodeId: 'unsure_result' },
    ],
  },

  // 1. Leads Branch with Follow-up Question
  followup_leads_type: {
    id: 'followup_leads_type',
    question: 'To recommend the right starting point: what type of business are you operating?',
    pose: 'harry-thinking',
    options: [
      { label: 'B2B / High-ticket service or consulting', nextNodeId: 'leads_b2b_result' },
      { label: 'B2C service / clinic / local business', nextNodeId: 'leads_b2c_result' },
      { label: 'E-commerce or direct-to-consumer brand', nextNodeId: 'leads_ecom_result' },
    ],
  },
  leads_b2b_result: {
    id: 'leads_b2b_result',
    question: 'Got it. For B2B and high-ticket offers, high lead volume with low qualification wastes sales hours.',
    pose: 'harry-analyse',
    advice:
      'We recommend introducing intentional qualifying fields on dedicated landing pages and running high-intent Google Search or targeted Meta video action campaigns.',
    recommendedStartingPoint: 'Performance Marketing (High-Intent Acquisition)',
    options: [
      { label: 'Audit My B2B Funnel', action: 'audit' },
      { label: 'Discuss with Harry on WhatsApp', action: 'whatsapp' },
      { label: 'View Performance Marketing Details', action: 'service', serviceTab: 'performance' },
    ],
  },
  leads_b2c_result: {
    id: 'leads_b2c_result',
    question: 'For local and B2C services, speed to lead and direct message engagement make all the difference.',
    pose: 'harry-idea',
    advice:
      'Click-to-WhatsApp Meta campaigns paired with instant automated responses usually yield the lowest acquisition friction.',
    recommendedStartingPoint: 'Performance Marketing (Direct-to-WhatsApp Flow)',
    options: [
      { label: 'Get Free Acquisition Audit', action: 'audit' },
      { label: 'Connect on WhatsApp', action: 'whatsapp' },
      { label: 'View Service Details', action: 'service', serviceTab: 'performance' },
    ],
  },
  leads_ecom_result: {
    id: 'leads_ecom_result',
    question: 'For E-commerce, the key is creative testing velocity and solid Conversion API (CAPI) tracking.',
    pose: 'harry-analyse',
    advice:
      'We focus on high-converting product angles, catalog retargeting, and frictionless mobile checkouts.',
    recommendedStartingPoint: 'Performance Marketing & Creative Strategy',
    options: [
      { label: 'Request Free E-commerce Ad Audit', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
      { label: 'Explore Performance Marketing', action: 'service', serviceTab: 'performance' },
    ],
  },

  // 2. Social Branch with Follow-up Question
  followup_social_goal: {
    id: 'followup_social_goal',
    question: 'What is currently the biggest challenge on social media?',
    pose: 'harry-thinking',
    options: [
      { label: 'We post occasionally but look inactive and outdated', nextNodeId: 'social_inactive_result' },
      { label: 'We get views and likes, but zero commercial inquiries', nextNodeId: 'social_intent_result' },
      { label: 'We struggle with creative direction and video scripts', nextNodeId: 'social_creative_result' },
    ],
  },
  social_inactive_result: {
    id: 'social_inactive_result',
    question: 'Inactivity harms credibility. Potential buyers check your profiles to ensure you are active before deciding to buy.',
    pose: 'harry-present',
    advice:
      'Our Social Media Marketing system builds consistent weekly content pillars, proof highlights, and profile bio funnels.',
    recommendedStartingPoint: 'Social Media Marketing (Credibility & Cadence)',
    options: [
      { label: 'Request Free Social Audit', action: 'audit' },
      { label: 'View Social Media Service', action: 'service', serviceTab: 'social' },
      { label: 'Ask a Question on WhatsApp', action: 'whatsapp' },
    ],
  },
  social_intent_result: {
    id: 'social_intent_result',
    question: 'Views without inquiries happen when content entertains onlookers rather than solving buyer problems.',
    pose: 'harry-idea',
    advice:
      'We re-anchor your content pillars around commercial questions that buyers pay to solve, paired with direct DM triggers.',
    recommendedStartingPoint: 'Social Media Marketing (Demand-Engineered Content)',
    options: [
      { label: 'Audit My Content Conversion Flow', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
      { label: 'View Social Strategy', action: 'service', serviceTab: 'social' },
    ],
  },
  social_creative_result: {
    id: 'social_creative_result',
    question: 'In today’s feed, the first 3 seconds determine whether anyone pays attention.',
    pose: 'harry-cta',
    advice:
      'We produce high-retention carousels, short-form scripts, and UGC-style creative concepts designed to stop the scroll.',
    recommendedStartingPoint: 'Social Creative & Scripting System',
    options: [
      { label: 'Claim Free Social Review', action: 'audit' },
      { label: 'View Service Details', action: 'service', serviceTab: 'social' },
    ],
  },

  // 3. Ads Branch with Follow-up Question
  followup_ads_platform: {
    id: 'followup_ads_platform',
    question: 'Which advertising channel is currently underperforming?',
    pose: 'harry-analyse',
    options: [
      { label: 'Meta Ads (Facebook & Instagram)', nextNodeId: 'ads_meta_result' },
      { label: 'Google Search or Performance Max', nextNodeId: 'ads_google_result' },
      { label: 'Exploring OTT / JioHotstar advertising', nextNodeId: 'ads_ott_result' },
    ],
  },
  ads_meta_result: {
    id: 'ads_meta_result',
    question: 'Meta ad performance usually breaks at creative fatigue or missing server-side CAPI tracking.',
    pose: 'harry-idea',
    advice:
      'We run structured creative angle testing and server-side tracking to stabilize your cost per acquisition.',
    recommendedStartingPoint: 'Meta Ads Acquisition System',
    options: [
      { label: 'Audit My Meta Ad Account', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
      { label: 'Explore Performance Marketing', action: 'service', serviceTab: 'performance' },
    ],
  },
  ads_google_result: {
    id: 'ads_google_result',
    question: 'On Google, broad match leakage and poor negative keywords frequently drain budget on curiosity clicks.',
    pose: 'harry-analyse',
    advice:
      'We tighten search query hygiene, isolate high-intent keyword themes, and align ad copy directly with the landing page headline.',
    recommendedStartingPoint: 'Google Ads Intent Optimization',
    options: [
      { label: 'Audit My Google Ads Account', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
    ],
  },
  ads_ott_result: {
    id: 'ads_ott_result',
    question: 'JioHotstar offers massive scale during live sports and marquee shows.',
    pose: 'harry-present',
    advice:
      'MarketMe provides hands-on JioHotstar media planning, regional audience targeting, pacing oversight, and Brand Lift Study support.',
    recommendedStartingPoint: 'JioHotstar OTT Advertising Planning',
    options: [
      { label: 'Inquire About JioHotstar Campaign', action: 'audit' },
      { label: 'Direct WhatsApp Inquiry', action: 'whatsapp' },
    ],
  },

  // 4. Website Friction Follow-up
  followup_website_friction: {
    id: 'followup_website_friction',
    question: 'If visitors land on your page but leave without submitting, what is the symptom?',
    pose: 'harry-thinking',
    options: [
      { label: 'Slow mobile load speed or high bounce rate', nextNodeId: 'web_speed_result' },
      { label: 'Confusing offer or unclear headline', nextNodeId: 'web_offer_result' },
    ],
  },
  web_speed_result: {
    id: 'web_speed_result',
    question: 'Every second of mobile loading delay cuts conversion rates significantly.',
    pose: 'harry-analyse',
    advice:
      'We design sub-second, mobile-first conversion pages with clean code and zero bloated animations.',
    recommendedStartingPoint: 'Websites & Landing Page Speed Teardown',
    options: [
      { label: 'Request Mobile Speed Teardown', action: 'audit' },
      { label: 'View Website Services', action: 'service', serviceTab: 'cro' },
    ],
  },
  web_offer_result: {
    id: 'web_offer_result',
    question: 'Visitors must understand who you help and why you are credible within 5 seconds.',
    pose: 'harry-idea',
    advice:
      'We rebuild the headline-to-offer message match, highlight key proof points, and eliminate form friction.',
    recommendedStartingPoint: 'Landing Page Value Proposition & CRO',
    options: [
      { label: 'Audit My Landing Page', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
      { label: 'View CRO Services', action: 'service', serviceTab: 'cro' },
    ],
  },

  // Standalone Branches
  automation_result: {
    id: 'automation_result',
    question: 'Lead response time is the single biggest predictor of conversion rate.',
    pose: 'harry-present',
    advice:
      'We connect instant WhatsApp alerts, clear CRM deal stages, and automated email follow-ups so no qualified lead sits untouched.',
    recommendedStartingPoint: 'Marketing Automation & Pipeline Architecture',
    options: [
      { label: 'Automate My Follow-up System', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
      { label: 'Explore Automation Details', action: 'service', serviceTab: 'automation' },
    ],
  },
  system_result: {
    id: 'system_result',
    question: 'That is MarketMe’s specialty: uniting all channels into one clear growth pipeline.',
    pose: 'harry-present',
    advice:
      'We coordinate Social + Search + Ads + Landers + CRM so your marketing activities compound rather than compete.',
    recommendedStartingPoint: 'Full Digital Marketing Growth System',
    options: [
      { label: 'Request Full System Audit', action: 'audit' },
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
      { label: 'Explore The Full System', action: 'service', serviceTab: 'digital' },
    ],
  },
  unsure_result: {
    id: 'unsure_result',
    question: 'That is completely normal. That is why we begin with diagnosis before recommending tactics.',
    pose: 'harry-wave',
    advice:
      'Let us review your business, competitor landscape, and existing marketing assets with a zero-cost, no-obligation audit.',
    recommendedStartingPoint: 'Comprehensive Growth Diagnostic Audit',
    options: [
      { label: 'Claim Free Marketing Audit', action: 'audit' },
      { label: 'Have a Quick Chat on WhatsApp', action: 'whatsapp' },
    ],
  },
};

export const AskHarry: React.FC<AskHarryProps> = ({
  onOpenAuditModal,
  onNavigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');
  const [selectedPathSummary, setSelectedPathSummary] = useState<string>('');

  const currentNode = TREE[currentNodeId] || TREE.root;

  const handleToggle = () => {
    if (!isOpen) {
      trackEvent('ask_harry_opened');
    }
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DialogueNode['options'][0]) => {
    const context: AuditContext = {
      source: 'Ask Harry Guide',
      selectedService: currentNode.recommendedStartingPoint || 'General Audit',
      businessProblem: selectedPathSummary || option.label,
    };

    if (option.action === 'audit') {
      onOpenAuditModal(context);
      setIsOpen(false);
      return;
    }

    if (option.action === 'whatsapp') {
      const link = generateWhatsAppLeadLink(
        {
          selectedService: context.selectedService,
          businessProblem: context.businessProblem,
        },
        `Hi MarketMe! Harry recommended I chat with you about: ${context.selectedService} (Bottleneck: ${context.businessProblem})`
      );
      window.open(link, '_blank');
      setIsOpen(false);
      return;
    }

    if (option.action === 'service' && option.serviceTab) {
      onNavigateToSection('services', option.serviceTab);
      setIsOpen(false);
      return;
    }

    if (option.nextNodeId) {
      setSelectedPathSummary(option.label);
      setCurrentNodeId(option.nextNodeId);
      trackEvent('ask_harry_recommendation', { node: option.nextNodeId });
    }
  };

  const handleReset = () => {
    setCurrentNodeId('root');
    setSelectedPathSummary('');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={handleToggle}
            className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#16171D] border border-neutral-700/80 hover:border-[#F97316] text-white shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
            aria-label="Ask Harry - Your marketing guide"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-900 border border-[#F97316]/60 flex items-center justify-center shrink-0">
              <HarryMascot pose="harry-wave" size="xs" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white group-hover:text-[#F97316] transition-colors flex items-center gap-1">
                ASK HARRY <Sparkles className="w-3 h-3 text-[#F97316]" />
              </span>
              <span className="text-[10px] text-neutral-400">Your marketing guide</span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Assistant Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-96 max-h-[82vh] bg-[#14151A] border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="px-4 py-3 bg-[#181920] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-[#F97316] flex items-center justify-center shrink-0">
                <HarryMascot pose={currentNode.pose} size="xs" />
              </div>
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  Harry Fox <span className="text-[10px] text-[#F97316] font-mono">Guide</span>
                </span>
                <span className="text-[10px] text-neutral-400 block">
                  Your marketing guide
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart conversation"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer focus:outline-none"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer focus:outline-none"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dialogue Content */}
          <div className="p-4 space-y-3.5 overflow-y-auto max-h-[60vh]">
            {/* Harry Message */}
            <div className="flex items-start gap-2.5">
              <div className="shrink-0 mt-0.5">
                <HarryMascot pose={currentNode.pose} size="sm" />
              </div>
              <div className="p-3 rounded-2xl bg-[#1C1D24] border border-neutral-700/80 text-neutral-200 text-xs sm:text-sm leading-relaxed">
                <p>{currentNode.question}</p>

                {currentNode.advice && (
                  <p className="mt-2 text-neutral-300 font-normal border-t border-neutral-700/60 pt-2 text-xs">
                    💡 {currentNode.advice}
                  </p>
                )}

                {currentNode.recommendedStartingPoint && (
                  <div className="mt-2.5 p-2 rounded-lg bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-[11px] font-semibold">
                    Recommended Starting Point: {currentNode.recommendedStartingPoint}
                  </div>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block px-1">
                Select an option:
              </span>
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs cursor-pointer flex items-center justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F97316] ${
                    opt.action === 'audit'
                      ? 'bg-[#F97316] hover:bg-[#EA580C] text-white font-bold border-transparent'
                      : opt.action === 'whatsapp'
                      ? 'bg-neutral-900 border-neutral-700 hover:border-emerald-500 text-emerald-400 font-semibold'
                      : 'bg-[#121318] hover:bg-[#181920] border-neutral-800 hover:border-neutral-700 text-neutral-200'
                  }`}
                >
                  <span className="pr-2">{opt.label}</span>
                  {opt.action === 'whatsapp' ? (
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 opacity-70 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-4 py-2 bg-[#0E0F13] border-t border-neutral-800 text-[10px] text-neutral-400 text-center font-mono">
            WhatsApp: +91 9321856109 · Free Strategy Review
          </div>

        </div>
      )}
    </>
  );
};
