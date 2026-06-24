/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, Sliders, ChevronRight, HelpCircle, CheckCircle2 } from 'lucide-react';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEstimate: (details: {
    serviceType: string;
    width: number;
    height: number;
    glassType: string;
    profileFinish: string;
    estimatedPrice: number;
  }) => void;
}

export default function EstimateModal({ isOpen, onClose, onSubmitEstimate }: EstimateModalProps) {
  const [serviceType, setServiceType] = useState('Aluminium Doors');
  const [width, setWidth] = useState(6); // in feet
  const [height, setHeight] = useState(8); // in feet
  const [glassType, setGlassType] = useState('Tempered Safety Glass');
  const [profileFinish, setProfileFinish] = useState('Matte Black Anodized');
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const servicesList = [
    { name: 'Aluminium Doors', baseRate: 45 }, // rate per sqft
    { name: 'Modern Windows', baseRate: 35 },
    { name: 'Glass Partitions', baseRate: 30 },
    { name: 'Curtain Walls', baseRate: 65 }
  ];

  const glassTypes = [
    { name: 'Tempered Safety Glass', multiplier: 1.0 },
    { name: 'Insulated Double-Glazed', multiplier: 1.4 },
    { name: 'Solar Low-E Tinted', multiplier: 1.65 },
    { name: 'Acoustic PVB Laminated', multiplier: 1.5 }
  ];

  const profileFinishes = [
    { name: 'Matte Black Anodized', addedCost: 5 }, // per sqft added
    { name: 'Sleek Anodized Silver', addedCost: 0 },
    { name: 'Bronze Premium Coating', addedCost: 8 },
    { name: 'Custom RAL Powder Coated', addedCost: 12 }
  ];

  // Recalculate price dynamically when options change
  useEffect(() => {
    const serviceObj = servicesList.find(s => s.name === serviceType) || servicesList[0];
    const glassObj = glassTypes.find(g => g.name === glassType) || glassTypes[0];
    const finishObj = profileFinishes.find(f => f.name === profileFinish) || profileFinishes[0];

    const sqft = width * height;
    const baseCost = sqft * serviceObj.baseRate;
    const withGlass = baseCost * glassObj.multiplier;
    const withFinish = withGlass + (sqft * finishObj.addedCost);
    const laborEstimate = withFinish * 0.25; // 25% labor addition
    const total = withFinish + laborEstimate;

    setEstimatedPrice(Math.round(total));
  }, [serviceType, width, height, glassType, profileFinish]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEstimate({
      serviceType,
      width,
      height,
      glassType,
      profileFinish,
      estimatedPrice
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="estimate-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Calculator Card Container */}
          <motion.div 
            id="estimate-modal-card"
            className="relative bg-surface rounded-none shadow-2xl max-w-2xl w-full z-10 overflow-hidden border border-outline p-6 md:p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-primary/5 border border-primary/10 rounded-none text-primary">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-medium text-lg md:text-xl text-primary leading-none">
                    Architectural Quote Estimator
                  </h3>
                  <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-outline mt-1 inline-block">
                    Configure &amp; Check Cost Instantly
                  </span>
                </div>
              </div>
              <button 
                id="estimate-modal-close"
                onClick={onClose}
                className="p-1.5 rounded-none border border-outline-variant/30 hover:bg-surface-container transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Config Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Service Select */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-on-surface-variant mb-2">
                    Service / Build Category
                  </label>
                  <select
                    id="quote-service-select"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline focus:border-tertiary focus:ring-0 rounded-none p-3 text-xs font-semibold text-primary transition-all"
                  >
                    {servicesList.map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Profile Finish Select */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-on-surface-variant mb-2">
                    Aluminum Profile Finish
                  </label>
                  <select
                    id="quote-finish-select"
                    value={profileFinish}
                    onChange={(e) => setProfileFinish(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline focus:border-tertiary focus:ring-0 rounded-none p-3 text-xs font-semibold text-primary transition-all"
                  >
                    {profileFinishes.map(f => (
                      <option key={f.name} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slider dimensions */}
              <div className="bg-surface-container-low p-4 rounded-none border border-outline space-y-4">
                <span className="block text-[8px] uppercase font-bold tracking-[0.15em] text-primary">
                  Dimensions (Feet)
                </span>
                
                {/* Width Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-sans">
                    <span className="text-on-surface-variant">Width</span>
                    <span className="font-semibold text-primary">{width} ft</span>
                  </div>
                  <input 
                    id="quote-width-slider"
                    type="range" 
                    min="3" 
                    max="24" 
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-outline-variant rounded-none cursor-pointer"
                  />
                </div>

                {/* Height Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-sans">
                    <span className="text-on-surface-variant">Height</span>
                    <span className="font-semibold text-primary">{height} ft</span>
                  </div>
                  <input 
                    id="quote-height-slider"
                    type="range" 
                    min="3" 
                    max="15" 
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-outline-variant rounded-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Glass specs select */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-on-surface-variant mb-2">
                  Glass Specifications
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {glassTypes.map((g) => (
                    <button
                      key={g.name}
                      type="button"
                      id={`glass-spec-btn-${g.name.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => setGlassType(g.name)}
                      className={`p-3 rounded-none border text-left transition-all ${
                        glassType === g.name
                          ? 'bg-primary border-primary text-on-primary'
                          : 'bg-surface border-outline text-primary hover:border-tertiary'
                      }`}
                    >
                      <span className="block text-[11px] font-bold tracking-tight leading-tight mb-0.5">{g.name}</span>
                      <span className={`text-[9px] font-mono ${glassType === g.name ? 'text-tertiary' : 'text-outline'}`}>
                        {g.multiplier === 1.0 ? 'Standard rate' : `+${Math.round((g.multiplier - 1) * 100)}% premium`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Computed Output Display Panel */}
              <div className="bg-primary text-on-primary rounded-none p-5 border border-primary shadow-inner mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] opacity-70">
                    Project Estimate Price
                  </span>
                  <span className="text-[8px] uppercase border border-tertiary/20 text-tertiary px-2 py-0.5 rounded-none font-bold">
                    *Approximate Cost
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-tertiary tracking-tight">
                    ${(estimatedPrice * 0.9).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-lg opacity-70 font-light">-</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-tertiary tracking-tight">
                    ${(estimatedPrice * 1.1).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs text-on-primary/60 ml-2 font-light">USD</span>
                </div>
                <p className="text-[10px] opacity-60 leading-normal border-t border-on-primary/10 pt-2 font-light">
                  Includes professional glass tempering, certified aluminum extrusion, dual-weather sealing, and basic installation labor. Final price is subject to structural site inspection.
                </p>
              </div>

              {/* Submit / Proceed */}
              <button
                type="submit"
                id="quote-estimator-submit"
                className="w-full bg-primary text-on-primary border border-primary font-bold text-center py-4 rounded-none uppercase text-xs tracking-[0.15em] transition-all duration-300 hover:bg-transparent hover:text-primary flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                Apply Estimate to Contact Form <ChevronRight size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
