/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  DoorClosed, 
  Grid, 
  LayoutGrid, 
  Building2, 
  MessageSquareText, 
  PencilLine, 
  Hammer, 
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUp,
  X,
  Star,
  Check,
  Briefcase,
  Sliders,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  Calculator,
  Eye,
  History,
  Info
} from 'lucide-react';

const iconMap = {
  DoorClosed,
  Window: Grid,
  LayoutGrid,
  Building2,
  MessageSquareText,
  PencilLine,
  Hammer,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUp,
  X,
  Star,
  Check,
  Briefcase,
  Sliders,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  Calculator,
  Eye,
  History,
  Info
};

export type IconType = keyof typeof iconMap;

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className, size = 24 }: DynamicIconProps) {
  const IconComponent = iconMap[name as IconType];
  if (!IconComponent) {
    // Fallback to Info icon if not found
    return <Info className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
