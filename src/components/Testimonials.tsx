/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-tertiary font-sans font-bold text-xs uppercase tracking-[0.25em] block mb-4">
          Client Feedback
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight font-medium">
          Success Stories
        </h2>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, index) => {
          // Check if it is the middle card to apply the inverted style as shown in the mockup image!
          // The mockup image has the middle card inverted: dark bg (bg-primary, text-on-primary) and the others are light bg (bg-surface)
          const isInverted = index === 1;

          return (
            <motion.div
              key={testimonial.id}
              id={`testimonial-card-${testimonial.id}`}
              className={`p-8 rounded-none border transition-all duration-500 flex flex-col justify-between ${
                isInverted 
                  ? 'bg-primary text-on-primary border-primary shadow-xl scale-102 z-10' 
                  : 'bg-surface text-primary border-outline hover:shadow-md'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex gap-1 text-tertiary mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="stroke-none" />
                  ))}
                </div>

                {/* Feedback Quote */}
                <p className={`font-serif text-sm sm:text-base leading-relaxed mb-8 italic font-light ${
                  isInverted ? 'text-on-primary/90' : 'text-on-surface-variant'
                }`}>
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-5">
                <div className={`w-12 h-12 rounded-none overflow-hidden shrink-0 border ${
                  isInverted ? 'bg-on-primary/10 border-on-primary/15' : 'bg-secondary-container border-outline-variant'
                }`}>
                  <img 
                    src={testimonial.imageUrl} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-serif font-medium text-sm leading-tight">
                    {testimonial.name}
                  </h5>
                  <p className={`text-[10px] mt-0.5 leading-none uppercase tracking-wider ${
                    isInverted ? 'text-on-primary/60 font-light' : 'text-on-surface-variant font-light'
                  }`}>
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
