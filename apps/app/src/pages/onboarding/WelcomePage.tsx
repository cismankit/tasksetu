import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { OnboardingLayout } from './OnboardingLayout';

export function WelcomePage() {
  const navigate = useNavigate();
  const { strings } = useI18n();

  return (
    <OnboardingLayout step={0}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div className="ts-empty__icon" style={{ margin: '0 auto 16px' }}>
          <Sparkles size={28} />
        </div>
        <h1>{strings.onboarding.welcome}</h1>
        <p style={{ color: 'var(--ts-text-muted)', marginTop: 12, lineHeight: 1.6 }}>
          Organize documents, follow regional checklists, set reminders, and track applications — all
          in one calm place.
        </p>
      </div>
      <button
        type="button"
        className="ts-btn ts-btn--primary ts-btn--block ts-btn--lg"
        onClick={() => navigate('/onboarding/language')}
      >
        {strings.common.continue}
      </button>
    </OnboardingLayout>
  );
}
