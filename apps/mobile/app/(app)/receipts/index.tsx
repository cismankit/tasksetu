import { Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { Button } from '@/components/Button';
import { useStore } from '@/hooks/useStore';
import { theme } from '@/lib/theme';

export default function ReceiptsScreen() {
  const router = useRouter();
  const { receipts } = useStore();

  const total = receipts.reduce((sum, r) => sum + r.amount, 0);

  return (
    <Screen>
      <Text style={styles.summary}>
        {receipts.length} receipts · ₹{total.toLocaleString('en-IN')}
      </Text>
      {receipts.length === 0 ? (
        <Text style={styles.empty}>No receipts saved yet.</Text>
      ) : (
        receipts.map((receipt) => (
          <Card key={receipt.id}>
            <CardTitle>{receipt.vendor ?? 'Receipt'}</CardTitle>
            <CardDesc>₹{receipt.amount} · {receipt.category} · {receipt.date}</CardDesc>
          </Card>
        ))
      )}
      <Button title="+ Add receipt" onPress={() => router.push('/(app)/receipts/add')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { fontWeight: '600', marginBottom: theme.spacing.md },
  empty: { color: theme.colors.textMuted, marginBottom: theme.spacing.lg },
});
