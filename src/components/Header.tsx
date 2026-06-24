/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, History, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenEstimate: () => void;
  onOpenHistory: () => void;
  hasInquiries: boolean;
}

export default function Header({ onOpenEstimate, onOpenHistory, hasInquiries }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface/90 backdrop-blur-md py-4 border-b border-outline-variant/50' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a 
          href="#home" 
          id="nav-logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="font-serif font-bold text-xl md:text-2xl tracking-normal text-primary select-none flex items-center gap-1.5"
        >
          <span>IROSH</span>
          <span className="font-sans font-light text-sm tracking-[0.25em] text-tertiary pl-1 border-l border-outline-variant/60 hidden sm:inline">ALUMINIUM</span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              id={`nav-link-${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              className={`font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                activeSection === item.id 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span 
                  id={`nav-link-indicator-${item.id}`}
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-tertiary"
                />
              )}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          {hasInquiries && (
            <button
              id="header-history-btn"
              onClick={onOpenHistory}
              title="View your quote requests"
              className="p-2 text-on-surface-variant hover:text-primary relative transition-colors"
            >
              <History size={18} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-tertiary rounded-none" />
            </button>
          )}
          <a
            href="tel:+12125558899"
            id="header-call-btn"
            className="flex items-center gap-2 bg-primary text-on-primary border border-primary px-5 py-2.5 rounded-none text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-transparent hover:text-primary transition-all duration-300 cursor-pointer"
          >
            <PhoneCall size={12} />
            Call Now
          </a>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex md:hidden items-center space-x-3">
          {hasInquiries && (
            <button
              id="header-history-mobile-btn"
              onClick={onOpenHistory}
              className="p-2 text-on-surface-variant hover:text-primary relative transition-colors"
            >
              <History size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-tertiary-fixed-dim rounded-full" />
            </button>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-primary hover:bg-surface-container/50 rounded-full transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-overlay"
          className="fixed inset-0 top-[60px] bg-black/40 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Nav Drawer */}
      <div 
        id="mobile-nav-drawer"
        className={`fixed top-[60px] right-0 w-[280px] h-[calc(100vh-60px)] bg-surface border-l border-outline-variant/15 z-50 p-6 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col space-y-4">
            <span className="text-xs uppercase font-semibold text-outline tracking-widest border-b border-outline-variant/10 pb-2">
              Navigation
            </span>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                id={`mobile-nav-link-${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`font-sans text-base font-semibold uppercase tracking-wider py-2 transition-colors block ${
                  activeSection === item.id 
                    ? 'text-primary pl-2 border-l-2 border-tertiary-fixed-dim' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col space-y-3 mb-8">
            <button
              id="mobile-quote-estimator-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEstimate();
              }}
              className="w-full bg-tertiary text-on-tertiary font-medium py-3 rounded-none uppercase text-xs tracking-[0.2em] text-center transition-all hover:brightness-105 active:scale-95"
            >
              Get Free Estimate
            </button>
            <a
              href="tel:+12125558899"
              id="mobile-call-btn"
              className="w-full bg-primary text-on-primary font-medium py-3 rounded-none uppercase text-xs tracking-[0.2em] text-center transition-all hover:bg-primary/90 block active:scale-95"
            >
              Call: +1 (212) 555-8899
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
