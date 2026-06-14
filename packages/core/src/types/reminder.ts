export type ReminderType =
  | 'document_expiry'
  | 'form_deadline'
  | 'payment_due'
  | 'medicine'
  | 'follow_up'
  | 'service_pickup'
  | 'warranty_expiry'
  | 'status_check'
  | 'custom';

export type ReminderStatus = 'scheduled' | 'sent' | 'dismissed' | 'snoozed';

export interface Reminder {
  id: string;
  userId: string;
  title: string;
  type: ReminderType;
  scheduledAt: string;
  status: ReminderStatus;
  relatedTaskId?: string;
  relatedDocumentId?: string;
  relatedStatusTrackerId?: string;
  familyMemberId?: string;
  notes?: string;
  repeatIntervalDays?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReminderSuggestion {
  title: string;
  type: ReminderType;
  suggestedDaysFromNow: number;
  reason: string;
}
