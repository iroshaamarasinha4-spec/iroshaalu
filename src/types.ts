/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  iconName: string; // Name of Lucide icon
  description: string;
  longDescription: string;
  features: string[];
  specifications: string[];
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Office';
  description: string;
  imageUrl: string;
  location: string;
  year: string;
  client: string;
  specs: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  imageUrl: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  timestamp: string;
  status: 'Received' | 'In Review' | 'Scheduled';
  estimateDetails?: {
    width: number;
    height: number;
    serviceType: string;
    glassType: string;
    profileFinish: string;
    estimatedPrice: number;
  };
}
