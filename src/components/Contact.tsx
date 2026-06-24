/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Sliders, Layers, AlertCircle } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactProps {
  prefilledInquiry: {
    serviceType?: string;
    width?: number;
    height?: number;
    glassType?: string;
    profileFinish?: string;
    estimatedPrice?: number;
    projectTitle?: string;
  } | null;
  onNewInquiryAdded: (inquiry: Inquiry) => void;
}

export default function Contact({ prefilledInquiry, onNewInquiryAdded }: ContactProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Aluminium Doors/Windows');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Watch for prefilled inquiry changes to auto-populate the form beautifully
  useEffect(() => {
    if (prefilledInquiry) {
      if (prefilledInquiry.projectTitle) {
        setProjectType('Custom Fabrication');
        setMessage(`I would like to inquire about a project similar to "${prefilledInquiry.projectTitle}". Let me know what materials and specifications we can use.`);
      } else if (prefilledInquiry.estimatedPrice) {
        // From Calculator Estimate
        const mappedType = 
          prefilledInquiry.serviceType === 'Aluminium Doors' || prefilledInquiry.serviceType === 'Modern Windows'
            ? 'Aluminium Doors/Windows'
            : prefilledInquiry.serviceType === 'Glass Partitions'
            ? 'Glass Partitions'
            : 'Curtain Walls';

        setProjectType(mappedType);
        setMessage(`I used the Architectural Estimate Calculator on your site. Here are my preferred specifications:\n- Service: ${prefilledInquiry.serviceType}\n- Dimensions: ${prefilledInquiry.width}ft x ${prefilledInquiry.height}ft\n- Glass: ${prefilledInquiry.glassType}\n- Finish: ${prefilledInquiry.profileFinish}\n- Approx Estimate Range: $${Math.round(prefilledInquiry.estimatedPrice! * 0.9).toLocaleString()} - $${Math.round(prefilledInquiry.estimatedPrice! * 1.1).toLocaleString()}\n\nPlease verify and contact me with a formal bid.`);
      } else if (prefilledInquiry.serviceType) {
        // Direct Service click
        const mappedType = 
          prefilledInquiry.serviceType === 'Aluminium Doors' || prefilledInquiry.serviceType === 'Modern Windows'
            ? 'Aluminium Doors/Windows'
            : prefilledInquiry.serviceType === 'Glass Partitions'
            ? 'Glass Partitions'
            : 'Curtain Walls';

        setProjectType(mappedType);
        setMessage(`I would like to inquire about your "${prefilledInquiry.serviceType}" service. Please send over catalog options and coordinate a site measurement inspection.`);
      }

      // Smooth scroll to contact form so user immediately sees their data applied!
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [prefilledInquiry]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server side delay for ultra-realistic response
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: `inq-${Date.now()}`,
        fullName,
        phone,
        email,
        projectType,
        message,
        timestamp: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric', 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        status: 'Received',
        ...(prefilledInquiry?.estimatedPrice ? {
          estimateDetails: {
            serviceType: prefilledInquiry.serviceType || '',
            width: prefilledInquiry.width || 0,
            height: prefilledInquiry.height || 0,
            glassType: prefilledInquiry.glassType || '',
            profileFinish: prefilledInquiry.profileFinish || '',
            estimatedPrice: prefilledInquiry.estimatedPrice
          }
        } : {})
      };

      // Save inquiry locally in parent state which handles local storage
      onNewInquiryAdded(newInquiry);

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset fields
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-surface shadow-2xl rounded-none overflow-hidden border border-outline">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Form Column */}
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight font-medium mb-8">
              Ready to start your project?
            </h2>

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div 
                  id="contact-success-banner"
                  className="bg-primary-container/15 border border-primary/20 rounded-none p-6 flex flex-col items-center text-center space-y-4"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <div className="p-3 bg-primary text-tertiary rounded-none shadow-lg">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-lg text-primary mb-1">
                      Inquiry Logged Successfully!
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed max-w-sm">
                      We have received your architectural specifications. An IROSH estimation engineer will review and call you within 1 business day.
                    </p>
                  </div>
                  <button
                    id="success-dismiss"
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-primary text-on-primary border border-primary px-6 py-3 rounded-none text-xs font-bold uppercase tracking-[0.15em] hover:bg-transparent hover:text-primary transition-all duration-300"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Error Notification Alert */}
                  {errorMsg && (
                    <div id="contact-form-error" className="flex items-center gap-2 bg-error/5 text-error text-xs p-3 rounded-none border border-error/20 font-medium font-sans">
                      <AlertCircle size={14} />
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.15em] mb-2">
                        Full Name
                      </label>
                      <input 
                        id="contact-name"
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-surface-container-lowest border border-outline focus:border-tertiary focus:ring-0 rounded-none p-4 text-xs font-semibold text-primary transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.15em] mb-2">
                        Phone Number
                      </label>
                      <input 
                        id="contact-phone"
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-surface-container-lowest border border-outline focus:border-tertiary focus:ring-0 rounded-none p-4 text-xs font-semibold text-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.15em] mb-2">
                      Email Address
                    </label>
                    <input 
                      id="contact-email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full bg-surface-container-lowest border border-outline focus:border-tertiary focus:ring-0 rounded-none p-4 text-xs font-semibold text-primary transition-all"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.15em] mb-2">
                      Project Type
                    </label>
                    <select 
                      id="contact-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline focus:border-tertiary focus:ring-0 rounded-none p-4 text-xs font-semibold text-primary transition-all"
                    >
                      <option value="Aluminium Doors/Windows">Aluminium Doors/Windows</option>
                      <option value="Glass Partitions">Glass Partitions</option>
                      <option value="Curtain Walls">Curtain Walls</option>
                      <option value="Custom Fabrication">Custom Fabrication</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.15em] mb-2">
                      Your Message
                    </label>
                    <textarea 
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project requirements..."
                      className="w-full bg-surface-container-lowest border border-outline focus:border-tertiary focus:ring-0 rounded-none p-4 text-xs font-semibold text-primary transition-all leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-on-primary py-4 rounded-none border border-primary font-sans font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-transparent hover:text-primary transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Encrypting &amp; Submitting...
                      </span>
                    ) : (
                      <>
                        <Send size={14} className="text-tertiary-fixed-dim" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Info Column (Inverted Palette) */}
          <div className="bg-primary text-on-primary p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-medium text-xl text-tertiary uppercase tracking-[0.15em] mb-10">
                Contact Information
              </h3>

              {/* Contact Lists */}
              <div className="space-y-8">
                {/* Map/Location */}
                <div className="flex items-start gap-5">
                  <div className="p-2.5 bg-on-primary/5 border border-on-primary/10 rounded-none text-tertiary mt-1">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.15em] text-on-primary/40 font-bold mb-0.5">Corporate HQ</span>
                    <p className="font-sans text-xs md:text-sm text-on-primary/90 leading-relaxed font-light">
                      123 Architectural Way, Industrial District, New York, NY 10001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="p-2.5 bg-on-primary/5 border border-on-primary/10 rounded-none text-tertiary mt-1">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.15em] text-on-primary/40 font-bold mb-0.5">Telephone Hotline</span>
                    <a href="tel:+12125558899" className="font-sans text-xs md:text-sm text-on-primary/90 leading-relaxed font-light hover:text-tertiary transition-colors block">
                      +1 (212) 555-8899
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="p-2.5 bg-on-primary/5 border border-on-primary/10 rounded-none text-tertiary mt-1">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.15em] text-on-primary/40 font-bold mb-0.5">Direct Correspondence</span>
                    <a href="mailto:info@iroshaluminium.com" className="font-sans text-xs md:text-sm text-on-primary/90 leading-relaxed font-light hover:text-tertiary transition-colors block">
                      info@iroshaluminium.com
                    </a>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-5">
                  <div className="p-2.5 bg-on-primary/5 border border-on-primary/10 rounded-none text-tertiary mt-1">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.15em] text-on-primary/40 font-bold mb-0.5">Business Hours</span>
                    <p className="font-sans text-xs md:text-sm text-on-primary/90 leading-relaxed font-light">
                      Mon - Sat: 08:00 AM - 06:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Interactive Blueprint Map of NYC/Manhattan Grid */}
            <div className="mt-12 bg-on-primary/5 border border-on-primary/10 rounded-none h-60 relative overflow-hidden flex flex-col justify-center items-center select-none group">
              {/* Custom Blueprint grid lines */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* Dynamic stylized vector schematic of office building placement */}
              <svg className="w-full h-full opacity-60 relative z-0" viewBox="0 0 400 200">
                {/* Manhattan grid outlines */}
                <line x1="50" y1="0" x2="50" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="150" y1="0" x2="150" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="250" y1="0" x2="250" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="350" y1="0" x2="350" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                
                <line x1="0" y1="50" x2="400" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="0" y1="180" x2="400" y2="180" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />

                {/* Central Rivers representation */}
                <path d="M 0,160 Q 200,100 400,140" fill="none" stroke="#2a1700" strokeWidth="16" className="opacity-15" />
                
                {/* Hotspot Pulse */}
                <circle cx="210" cy="85" r="16" className="fill-tertiary/15 animate-ping" />
                <circle cx="210" cy="85" r="5" className="fill-tertiary" />
              </svg>

              {/* Floating Blueprint Coordinates Labels */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-on-primary/40 flex flex-col leading-none">
                <span>LAT: 40.7128° N</span>
                <span className="mt-1">LNG: 74.0060° W</span>
              </div>

              {/* Central Map Label Overlay */}
              <div className="absolute z-10 bg-surface/95 text-primary p-3 rounded-none border border-outline flex items-center gap-2.5 max-w-[280px] group-hover:scale-105 transition-transform duration-300">
                <div className="p-1.5 bg-primary text-tertiary rounded-none">
                  <MapPin size={14} />
                </div>
                <div>
                  <h6 className="font-serif font-medium text-[11px] leading-none text-primary">Irosh HQ Showroom</h6>
                  <p className="text-[9px] text-on-surface-variant font-medium mt-1">123 Architectural Way, New York</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
