import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import {
  createTaskFromTemplate,
  searchTemplates,
  type TaskCategory,
} from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore, useUserId } from '@/lib/store';
import { getRegionId } from '@/lib/preferences';
import { useI18n } from '@/hooks/useI18n';

export function TasksPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = useUserId();
  const { strings } = useI18n();
  const preferences = useAppStore((s) => s.preferences);
  const tasks = useAppStore((s) => s.tasks);
  const addTask = useAppStore((s) => s.addTask);
  const regionId = getRegionId(preferences);

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<TaskCategory | ''>('');

  const templates = useMemo(
    () =>
      searchTemplates({
        regionId,
        userType: preferences.userType,
        language: preferences.language === 'hi' ? 'hi' : 'en',
        category: category || undefined,
        query,
      }),
    [regionId, preferences, category, query],
  );

  const pendingTasks = tasks.filter((t) => t.status !== 'completed');

  const startTask = (templateId: string) => {
    const task = createTaskFromTemplate(templateId, userId);
    if (!task) return;
    addTask(task);
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle="Regional checklists to guide your next steps"
        actions={
          <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => setQuery('')}>
            <Plus size={16} /> Browse templates
          </button>
        }
      />

      {pendingTasks.length > 0 && (
        <>
          <h2 className="section-title">{strings.dashboard.pendingTasks}</h2>
          <div className="list-stack" style={{ marginBottom: 24 }}>
            {pendingTasks.map((task) => (
              <Link key={task.id} to={`/tasks/${task.id}`} className="ts-card ts-card--hover list-item">
                <div>
                  <strong>{task.title}</strong>
                  <div className="list-item__meta">{task.status.replace('_', ' ')}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="ts-card ts-card--pad" style={{ marginBottom: 20 }}>
        <div className="grid-2">
          <div className="ts-input-icon">
            <Search size={16} />
            <input
              className="ts-input"
              placeholder="Search templates…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            className="ts-select"
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory | '')}
          >
            <option value="">All categories</option>
            <option value="education">Education</option>
            <option value="documents">Documents</option>
            <option value="government_forms">Government forms</option>
            <option value="business_admin">Business admin</option>
          </select>
        </div>
      </div>

      <h2 className="section-title">Templates</h2>
      {templates.length === 0 ? (
        <EmptyState
          icon={<Search size={24} />}
          title="No templates found"
          description="Try a different search or category filter."
        />
      ) : (
        <div className="list-stack">
          {templates.map((tpl) => (
            <div key={tpl.id} className="ts-card ts-card--pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                <div>
                  <strong>{tpl.title}</strong>
                  <p style={{ color: 'var(--ts-text-muted)', marginTop: 6, fontSize: 14 }}>{tpl.description}</p>
                  <span className="ts-badge ts-badge--neutral" style={{ marginTop: 10 }}>
                    {tpl.category.replace('_', ' ')}
                  </span>
                </div>
                <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => startTask(tpl.id)}>
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
