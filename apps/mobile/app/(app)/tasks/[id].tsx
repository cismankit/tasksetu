import { Text, Pressable, StyleSheet, Share } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { completeTaskStep, getTaskProgress, buildWhatsAppShareMessage, getTemplateById } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Card, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { useStore } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';
import { theme } from '@/lib/theme';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTask, updateTask } = useStore();
  const { strings } = usePreferences();
  const task = getTask(id);

  if (!task) {
    return (
      <Screen>
        <Text style={styles.empty}>Task not found.</Text>
      </Screen>
    );
  }

  const progress = getTaskProgress(task);
  const template = task.templateId ? getTemplateById(task.templateId) : undefined;

  const toggleStep = async (stepId: string) => {
    const updated = completeTaskStep(task, stepId);
    await updateTask(updated);
  };

  const shareChecklist = async () => {
    const message = buildWhatsAppShareMessage(task, template);
    await Share.share({ message });
  };

  return (
    <Screen>
      <Text style={styles.progress}>{progress.completed}/{progress.total} steps · {progress.percent}%</Text>
      {task.steps.map((step) => (
        <Pressable key={step.id} onPress={() => toggleStep(step.id)}>
          <Card style={step.completed ? styles.done : undefined}>
            <CardTitle>{step.completed ? '✓ ' : ''}{step.title}</CardTitle>
            {step.description ? <Text style={styles.desc}>{step.description}</Text> : null}
          </Card>
        </Pressable>
      ))}
      {template?.officialLink ? (
        <Text style={styles.link}>Official: {template.officialLink}</Text>
      ) : null}
      <Button title={strings.common.share} onPress={shareChecklist} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { color: theme.colors.textMuted },
  progress: { fontWeight: '600', marginBottom: theme.spacing.md },
  desc: { fontSize: 14, color: theme.colors.textMuted, marginTop: 4 },
  done: { opacity: 0.7, backgroundColor: '#F0FDF4' },
  link: { fontSize: 13, color: theme.colors.primary, marginVertical: theme.spacing.md },
});
