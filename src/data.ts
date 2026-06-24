/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Project, Testimonial, ProcessStep } from './types';

export const HERO_BACKGROUND_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPOXAU5LF70lGpIK5aYVPCSLs28uJHO3rfHvwby0tAlDHmxIrINYGddIbXHd8xGPssHtT9F88bFl-pVkVUv8ZW6pR4Jojb_zc8NEjN4tAicTwIFGYN425P1tPGHVNNt48tJ7ktGO5p_Atq_9lvGiehtwS_l_TE76s6-cdzTOSoHbT069g1-338pV-f_hU6hs7e6vPi0xSpg6IY268zCXXYMyOYxDpCsHHeR0-jYYMK1ufjwEfifrZflqk-oJwSsPDfd_xacAhLVLRy";
export const ABOUT_WORKSHOP_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCSCJ_0MrXtru43t61ZhyR6Zfgcfwkjmz-wKUgxgwymECluQPZVpO_DEYjuB4L9jSz3vlbOxqe3YDluS-2qhhQUjcgm8jCWh2eQrTHJUB974Kgnq2CnaD50yzBv6z0T5aSe10Ks6SaiQ3y3x8zML2cF3xaLuYcBrDQD3iBWG-oy3SO1rAXyg4TGmslbr5E4qnnXbK8FnvOG98ISoC0__E1gG96ZMS-OtZHxPZ0A_PEvKEZY3n6_KNAmclyhPItBuLE2Rmt3x3aAqA-f";

export const SERVICES: Service[] = [
  {
    id: 'aluminium-doors',
    title: 'Aluminium Doors',
    iconName: 'DoorClosed',
    description: 'Sleek, durable door systems available in sliding, folding, and hinged configurations.',
    longDescription: 'Our premium aluminum door systems represent the perfect intersection of contemporary design and uncompromising durability. Constructed with high-grade thermal break profiles and premium hardware, they offer seamless operation, exquisite weathering, and sophisticated aesthetics that elevate any residential or commercial portal.',
    features: [
      'Heavy-duty tandem rollers for ultra-smooth sliding action',
      'Advanced multi-point security locking mechanisms',
      'High-performance weather gaskets for perfect drafts insulation',
      'Acoustic damping technology for substantial decibel reduction'
    ],
    specifications: [
      'Profile Thickness: 2.0mm to 3.5mm architectural grade aluminum',
      'Finish Options: Polyester powder coating, Anodized, or Wood grain sublimations',
      'Glass Configuration: 6mm to 24mm double-glazed insulated safety glass',
      'Water Tightness: Class 9A in accordance with EN 12208 specifications'
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASNbpyEvEgf7clR3tPjr6Jfl5MU5HaI-LVrc6VVUuGNs4zPFm-QQgazhyQ2l4VOry18DW2tInUnGqKtl94Y0WvZOnCYWwcY4tlPNtxc_7QOWfwZMF7Ry9nnOCccxneRgm3do7VAxiAU0zHdNCa9buxb5TJIPQtvjW9OFgxZr9VBUyxY2PZy_PfTp6drctisbeeazSfxF1A48qt4fVhtRnRQtSxxxhfJWwm1i1IimRHRVWALpBXVt_SgnCwaas_6MGclIiBmkf6agMu'
  },
  {
    id: 'modern-windows',
    title: 'Modern Windows',
    iconName: 'Window',
    description: 'Thermal-efficient casement and sliding windows designed for noise reduction.',
    longDescription: 'Engineered for exceptional energy efficiency and modern minimalism. Our window systems feature ultra-slim frame sightlines that maximize natural light transmission while offering world-class thermal and sound isolation profiles.',
    features: [
      'Minimalist frame profile maximizing transparent glazing ratio',
      'Double or triple glazing with Low-E thermal coatings',
      'Dual weather-strip seals for ultimate wind and rain resistance',
      'Tilt-and-turn functionality options for optimal ventilation'
    ],
    specifications: [
      'Thermal Value: U-factor as low as 1.1 W/m²K',
      'Acoustic Rating: Noise reduction index up to Rw = 45 dB',
      'Wind Load Capacity: Class C5/B5 in accordance with EN 12210',
      'Air Permeability: Class 4 in accordance with EN 12207'
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB05zCZshFTIHhXNWzJVZF35ooLgndAOEvkCM6qqJrAWO10GK9NRU1_5KT4oZGslnbOQqMuJt-3Y7VOk6wLcrKiutXPDy5G4UMoV4rcysfU2EyHvQAemeYFfRRXog1WTbHaGCLJRstx6FQiOdoSvmGPQwReQD0UjWwb5eYBvKQhPnJiB4meUI9pqrInoLkmaRPVtlergyJEUp3ONSERxLQUwzQnkYRyVbWOGLCIcEYZLIkTZS63cA6BdiOa2Nw0c0uxNFsNtmguS7eh'
  },
  {
    id: 'glass-partitions',
    title: 'Glass Partitions',
    iconName: 'LayoutGrid',
    description: 'Frameless and slimline partitions for modern office environments and open homes.',
    longDescription: 'Bring transparency and spaciousness into workspaces or homes. Our structural and frameless glass partitions divide spatial flows perfectly without sacrificing ambient light. Available with custom graphic frosting, sound barriers, and modular integrated hardware.',
    features: [
      'Frameless floor-to-ceiling single-glazed or double-glazed panels',
      'Ultra-slim aluminum channel profile for absolute transparency',
      'Seamless integrated glass doors with magnetic latch hinges',
      'Acoustic PVB laminations for confidential meeting spaces'
    ],
    specifications: [
      'Glass Type: 10mm to 15mm tempered or laminated safety glass',
      'Channel Profile Height: Tiny 25mm visible aluminum perimeter',
      'Acoustic Control: Rw range of 35 dB (single-glazed) to 50 dB (double-glazed)',
      'Joint Compound: Translucent UV-stable crystal polycarbonate joint-strip profiles'
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe7G6sSH0gMbWZPQBi__TzXDToQQn9mzSRljtzL4SLdSZ_FDXso1iRng3_1Mk6-A4Q3-gtEzSCqnny6v2fLgPThLxukdlaulJjwDOqPc3TuKWkQ_-Im4ddzsDLPRtcNXADnZEcMJ4ia7gjrgfSe_gwS2tUdkAxqdGwBfdrvr-GVxLxehcHW5caD6M2xWQs4w4mdFiyZhWRCu0eabwJ_1k63p5xu4d-vhw_JVoCLJKVpz_zIXaROZd00K3fUU0gRWsMfl54Y7lOu9Bw'
  },
  {
    id: 'curtain-walls',
    title: 'Curtain Walls',
    iconName: 'Building2',
    description: 'High-performance structural glazing for commercial facades and skyscrapers.',
    longDescription: 'Our commercial unitized and stick curtain wall systems are designed to withstand structural loads while creating beautiful high-rise architectural landmarks. Incorporates cutting-edge thermal breaks, integrated structural gaskets, and customized mullion systems.',
    features: [
      'Self-draining mullion drainage pathways prevent water buildup',
      'Engineered seismic joint systems accommodate building displacement',
      'Compatible with high-performance solar control insulated glass units',
      'Structural silicone glazing (SSG) options for seamless uniform facades'
    ],
    specifications: [
      'System Depth: 120mm to 250mm deeply engineered aluminum profiles',
      'Thermal Performance: Custom integrated high-density polyamide isolation blocks',
      'Air Infiltration: Class AE tested up to 600 Pa pressure thresholds',
      'Deflection: Fully complies with L/175 structural building regulations'
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPOXAU5LF70lGpIK5aYVPCSLs28uJHO3rfHvwby0tAlDHmxIrINYGddIbXHd8xGPssHtT9F88bFl-pVkVUv8ZW6pR4Jojb_zc8NEjN4tAicTwIFGYN425P1tPGHVNNt48tJ7ktGO5p_Atq_9lvGiehtwS_l_TE76s6-cdzTOSoHbT069g1-338pV-f_hU6hs7e6vPi0xSpg6IY268zCXXYMyOYxDpCsHHeR0-jYYMK1ufjwEfifrZflqk-oJwSsPDfd_xacAhLVLRy'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Grand Penthouse Residence',
    category: 'Residential',
    description: 'Floor-to-ceiling minimal glass sliding systems overlooking the metropolitan skyline with zero-barrier thresholds.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASNbpyEvEgf7clR3tPjr6Jfl5MU5HaI-LVrc6VVUuGNs4zPFm-QQgazhyQ2l4VOry18DW2tInUnGqKtl94Y0WvZOnCYWwcY4tlPNtxc_7QOWfwZMF7Ry9nnOCccxneRgm3do7VAxiAU0zHdNCa9buxb5TJIPQtvjW9OFgxZr9VBUyxY2PZy_PfTp6drctisbeeazSfxF1A48qt4fVhtRnRQtSxxxhfJWwm1i1IimRHRVWALpBXVt_SgnCwaas_6MGclIiBmkf6agMu',
    location: 'Midtown East, Manhattan',
    year: '2025',
    client: 'Skyline Premium Properties',
    specs: ['Minimal profile face width: 20mm', 'Acoustic glass: Rw = 42dB', 'Power-operated automated doors']
  },
  {
    id: 'proj-2',
    title: 'Tech Hub Corporate Facade',
    category: 'Commercial',
    description: 'High-performance structural silicone glazed curtain wall with high solar-reflectance and integrated LED mullion highlights.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB05zCZshFTIHhXNWzJVZF35ooLgndAOEvkCM6qqJrAWO10GK9NRU1_5KT4oZGslnbOQqMuJt-3Y7VOk6wLcrKiutXPDy5G4UMoV4rcysfU2EyHvQAemeYFfRRXog1WTbHaGCLJRstx6FQiOdoSvmGPQwReQD0UjWwb5eYBvKQhPnJiB4meUI9pqrInoLkmaRPVtlergyJEUp3ONSERxLQUwzQnkYRyVbWOGLCIcEYZLIkTZS63cA6BdiOa2Nw0c0uxNFsNtmguS7eh',
    location: 'Silicon District, New York',
    year: '2024',
    client: 'Apex Innovations Corp',
    specs: ['Double-insulated Low-E argon filled glass', 'Polyamide thermal isolators', 'Certified structural silicone glazing']
  },
  {
    id: 'proj-3',
    title: 'Executive Office Suites',
    category: 'Office',
    description: 'Slimline frameless glass partitions with integrated black anodized glass doors, creating private but light-filled corporate spaces.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe7G6sSH0gMbWZPQBi__TzXDToQQn9mzSRljtzL4SLdSZ_FDXso1iRng3_1Mk6-A4Q3-gtEzSCqnny6v2fLgPThLxukdlaulJjwDOqPc3TuKWkQ_-Im4ddzsDLPRtcNXADnZEcMJ4ia7gjrgfSe_gwS2tUdkAxqdGwBfdrvr-GVxLxehcHW5caD6M2xWQs4w4mdFiyZhWRCu0eabwJ_1k63p5xu4d-vhw_JVoCLJKVpz_zIXaROZd00K3fUU0gRWsMfl54Y7lOu9Bw',
    location: 'Financial Center, NYC',
    year: '2025',
    client: 'Horizon Ventures',
    specs: ['12.76mm laminated safety glass panels', 'Anodized matte-black finish trim', 'Soft-close architectural pivot hinges']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Jennings',
    role: 'CEO',
    company: 'Zenith Media',
    quote: 'The attention to detail in their aluminum partitions is incredible. IROSH transformed our office into a modern, light-filled workspace. Highly recommended!',
    rating: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA5ifb1VYpiFR_3PAh6hbMuxYHUsIW_debs_qDTosoWSD74U_gLPllOUoSlOeVuUTcCLNJ4Y8G5-53e9LLmyfp6TNQr0HyEdxCc-DFmTGrj7ZX_sZCeQ7SxfAArfcDZN_KMKTRLswmxCXcOWydKHiecm04jEnAnViP1j8SFJ2HynozWtIyGKolLNFL-XCvt_JoWZZucRql959vZjL_JbVFxCnm4_Lap2wcm3x8WnNkqmHSFML_n_ZRYQhmg-d_jZdYE7Q41nZGoXyv'
  },
  {
    id: 't-2',
    name: 'David Chen',
    role: 'Lead Architect',
    company: 'Core Designs',
    quote: 'Their curtain wall installation for our flagship store was flawless. The structural integrity and thermal efficiency exceeded our expectations. Truly world-class.',
    rating: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa8iALf12hITzjP1bzE1WFQC2GCXeQi2sNG2nMzdb-EDRU1MzsGL8OWj1KmKpezh8fXkcZYxDYavsB3sGgfuQeJZIgjlim-7-_ZMx23JejawWzGhJs1yhorXvc_OjK4iNUY6wa2TJVA1hydQTXNAE9eD2Ac_CxxH9Bf2N2_jYf1uO38ZyuVFmYUyFziyCn75DHV8HCunw4vj9IAnj2oUgV3GlRZOO3riH5oRNC_sfMK1wy5rsEvH73VvtRh1IF2j0WvkG4sslPEk84'
  },
  {
    id: 't-3',
    name: 'Mark Thompson',
    role: 'Property Developer',
    company: 'Luxe Residential Group',
    quote: 'Quick response, competitive pricing, and impeccable finish. They replaced all the windows in our residential complex with zero hassle.',
    rating: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2GbjA46GWJqYVZEimXqDONTggjzAo9Od9a64feqsLJt_--jxPiMf9Ua318YLDU8WoRx6AbSCPSgLz1p38R5DpPAb5DOIOQ7uPUH9qFbvQ2vf2YWunB5SbBlbvKT1NJmRCy1IMdkNFd-RDXzUgSXozmcqBnRKLDjkXiBYns11KoXtgqB3e4Oh29jHj0VZ8BETF2OYHULWkPM15QrtNP0wfYcIkQ7ZNU-lGRcKi5So_i37HvE5UjT6bBlN0DiZ9I1TNILwn0rr0-P8i'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Consultation',
    description: 'Defining architectural requirements and performing precise on-site spatial measurements.',
    iconName: 'MessageSquareText'
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Design & Plan',
    description: 'Developing custom multi-view CAD blueprints and aiding in premium material and profiling selection.',
    iconName: 'PencilLine'
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Fabrication',
    description: 'Cutting and hand-assembling precision parts utilizing high-grade CNC machinery in our facility.',
    iconName: 'Hammer'
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Installation',
    description: 'Secure on-site positioning, alignment calibration, double-seal insulation, and rigorous quality check.',
    iconName: 'CheckCircle2'
  }
];
