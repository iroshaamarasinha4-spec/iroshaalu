/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Award, Sliders, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';
import DynamicIcon from './DynamicIcon';

interface ServicesProps {
  onInquireService: (serviceTitle: string) => void;
}

export default function Services({ onInquireService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section 
      id="services" 
      className="py-24 bg-surface-container-low"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="text-tertiary font-sans font-bold text-xs uppercase tracking-[0.25em] block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight font-medium"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Tailored Solutions for Every Surface
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group bg-surface p-8 rounded-none border border-outline-variant hover:shadow-lg hover:border-tertiary/60 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedService(service)}
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 bg-surface-container-low border border-outline-variant/60 flex items-center justify-center rounded-none mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <span className="text-tertiary group-hover:text-on-primary transition-colors duration-300">
                    <DynamicIcon name={service.iconName} size={24} />
                  </span>
                </div>

                <h3 className="font-serif font-medium text-xl text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 font-sans font-bold text-[10px] uppercase tracking-[0.15em] text-primary border-b border-tertiary/20 pb-0.5 group-hover:border-tertiary group-hover:gap-2.5 transition-all self-start">
                Learn More <ChevronRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Interactive Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div 
            id="service-modal-container"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            {/* Modal Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
            />

            {/* Modal Body */}
            <motion.div 
              id="service-modal"
              className="relative bg-surface rounded-none shadow-2xl max-w-3xl w-full z-10 overflow-hidden border border-outline flex flex-col md:flex-row h-auto max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {/* Close Button */}
              <button 
                id="service-modal-close"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-none bg-black/40 text-on-primary hover:bg-black/60 transition-colors"
                aria-label="Close details"
              >
                <X size={16} />
              </button>

              {/* Left Image Section */}
              <div className="md:w-5/12 relative h-48 md:h-auto min-h-[200px] md:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent z-10 md:hidden" />
                <img 
                  src={selectedService.imageUrl} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 z-10 text-on-primary md:hidden">
                  <h3 className="font-serif font-medium text-2xl">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Right Detailed Section */}
              <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="hidden md:flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-surface-container border border-outline-variant/60 rounded-none text-tertiary">
                      <DynamicIcon name={selectedService.iconName} size={18} />
                    </div>
                    <h3 className="font-serif font-medium text-2xl text-primary">
                      {selectedService.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6 font-light">
                    {selectedService.longDescription}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-1.5 font-sans font-bold text-[10px] uppercase tracking-[0.15em] text-primary mb-3">
                      <Award size={14} className="text-tertiary" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {selectedService.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 font-sans text-xs text-on-surface-variant leading-normal">
                          <span className="p-0.5 bg-primary text-tertiary rounded-none mt-0.5 shrink-0">
                            <Check size={10} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Specs */}
                  <div className="mb-8">
                    <h4 className="flex items-center gap-1.5 font-sans font-bold text-[10px] uppercase tracking-[0.15em] text-primary mb-3">
                      <Sliders size={14} className="text-tertiary" /> Tech Specifications
                    </h4>
                    <ul className="grid grid-cols-1 gap-2 border-l border-tertiary/30 pl-3">
                      {selectedService.specifications.map((spec, i) => (
                        <li key={i} className="font-sans text-[11px] text-on-surface-variant leading-normal font-mono">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="flex gap-3 border-t border-outline-variant/50 pt-4 mt-2">
                  <button
                    id="service-modal-inquire"
                    onClick={() => {
                      onInquireService(selectedService.title);
                      setSelectedService(null);
                    }}
                    className="flex-1 bg-primary text-on-primary border border-primary font-bold text-center py-3.5 rounded-none uppercase text-[10px] tracking-[0.15em] transition-all hover:bg-transparent hover:text-primary active:scale-95 cursor-pointer"
                  >
                    Inquire Service
                  </button>
                  <button
                    id="service-modal-back"
                    onClick={() => setSelectedService(null)}
                    className="border border-outline text-primary font-bold text-center px-5 py-3.5 rounded-none uppercase text-[10px] tracking-[0.15em] hover:bg-surface-container/35 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
