import { useState } from 'react';
import { TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { searchTemplates, createTaskFromTemplate } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { usePreferences } from '@/hooks/usePreferences';
import { useStore, MOCK_USER_ID } from '@/hooks/useStore';
import { theme } from '@/lib/theme';

export default function TasksScreen() {
  const router = useRouter();
  const { preferences, strings } = usePreferences();
  const { addTask } = useStore();
  const [query, setQuery] = useState('');

  const regionId = preferences.state === 'MP' ? 'in-mp' : 'in';
  const templates = searchTemplates({
    regionId,
    userType: preferences.userType,
    query,
  });

  const startTask = async (templateId: string) => {
    const task = createTaskFromTemplate(templateId, MOCK_USER_ID);
    if (!task) return;
    await addTask(task);
    router.push(`/(app)/tasks/${task.id}`);
  };

  return (
    <Screen>
      <TextInput
        style={styles.search}
        placeholder={strings.common.search}
        placeholderTextColor={theme.colors.textMuted}
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.count}>{templates.length} templates for your region</Text>
      {templates.map((tmpl) => (
        <Pressable key={tmpl.id} onPress={() => startTask(tmpl.id)}>
          <Card>
            <CardTitle>{tmpl.title}</CardTitle>
            <CardDesc>{tmpl.description}</CardDesc>
            <Text style={styles.meta}>{tmpl.category.replace('_', ' ')} · {tmpl.estimatedEffort ?? 'medium'} effort</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: 12,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  count: { color: theme.colors.textMuted, marginBottom: theme.spacing.md },
  meta: { fontSize: 12, color: theme.colors.textMuted, marginTop: 6 },
});
