import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TASK_CATEGORIES, type TaskCategory } from '@tasksetu/core';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';
import { OnboardingLayout } from './OnboardingLayout';

const CATEGORY_LABELS: Record<TaskCategory, string> = {
  documents: 'Documents',
  government_forms: 'Government forms',
  education: 'Education',
  payments: 'Payments',
  receipts: 'Receipts',
  health: 'Health',
  warranty: 'Warranty',
  repair_service: 'Repair & service',
  family_reminders: 'Family reminders',
  business_admin: 'Business admin',
};

export function CategoriesPage() {
  const navigate = useNavigate();
  const { strings } = useI18n();
  const topCategories = useAppStore((s) => s.preferences.topCategories);
  const setPreferences = useAppStore((s) => s.setPreferences);
  const setProfileName = useAppStore((s) => s.setProfileName);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [name, setName] = useState('');

  const toggleCategory = (cat: TaskCategory) => {
    const next = topCategories.includes(cat)
      ? topCategories.filter((c) => c !== cat)
      : [...topCategories, cat];
    setPreferences({ topCategories: next.length ? next : [cat] });
  };

  const finish = () => {
    if (name.trim()) setProfileName(name.trim());
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <OnboardingLayout step={4}>
      <h1>What do you need help with?</h1>
      <p style={{ color: 'var(--ts-text-muted)', margin: '12px 0 24px' }}>
        Pick a few categories — you can always add more later.
      </p>
      <div className="form-grid">
        <div className="ts-field">
          <label className="ts-label" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            className="ts-input"
            placeholder="e.g. Priya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="chip-grid" style={{ marginTop: 16 }}>
        {TASK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`chip${topCategories.includes(cat) ? ' chip--selected' : ''}`}
            onClick={() => toggleCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
      <div className="form-actions" style={{ marginTop: 28 }}>
        <button type="button" className="ts-btn ts-btn--ghost" onClick={() => navigate(-1)}>
          {strings.common.back}
        </button>
        <button type="button" className="ts-btn ts-btn--primary" onClick={finish}>
          {strings.common.done}
        </button>
      </div>
    </OnboardingLayout>
  );
}
