import { Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { REGIONS } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { usePreferences } from '@/hooks/usePreferences';
import { setOnboardingComplete } from '@/lib/preferences';
import { isSupabaseConfigured } from '@/lib/config';
import { theme } from '@/lib/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { preferences, strings, locale } = usePreferences();

  const region = REGIONS.find(
    (r) => r.countryCode === preferences.country && r.stateCode === preferences.state,
  ) ?? REGIONS[0];

  const resetOnboarding = () => {
    Alert.alert('Reset onboarding?', 'You will go through setup again.', [
      { text: strings.common.cancel, style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await setOnboardingComplete(false);
          router.replace('/onboarding/welcome');
        },
      },
    ]);
  };

  return (
    <Screen>
      <Card>
        <CardTitle>Language</CardTitle>
        <CardDesc>{locale === 'hi' ? 'हिंदी' : 'English'}</CardDesc>
      </Card>
      <Card>
        <CardTitle>Region</CardTitle>
        <CardDesc>{region.state ?? region.country}</CardDesc>
      </Card>
      <Card>
        <CardTitle>User type</CardTitle>
        <CardDesc>{preferences.userType.replace('_', ' ')}</CardDesc>
      </Card>
      <Card>
        <CardTitle>Cloud sync</CardTitle>
        <CardDesc>
          {isSupabaseConfigured()
            ? 'Supabase configured — sync ready for Phase 7'
            : 'Local only — add EXPO_PUBLIC_SUPABASE_* keys to enable sync'}
        </CardDesc>
      </Card>
      <Text style={styles.section}>Quick links</Text>
      <Button title="Add reminder" onPress={() => router.push('/(app)/reminders/add')} variant="ghost" />
      <Button title="Document vault" onPress={() => router.push('/(app)/documents')} variant="ghost" style={styles.btn} />
      <Button title="Reset onboarding" onPress={resetOnboarding} variant="ghost" style={styles.btn} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { fontSize: 16, fontWeight: '600', marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },
  btn: { marginTop: theme.spacing.sm },
});
