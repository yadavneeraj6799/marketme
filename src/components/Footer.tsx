/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUp, Instagram, Linkedin, MessageCircle, Shield } from 'lucide-react';
import { OFFICIAL_WHATSAPP_LINK } from '../utils/leadStore';

import { ServiceTab } from '../types';

interface FooterProps {
  onNavigateToSection: (sectionId: string, serviceTab?: ServiceTab) => void;
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onOpenAuditModal }) => {
  const [legalModalContent, setLegalModalContent] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090C] text-neutral-400 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#18191E] border border-neutral-800 flex items-center justify-center font-bold text-white">
                <span className="text-[#F97316]">M</span>
                <span className="text-white text-xs">M</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                MARKET<span className="text-[#F97316]">ME</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-sm leading-relaxed">
              MarketMe connects strategy, content, paid acquisition, websites, and marketing automation
              into one unified growth system. Strategy first. Execution second. Growth always.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={OFFICIAL_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/50 flex items-center justify-center text-neutral-400 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/marketme.ny"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#F97316]/50 flex items-center justify-center text-neutral-400 hover:text-[#F97316] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/marketme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500/50 flex items-center justify-center text-neutral-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              Services
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToSection('services', 'social')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Social Media Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('services', 'performance')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Performance Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('services', 'digital')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Full Digital Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('services', 'automation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Marketing Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('services', 'cro')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Websites & Landing Pages
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Growth Framework */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              System
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToSection('growth-system')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Growth Engine (6 Stages)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('problems')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bottleneck Selector
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('how-we-think')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How We Think (Scenarios)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('process')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How We Work (5 Steps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('diagnosis')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Marketing Diagnosis Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Contact */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              Company
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToSection('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuditModal}
                  className="hover:text-[#F97316] font-semibold transition-colors cursor-pointer text-left"
                >
                  Free Marketing Audit
                </button>
              </li>
              <li className="pt-2 text-neutral-300 font-mono text-[11px]">
                WhatsApp: 9321856109
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} MarketMe. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModalContent('privacy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModalContent('terms')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Legal Dialog Placeholder */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#14151B] border border-neutral-800 rounded-2xl p-6 text-neutral-300 text-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white uppercase font-mono">
                {legalModalContent === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h4>
              <button
                onClick={() => setLegalModalContent(null)}
                className="text-neutral-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <p>
              MarketMe collects inquiry information (Name, Business, Email, Phone) strictly for the purpose of marketing diagnosis, proposal creation, and campaign correspondence.
            </p>
            <p>
              We do not sell, rent, or distribute client contact records to third-party data brokers. All performance marketing figures, ad spend estimates, and audits are strictly educational assessments.
            </p>
            <button
              onClick={() => setLegalModalContent(null)}
              className="w-full py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-bold"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
