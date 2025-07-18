import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    category: 'Professional',
    description: 'Clean, ATS-friendly design with modern color accents',
    color: 'bg-gradient-to-br from-blue-600 to-blue-800',
    preview: '/templates/modern-professional.jpg',
    usageCount: 8547,
    atsScore: 95,
    colorScheme: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      background: '#ffffff'
    }
  },
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    category: 'Executive',
    description: 'Sophisticated design for senior-level positions',
    color: 'bg-gradient-to-br from-gray-800 to-gray-900',
    preview: '/templates/executive-elite.jpg',
    usageCount: 6234,
    atsScore: 92,
    colorScheme: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#6b7280',
      text: '#111827',
      background: '#ffffff'
    }
  },
  {
    id: 'creative-vibrant',
    name: 'Creative Vibrant',
    category: 'Creative',
    description: 'Bold and colorful design for creative professionals',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    preview: '/templates/creative-vibrant.jpg',
    usageCount: 5892,
    atsScore: 88,
    colorScheme: {
      primary: '#9333ea',
      secondary: '#7c3aed',
      accent: '#a855f7',
      text: '#1f2937',
      background: '#ffffff'
    }
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    category: 'Technology',
    description: 'Modern tech-focused design with clean lines',
    color: 'bg-gradient-to-br from-emerald-600 to-teal-600',
    preview: '/templates/tech-innovator.jpg',
    usageCount: 7123,
    atsScore: 94,
    colorScheme: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      text: '#1f2937',
      background: '#ffffff'
    }
  },
  {
    id: 'minimalist-elegant',
    name: 'Minimalist Elegant',
    category: 'Minimalist',
    description: 'Clean, minimal design with subtle color touches',
    color: 'bg-gradient-to-br from-slate-600 to-slate-800',
    preview: '/templates/minimalist-elegant.jpg',
    usageCount: 4567,
    atsScore: 97,
    colorScheme: {
      primary: '#475569',
      secondary: '#334155',
      accent: '#64748b',
      text: '#1e293b',
      background: '#ffffff'
    }
  },
  {
    id: 'business-professional',
    name: 'Business Professional',
    category: 'Business',
    description: 'Traditional business format with modern touches',
    color: 'bg-gradient-to-br from-indigo-600 to-purple-600',
    preview: '/templates/business-professional.jpg',
    usageCount: 6789,
    atsScore: 93,
    colorScheme: {
      primary: '#4f46e5',
      secondary: '#4338ca',
      accent: '#6366f1',
      text: '#1f2937',
      background: '#ffffff'
    }
  },
  {
    id: 'healthcare-specialist',
    name: 'Healthcare Specialist',
    category: 'Healthcare',
    description: 'Professional design tailored for healthcare roles',
    color: 'bg-gradient-to-br from-red-500 to-pink-500',
    preview: '/templates/healthcare-specialist.jpg',
    usageCount: 3456,
    atsScore: 91,
    colorScheme: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#ef4444',
      text: '#1f2937',
      background: '#ffffff'
    }
  },
  {
    id: 'academic-scholar',
    name: 'Academic Scholar',
    category: 'Academic',
    description: 'Scholarly design for academic and research positions',
    color: 'bg-gradient-to-br from-amber-600 to-orange-600',
    preview: '/templates/academic-scholar.jpg',
    usageCount: 2890,
    atsScore: 89,
    colorScheme: {
      primary: '#d97706',
      secondary: '#b45309',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff'
    }
  },
  {
    id: 'sales-dynamo',
    name: 'Sales Dynamo',
    category: 'Sales',
    description: 'Dynamic design that showcases results and achievements',
    color: 'bg-gradient-to-br from-green-600 to-emerald-600',
    preview: '/templates/sales-dynamo.jpg',
    usageCount: 4123,
    atsScore: 90,
    colorScheme: {
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#22c55e',
      text: '#1f2937',
      background: '#ffffff'
    }
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder',
    category: 'Startup',
    description: 'Innovative design for entrepreneurs and startup roles',
    color: 'bg-gradient-to-br from-violet-600 to-purple-600',
    preview: '/templates/startup-founder.jpg',
    usageCount: 3789,
    atsScore: 87,
    colorScheme: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#8b5cf6',
      text: '#1f2937',
      background: '#ffffff'
    }
  }
];

export const templateCategories = [
  'All',
  'Professional',
  'Executive',
  'Creative',
  'Technology',
  'Business',
  'Healthcare',
  'Academic',
  'Sales',
  'Startup'
];