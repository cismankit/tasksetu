import { Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { usePreferences } from '@/hooks/usePreferences';
import { theme } from '@/lib/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { strings } = usePreferences();

  return (
    <Screen>
      <SectionHeader
        title={strings.onboarding.welcome}
        subtitle={strings.app.tagline}
      />
      <Text style={styles.body}>
        Organize documents, follow regional checklists, set reminders, and track applications — all in one calm place.
      </Text>
      <Button
        title={strings.common.continue}
        onPress={() => router.push('/onboarding/language')}
        style={styles.cta}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: 16, color: theme.colors.textMuted, lineHeight: 24, marginBottom: theme.spacing.xl },
  cta: { marginTop: theme.spacing.md },
});
