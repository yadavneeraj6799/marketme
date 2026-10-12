/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { OFFICIAL_WHATSAPP_LINK } from '../utils/leadStore';
import { ServiceTab } from '../types';

interface HeaderProps {
  onOpenAuditModal: () => void;
  onNavigateToSection: (sectionId: string, serviceTab?: ServiceTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuditModal,
  onNavigateToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string, serviceTab?: ServiceTab) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigateToSection(id, serviceTab);
  };

  const services: { name: string; desc: string; id: ServiceTab }[] = [
    {
      name: 'Social Media Marketing',
      desc: 'Build brand authority, community & active demand',
      id: 'social',
    },
    {
      name: 'Performance Marketing',
      desc: 'Meta, Google & JioHotstar acquisition campaigns',
      id: 'performance',
    },
    {
      name: 'Full Digital Marketing',
      desc: 'Unified multi-channel growth systems',
      id: 'digital',
    },
    {
      name: 'Marketing Automation',
      desc: 'CRM workflows & instant lead follow-up',
      id: 'automation',
    },
    {
      name: 'Websites & Landing Pages',
      desc: 'High-speed, friction-free conversion experiences',
      id: 'cro',
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0E11]/95 backdrop-blur-md border-b border-neutral-800 shadow-lg py-3'
          : 'bg-[#0D0E11]/70 backdrop-blur-sm border-b border-neutral-800/50 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-lg p-1"
            aria-label="MarketMe Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-[#18191E] border border-neutral-800 flex items-center justify-center font-bold text-white transition-colors group-hover:border-[#F97316]">
              <span className="text-[#F97316]">M</span>
              <span className="text-white text-xs">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
                MARKET<span className="text-[#F97316]">ME</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-mono">
                Growth Systems
              </span>
            </div>
          </button>

          {/* Desktop Navigation (>= 1024px) */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium"
            aria-label="Main Navigation"
          >
            <button
              onClick={() => handleNavClick('hero')}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 focus:outline-none focus-visible:text-[#F97316]"
            >
              Home
            </button>

            {/* Services Dropdown - Accessible via Click, Hover & Keyboard */}
            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setServicesDropdownOpen(true);
                  }
                  if (e.key === 'Escape') {
                    setServicesDropdownOpen(false);
                  }
                }}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors py-2 cursor-pointer focus:outline-none focus-visible:text-[#F97316]"
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                id="services-menu-button"
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#F97316]' : 'text-neutral-400'
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full -left-4 w-72 pt-2 z-50"
                  role="menu"
                  aria-labelledby="services-menu-button"
                >
                  <div className="bg-[#141519] border border-neutral-800 rounded-xl p-2 shadow-2xl backdrop-blur-xl animate-fadeIn">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        role="menuitem"
                        onClick={() => handleNavClick('services', s.id)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-800/80 transition-colors group flex flex-col cursor-pointer focus:outline-none focus:bg-neutral-800"
                      >
                        <span className="text-sm font-semibold text-neutral-200 group-hover:text-[#F97316] transition-colors flex items-center justify-between">
                          {s.name}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F97316]" />
                        </span>
                        <span className="text-xs text-neutral-400 font-normal mt-0.5">
                          {s.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('growth-system')}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              Growth System
            </button>

            <button
              onClick={() => handleNavClick('how-we-think')}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              How We Think
            </button>

            <button
              onClick={() => handleNavClick('process')}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              How We Work
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </nav>

          {/* Right Header CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={OFFICIAL_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_clicked', { source: 'header' })}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-300 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
              title="Chat with MarketMe on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                trackEvent('audit_cta_clicked', { source: 'header' });
                onOpenAuditModal();
              }}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-[#F97316]/20 cursor-pointer"
            >
              GET A FREE MARKETING AUDIT
            </button>
          </div>

          {/* Mobile Navigation Toggle (Visible on all viewports < 1024px: 360px, 390px, 768px!) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                trackEvent('audit_cta_clicked', { source: 'header_mobile_compact' });
                onOpenAuditModal();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[#F97316] text-white font-bold text-[11px]"
            >
              FREE AUDIT
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111216] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 text-neutral-200 font-medium hover:text-[#F97316]"
            >
              Home
            </button>

            {/* Mobile Services Accordion */}
            <div className="py-2 border-t border-b border-neutral-800/80 my-1">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block mb-2">
                Services
              </span>
              <div className="space-y-1 pl-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleNavClick('services', s.id)}
                    className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#F97316] flex items-center justify-between"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('growth-system')}
              className="text-left py-2 text-neutral-200 font-medium hover:text-[#F97316]"
            >
              Growth System
            </button>
            <button
              onClick={() => handleNavClick('how-we-think')}
              className="text-left py-2 text-neutral-200 font-medium hover:text-[#F97316]"
            >
              How We Think
            </button>
            <button
              onClick={() => handleNavClick('process')}
              className="text-left py-2 text-neutral-200 font-medium hover:text-[#F97316]"
            >
              How We Work
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 text-neutral-200 font-medium hover:text-[#F97316]"
            >
              About MarketMe
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 text-neutral-200 font-medium hover:text-[#F97316]"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('audit_cta_clicked', { source: 'mobile_drawer' });
                onOpenAuditModal();
              }}
              className="w-full py-3 rounded-xl bg-[#F97316] text-white font-bold text-center text-sm shadow-md"
            >
              GET A FREE MARKETING AUDIT
            </button>
            <a
              href={OFFICIAL_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('whatsapp_clicked', { source: 'mobile_drawer' });
              }}
              className="w-full py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold text-center text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              Chat on WhatsApp (+91 9321856109)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
