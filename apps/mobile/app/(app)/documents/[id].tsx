import { Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { DOCUMENT_TYPES } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { useStore } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';
import { theme } from '@/lib/theme';

export default function DocumentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getDocument } = useStore();
  const { strings } = usePreferences();
  const doc = getDocument(id);

  if (!doc) {
    return (
      <Screen>
        <Text style={styles.empty}>Document not found.</Text>
      </Screen>
    );
  }

  const typeLabel =
    (strings.doc as Record<string, string>)[doc.documentTypeId] ??
    DOCUMENT_TYPES.find((d) => d.id === doc.documentTypeId)?.id;

  return (
    <Screen>
      <Card>
        <CardTitle>{doc.name}</CardTitle>
        <CardDesc>Type: {typeLabel}</CardDesc>
        {doc.expiryDate ? <CardDesc>Expires: {doc.expiryDate}</CardDesc> : null}
        {doc.notes ? <CardDesc>{doc.notes}</CardDesc> : null}
        <Text style={styles.meta}>Added {new Date(doc.createdAt).toLocaleDateString()}</Text>
      </Card>
      <Text style={styles.note}>
        Cloud sync via Supabase Storage will attach files here when configured.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { color: theme.colors.textMuted },
  meta: { fontSize: 12, color: theme.colors.textMuted, marginTop: 8 },
  note: { fontSize: 13, color: theme.colors.textMuted, marginTop: theme.spacing.lg },
});
