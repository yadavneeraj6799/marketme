/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceTab = 'social' | 'performance' | 'digital' | 'automation' | 'cro';

export interface AuditContext {
  source: string;
  selectedService?: string;
  businessProblem?: string;
  budgetRange?: string;
}

export interface LeadData {
  leadId: string;
  name: string;
  businessName?: string;
  email?: string;
  phone: string;
  website?: string;
  businessType?: string;
  objective?: string;
  currentChannels?: string[];
  businessProblem?: string;
  selectedService?: string;
  budgetRange?: string; // Only stored if selected by visitor; no invented defaults
  notes?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
}

export type HarryPose =
  | 'harry-idle'
  | 'harry-wave'
  | 'harry-point-right'
  | 'harry-point-left'
  | 'harry-present'
  | 'harry-thinking'
  | 'harry-analyse'
  | 'harry-idea'
  | 'harry-celebrate'
  | 'harry-walk'
  | 'harry-cta';

export interface ProblemOption {
  id: string;
  problem: string;
  category: ServiceTab;
  bottleneck: string;
  recommendedService: string;
  serviceId: ServiceTab;
  investigateAreas: string[];
  explanation: string;
}

export interface GrowthStage {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  channels: string[];
  marketMeRole: string;
  kpis: string[];
}

export interface DiagnosticState {
  objective: string;
  currentChannels: string[];
  biggestProblem: string;
  budgetRange: string;
  businessType: string;
  website: string;
}

export interface DiagnosticResult {
  bottleneck: string;
  recommendedService: string;
  secondaryService?: string;
  areasToInvestigate: string[];
  summary: string;
  suggestedAction: string;
}
