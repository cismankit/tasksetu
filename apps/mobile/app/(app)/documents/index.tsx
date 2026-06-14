import { Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { DOCUMENT_TYPES } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { Button } from '@/components/Button';
import { useStore } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';
import { theme } from '@/lib/theme';

export default function DocumentVaultScreen() {
  const router = useRouter();
  const { documents } = useStore();
  const { strings } = usePreferences();

  const getDocLabel = (typeId: string) => {
    const key = DOCUMENT_TYPES.find((d) => d.id === typeId)?.labelKey;
    if (!key) return typeId;
    const section = key.split('.')[0] as 'doc';
    const field = key.split('.')[1];
    return (strings[section] as Record<string, string>)[field] ?? typeId;
  };

  return (
    <Screen>
      <Text style={styles.summary}>{documents.length} documents stored locally</Text>
      {documents.length === 0 ? (
        <Text style={styles.empty}>Your vault is empty. Add your first document.</Text>
      ) : (
        documents.map((doc) => (
          <Pressable key={doc.id} onPress={() => router.push(`/(app)/documents/${doc.id}`)}>
            <Card>
              <CardTitle>{doc.name}</CardTitle>
              <CardDesc>{getDocLabel(doc.documentTypeId)}</CardDesc>
              {doc.expiryDate ? <CardDesc>Expires: {doc.expiryDate}</CardDesc> : null}
            </Card>
          </Pressable>
        ))
      )}
      <Button title="+ Add document" onPress={() => router.push('/(app)/documents/add')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { color: theme.colors.textMuted, marginBottom: theme.spacing.md },
  empty: { color: theme.colors.textMuted, marginBottom: theme.spacing.lg },
});
