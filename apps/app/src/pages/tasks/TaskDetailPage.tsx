import { Link, useParams } from 'react-router-dom';
import { Check, Share2 } from 'lucide-react';
import { buildWhatsAppShareMessage, completeTaskStep, getTaskProgress, getTemplateById } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';

export function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { strings } = useI18n();
  const tasks = useAppStore((s) => s.tasks);
  const updateTask = useAppStore((s) => s.updateTask);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div>
        <PageHeader title="Task not found" />
        <Link to="/tasks" className="ts-btn ts-btn--ghost">
          Back to tasks
        </Link>
      </div>
    );
  }

  const template = task.templateId ? getTemplateById(task.templateId) : undefined;
  const progress = getTaskProgress(task);

  const toggleStep = (stepId: string) => {
    const step = task.steps.find((s) => s.id === stepId);
    if (!step || step.completed) return;
    updateTask(completeTaskStep(task, stepId));
  };

  const share = async () => {
    const message = buildWhatsAppShareMessage(task, template);
    if (navigator.share) {
      await navigator.share({ title: task.title, text: message });
    } else {
      await navigator.clipboard.writeText(message);
    }
  };

  return (
    <div>
      <PageHeader
        title={task.title}
        subtitle={task.description}
        actions={
          <button type="button" className="ts-btn ts-btn--ghost ts-btn--sm" onClick={share}>
            <Share2 size={16} /> {strings.common.share}
          </button>
        }
      />

      <div className="ts-card ts-card--pad" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span className="ts-badge ts-badge--primary">{task.status.replace('_', ' ')}</span>
          <span style={{ fontSize: 14, color: 'var(--ts-text-muted)' }}>
            {progress.completed}/{progress.total} steps
          </span>
        </div>
        <div className="ts-progress">
          <div
            className={`ts-progress__bar${progress.percent === 100 ? ' ts-progress__bar--success' : ''}`}
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      {task.requiredDocuments.length > 0 && (
        <>
          <h2 className="section-title">Required documents</h2>
          <div className="chip-grid" style={{ marginBottom: 20 }}>
            {task.requiredDocuments.map((doc) => (
              <span key={doc} className="ts-badge ts-badge--neutral">
                {doc.replace('_', ' ')}
              </span>
            ))}
          </div>
        </>
      )}

      <h2 className="section-title">Checklist</h2>
      <div className="list-stack">
        {task.steps.map((step) => (
          <label key={step.id} className="ts-card ts-card--pad ts-checkbox">
            <input
              type="checkbox"
              checked={step.completed}
              onChange={() => toggleStep(step.id)}
              disabled={step.completed}
            />
            <span className="ts-checkbox__box">
              <Check size={14} />
            </span>
            <span style={{ flex: 1 }}>
              <strong style={{ display: 'block' }}>{step.title}</strong>
              {step.description && (
                <span style={{ fontSize: 13, color: 'var(--ts-text-muted)' }}>{step.description}</span>
              )}
            </span>
          </label>
        ))}
      </div>

      {template?.officialLink && (
        <p style={{ marginTop: 20 }}>
          <a href={template.officialLink} target="_blank" rel="noreferrer">
            Official link →
          </a>
        </p>
      )}
    </div>
  );
}
