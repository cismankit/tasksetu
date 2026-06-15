import type { UserPreferences } from '@tasksetu/core';

export const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'en',
  country: 'IN',
  state: 'MP',
  userType: 'student',
  familyMode: 'solo',
  topCategories: ['education', 'documents'],
  notificationsEnabled: true,
};

export function getRegionId(prefs: UserPreferences): string {
  if (prefs.country === 'IN' && prefs.state === 'MP') return 'in-mp';
  if (prefs.country === 'IN') return 'in';
  return 'global';
}
