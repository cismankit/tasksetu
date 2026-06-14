import type { Reminder, ReminderSuggestion, ReminderType } from '../types/reminder';
import type { TaskTemplate } from '../types/task';

export function createReminder(
  userId: string,
  title: string,
  type: ReminderType,
  scheduledAt: string,
  options?: Partial<Pick<Reminder, 'relatedTaskId' | 'relatedDocumentId' | 'familyMemberId' | 'notes'>>,
): Reminder {
  const now = new Date().toISOString();
  return {
    id: `rem-${Date.now()}`,
    userId,
    title,
    type,
    scheduledAt,
    status: 'scheduled',
    ...options,
    createdAt: now,
    updatedAt: now,
  };
}

export function suggestRemindersFromTemplate(template: TaskTemplate): ReminderSuggestion[] {
  if (!template.reminderScheduleDays?.length) return [];
  return template.reminderScheduleDays.map((days) => ({
    title: `Follow up: ${template.title}`,
    type: 'follow_up' as ReminderType,
    suggestedDaysFromNow: days,
    reason: `Suggested follow-up for ${template.title}`,
  }));
}

export function getUpcomingReminders(reminders: Reminder[], withinDays = 7): Reminder[] {
  const now = Date.now();
  const window = withinDays * 24 * 60 * 60 * 1000;
  return reminders
    .filter((r) => r.status === 'scheduled')
    .filter((r) => {
      const t = new Date(r.scheduledAt).getTime();
      return t >= now && t - now <= window;
    })
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
}

export function snoozeReminder(reminder: Reminder, days: number): Reminder {
  const newDate = new Date(reminder.scheduledAt);
  newDate.setDate(newDate.getDate() + days);
  return {
    ...reminder,
    scheduledAt: newDate.toISOString(),
    status: 'snoozed',
    updatedAt: new Date().toISOString(),
  };
}
