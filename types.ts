
// Fix: Added React import to resolve the 'React' namespace for ReactNode
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Reference {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  buildingType: string;
  area: number;
  frequency: string;
  message: string;
}