import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';
import { OnboardingLayout } from './OnboardingLayout';

export function RegionPage() {
  const navigate = useNavigate();
  const { strings } = useI18n();
  const preferences = useAppStore((s) => s.preferences);
  const setPreferences = useAppStore((s) => s.setPreferences);

  return (
    <OnboardingLayout step={2}>
      <h1>{strings.onboarding.selectRegion}</h1>
      <p style={{ color: 'var(--ts-text-muted)', margin: '12px 0 24px' }}>
        We use your region to show relevant checklists and document packs.
      </p>
      <div className="form-grid">
        <div className="ts-field">
          <label className="ts-label" htmlFor="country">
            Country
          </label>
          <select
            id="country"
            className="ts-select"
            value={preferences.country}
            onChange={(e) => setPreferences({ country: e.target.value, state: e.target.value === 'IN' ? 'MP' : undefined })}
          >
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
          </select>
        </div>
        {preferences.country === 'IN' && (
          <div className="ts-field">
            <label className="ts-label" htmlFor="state">
              State
            </label>
            <select
              id="state"
              className="ts-select"
              value={preferences.state ?? 'MP'}
              onChange={(e) => setPreferences({ state: e.target.value })}
            >
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="DL">Delhi</option>
              <option value="KA">Karnataka</option>
            </select>
          </div>
        )}
      </div>
      <div className="form-actions" style={{ marginTop: 28 }}>
        <button type="button" className="ts-btn ts-btn--ghost" onClick={() => navigate(-1)}>
          {strings.common.back}
        </button>
        <button
          type="button"
          className="ts-btn ts-btn--primary"
          onClick={() => navigate('/onboarding/user-type')}
        >
          {strings.common.next}
        </button>
      </div>
    </OnboardingLayout>
  );
}
