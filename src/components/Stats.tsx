/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatItemProps {
  targetValue: number;
  suffix: string;
  label: string;
  delayMs?: number;
}

function StatCounter({ targetValue, suffix, label, delayMs = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // Animation duration in ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(Math.floor((progress / duration) * targetValue), targetValue);
      
      setCount(increment);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isInView, targetValue, delayMs]);

  return (
    <div ref={elementRef} className="flex flex-col items-center">
      <motion.span 
        className="font-serif italic text-4xl md:text-5xl text-tertiary block mb-2 font-medium tracking-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, delay: delayMs / 1000 }}
      >
        {count}
        {suffix}
      </motion.span>
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary/60 text-center">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-primary text-on-primary relative overflow-hidden">
      {/* Decorative Grid Lines to mimic curtain walls */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
        <div className="w-full h-full grid grid-cols-4 grid-rows-2 border-collapse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border border-on-primary/30" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 items-center justify-center">
          <StatCounter 
            targetValue={500} 
            suffix="+" 
            label="Projects Completed" 
            delayMs={0}
          />
          <StatCounter 
            targetValue={10} 
            suffix="+" 
            label="Years Experience" 
            delayMs={150}
          />
          <StatCounter 
            targetValue={100} 
            suffix="%" 
            label="Client Satisfaction" 
            delayMs={300}
          />
          
          {/* Static text-based 24/7 Support */}
          <div className="flex flex-col items-center">
            <motion.span 
              className="font-serif italic text-4xl md:text-5xl text-tertiary block mb-2 font-medium tracking-tight uppercase"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.45 }}
            >
              24/7
            </motion.span>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary/60 text-center">
              Expert Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
