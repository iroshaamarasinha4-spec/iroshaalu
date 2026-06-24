/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, MapPin, Calendar, Briefcase, Sliders, X, CheckCircle } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface PortfolioProps {
  onInquireProject: (projectTitle: string) => void;
}

export default function Portfolio({ onInquireProject }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Residential' | 'Commercial' | 'Office'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ('All' | 'Residential' | 'Commercial' | 'Office')[] = [
    'All', 'Residential', 'Commercial', 'Office'
  ];

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Title & Filters Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <span className="text-tertiary font-sans font-bold text-xs uppercase tracking-[0.25em] block mb-4">
            Our Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight font-medium">
            Architectural Excellence
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto shrink-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`portfolio-filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-[0.15em] border transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary border-primary shadow-sm'
                  : 'bg-transparent text-primary border-outline hover:border-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Framer Motion Layout animations */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              id={`project-card-${project.id}`}
              className="group relative overflow-hidden rounded-none border border-outline h-[380px] cursor-pointer shadow-sm"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image with Zoom Effect */}
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Glassmorphic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-90 group-hover:opacity-95 transition-all duration-300" />

              {/* Details (Appears on Hover / Always on mobile) */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <span className="text-tertiary font-sans font-bold text-[9px] uppercase tracking-[0.15em] bg-primary border border-outline-variant/30 px-2.5 py-1 rounded-none self-start mb-3">
                  {project.category}
                </span>
                <h4 className="text-on-primary font-serif font-medium text-xl leading-snug mb-2 group-hover:text-tertiary transition-colors">
                  {project.title}
                </h4>
                <p className="text-on-primary/80 text-xs line-clamp-2 leading-relaxed mb-4 font-light tracking-wide">
                  {project.description}
                </p>

                <div className="flex items-center gap-1.5 text-on-primary/90 text-[10px] font-bold uppercase tracking-[0.15em] pt-2.5 border-t border-on-primary/10">
                  <Eye size={12} className="text-tertiary" /> View Project Details
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Lightbox Slideshow Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            id="portfolio-lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Lightbox Content Container */}
            <motion.div 
              id="portfolio-lightbox-panel"
              className="relative bg-surface rounded-none shadow-2xl max-w-4xl w-full z-10 overflow-hidden border border-outline flex flex-col md:flex-row h-auto max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {/* Close Button */}
              <button 
                id="lightbox-close"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-none bg-black/40 text-on-primary hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Close project"
              >
                <X size={16} />
              </button>

              {/* Heavy Left Image Panel */}
              <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px] bg-primary">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10 bg-primary border border-outline-variant/30 px-3 py-1.5 rounded-none text-tertiary text-[10px] uppercase font-bold tracking-[0.15em]">
                  {selectedProject.category}
                </div>
              </div>

              {/* Informative Right Details Panel */}
              <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-medium text-2xl text-primary leading-tight mb-3">
                    {selectedProject.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6 font-light tracking-wide">
                    {selectedProject.description}
                  </p>

                  {/* Fact Sheets */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-outline-variant/60 py-5 mb-6">
                    <div className="flex items-center gap-2.5">
                      <MapPin size={14} className="text-tertiary shrink-0" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-[0.15em] text-outline font-bold">Location</span>
                        <span className="text-xs font-semibold text-primary leading-tight">{selectedProject.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar size={14} className="text-tertiary shrink-0" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-[0.15em] text-outline font-bold">Completed</span>
                        <span className="text-xs font-semibold text-primary leading-tight">{selectedProject.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Briefcase size={14} className="text-tertiary shrink-0" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-[0.15em] text-outline font-bold">Client</span>
                        <span className="text-xs font-semibold text-primary leading-tight line-clamp-1">{selectedProject.client}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="mb-8">
                    <h4 className="flex items-center gap-1.5 font-sans font-bold text-[10px] uppercase tracking-[0.15em] text-primary mb-3">
                      <Sliders size={14} className="text-tertiary" /> Engineering Specs
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant font-light leading-none">
                          <CheckCircle size={12} className="text-tertiary shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Lightbox CTA */}
                <div className="flex gap-3 border-t border-outline-variant/60 pt-5 mt-4">
                  <button
                    id="lightbox-inquire"
                    onClick={() => {
                      onInquireProject(selectedProject.title);
                      setSelectedProject(null);
                    }}
                    className="flex-1 bg-primary text-on-primary border border-primary font-bold text-center py-3.5 rounded-none uppercase text-[10px] tracking-[0.15em] transition-all hover:bg-transparent hover:text-primary active:scale-95 cursor-pointer"
                  >
                    Request similar build
                  </button>
                  <button
                    id="lightbox-close-btn"
                    onClick={() => setSelectedProject(null)}
                    className="border border-outline text-primary font-bold text-center px-5 py-3.5 rounded-none uppercase text-[10px] tracking-[0.15em] hover:bg-surface-container/30 transition-colors"
                  >
                    Close
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
