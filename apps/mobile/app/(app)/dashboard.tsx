import { Text, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { generateRecommendations } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Card, CardTitle, CardDesc } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { usePreferences } from '@/hooks/usePreferences';
import { useStore } from '@/hooks/useStore';
import { theme } from '@/lib/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { preferences, strings } = usePreferences();
  const { tasks, reminders, familyMembers, documents } = useStore();

  const regionId = preferences.state === 'MP' ? 'in-mp' : 'in';
  const pendingTasks = tasks.filter((t) => t.status !== 'completed');
  const upcomingReminders = reminders
    .filter((r) => r.status === 'scheduled')
    .slice(0, 3);

  const recommendations = generateRecommendations({
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

  const quickLinks = [
    { label: 'Tasks', href: '/(app)/tasks' },
    { label: 'Documents', href: '/(app)/documents' },
    { label: 'Receipts', href: '/(app)/receipts' },
    { label: 'Status', href: '/(app)/status' },
    { label: 'Settings', href: '/(app)/settings' },
  ] as const;

  return (
    <Screen>
      <SectionHeader title={strings.app.name} subtitle={strings.app.tagline} />

      <Pressable style={styles.cta} onPress={() => router.push('/(app)/tasks')}>
        <Text style={styles.ctaText}>{strings.dashboard.quickAction}</Text>
        <Text style={styles.ctaHint}>Browse regional checklists →</Text>
      </Pressable>

      <Text style={styles.section}>{strings.dashboard.pendingTasks}</Text>
      {pendingTasks.length === 0 ? (
        <Text style={styles.empty}>No active tasks yet. Start a checklist below.</Text>
      ) : (
        pendingTasks.slice(0, 3).map((task) => (
          <Pressable key={task.id} onPress={() => router.push(`/(app)/tasks/${task.id}`)}>
            <Card>
              <CardTitle>{task.title}</CardTitle>
              <CardDesc>{task.status.replace('_', ' ')}</CardDesc>
            </Card>
          </Pressable>
        ))
      )}

      <Text style={styles.section}>{strings.dashboard.upcomingReminders}</Text>
      {upcomingReminders.length === 0 ? (
        <Text style={styles.empty}>No reminders scheduled.</Text>
      ) : (
        upcomingReminders.map((rem) => (
          <Card key={rem.id}>
            <CardTitle>{rem.title}</CardTitle>
            <CardDesc>{new Date(rem.scheduledAt).toLocaleDateString()}</CardDesc>
          </Card>
        ))
      )}

      <View style={styles.rowBetween}>
        <Text style={styles.section}>{strings.dashboard.recommendations}</Text>
        <Pressable onPress={() => router.push('/(app)/recommendations')}>
          <Text style={styles.link}>See all</Text>
        </Pressable>
      </View>
      {recommendations.recommendations.slice(0, 2).map((rec) => (
        <Card key={rec.id}>
          <CardTitle>{rec.title}</CardTitle>
          <CardDesc>{rec.description}</CardDesc>
        </Card>
      ))}

      {familyMembers.length > 0 && (
        <>
          <Text style={styles.section}>Family</Text>
          {familyMembers.map((member) => (
            <Card key={member.id}>
              <CardTitle>{member.name}</CardTitle>
              <CardDesc>{member.relationship}</CardDesc>
            </Card>
          ))}
        </>
      )}

      <Pressable onPress={() => router.push('/(app)/family/add')}>
        <Text style={styles.link}>+ Add family member</Text>
      </Pressable>

      <View style={styles.navRow}>
        {quickLinks.map((link) => (
          <Pressable key={link.href} style={styles.navChip} onPress={() => router.push(link.href)}>
            <Text style={styles.navText}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cta: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
  },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  ctaHint: { color: '#DBEAFE', fontSize: 14, marginTop: 4 },
  section: { fontSize: 18, fontWeight: '600', marginTop: theme.spacing.md, marginBottom: theme.spacing.sm },
  empty: { color: theme.colors.textMuted, marginBottom: theme.spacing.sm },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  link: { color: theme.colors.primary, fontWeight: '600', marginVertical: theme.spacing.sm },
  navRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: theme.spacing.lg },
  navChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  navText: { fontSize: 13, color: theme.colors.text },
});
