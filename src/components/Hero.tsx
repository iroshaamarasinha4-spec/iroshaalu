/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowRight, ArrowDown } from 'lucide-react';
import { HERO_BACKGROUND_IMAGE } from '../data';

interface HeroProps {
  onOpenEstimate: () => void;
  onViewProjects: () => void;
}

export default function Hero({ onOpenEstimate, onViewProjects }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background Image with Dark Professional Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <motion.div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 md:px-12 max-w-4xl mx-auto flex flex-col items-center">
        {/* Animated Accent Line */}
        <motion.div
          id="hero-accent-line"
          className="h-[1.5px] w-16 bg-tertiary mb-6"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        />

        {/* Headline */}
        <motion.h1 
          id="hero-title"
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-on-primary tracking-tight leading-[1.1] mb-6 max-w-3xl font-medium"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          Professional Aluminium &amp; Glass Solutions
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          id="hero-subtitle"
          className="font-sans text-sm sm:text-base md:text-lg text-on-primary/80 leading-relaxed mb-10 max-w-2xl font-light tracking-wide"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          We deliver premium aluminium fabrication and glass installation services for residential and commercial projects across the region.
        </motion.p>

        {/* Action CTAs */}
        <motion.div 
          id="hero-actions"
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <button 
            id="hero-estimate-btn"
            onClick={onOpenEstimate}
            className="group flex items-center justify-center gap-2 bg-tertiary text-on-tertiary font-medium px-8 py-4 rounded-none text-xs uppercase tracking-[0.2em] border border-tertiary hover:bg-transparent hover:text-on-primary hover:border-on-primary transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <FileText size={16} />
            Get Free Quote
          </button>
          <button 
            id="hero-projects-btn"
            onClick={onViewProjects}
            className="flex items-center justify-center gap-2 border border-on-primary/60 hover:border-on-primary text-on-primary font-medium px-8 py-4 rounded-none text-xs uppercase tracking-[0.2em] hover:bg-on-primary hover:text-primary transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            View Our Projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Down Bouncing Arrow Indicator */}
      <motion.div 
        id="hero-scroll-indicator"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-on-primary/70 hover:text-on-primary transition-colors flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block mb-1">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={24} className="text-tertiary-fixed-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}
