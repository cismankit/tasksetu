import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';
import { OnboardingLayout } from './OnboardingLayout';

export function LanguagePage() {
  const navigate = useNavigate();
  const { strings } = useI18n();
  const language = useAppStore((s) => s.preferences.language);
  const setPreferences = useAppStore((s) => s.setPreferences);

  return (
    <OnboardingLayout step={1}>
      <h1>{strings.onboarding.selectLanguage}</h1>
      <p style={{ color: 'var(--ts-text-muted)', margin: '12px 0 24px' }}>
        You can change this anytime from the top bar.
      </p>
      <div className="chip-grid">
        {[
          { code: 'en', label: 'English' },
          { code: 'hi', label: 'हिन्दी' },
        ].map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`chip${language === lang.code ? ' chip--selected' : ''}`}
            onClick={() => setPreferences({ language: lang.code })}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <div className="form-actions" style={{ marginTop: 28 }}>
        <button type="button" className="ts-btn ts-btn--ghost" onClick={() => navigate(-1)}>
          {strings.common.back}
        </button>
        <button
          type="button"
          className="ts-btn ts-btn--primary"
          onClick={() => navigate('/onboarding/region')}
        >
          {strings.common.next}
        </button>
      </div>
    </OnboardingLayout>
  );
}
