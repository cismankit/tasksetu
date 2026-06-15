import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { createTaskFromTemplate } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore, useUserId } from '@/lib/store';
import { useI18n, useRecommendations } from '@/hooks/useI18n';

export function RecommendationsPage() {
  const navigate = useNavigate();
  const userId = useUserId();
  const { strings } = useI18n();
  const addTask = useAppStore((s) => s.addTask);
  const addDocument = useAppStore((s) => s.addDocument);
  const { recommendations, generatedAt } = useRecommendations();

  const handleAction = (rec: (typeof recommendations)[0]) => {
    if (rec.templateId) {
      const task = createTaskFromTemplate(rec.templateId, userId);
      if (task) {
        addTask(task);
        navigate(`/tasks/${task.id}`);
      }
    } else if (rec.documentTypeId) {
      addDocument({
        userId,
        name: rec.title,
        documentTypeId: rec.documentTypeId,
        tags: [],
      });
      navigate('/documents');
    } else if (rec.reminderSuggestion) {
      navigate('/reminders');
    }
  };

  return (
    <div>
      <PageHeader
        title={strings.dashboard.recommendations}
        subtitle={`Rule-based suggestions · updated ${new Date(generatedAt).toLocaleString()}`}
      />

      {recommendations.length === 0 ? (
        <EmptyState
          icon={<Lightbulb size={24} />}
          title="All caught up"
          description="Complete more tasks or add documents to unlock personalized recommendations."
        />
      ) : (
        <div className="list-stack">
          {recommendations.map((rec) => (
            <div key={rec.id} className="ts-card ts-card--pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
                <div>
                  <span
                    className={`ts-badge ts-badge--${
                      rec.priority === 'high' ? 'warning' : rec.priority === 'low' ? 'neutral' : 'primary'
                    }`}
                  >
                    {rec.type.replace('_', ' ')} · score {rec.score}
                  </span>
                  <strong style={{ display: 'block', marginTop: 10 }}>{rec.title}</strong>
                  <p style={{ color: 'var(--ts-text-muted)', marginTop: 6, fontSize: 14 }}>{rec.description}</p>
                  <p style={{ color: 'var(--ts-text-subtle)', marginTop: 8, fontSize: 13 }}>{rec.reason}</p>
                </div>
                <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => handleAction(rec)}>
                  {rec.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
