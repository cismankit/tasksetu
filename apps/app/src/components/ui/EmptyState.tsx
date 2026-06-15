import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="ts-empty">
      <div className="ts-empty__icon">{icon}</div>
      <p className="ts-empty__title">{title}</p>
      <p className="ts-empty__desc">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="ts-btn ts-btn--primary ts-btn--sm" style={{ marginTop: 12 }}>
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" style={{ marginTop: 12 }} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
