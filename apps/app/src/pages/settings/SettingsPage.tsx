import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { USER_TYPES, TASK_CATEGORIES, type TaskCategory, type UserType } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';

const schema = z.object({
  profileName: z.string().min(1),
  language: z.string(),
  country: z.string(),
  state: z.string().optional(),
  userType: z.string(),
  notificationsEnabled: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function SettingsPage() {
  const navigate = useNavigate();
  const { strings } = useI18n();
  const profileName = useAppStore((s) => s.profileName);
  const preferences = useAppStore((s) => s.preferences);
  const setProfileName = useAppStore((s) => s.setProfileName);
  const setPreferences = useAppStore((s) => s.setPreferences);
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);
  const resetAll = useAppStore((s) => s.resetAll);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: {
      profileName,
      language: preferences.language,
      country: preferences.country,
      state: preferences.state,
      userType: preferences.userType,
      notificationsEnabled: preferences.notificationsEnabled,
    },
  });

  const topCategories = preferences.topCategories;

  const toggleCategory = (cat: TaskCategory) => {
    const next = topCategories.includes(cat)
      ? topCategories.filter((c) => c !== cat)
      : [...topCategories, cat];
    setPreferences({ topCategories: next.length ? next : [cat] });
  };

  const onSubmit = (data: FormData) => {
    setProfileName(data.profileName);
    setPreferences({
      language: data.language,
      country: data.country,
      state: data.state,
      userType: data.userType as UserType,
      notificationsEnabled: data.notificationsEnabled,
    });
  };

  const rerunOnboarding = () => {
    resetOnboarding();
    navigate('/onboarding/welcome');
  };

  const clearData = () => {
    if (window.confirm('Clear all local data? This cannot be undone.')) {
      resetAll();
      resetOnboarding();
      navigate('/onboarding/welcome');
    }
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Profile, preferences and data" />

      <form className="ts-card ts-card--pad form-grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="ts-field">
          <label className="ts-label">Display name</label>
          <input className="ts-input" {...register('profileName')} />
        </div>
        <div className="ts-field">
          <label className="ts-label">Language</label>
          <select className="ts-select" {...register('language')}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
        <div className="grid-2">
          <div className="ts-field">
            <label className="ts-label">Country</label>
            <select className="ts-select" {...register('country')}>
              <option value="IN">India</option>
              <option value="US">United States</option>
            </select>
          </div>
          <div className="ts-field">
            <label className="ts-label">State</label>
            <input className="ts-input" {...register('state')} placeholder="MP" />
          </div>
        </div>
        <div className="ts-field">
          <label className="ts-label">User type</label>
          <select className="ts-select" {...register('userType')}>
            {USER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <label className="ts-checkbox">
          <input type="checkbox" {...register('notificationsEnabled')} />
          <span className="ts-checkbox__box">✓</span>
          Enable notifications (local)
        </label>
        <div className="ts-field">
          <span className="ts-label">Task categories</span>
          <div className="chip-grid">
            {TASK_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip${topCategories.includes(cat) ? ' chip--selected' : ''}`}
                onClick={() => toggleCategory(cat)}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="ts-btn ts-btn--primary">
            {strings.common.save}
          </button>
        </div>
      </form>

      <h2 className="section-title">Data & onboarding</h2>
      <div className="list-stack">
        <button type="button" className="ts-btn ts-btn--ghost" onClick={rerunOnboarding}>
          Re-run onboarding
        </button>
        <button type="button" className="ts-btn ts-btn--danger" onClick={clearData}>
          Clear all local data
        </button>
      </div>
    </div>
  );
}
