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

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditContext, setAuditContext] = useState<string | undefined>(undefined);
  const [servicesTab, setServicesTab] = useState<'social' | 'performance' | 'digital' | 'automation' | 'cro'>('social');

  const handleOpenAuditModal = (context?: string) => {
    setAuditContext(context);
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
    setAuditContext(undefined);
  };

  const handleNavigateToSection = (sectionId: string) => {
    // If it's a specific service tab, select it and scroll to services section
    if (sectionId === 'services-social') {
      setServicesTab('social');
      scrollToTarget('services');
      return;
    }
    if (sectionId === 'services-performance') {
      setServicesTab('performance');
      scrollToTarget('services');
      return;
    }
    if (sectionId === 'services-digital') {
      setServicesTab('digital');
      scrollToTarget('services');
      return;
    }
    if (sectionId === 'services-automation') {
      setServicesTab('automation');
      scrollToTarget('services');
      return;
    }
    if (sectionId === 'services-cro') {
      setServicesTab('cro');
      scrollToTarget('services');
      return;
    }

    scrollToTarget(sectionId);
  };

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0D10] text-neutral-100 selection:bg-[#F97316] selection:text-white relative">
      {/* Header */}
      <Header
        onOpenAuditModal={() => handleOpenAuditModal('Header CTA')}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenAuditModal={() => handleOpenAuditModal('Hero CTA')}
          onExploreServices={() => handleNavigateToSection('services')}
        />

        {/* 2. Problem-First Section */}
        <ProblemSelector
          onSelectService={(serviceId) => handleNavigateToSection(serviceId)}
          onOpenAuditModal={(problem) => handleOpenAuditModal(problem ? `Bottleneck: ${problem}` : undefined)}
        />

        {/* 3. MarketMe Growth System (Funnel Engine) */}
        <GrowthEngine
          onSelectService={(serviceId) => handleNavigateToSection(serviceId)}
          onOpenAuditModal={() => handleOpenAuditModal('Growth Engine Stage Audit')}
        />

        {/* 4. Services Deep Dives */}
        <ServicesSection
          initialTab={servicesTab}
          onOpenAuditModal={(service) => handleOpenAuditModal(service)}
        />

        {/* 5. How MarketMe Thinks (Scenario Analysis) */}
        <HowWeThink
          onOpenAuditModal={() => handleOpenAuditModal('How We Think Scenario')}
        />

        {/* 6. Our 5-Stage Process */}
        <ProcessTimeline
          onOpenAuditModal={() => handleOpenAuditModal('Process Step 01 (Diagnose)')}
        />

        {/* 7. Interactive Marketing Diagnosis Questionnaire */}
        <MarketingDiagnosis
          onOpenAuditModal={() => handleOpenAuditModal('Marketing Diagnosis Tool')}
        />

        {/* 8. About MarketMe & Why MarketMe */}
        <AboutWhySection />

        {/* 9. FAQ Section */}
        <FAQSection />

        {/* 10. Final High-Impact CTA */}
        <FinalCTA
          onOpenAuditModal={() => handleOpenAuditModal('Final CTA')}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onOpenAuditModal={() => handleOpenAuditModal('Footer CTA')}
      />

      {/* Floating Ask Harry Mascot Assistant */}
      <AskHarry
        onOpenAuditModal={(ctx) => handleOpenAuditModal(ctx)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Global Free Marketing Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
        defaultContext={auditContext}
      />
    </div>
  );
}
