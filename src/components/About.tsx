/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, ArrowRight, Award, Compass } from 'lucide-react';
import { ABOUT_WORKSHOP_IMAGE } from '../data';

interface AboutProps {
  onLearnMoreServices: () => void;
}

export default function About({ onLearnMoreServices }: AboutProps) {
  return (
    <section 
      id="about" 
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden bg-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Images Column with experience badge */}
        <div className="relative">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute -top-10 -left-10 w-36 h-36 bg-tertiary/5 rounded-full blur-3xl z-0" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-outline-variant/10 rounded-full blur-3xl z-0" />

          {/* Border Accent Layer */}
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-outline-variant/40 rounded-none z-0 -translate-x-6 translate-y-6 hidden sm:block" />

          {/* Main Workshop Image */}
          <motion.div
            className="relative z-10 overflow-hidden rounded-none shadow-xl border border-outline-variant/30"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src={ABOUT_WORKSHOP_IMAGE} 
              id="about-image"
              alt="Artisan precisely cutting high-grade silver aluminium profile"
              className="w-full h-[450px] md:h-[550px] object-cover hover:scale-102 transition-transform duration-700"
            />
          </motion.div>

          {/* Floating Luxury Experience Badge */}
          <motion.div 
            id="about-experience-badge"
            className="absolute -bottom-8 -right-4 md:right-4 bg-surface p-6 md:p-8 rounded-none border border-outline-variant/60 shadow-xl z-20 glass flex flex-col items-center justify-center text-center min-w-[150px] md:min-w-[180px]"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <div className="flex items-center gap-1.5 mb-1 text-primary">
              <Award className="text-tertiary" size={20} />
              <span className="font-serif font-bold text-3xl sm:text-4xl text-primary">10+</span>
            </div>
            <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] leading-tight">
              Years of<br />Experience
            </p>
          </motion.div>
        </div>

        {/* Right: Content Column */}
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-tertiary font-sans font-bold text-xs uppercase tracking-[0.25em] mb-4 block">
            About IROSH ALUMINIUM
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-6 font-medium">
            Mastering the Art of Architectural Glass &amp; Metal
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-8 font-light tracking-wide">
            At IROSH ALUMINIUM, we believe in the synergy of strength and transparency. Our legacy is built on providing top-tier aluminum fabrication that defines modern urban landscapes. From boutique residential homes to expansive corporate headquarters, our precision remains unmatched.
          </p>

          {/* Key Advantages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* Trusted Quality */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary text-tertiary rounded-none shrink-0 border border-outline-variant/20">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-xs text-primary uppercase tracking-[0.15em] mb-1">
                  Trusted Quality
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Premium materials sourced from global leaders for lifelong endurance.
                </p>
              </div>
            </div>

            {/* Swift Delivery */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary text-tertiary rounded-none shrink-0 border border-outline-variant/20">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-xs text-primary uppercase tracking-[0.15em] mb-1">
                  Swift Delivery
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Pristine execution schedule guaranteeing on-time project handover.
                </p>
              </div>
            </div>
          </div>

          {/* Action trigger */}
          <button
            id="about-discover-mission-btn"
            onClick={onLearnMoreServices}
            className="group inline-flex items-center gap-2 font-sans font-bold text-xs text-primary uppercase tracking-[0.2em] hover:gap-3 transition-all self-start border-b border-tertiary/40 pb-1.5 hover:border-tertiary"
          >
            Discover Our Services 
            <ArrowRight size={14} className="text-tertiary" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
