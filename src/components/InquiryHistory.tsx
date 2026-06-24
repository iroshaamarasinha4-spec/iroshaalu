/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, History, Check, ShieldAlert, BadgeInfo, FileText, Trash2 } from 'lucide-react';
import { Inquiry } from '../types';

interface InquiryHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: Inquiry[];
  onClearHistory: () => void;
}

export default function InquiryHistory({ isOpen, onClose, inquiries, onClearHistory }: InquiryHistoryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="history-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel Card */}
          <motion.div 
            id="history-modal"
            className="relative bg-surface rounded-none shadow-2xl max-w-lg w-full z-10 overflow-hidden border border-outline p-6 md:p-8 max-h-[85vh] flex flex-col justify-between"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-primary/5 border border-primary/10 rounded-none text-primary">
                    <History size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-base md:text-lg text-primary leading-none">
                      Your Saved Quote Inquiries
                    </h3>
                    <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-outline mt-1.5 inline-block">
                      Stored Securely In Local Browser Cache
                    </span>
                  </div>
                </div>
                <button 
                  id="history-close"
                  onClick={onClose}
                  className="p-1.5 rounded-none border border-outline-variant/30 hover:bg-surface-container transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Inquiry list container */}
              <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2 scrollbar-thin">
                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-on-surface-variant font-sans flex flex-col items-center gap-2.5">
                    <BadgeInfo size={32} className="text-outline" />
                    <p className="text-sm font-semibold text-primary">No submissions on file</p>
                    <p className="text-xs text-outline max-w-xs font-light leading-normal">
                      Use our Estimate Calculator or submit a request in the contact section to save inquiries on this device.
                    </p>
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      id={`history-item-${inq.id}`}
                      className="p-4 bg-surface-container/30 rounded-none border border-outline-variant/30 flex flex-col space-y-3"
                    >
                      {/* Meta header */}
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-outline font-semibold">
                          ID: {inq.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-[8px] uppercase font-bold tracking-[0.1em] text-white bg-emerald-600 px-2 py-0.5 rounded-none">
                            {inq.status}
                          </span>
                        </div>
                      </div>

                      {/* Info layout */}
                      <div className="text-xs">
                        <div className="flex justify-between py-1 border-b border-outline-variant/10">
                          <span className="text-on-surface-variant font-light">Client</span>
                          <span className="font-semibold text-primary">{inq.fullName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-outline-variant/10">
                          <span className="text-on-surface-variant font-light">Contact Info</span>
                          <span className="font-semibold text-primary">{inq.phone}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-outline-variant/10">
                          <span className="text-on-surface-variant font-light">Type</span>
                          <span className="font-semibold text-primary">{inq.projectType}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-outline-variant/10">
                          <span className="text-on-surface-variant font-light">Created At</span>
                          <span className="font-semibold text-primary">{inq.timestamp}</span>
                        </div>

                        {/* Estimate specific sheet */}
                        {inq.estimateDetails && (
                          <div className="mt-2.5 p-3 bg-primary-container/10 border border-outline rounded-none space-y-1.5 text-[11px]">
                            <span className="flex items-center gap-1 font-sans font-bold uppercase tracking-[0.15em] text-primary text-[9px] mb-1">
                              <FileText size={10} className="text-tertiary" /> Built Configuration Cost
                            </span>
                            <div className="flex justify-between leading-none text-on-surface-variant">
                              <span>Service / Profile</span>
                              <span className="font-medium text-primary">{inq.estimateDetails.serviceType} / {inq.estimateDetails.profileFinish}</span>
                            </div>
                            <div className="flex justify-between leading-none text-on-surface-variant">
                              <span>Dimensions</span>
                              <span className="font-medium text-primary">{inq.estimateDetails.width}ft x {inq.estimateDetails.height}ft</span>
                            </div>
                            <div className="flex justify-between leading-none text-on-surface-variant font-bold border-t border-outline-variant/10 pt-1.5 text-primary">
                              <span>Price Range</span>
                              <span className="text-tertiary font-extrabold">
                                ${Math.round(inq.estimateDetails.estimatedPrice * 0.9).toLocaleString()} - ${Math.round(inq.estimateDetails.estimatedPrice * 1.1).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Clear database action */}
            {inquiries.length > 0 && (
              <div className="border-t border-outline-variant/30 pt-4 mt-4 flex gap-3">
                <button
                  id="history-clear-btn"
                  onClick={onClearHistory}
                  className="flex-1 border border-error/20 text-error font-semibold text-center py-3 rounded-none uppercase text-xs tracking-[0.15em] hover:bg-error hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 size={14} /> Clear Log Data
                </button>
                <button
                  id="history-close-btn"
                  onClick={onClose}
                  className="flex-1 bg-primary text-on-primary border border-primary font-semibold text-center py-3 rounded-none uppercase text-xs tracking-[0.15em] hover:bg-transparent hover:text-primary transition-all duration-300 cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
