import { Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { Button } from '@/components/Button';
import { useStore } from '@/hooks/useStore';
import { theme } from '@/lib/theme';

export default function StatusTrackerListScreen() {
  const router = useRouter();
  const { statusTrackers } = useStore();

  return (
    <Screen>
      {statusTrackers.length === 0 ? (
        <Text style={styles.empty}>No applications tracked yet.</Text>
      ) : (
        statusTrackers.map((tracker) => (
          <Card key={tracker.id}>
            <CardTitle>{tracker.taskName}</CardTitle>
            <CardDesc>{tracker.currentStatus.replace('_', ' ')}</CardDesc>
            {tracker.referenceNumber ? <CardDesc>Ref: {tracker.referenceNumber}</CardDesc> : null}
            {tracker.nextFollowUpAt ? (
              <CardDesc>Follow up: {new Date(tracker.nextFollowUpAt).toLocaleDateString()}</CardDesc>
            ) : null}
          </Card>
        ))
      )}
      <Button title="+ Add status tracker" onPress={() => router.push('/(app)/status/add')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { color: theme.colors.textMuted, marginBottom: theme.spacing.lg },
});
