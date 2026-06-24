/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data';
import DynamicIcon from './DynamicIcon';

export default function Process() {
  return (
    <section className="py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span 
            className="text-tertiary font-sans font-bold text-xs uppercase tracking-[0.25em] block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Process
          </motion.span>
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight font-medium"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            How We Bring Vision to Life
          </motion.h2>
        </div>

        {/* Steps Road Flow */}
        <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          {/* Horizontal Connection Line in Desktop */}
          <div className="absolute top-[38px] left-[12%] right-[12%] h-[1px] bg-tertiary/20 hidden md:block -translate-y-1/2 z-0" />

          {/* Individual Steps */}
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              id={`process-step-${step.id}`}
              className="relative z-10 text-center flex-1 bg-surface md:bg-transparent p-8 md:p-0 rounded-none shadow-sm md:shadow-none border border-outline md:border-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
            >
              {/* Step Square Bubble */}
              <div className={`w-12 h-12 rounded-none flex items-center justify-center mx-auto mb-6 border border-outline shadow-sm relative z-10 font-sans font-bold text-xs transition-colors duration-300 ${
                index === 3 
                  ? 'bg-tertiary text-on-tertiary border-tertiary' 
                  : 'bg-primary text-on-primary'
              }`}>
                {step.stepNumber}
              </div>

              {/* Step Icon Accent */}
              <div className="flex justify-center mb-3 text-tertiary">
                <DynamicIcon name={step.iconName} size={18} />
              </div>

              <h4 className="font-serif font-medium text-lg text-primary mb-2">
                {step.title}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed px-2 font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
