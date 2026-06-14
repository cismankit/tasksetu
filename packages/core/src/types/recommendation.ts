import type { TaskCategory, UserType } from './user';
import type { DocumentTypeId } from './document';
import type { ReminderSuggestion } from './reminder';

export type RecommendationType =
  | 'next_task'
  | 'missing_document'
  | 'reminder'
  | 'related_workflow'
  | 'document_pack';

export type RecommendationPriority = 'low' | 'medium' | 'high';

export interface Recommendation {
  id: string;
  type: RecommendationType;
  priority: RecommendationPriority;
  title: string;
  description: string;
  actionLabel?: string;
  templateId?: string;
  documentTypeId?: DocumentTypeId;
  reminderSuggestion?: ReminderSuggestion;
  reason: string;
  score: number;
}

export interface RecommendationContext {
  userType: UserType;
  regionId: string;
  language: string;
  existingDocumentTypes: DocumentTypeId[];
  activeTaskTemplateIds: string[];
  upcomingDeadlines: Array<{ title: string; date: string; type: string }>;
  familyMemberCount: number;
  hasChildProfile: boolean;
  completedTaskTemplateIds: string[];
  topCategories: TaskCategory[];
}

export interface RecommendationResult {
  recommendations: Recommendation[];
  generatedAt: string;
}
