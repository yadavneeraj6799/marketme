/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSelector } from './components/ProblemSelector';
import { GrowthEngine } from './components/GrowthEngine';
import { ServicesSection } from './components/ServicesSection';
import { HowWeThink } from './components/HowWeThink';
import { ProcessTimeline } from './components/ProcessTimeline';
import { MarketingDiagnosis } from './components/MarketingDiagnosis';
import { AboutWhySection } from './components/AboutWhySection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AskHarry } from './components/AskHarry';
import { AuditModal } from './components/AuditModal';
import { ServiceTab, AuditContext } from './types';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditContext, setAuditContext] = useState<AuditContext | undefined>(undefined);
  const [servicesTab, setServicesTab] = useState<ServiceTab>('social');

  const handleOpenAuditModal = (context?: AuditContext) => {
    setAuditContext(context || { source: 'Global CTA' });
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  const handleNavigateToSection = (sectionId: string, serviceTab?: ServiceTab) => {
    if (serviceTab) {
      setServicesTab(serviceTab);
    }

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0D10] text-neutral-100 selection:bg-[#F97316] selection:text-white relative">
      {/* 1. Header with accessible navigation & visible mobile toggle */}
      <Header
        onOpenAuditModal={() =>
          handleOpenAuditModal({ source: 'Header CTA' })
        }
        onNavigateToSection={handleNavigateToSection}
      />

      <main>
        {/* 2. Hero Section: Focused outcome, 2 CTAs, and mini marketing workflow previews */}
        <Hero
          onOpenAuditModal={() =>
            handleOpenAuditModal({ source: 'Hero Primary CTA' })
          }
          onExploreServices={() => handleNavigateToSection('services')}
        />

        {/* 3. Problem-First Bottleneck Selector */}
        <ProblemSelector
          onSelectService={(tab) => handleNavigateToSection('services', tab)}
          onOpenAuditModal={(problem) =>
            handleOpenAuditModal({
              source: 'Problem Selector',
              businessProblem: problem,
            })
          }
        />

        {/* 4. MarketMe Growth System (Funnel Engine) */}
        <GrowthEngine
          onSelectService={(tab) => handleNavigateToSection('services', tab as ServiceTab)}
          onOpenAuditModal={() =>
            handleOpenAuditModal({
              source: 'Growth Engine',
              businessProblem: 'Funnel alignment across stages',
            })
          }
        />

        {/* 5. Services Section (Controlled by App state) */}
        <ServicesSection
          activeTab={servicesTab}
          onTabChange={setServicesTab}
          onOpenAuditModal={(serviceName) =>
            handleOpenAuditModal({
              source: 'Services Section',
              selectedService: serviceName,
            })
          }
        />

        {/* 6. How MarketMe Thinks (Scenario Diagnostics) */}
        <HowWeThink
          onOpenAuditModal={() =>
            handleOpenAuditModal({
              source: 'How We Think Scenario',
              businessProblem: 'Investigating ad & lead friction',
            })
          }
        />

        {/* 7. Five-Stage Process */}
        <ProcessTimeline
          onOpenAuditModal={() =>
            handleOpenAuditModal({
              source: 'Process Timeline Step 01',
              selectedService: 'General Growth Diagnosis',
            })
          }
        />

        {/* 8. Interactive Marketing Diagnosis Tool */}
        <MarketingDiagnosis
          onOpenAuditModal={() =>
            handleOpenAuditModal({ source: 'Marketing Diagnosis Questionnaire' })
          }
        />

        {/* 9. About MarketMe Philosophy & Why Us */}
        <AboutWhySection />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Final High-Impact CTA */}
        <FinalCTA
          onOpenAuditModal={() =>
            handleOpenAuditModal({ source: 'Final CTA' })
          }
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onOpenAuditModal={() =>
          handleOpenAuditModal({ source: 'Footer CTA' })
        }
      />

      {/* Floating Ask Harry Mascot Assistant */}
      <AskHarry
        onOpenAuditModal={handleOpenAuditModal}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Controlled Free Marketing Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
        context={auditContext}
      />
    </div>
  );
}
