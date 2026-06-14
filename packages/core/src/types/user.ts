export type UserType =
  | 'student'
  | 'parent'
  | 'shopkeeper'
  | 'farmer'
  | 'gig_worker'
  | 'senior_citizen'
  | 'professional'
  | 'service_provider'
  | 'family_manager';

export type TaskCategory =
  | 'documents'
  | 'government_forms'
  | 'education'
  | 'payments'
  | 'receipts'
  | 'health'
  | 'warranty'
  | 'repair_service'
  | 'family_reminders'
  | 'business_admin';

export type FamilyMode = 'solo' | 'family';

export interface UserPreferences {
  language: string;
  country: string;
  state?: string;
  district?: string;
  userType: UserType;
  familyMode: FamilyMode;
  topCategories: TaskCategory[];
  notificationsEnabled: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  preferences: UserPreferences;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyMember {
  id: string;
  userId: string;
  profileId: string;
  name: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  dateOfBirth?: string;
  userType?: UserType;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const USER_TYPES: UserType[] = [
  'student',
  'parent',
  'shopkeeper',
  'farmer',
  'gig_worker',
  'senior_citizen',
  'professional',
  'service_provider',
  'family_manager',
];

export const TASK_CATEGORIES: TaskCategory[] = [
  'documents',
  'government_forms',
  'education',
  'payments',
  'receipts',
  'health',
  'warranty',
  'repair_service',
  'family_reminders',
  'business_admin',
];
