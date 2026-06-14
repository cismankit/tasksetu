import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupportedLocale, UserPreferences } from '@tasksetu/core';

const PREFS_KEY = '@tasksetu/preferences';
const ONBOARDING_KEY = '@tasksetu/onboarding_complete';

export const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'en',
  country: 'IN',
  state: 'MP',
  userType: 'student',
  familyMode: 'solo',
  topCategories: ['education', 'documents'],
  notificationsEnabled: true,
};

export async function loadPreferences(): Promise<UserPreferences | null> {
  const raw = await AsyncStorage.getItem(PREFS_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as UserPreferences;
}

export async function savePreferences(prefs: UserPreferences): Promise<void> {
  await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export async function isOnboardingComplete(): Promise<boolean> {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === 'true';
}

export async function setOnboardingComplete(completed = true): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_KEY, completed ? 'true' : 'false');
}

export function getLocaleFromPreferences(prefs: UserPreferences): SupportedLocale {
  return prefs.language === 'hi' ? 'hi' : 'en';
}
