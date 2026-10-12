/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, MessageCircle, Sparkles, Building2, Phone, Mail, User, Globe } from 'lucide-react';
import { HarryMascot } from './HarryMascot';
import { saveLead, generateWhatsAppLeadLink } from '../utils/leadStore';
import { LeadData } from '../types';
import { trackEvent } from '../utils/analytics';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultContext?: string;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose, defaultContext }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    biggestProblem: defaultContext || 'Need more qualified leads',
    budgetRange: '₹25,000 - ₹75,000 / month',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedLead, setSavedLead] = useState<LeadData | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const lead = saveLead({
      name: formData.name,
      businessName: formData.businessName || 'Business',
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      businessType: 'General Business',
      objective: 'Free Marketing Audit',
      currentChannels: ['Inquiry Modal'],
      biggestProblem: formData.biggestProblem,
      budgetRange: formData.budgetRange,
      recommendedService: defaultContext || 'Performance Marketing / Social',
      notes: formData.notes,
      source: 'audit_modal',
    });

    setSavedLead(lead);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#14151B] border border-neutral-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <HarryMascot pose="harry-present" size="xs" />
              <div>
                <span className="text-[11px] font-mono text-[#F97316] uppercase font-bold tracking-wider block">
                  MarketMe Growth Systems
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Request Free Marketing Audit
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 mb-5 leading-relaxed">
              We'll inspect your existing marketing, ads, social presence, or landing pages and identify where revenue is getting lost.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-neutral-400 mb-1 block">Your Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F13] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-neutral-400 mb-1 block">Business Name *</label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      type="text"
                      required
                      placeholder="Brand / Company"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F13] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-neutral-400 mb-1 block">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 9321856109"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F13] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-neutral-400 mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F13] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-400 mb-1 block">Website / Instagram URL (optional)</label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="https://yoursite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F13] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-400 mb-1 block">Primary Challenge / Area to Audit</label>
                <input
                  type="text"
                  placeholder="e.g. Clicks not converting, need Meta ads, social looks inactive"
                  value={formData.biggestProblem}
                  onChange={(e) => setFormData({ ...formData, biggestProblem: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0E0F13] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F97316] text-xs"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#F97316]/25 transition-all"
                >
                  <span>SEND AUDIT REQUEST</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={generateWhatsAppLeadLink(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send via WhatsApp Directly</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-5 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Audit Request Received!</h3>
              <p className="text-xs text-neutral-300">
                Thanks, {savedLead?.name}! Our strategists have logged your details.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0E0F13] border border-neutral-800 text-left text-xs space-y-1.5 font-mono text-neutral-400">
              <div><span className="text-neutral-500">Business:</span> {savedLead?.businessName}</div>
              <div><span className="text-neutral-500">Focus:</span> {savedLead?.biggestProblem}</div>
              <div><span className="text-neutral-500">Reference:</span> {savedLead?.leadId}</div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={generateWhatsAppLeadLink(savedLead || {})}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp (+91 9321856109)</span>
              </a>

              <button
                onClick={resetAndClose}
                className="w-full py-2.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
