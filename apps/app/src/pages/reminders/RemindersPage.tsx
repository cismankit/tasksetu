import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bell, Plus } from 'lucide-react';
import type { ReminderType } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore, useUserId } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.string(),
  scheduledAt: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function RemindersPage() {
  const userId = useUserId();
  const { strings } = useI18n();
  const reminders = useAppStore((s) => s.reminders);
  const addReminder = useAppStore((s) => s.addReminder);
  const updateReminder = useAppStore((s) => s.updateReminder);
  const deleteReminder = useAppStore((s) => s.deleteReminder);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'custom' },
  });

  const sorted = [...reminders].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  );

  const onSubmit = (data: FormData) => {
    addReminder({
      userId,
      title: data.title,
      type: data.type as ReminderType,
      scheduledAt: new Date(data.scheduledAt).toISOString(),
      status: 'scheduled',
      notes: data.notes,
    });
    reset();
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader
        title="Reminders"
        subtitle={strings.dashboard.upcomingReminders}
        actions={
          <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Add reminder
          </button>
        }
      />

      {showForm && (
        <div className="ts-modal__overlay" onClick={() => setShowForm(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal__header">
              <span className="ts-modal__title">Add reminder</span>
              <button type="button" className="ts-iconbtn" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ts-modal__body form-grid">
                <div className="ts-field">
                  <label className="ts-label">Title</label>
                  <input className={`ts-input${errors.title ? ' ts-input--invalid' : ''}`} {...register('title')} />
                  {errors.title && <span className="ts-error">{errors.title.message}</span>}
                </div>
                <div className="ts-field">
                  <label className="ts-label">Type</label>
                  <select className="ts-select" {...register('type')}>
                    <option value="custom">Custom</option>
                    <option value="document_expiry">Document expiry</option>
                    <option value="follow_up">Follow up</option>
                    <option value="payment_due">Payment due</option>
                    <option value="form_deadline">Form deadline</option>
                  </select>
                </div>
                <div className="ts-field">
                  <label className="ts-label">When</label>
                  <input
                    type="datetime-local"
                    className={`ts-input${errors.scheduledAt ? ' ts-input--invalid' : ''}`}
                    {...register('scheduledAt')}
                  />
                </div>
                <div className="ts-field">
                  <label className="ts-label">Notes</label>
                  <textarea className="ts-textarea" {...register('notes')} />
                </div>
              </div>
              <div className="ts-modal__footer">
                <button type="button" className="ts-btn ts-btn--ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn--primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {sorted.length === 0 ? (
        <EmptyState
          icon={<Bell size={24} />}
          title="No reminders"
          description="Set reminders for document renewals, follow-ups, and deadlines."
          actionLabel="Add reminder"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="list-stack">
          {sorted.map((rem) => (
            <div key={rem.id} className="ts-card ts-card--pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <strong>{rem.title}</strong>
                  <div className="list-item__meta">
                    {new Date(rem.scheduledAt).toLocaleString()} · {rem.type.replace('_', ' ')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {rem.status === 'scheduled' && (
                    <button
                      type="button"
                      className="ts-btn ts-btn--soft ts-btn--sm"
                      onClick={() => updateReminder({ ...rem, status: 'dismissed' })}
                    >
                      Done
                    </button>
                  )}
                  <button
                    type="button"
                    className="ts-btn ts-btn--ghost ts-btn--sm"
                    onClick={() => deleteReminder(rem.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
