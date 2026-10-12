/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Loader2,
  RefreshCw,
  Building2,
  Phone,
  Mail,
  User,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { HarryMascot } from './HarryMascot';
import {
  submitLeadToServer,
  generateWhatsAppLeadLink,
  SubmitResult,
} from '../utils/leadStore';
import { AuditContext, LeadData, ServiceTab } from '../types';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: AuditContext;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    selectedService: '',
    businessProblem: '',
    budgetRange: '', // Only set if explicitly provided in context; never invented
    notes: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error' | 'duplicate'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [confirmedLead, setConfirmedLead] = useState<LeadData | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Refresh context whenever modal is opened with new parameters
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        businessName: '',
        phone: '',
        email: '',
        website: '',
        selectedService: context?.selectedService || '',
        businessProblem: context?.businessProblem || '',
        budgetRange: context?.budgetRange || '', // Strictly preserve only if provided
        notes: '',
      });
      setStatus('idle');
      setErrorMessage('');
      setPhoneError('');
      setConfirmedLead(null);

      // Focus first input after animation
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, context]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && status !== 'pending') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, status, onClose]);

  if (!isOpen) return null;

  // Phone validation helper
  const validatePhone = (value: string): boolean => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      setPhoneError('Please enter a valid phone number (at least 8-10 digits).');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    if (!validatePhone(formData.phone)) {
      return;
    }

    setStatus('pending');
    setErrorMessage('');

    const payload = {
      name: formData.name.trim(),
      businessName: formData.businessName.trim() || undefined,
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      website: formData.website.trim() || undefined,
      selectedService: formData.selectedService || undefined,
      businessProblem: formData.businessProblem || undefined,
      budgetRange: formData.budgetRange || undefined, // strictly uninvented
      notes: formData.notes.trim() || undefined,
      source: context?.source || 'Audit Modal',
    };

    const res: SubmitResult = await submitLeadToServer(payload);

    if (res.success && res.lead) {
      setConfirmedLead(res.lead);
      setStatus('success');
    } else if (res.duplicate) {
      setStatus('duplicate');
      setErrorMessage(
        res.error ||
          'We have already received an audit request with this number recently. Our strategists are preparing your review.'
      );
    } else {
      setStatus('error');
      setErrorMessage(
        res.error ||
          'Could not reach the server. Your request has not been sent yet.'
      );
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current && status !== 'pending') {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#14151B] border border-neutral-800 rounded-2xl p-5 sm:p-7 shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={status === 'pending'}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
          aria-label="Close marketing audit dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pr-8">
          <HarryMascot pose="harry-cta" size="xs" />
          <div>
            <span className="text-[11px] font-mono text-[#F97316] uppercase font-bold tracking-wider block">
              MarketMe Growth Review
            </span>
            <h2
              id="audit-modal-title"
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              Request a Free Marketing Audit
            </h2>
          </div>
        </div>

        {/* Audit Scope Explanation */}
        {status !== 'success' && status !== 'duplicate' && (
          <div className="mb-4 text-xs text-neutral-300 leading-relaxed bg-[#0E0F14] border border-neutral-800/80 rounded-xl p-3">
            <p>
              <strong className="text-white">What we review:</strong> We analyze your active ad
              spend, landing page speed, offer positioning, and tracking accuracy. You will receive
              a pragmatic breakdown of what is leaking revenue.
            </p>
          </div>
        )}

        {/* Status: Success (Server Confirmed) */}
        {status === 'success' && confirmedLead && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">
                Audit Request Confirmed & Logged
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                Thank you, {confirmedLead.name}. Your submission has been saved to our server
                under reference{' '}
                <span className="font-mono text-emerald-400 font-semibold">
                  {confirmedLead.leadId}
                </span>
                .
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0E12] border border-neutral-800 text-xs space-y-2">
              <h4 className="font-semibold text-white">What happens next:</h4>
              <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                <li>A MarketMe strategist reviews your details within 1 business day.</li>
                <li>We analyze your market friction, offer bridge, and ad potential.</li>
                <li>You receive a clear breakdown via WhatsApp or email.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={generateWhatsAppLeadLink(confirmedLead)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Fast-Track on WhatsApp (+91 9321856109)</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

        {/* Status: Duplicate Notice */}
        {status === 'duplicate' && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center space-y-2">
              <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Already Received Recently</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {errorMessage}
              </p>
            </div>

            <a
              href={generateWhatsAppLeadLink(formData)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp Now</span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs"
            >
              Done
            </button>
          </div>
        )}

        {/* Form State (Idle, Pending, or Error with Retry) */}
        {status !== 'success' && status !== 'duplicate' && (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Server Error Alert with Clear Status */}
            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-start gap-2 text-xs text-red-200">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Request Not Sent:</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Server Submit</span>
                  </button>

                  <a
                    href={generateWhatsAppLeadLink(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp Instead</span>
                  </a>
                </div>
              </div>
            )}

            {/* Name & Business */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="audit-name"
                  className="text-xs font-medium text-neutral-300 mb-1 block"
                >
                  Your Name <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    ref={firstInputRef}
                    id="audit-name"
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F14] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="audit-business"
                  className="text-xs font-medium text-neutral-300 mb-1 block"
                >
                  Business / Brand Name
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    id="audit-business"
                    type="text"
                    placeholder="Acme Growth Inc."
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F14] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="audit-phone"
                  className="text-xs font-medium text-neutral-300 mb-1 block"
                >
                  Phone / WhatsApp <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    id="audit-phone"
                    type="tel"
                    required
                    placeholder="9321856109"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (phoneError) validatePhone(e.target.value);
                    }}
                    onBlur={(e) => validatePhone(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F14] border text-white placeholder-neutral-500 text-xs focus:outline-none focus:ring-1 ${
                      phoneError
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-neutral-700 focus:border-[#F97316] focus:ring-[#F97316]'
                    }`}
                  />
                </div>
                {phoneError && (
                  <p className="text-[11px] text-red-400 mt-1">{phoneError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="audit-email"
                  className="text-xs font-medium text-neutral-300 mb-1 block"
                >
                  Work Email (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    id="audit-email"
                    type="email"
                    placeholder="alex@business.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F14] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>
              </div>
            </div>

            {/* Website URL */}
            <div>
              <label
                htmlFor="audit-website"
                className="text-xs font-medium text-neutral-300 mb-1 block"
              >
                Website or Instagram Profile (Optional)
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                <input
                  id="audit-website"
                  type="text"
                  placeholder="https://example.com or @yourhandle"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0E0F14] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                />
              </div>
            </div>

            {/* Separated Context: Service of Interest & Business Problem */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="audit-service"
                  className="text-xs font-medium text-neutral-300 mb-1 block"
                >
                  Service of Interest
                </label>
                <select
                  id="audit-service"
                  value={formData.selectedService}
                  onChange={(e) =>
                    setFormData({ ...formData, selectedService: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0E0F14] border border-neutral-700 text-neutral-200 text-xs focus:outline-none focus:border-[#F97316]"
                >
                  <option value="">General Growth Audit</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Performance Marketing">Performance Marketing</option>
                  <option value="Full Digital Marketing">Full Digital Marketing</option>
                  <option value="Marketing Automation">Marketing Automation</option>
                  <option value="Websites & Landing Pages">Websites & Landing Pages</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="audit-problem"
                  className="text-xs font-medium text-neutral-300 mb-1 block"
                >
                  Current Bottleneck (Optional)
                </label>
                <input
                  id="audit-problem"
                  type="text"
                  placeholder="e.g. Clicks don't convert, need leads"
                  value={formData.businessProblem}
                  onChange={(e) =>
                    setFormData({ ...formData, businessProblem: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0E0F14] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="audit-notes"
                className="text-xs font-medium text-neutral-300 mb-1 block"
              >
                Specific Goals or Constraints (Optional)
              </label>
              <textarea
                id="audit-notes"
                rows={2}
                placeholder="What channels have you tested? Any target launch date?"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#0E0F14] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F97316]"
              />
            </div>

            {/* Privacy Explanation */}
            <div className="flex items-start gap-2 text-[11px] text-neutral-400 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
              <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
              <span>
                We use your details strictly to review your marketing systems and share your audit
                findings. We will never sell your information or spam you.
              </span>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="submit"
                disabled={status === 'pending'}
                className="w-full py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-60 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#F97316]/20"
              >
                {status === 'pending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying with Server...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT FOR FREE AUDIT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <a
                href={generateWhatsAppLeadLink(formData)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs whitespace-nowrap flex items-center justify-center gap-2 transition-colors"
                title="Connect directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
