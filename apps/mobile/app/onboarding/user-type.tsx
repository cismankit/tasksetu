import { useState } from 'react';
import { useRouter } from 'expo-router';
import { USER_TYPES, type UserType } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { usePreferences } from '@/hooks/usePreferences';
import { setOnboardingComplete } from '@/lib/preferences';

const USER_TYPE_LABELS: Record<UserType, string> = {
  student: 'Student',
  parent: 'Parent',
  shopkeeper: 'Shopkeeper',
  farmer: 'Farmer',
  gig_worker: 'Gig worker',
  senior_citizen: 'Senior',
  professional: 'Professional',
  service_provider: 'Service provider',
  family_manager: 'Family manager',
};

export default function UserTypeScreen() {
  const router = useRouter();
  const { preferences, updatePreferences, strings } = usePreferences();
  const [userType, setUserType] = useState<UserType>(preferences.userType);

  const handleFinish = async () => {
    await updatePreferences({ userType });
    await setOnboardingComplete(true);
    router.replace('/(app)/dashboard');
  };

  return (
    <Screen>
      <SectionHeader title={strings.onboarding.selectUserType} />
      <ChipRow>
        {USER_TYPES.map((type) => (
          <SelectChip
            key={type}
            label={USER_TYPE_LABELS[type]}
            selected={userType === type}
            onPress={() => setUserType(type)}
          />
        ))}
      </ChipRow>
      <Button title={strings.common.done} onPress={handleFinish} />
    </Screen>
  );
}
