/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LeadData } from '../types';
import { trackEvent } from './analytics';

export const OFFICIAL_PHONE = '9321856109';
export const OFFICIAL_WHATSAPP_LINK = 'https://wa.me/919321856109';

export interface SubmitResult {
  success: boolean;
  lead?: LeadData;
  error?: string;
  field?: string;
  duplicate?: boolean;
  networkError?: boolean;
}

export type LeadSubmissionPayload = Omit<LeadData, 'leadId' | 'createdAt'>;

/**
 * Submits lead data to the real backend server endpoint (/api/leads).
 * Only returns success when the server explicitly confirms acceptance.
 */
export async function submitLeadToServer(
  data: LeadSubmissionPayload
): Promise<SubmitResult> {
  // Capture UTM parameters from URL if present
  let utmSource = data.utmSource;
  let utmMedium = data.utmMedium;
  let utmCampaign = data.utmCampaign;

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    utmSource = utmSource || params.get('utm_source') || undefined;
    utmMedium = utmMedium || params.get('utm_medium') || undefined;
    utmCampaign = utmCampaign || params.get('utm_campaign') || undefined;
  }

  const payload: LeadSubmissionPayload = {
    ...data,
    utmSource,
    utmMedium,
    utmCampaign,
  };

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    if (response.ok && result?.success) {
      trackEvent('lead_submitted', {
        leadId: result.lead?.leadId,
        selectedService: payload.selectedService,
        source: payload.source,
      });

      return {
        success: true,
        lead: result.lead,
      };
    }

    if (response.status === 429 || result?.duplicate) {
      return {
        success: false,
        duplicate: true,
        error:
          result?.error ||
          'An inquiry with this contact number was already received recently. Our team will contact you shortly.',
      };
    }

    if (result && !result.success) {
      return {
        success: false,
        error: result.error || 'Server rejected the submission.',
        field: result.field,
      };
    }

    return {
      success: false,
      networkError: true,
      error: `Server responded with status ${response.status}. Your request has not been sent.`,
    };
  } catch (err: unknown) {
    console.error('[LeadStore] Network error submitting lead:', err);
    return {
      success: false,
      networkError: true,
      error:
        'Unable to reach the server. Your request has not been sent. Please chat with us directly on WhatsApp below.',
    };
  }
}

/**
 * Generates an accurate WhatsApp pre-filled link reflecting strictly the user's selected information.
 */
export function generateWhatsAppLeadLink(
  lead?: Partial<LeadData>,
  customMessage?: string
): string {
  if (customMessage) {
    return `https://wa.me/91${OFFICIAL_PHONE}?text=${encodeURIComponent(customMessage)}`;
  }

  const lines: string[] = ['Hi MarketMe! I would like to request a free Marketing Audit.'];

  if (lead?.name) {
    lines.push(`Name: ${lead.name}`);
  }
  if (lead?.businessName) {
    lines.push(`Business: ${lead.businessName}`);
  }
  if (lead?.phone) {
    lines.push(`Phone: ${lead.phone}`);
  }
  if (lead?.selectedService) {
    lines.push(`Service of Interest: ${lead.selectedService}`);
  }
  if (lead?.businessProblem) {
    lines.push(`Primary Bottleneck: ${lead.businessProblem}`);
  }
  if (lead?.budgetRange) {
    lines.push(`Budget: ${lead.budgetRange}`);
  }
  if (lead?.website) {
    lines.push(`Website: ${lead.website}`);
  }

  return `https://wa.me/91${OFFICIAL_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
}
