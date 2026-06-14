import { useState } from 'react';
import { useRouter } from 'expo-router';
import type { SupportedLocale } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { usePreferences } from '@/hooks/usePreferences';

const LANGUAGES: { id: SupportedLocale; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const { preferences, updatePreferences, strings } = usePreferences();
  const [selected, setSelected] = useState<SupportedLocale>(
    preferences.language === 'hi' ? 'hi' : 'en',
  );

  const handleContinue = async () => {
    await updatePreferences({ language: selected });
    router.push('/onboarding/region');
  };

  return (
    <Screen>
      <SectionHeader title={strings.onboarding.selectLanguage} />
      <ChipRow>
        {LANGUAGES.map((lang) => (
          <SelectChip
            key={lang.id}
            label={lang.label}
            selected={selected === lang.id}
            onPress={() => setSelected(lang.id)}
          />
        ))}
      </ChipRow>
      <Button title={strings.common.continue} onPress={handleContinue} />
    </Screen>
  );
}
