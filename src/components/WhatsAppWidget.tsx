/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp, X, Send, Check } from 'lucide-react';

export default function WhatsAppWidget() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  
  // Custom quick prompts that help users trigger an action easily
  const quickPrompts = [
    'I need an estimation on Aluminium Doors.',
    'I would like to inquire about glass partitions.',
    'Please schedule a site measurement review.'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    // Direct WhatsApp link generation with encoded message
    const phoneNumber = '12125558899'; // Mock WhatsApp company number
    const encodedText = encodeURIComponent(userMsg);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Redirect/Open link in new tab safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Clear and close
    setUserMsg('');
    setIsOpen(false);
  };

  return (
    <div id="floating-actions" className="fixed bottom-8 right-8 z-40 flex flex-col gap-4 items-end">
      
      {/* WhatsApp Chat Popup Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-chatbox"
            className="bg-surface rounded-none shadow-2xl border border-outline w-[310px] overflow-hidden flex flex-col justify-between"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Header Inverted Green */}
            <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white/10 border border-white/20 rounded-none">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-medium text-xs leading-none">Live Chat Agent</h4>
                  <span className="text-[9px] text-white/70 font-medium mt-1 inline-block">Online • Usually replies in 10m</span>
                </div>
              </div>
              <button 
                id="whatsapp-chatbox-close"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-none hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Message Board */}
            <div className="p-4 space-y-3.5 bg-surface-container-low max-h-[220px] overflow-y-auto">
              <div className="bg-white p-3 rounded-none shadow-sm text-[11px] leading-relaxed text-on-surface-variant font-light max-w-[85%] border border-outline">
                Hi there! Welcome to IROSH ALUMINIUM. Let me know what architectural build you are looking for!
              </div>

              {/* Quick Preset Selector */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[8px] uppercase font-bold tracking-[0.15em] text-outline block mb-1">
                  Quick Prompts
                </span>
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    id={`wa-prompt-${prompt.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setUserMsg(prompt)}
                    className="w-full text-left bg-white border border-outline rounded-none p-2.5 text-[10px] text-primary hover:border-emerald-600 transition-all font-medium leading-normal block"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSendWhatsApp} className="p-3 bg-white border-t border-outline flex gap-2">
              <input 
                id="whatsapp-user-input"
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Type your WhatsApp message..."
                className="flex-1 bg-surface-container border border-outline rounded-none p-3 text-[11px] outline-none"
              />
              <button 
                type="submit"
                id="whatsapp-send-btn"
                aria-label="Send"
                className="bg-emerald-600 text-white h-9 w-9 rounded-none flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger WhatsApp Icon Button */}
      <button
        id="whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact us on WhatsApp"
        className="w-14 h-14 bg-emerald-600 text-white rounded-none border border-emerald-700 flex items-center justify-center shadow-2xl hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer relative group"
      >
        <MessageCircle size={24} />
        {!isOpen && (
          <span className="absolute right-16 bg-surface border border-outline px-4 py-2 rounded-none text-primary font-sans font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
            WhatsApp Us
          </span>
        )}
      </button>

      {/* Scroll to Top Trigger */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="w-14 h-14 bg-primary text-on-primary rounded-none flex items-center justify-center shadow-2xl hover:bg-transparent hover:text-primary cursor-pointer transition-all border border-primary duration-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
