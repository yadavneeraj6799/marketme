/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeadData {
  leadId: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  businessType: string;
  objective: string;
  currentChannels: string[];
  biggestProblem: string;
  budgetRange: string;
  recommendedService: string;
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
  category: 'social' | 'performance' | 'digital' | 'automation' | 'cro';
  bottleneck: string;
  recommendedService: string;
  serviceId: string;
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
