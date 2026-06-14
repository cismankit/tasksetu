import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { SupportedLocale, UserPreferences } from '@tasksetu/core';
import { t } from '@tasksetu/core';
import {
  DEFAULT_PREFERENCES,
  getLocaleFromPreferences,
  loadPreferences,
  savePreferences,
} from '@/lib/preferences';

interface PreferencesContextValue {
  preferences: UserPreferences;
  locale: SupportedLocale;
  strings: ReturnType<typeof t>;
  loading: boolean;
  updatePreferences: (partial: Partial<UserPreferences>) => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences().then((prefs) => {
      if (prefs) setPreferences(prefs);
      setLoading(false);
    });
  }, []);

  const locale = getLocaleFromPreferences(preferences);
  const strings = useMemo(() => t(locale), [locale]);

  const updatePreferences = useCallback(async (partial: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...partial };
      void savePreferences(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ preferences, locale, strings, loading, updatePreferences }),
    [preferences, locale, strings, loading, updatePreferences],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
}
