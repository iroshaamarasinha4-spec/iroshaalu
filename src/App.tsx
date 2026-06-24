/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import EstimateModal from './components/EstimateModal';
import InquiryHistory from './components/InquiryHistory';
import { Inquiry } from './types';

export default function App() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [prefilledInquiry, setPrefilledInquiry] = useState<{
    serviceType?: string;
    width?: number;
    height?: number;
    glassType?: string;
    profileFinish?: string;
    estimatedPrice?: number;
    projectTitle?: string;
  } | null>(null);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('irosh_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse locally stored inquiries', e);
    }
  }, []);

  const handleAddNewInquiry = (newInq: Inquiry) => {
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('irosh_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save inquiry to localStorage', e);
    }
  };

  const handleClearHistory = () => {
    setInquiries([]);
    try {
      localStorage.removeItem('irosh_inquiries');
    } catch (e) {
      console.error('Failed to clear local inquiries history', e);
    }
    setIsHistoryModalOpen(false);
  };

  // Triggers from other components
  const handleInquireFromService = (serviceTitle: string) => {
    setPrefilledInquiry({ serviceType: serviceTitle });
  };

  const handleInquireFromProject = (projectTitle: string) => {
    setPrefilledInquiry({ projectTitle });
  };

  const handleApplyEstimateToContact = (estimateDetails: {
    serviceType: string;
    width: number;
    height: number;
    glassType: string;
    profileFinish: string;
    estimatedPrice: number;
  }) => {
    setPrefilledInquiry(estimateDetails);
  };

  const handleViewProjectsScroll = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMoreServicesScroll = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background text-on-background font-sans min-h-screen relative flex flex-col justify-between">
      {/* Dynamic Navigation Header */}
      <Header 
        onOpenEstimate={() => setIsEstimateModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        hasInquiries={inquiries.length > 0}
      />

      {/* Main Flow Sections */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero 
          onOpenEstimate={() => setIsEstimateModalOpen(true)}
          onViewProjects={handleViewProjectsScroll}
        />

        {/* About Section */}
        <About onLearnMoreServices={handleLearnMoreServicesScroll} />

        {/* Services Grid with Extended Modals */}
        <Services onInquireService={handleInquireFromService} />

        {/* High-Contrast Interactive Counter Section */}
        <Stats />

        {/* Portfolio Gallery with Slideshow Lightbox */}
        <Portfolio onInquireProject={handleInquireFromProject} />

        {/* Process Roadmap Flowchart */}
        <Process />

        {/* Testimonials Review Slider */}
        <Testimonials />

        {/* Integrated Contact Form & Map Schematic */}
        <Contact 
          prefilledInquiry={prefilledInquiry} 
          onNewInquiryAdded={handleAddNewInquiry}
        />
      </main>

      {/* Footer & Newsletter Panel */}
      <Footer />

      {/* WhatsApp Chat & Scroll widgets */}
      <WhatsAppWidget />

      {/* Quote Estimator Modal Dialog */}
      <EstimateModal 
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        onSubmitEstimate={handleApplyEstimateToContact}
      />

      {/* Inquiry History Viewer Drawer */}
      <InquiryHistory 
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        inquiries={inquiries}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
