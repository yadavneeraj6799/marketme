/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LeadData } from '../types';
import { trackEvent } from './analytics';

const STORAGE_KEY = 'marketme_leads_v1';

export function saveLead(data: Omit<LeadData, 'leadId' | 'createdAt'>): LeadData {
  const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const createdAt = new Date().toISOString();

  // Extract any UTM params from URL if present
  let utmSource = '';
  let utmMedium = '';
  let utmCampaign = '';
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    utmSource = params.get('utm_source') || '';
    utmMedium = params.get('utm_medium') || '';
    utmCampaign = params.get('utm_campaign') || '';
  }

  const fullLead: LeadData = {
    ...data,
    leadId,
    createdAt,
    utmSource,
    utmMedium,
    utmCampaign,
  };

  try {
    const existing: LeadData[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(fullLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('Failed to save lead to localStorage', err);
  }

  trackEvent('lead_submitted', {
    leadId: fullLead.leadId,
    objective: fullLead.objective,
    recommendedService: fullLead.recommendedService,
    budgetRange: fullLead.budgetRange,
  });

  return fullLead;
}

export function getSavedLeads(): LeadData[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export const OFFICIAL_PHONE = '9321856109';
export const OFFICIAL_WHATSAPP_LINK = `https://wa.me/919321856109`;

export function generateWhatsAppLeadLink(lead?: Partial<LeadData>, customMessage?: string): string {
  if (customMessage) {
    return `https://wa.me/91${OFFICIAL_PHONE}?text=${encodeURIComponent(customMessage)}`;
  }

  let text = `Hi MarketMe! I'd like to get a Marketing Audit for my business.`;
  if (lead?.businessName) {
    text += `\nBusiness: ${lead.businessName}`;
  }
  if (lead?.objective) {
    text += `\nGoal: ${lead.objective}`;
  }
  if (lead?.biggestProblem) {
    text += `\nMain Bottleneck: ${lead.biggestProblem}`;
  }
  if (lead?.budgetRange) {
    text += `\nMonthly Budget: ${lead.budgetRange}`;
  }

  return `https://wa.me/91${OFFICIAL_PHONE}?text=${encodeURIComponent(text)}`;
}
