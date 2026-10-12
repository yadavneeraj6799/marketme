/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'audit_cta_clicked'
  | 'whatsapp_clicked'
  | 'service_viewed'
  | 'diagnosis_started'
  | 'diagnosis_completed'
  | 'lead_form_started'
  | 'lead_submitted'
  | 'ask_harry_opened'
  | 'ask_harry_recommendation';

export function trackEvent(name: AnalyticsEventName, params: Record<string, unknown> = {}) {
  const timestamp = new Date().toISOString();
  const eventPayload = {
    event: name,
    timestamp,
    ...params,
  };

  // Push to GTM/GA4 dataLayer if initialized
  if (typeof window !== 'undefined') {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventPayload);
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  }

  // Development console log
  if (import.meta.env.DEV) {
    console.debug(`[MarketMe Analytics] ${name}`, params);
  }
}
