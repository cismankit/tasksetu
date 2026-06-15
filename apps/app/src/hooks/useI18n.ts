import { useMemo } from 'react';
import { generateRecommendations, t, type RecommendationContext } from '@tasksetu/core';
import { useAppStore } from '@/lib/store';
import { getRegionId } from '@/lib/preferences';

export function useI18n() {
  const language = useAppStore((s) => s.preferences.language);
  const locale = language === 'hi' ? 'hi' : 'en';
  const strings = useMemo(() => t(locale), [locale]);
  return { locale, strings };
}

export function useRecommendationContext(): RecommendationContext {
  const preferences = useAppStore((s) => s.preferences);
  const documents = useAppStore((s) => s.documents);
  const tasks = useAppStore((s) => s.tasks);
  const familyMembers = useAppStore((s) => s.familyMembers);

  return useMemo(
    () => ({
      userType: preferences.userType,
      regionId: getRegionId(preferences),
      language: preferences.language === 'hi' ? 'hi' : 'en',
      existingDocumentTypes: documents.map((d) => d.documentTypeId),
      activeTaskTemplateIds: tasks.map((t) => t.templateId).filter(Boolean) as string[],
      completedTaskTemplateIds: tasks
        .filter((t) => t.status === 'completed')
        .map((t) => t.templateId!)
        .filter(Boolean),
      upcomingDeadlines: documents
        .filter((d) => d.expiryDate)
        .map((d) => ({ title: d.name, date: d.expiryDate!, type: 'document_expiry' as const })),
      familyMemberCount: Math.max(1, familyMembers.length),
      hasChildProfile: familyMembers.some((m) => m.relationship === 'child'),
      topCategories: preferences.topCategories,
    }),
    [preferences, documents, tasks, familyMembers],
  );
}

export function useRecommendations() {
  const context = useRecommendationContext();
  return useMemo(() => generateRecommendations(context), [context]);
}
