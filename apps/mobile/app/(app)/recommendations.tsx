import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { generateRecommendations } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { usePreferences } from '@/hooks/usePreferences';
import { useStore } from '@/hooks/useStore';
import { theme } from '@/lib/theme';

export default function RecommendationsScreen() {
  const router = useRouter();
  const { preferences, strings } = usePreferences();
  const { documents, tasks, familyMembers } = useStore();

  const regionId = preferences.state === 'MP' ? 'in-mp' : 'in';
  const result = generateRecommendations({
    userType: preferences.userType,
    regionId,
    language: preferences.language === 'hi' ? 'hi' : 'en',
    existingDocumentTypes: documents.map((d) => d.documentTypeId),
    activeTaskTemplateIds: tasks.map((t) => t.templateId).filter(Boolean) as string[],
    upcomingDeadlines: documents
      .filter((d) => d.expiryDate)
      .map((d) => ({ title: d.name, date: d.expiryDate!, type: 'document_expiry' })),
    familyMemberCount: Math.max(1, familyMembers.length),
    hasChildProfile: familyMembers.some((m) => m.relationship === 'child'),
    completedTaskTemplateIds: tasks.filter((t) => t.status === 'completed').map((t) => t.templateId!).filter(Boolean),
    topCategories: preferences.topCategories,
  });

  const handleAction = (rec: (typeof result.recommendations)[0]) => {
    if (rec.templateId) {
      router.push('/(app)/tasks');
    } else if (rec.documentTypeId) {
      router.push('/(app)/documents/add');
    } else {
      router.push('/(app)/reminders/add');
    }
  };

  return (
    <Screen>
      <SectionHeader title={strings.dashboard.recommendations} subtitle="Rule-based suggestions — not a chatbot." />
      {result.recommendations.length === 0 ? (
        <Text style={styles.empty}>No recommendations right now. Add documents or start a task.</Text>
      ) : (
        result.recommendations.map((rec) => (
          <Pressable key={rec.id} onPress={() => handleAction(rec)}>
            <Card>
              <CardTitle>{rec.title}</CardTitle>
              <CardDesc>{rec.description}</CardDesc>
              <Text style={styles.action}>{rec.actionLabel} →</Text>
            </Card>
          </Pressable>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { color: theme.colors.textMuted },
  action: { color: theme.colors.primary, fontWeight: '600', marginTop: 8, fontSize: 14 },
});
