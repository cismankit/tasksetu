import type { TaskCategory, UserType } from './user';

export type TaskStatus =
  | 'not_started'
  | 'in_progress'
  | 'waiting'
  | 'completed'
  | 'cancelled';

export type EffortLevel = 'low' | 'medium' | 'high';

export interface TaskStep {
  id: string;
  order: number;
  title: string;
  description?: string;
  isOptional: boolean;
}

export interface TaskTemplate {
  id: string;
  country: string;
  state?: string;
  district?: string;
  language: string;
  category: TaskCategory;
  title: string;
  description: string;
  requiredDocuments: string[];
  steps: TaskStep[];
  officialLink?: string;
  warningNotes?: string[];
  estimatedEffort: EffortLevel;
  reminderScheduleDays?: number[];
  supportedUserTypes: UserType[];
  tags: string[];
}

export interface UserTask {
  id: string;
  userId: string;
  templateId?: string;
  familyMemberId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  category: TaskCategory;
  steps: Array<TaskStep & { completed: boolean; completedAt?: string }>;
  requiredDocuments: string[];
  notes?: string;
  officialLink?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskSearchQuery {
  query?: string;
  category?: TaskCategory;
  userType?: UserType;
  regionId?: string;
  language?: string;
}
