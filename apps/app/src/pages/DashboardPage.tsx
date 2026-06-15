import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckSquare, FileText } from 'lucide-react';
import { summarizeVault } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/lib/store';
import { useI18n, useRecommendations } from '@/hooks/useI18n';

export function DashboardPage() {
  const navigate = useNavigate();
  const { strings } = useI18n();
  const profileName = useAppStore((s) => s.profileName);
  const tasks = useAppStore((s) => s.tasks);
  const reminders = useAppStore((s) => s.reminders);
  const documents = useAppStore((s) => s.documents);
  const familyMembers = useAppStore((s) => s.familyMembers);
  const receipts = useAppStore((s) => s.receipts);
  const { recommendations } = useRecommendations();

  const pendingTasks = tasks.filter((t) => t.status !== 'completed');
  const upcomingReminders = reminders
    .filter((r) => r.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 3);
  const vault = summarizeVault(documents);

  return (
    <div>
      <PageHeader
        title={profileName ? `Hello, ${profileName.split(' ')[0]}` : strings.app.name}
        subtitle={strings.app.tagline}
      />

      <button type="button" className="cta-banner" onClick={() => navigate('/tasks')}>
        <strong>{strings.dashboard.quickAction}</strong>
        <span>Browse regional checklists →</span>
      </button>

      <div className="grid-3">
        <div className="ts-card stat-card">
          <div className="stat-card__label">{strings.dashboard.pendingTasks}</div>
          <div className="stat-card__value">{pendingTasks.length}</div>
        </div>
        <div className="ts-card stat-card">
          <div className="stat-card__label">{strings.dashboard.upcomingReminders}</div>
          <div className="stat-card__value">{upcomingReminders.length}</div>
        </div>
        <div className="ts-card stat-card">
          <div className="stat-card__label">Documents</div>
          <div className="stat-card__value">{vault.totalDocuments}</div>
        </div>
      </div>

      <h2 className="section-title">{strings.dashboard.pendingTasks}</h2>
      {pendingTasks.length === 0 ? (
        <EmptyState
          icon={<CheckSquare size={24} />}
          title="No active tasks"
          description="Start a regional checklist to track your next life-admin step."
          actionLabel="Browse tasks"
          actionTo="/tasks"
        />
      ) : (
        <div className="list-stack">
          {pendingTasks.slice(0, 3).map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`} className="ts-card ts-card--hover list-item">
              <div>
                <strong>{task.title}</strong>
                <div className="list-item__meta">{task.status.replace('_', ' ')}</div>
              </div>
              <ArrowRight size={18} color="var(--ts-text-subtle)" />
            </Link>
          ))}
        </div>
      )}

      <h2 className="section-title">{strings.dashboard.upcomingReminders}</h2>
      {upcomingReminders.length === 0 ? (
        <p style={{ color: 'var(--ts-text-muted)' }}>No reminders scheduled.</p>
      ) : (
        <div className="list-stack">
          {upcomingReminders.map((rem) => (
            <div key={rem.id} className="ts-card ts-card--pad">
              <strong>{rem.title}</strong>
              <div className="list-item__meta">
                {new Date(rem.scheduledAt).toLocaleDateString(undefined, {
                  dateStyle: 'medium',
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">{strings.dashboard.recommendations}</h2>
        <Link to="/recommendations" className="ts-btn ts-btn--link ts-btn--sm">
          See all
        </Link>
      </div>
      {recommendations.length === 0 ? (
        <p style={{ color: 'var(--ts-text-muted)' }}>You're all caught up for now.</p>
      ) : (
        <div className="list-stack">
          {recommendations.slice(0, 2).map((rec) => (
            <div key={rec.id} className="ts-card ts-card--pad">
              <span className={`ts-badge ts-badge--${rec.priority === 'high' ? 'warning' : 'primary'}`}>
                {rec.type.replace('_', ' ')}
              </span>
              <strong style={{ display: 'block', marginTop: 8 }}>{rec.title}</strong>
              <p style={{ color: 'var(--ts-text-muted)', marginTop: 6, fontSize: 14 }}>{rec.description}</p>
            </div>
          ))}
        </div>
      )}

      {vault.expiringWithin30Days.length > 0 && (
        <>
          <h2 className="section-title">{strings.dashboard.missingDocuments}</h2>
          <div className="list-stack">
            {vault.expiringWithin30Days.map((doc) => (
              <Link key={doc.id} to={`/documents/${doc.id}`} className="ts-card ts-card--hover list-item">
                <div>
                  <strong>{doc.name}</strong>
                  <div className="list-item__meta">Expires {new Date(doc.expiryDate!).toLocaleDateString()}</div>
                </div>
                <FileText size={18} color="var(--ts-amber-500)" />
              </Link>
            ))}
          </div>
        </>
      )}

      {familyMembers.length > 0 && (
        <>
          <h2 className="section-title">Family</h2>
          <div className="grid-2">
            {familyMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="ts-card ts-card--pad">
                <strong>{member.name}</strong>
                <div className="list-item__meta">{member.relationship}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {receipts.length > 0 && (
        <>
          <h2 className="section-title">Recent receipts</h2>
          <div className="list-stack">
            {receipts.slice(0, 2).map((r) => (
              <div key={r.id} className="ts-card ts-card--pad">
                <strong>₹{r.amount.toLocaleString('en-IN')}</strong>
                <div className="list-item__meta">
                  {r.vendor ?? r.category} · {new Date(r.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
