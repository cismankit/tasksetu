import { useState } from 'react';
import { useRouter } from 'expo-router';
import { REGIONS } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { usePreferences } from '@/hooks/usePreferences';

export default function RegionScreen() {
  const router = useRouter();
  const { preferences, updatePreferences, strings } = usePreferences();
  const [regionId, setRegionId] = useState(preferences.state === 'MP' ? 'in-mp' : 'in');

  const handleContinue = async () => {
    const region = REGIONS.find((r) => r.id === regionId);
    await updatePreferences({
      country: region?.countryCode ?? 'IN',
      state: region?.stateCode ?? undefined,
    });
    router.push('/onboarding/user-type');
  };

  return (
    <Screen>
      <SectionHeader
        title={strings.onboarding.selectRegion}
        subtitle="MVP starts with India national + Madhya Pradesh packs."
      />
      <ChipRow>
        {REGIONS.map((region) => (
          <SelectChip
            key={region.id}
            label={region.state ?? region.country}
            selected={regionId === region.id}
            onPress={() => setRegionId(region.id)}
          />
        ))}
      </ChipRow>
      <Button title={strings.common.continue} onPress={handleContinue} />
    </Screen>
  );
}
