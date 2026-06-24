/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, CheckCircle, Flame, Sparkles, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-on-primary w-full py-16 border-t border-outline/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-on-primary/10 pb-12 mb-10">
        
        {/* Company profile column */}
        <div className="space-y-6">
          <h2 className="font-serif font-medium text-2xl tracking-[0.1em] text-on-primary">
            IROSH ALUMINIUM
          </h2>
          <p className="text-on-primary/60 font-sans text-xs md:text-sm leading-relaxed font-light">
            Leading provider of luxury architectural aluminum and glass fabrication services. Excellence in every frame.
          </p>
          <div className="flex gap-4">
            <span className="w-10 h-10 rounded-none bg-on-primary/5 border border-on-primary/10 flex items-center justify-center hover:bg-tertiary hover:text-primary transition-all duration-300 cursor-pointer">
              <Sparkles size={16} />
            </span>
            <span className="w-10 h-10 rounded-none bg-on-primary/5 border border-on-primary/10 flex items-center justify-center hover:bg-tertiary hover:text-primary transition-all duration-300 cursor-pointer">
              <Flame size={16} />
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-5">
          <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-tertiary">
            Quick Links
          </h4>
          <ul className="space-y-3 font-sans text-xs">
            <li>
              <button 
                id="footer-link-home"
                onClick={() => scrollToSection('home')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                id="footer-link-about"
                onClick={() => scrollToSection('about')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                id="footer-link-portfolio"
                onClick={() => scrollToSection('projects')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer"
              >
                Our Portfolio
              </button>
            </li>
            <li>
              <button 
                id="footer-link-reviews"
                onClick={() => scrollToSection('testimonials')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer"
              >
                Reviews
              </button>
            </li>
          </ul>
        </div>

        {/* Services Links Column */}
        <div className="space-y-5">
          <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-tertiary">
            Our Services
          </h4>
          <ul className="space-y-3 font-sans text-xs">
            <li>
              <button 
                id="footer-link-doors"
                onClick={() => scrollToSection('services')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer text-left"
              >
                Aluminium Doors
              </button>
            </li>
            <li>
              <button 
                id="footer-link-windows"
                onClick={() => scrollToSection('services')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer text-left"
              >
                Modern Windows
              </button>
            </li>
            <li>
              <button 
                id="footer-link-partitions"
                onClick={() => scrollToSection('services')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer text-left"
              >
                Glass Partitions
              </button>
            </li>
            <li>
              <button 
                id="footer-link-curtains"
                onClick={() => scrollToSection('services')} 
                className="text-on-primary/80 hover:text-tertiary transition-colors cursor-pointer text-left"
              >
                Curtain Walls
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter subscription Column */}
        <div className="space-y-5">
          <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-tertiary">
            Newsletter
          </h4>
          <p className="text-on-primary/60 font-sans text-xs leading-relaxed font-light">
            Subscribe for premium architecture design blueprints, project updates, and metallic inspiration.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input 
              id="newsletter-email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-on-primary/5 text-on-primary placeholder:text-on-primary/40 border border-on-primary/10 rounded-none p-4 pr-12 focus:border-tertiary focus:ring-0 text-xs font-semibold outline-none transition-all duration-300"
            />
            {subscribed ? (
              <span id="newsletter-check" className="absolute right-2 top-2 h-10 w-10 bg-emerald-600 text-white rounded-none flex items-center justify-center animate-scale-up">
                <CheckCircle size={16} />
              </span>
            ) : (
              <button 
                type="submit"
                id="newsletter-submit"
                aria-label="Subscribe"
                className="absolute right-2 top-2 h-10 w-10 bg-tertiary text-primary rounded-none flex items-center justify-center hover:bg-on-primary hover:text-primary transition-all duration-300 cursor-pointer"
              >
                <Send size={14} />
              </button>
            )}
          </form>

          {subscribed && (
            <span id="newsletter-success-msg" className="block text-[10px] text-emerald-400 font-sans font-semibold animate-fade-in">
              Successfully subscribed to IROSH insights!
            </span>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-on-primary/40 text-[10px] font-sans font-bold tracking-[0.15em] uppercase">
        © {new Date().getFullYear()} IROSH ALUMINIUM. All rights reserved. Crafted for excellence.
      </div>
    </footer>
  );
}
