/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenType = 'home' | 'innovation' | 'team' | 'impact';

export type ModalType = 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'grant' 
  | 'safety' 
  | 'iv-simulator' 
  | 'ecg-simulator' 
  | null;

export interface TeamMember {
  name: string;
  role: string;
  badge?: string;
  bio: string;
  imageUrl: string;
  altText: string;
  credentials?: string;
  linkedin?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  badgeIcon: string;
  description: string;
  bulletPoints: string[];
  imageUrl: string;
  specs: ProductSpec[];
}

export interface StrategicGoal {
  title: string;
  description: string;
  icon: string;
  metric?: string;
}

export interface ImpactMilestone {
  phase: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  date: string;
  desc: string;
}

export type InquiryType = 
  | 'clinical_trial' 
  | 'procurement' 
  | 'partnership' 
  | 'investment' 
  | 'general';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: InquiryType;
  message: string;
}

export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType?: string;
  message: string;
  source?: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  mailtoFallbackUrl?: string;
}

export interface CompanyInfo {
  name: string;
  brandName: string;
  email: string;
  phone1: string;
  phone2: string;
  phoneDisplay: string;
  phones: { label: string; number: string; raw: string }[];
  address: string;
  incubation: string;
}
