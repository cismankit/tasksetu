import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Activity, Plus } from 'lucide-react';
import type { StatusTrackerState } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore, useUserId } from '@/lib/store';

const schema = z.object({
  taskName: z.string().min(1),
  referenceNumber: z.string().optional(),
  currentStatus: z.string(),
  portalLink: z.string().url().optional().or(z.literal('')),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const STATUS_OPTIONS: { value: StatusTrackerState; label: string }[] = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under review' },
  { value: 'pending_documents', label: 'Pending documents' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'on_hold', label: 'On hold' },
  { value: 'completed', label: 'Completed' },
];

export function StatusPage() {
  const userId = useUserId();
  const statusTrackers = useAppStore((s) => s.statusTrackers);
  const addStatusTracker = useAppStore((s) => s.addStatusTracker);
  const updateStatusTracker = useAppStore((s) => s.updateStatusTracker);
  const deleteStatusTracker = useAppStore((s) => s.deleteStatusTracker);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { currentStatus: 'submitted' },
  });

  const onSubmit = (data: FormData) => {
    addStatusTracker({
      userId,
      taskName: data.taskName,
      referenceNumber: data.referenceNumber,
      currentStatus: data.currentStatus as StatusTrackerState,
      portalLink: data.portalLink || undefined,
      notes: data.notes,
      attachmentIds: [],
      lastCheckedAt: new Date().toISOString(),
    });
    reset();
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader
        title="Status tracker"
        subtitle="Manually track applications and follow-ups — no portal scraping"
        actions={
          <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Add status
          </button>
        }
      />

      {showForm && (
        <div className="ts-modal__overlay" onClick={() => setShowForm(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal__header">
              <span className="ts-modal__title">Track application status</span>
              <button type="button" className="ts-iconbtn" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ts-modal__body form-grid">
                <div className="ts-field">
                  <label className="ts-label">Application name</label>
                  <input
                    className={`ts-input${errors.taskName ? ' ts-input--invalid' : ''}`}
                    {...register('taskName')}
                  />
                </div>
                <div className="ts-field">
                  <label className="ts-label">Reference number</label>
                  <input className="ts-input" {...register('referenceNumber')} />
                </div>
                <div className="ts-field">
                  <label className="ts-label">Status</label>
                  <select className="ts-select" {...register('currentStatus')}>
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ts-field">
                  <label className="ts-label">Portal link</label>
                  <input className="ts-input" placeholder="https://…" {...register('portalLink')} />
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

      {statusTrackers.length === 0 ? (
        <EmptyState
          icon={<Activity size={24} />}
          title="Nothing to track yet"
          description="Add an application or service request to monitor its status manually."
          actionLabel="Add status"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="list-stack">
          {statusTrackers.map((st) => (
            <div key={st.id} className="ts-card ts-card--pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                <div>
                  <strong>{st.taskName}</strong>
                  {st.referenceNumber && (
                    <div className="list-item__meta">Ref: {st.referenceNumber}</div>
                  )}
                  <span className="ts-badge ts-badge--primary" style={{ marginTop: 8 }}>
                    {st.currentStatus.replace('_', ' ')}
                  </span>
                  {st.portalLink && (
                    <p style={{ marginTop: 8 }}>
                      <a href={st.portalLink} target="_blank" rel="noreferrer">
                        Open portal →
                      </a>
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <select
                    className="ts-select ts-btn--sm"
                    value={st.currentStatus}
                    onChange={(e) =>
                      updateStatusTracker({
                        ...st,
                        currentStatus: e.target.value as StatusTrackerState,
                        lastCheckedAt: new Date().toISOString(),
                      })
                    }
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="ts-btn ts-btn--ghost ts-btn--sm"
                    onClick={() => deleteStatusTracker(st.id)}
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
