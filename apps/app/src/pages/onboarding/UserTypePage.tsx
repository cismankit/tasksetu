import { useNavigate } from 'react-router-dom';
import { USER_TYPES, type UserType } from '@tasksetu/core';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';
import { OnboardingLayout } from './OnboardingLayout';

const USER_TYPE_LABELS: Record<UserType, string> = {
  student: 'Student',
  parent: 'Parent',
  shopkeeper: 'Shopkeeper',
  farmer: 'Farmer',
  gig_worker: 'Gig worker',
  senior_citizen: 'Senior citizen',
  professional: 'Professional',
  service_provider: 'Service provider',
  family_manager: 'Family manager',
};

export function UserTypePage() {
  const navigate = useNavigate();
  const { strings } = useI18n();
  const userType = useAppStore((s) => s.preferences.userType);
  const setPreferences = useAppStore((s) => s.setPreferences);

  return (
    <OnboardingLayout step={3}>
      <h1>{strings.onboarding.selectUserType}</h1>
      <p style={{ color: 'var(--ts-text-muted)', margin: '12px 0 24px' }}>
        This helps us recommend the right checklists and documents.
      </p>
      <div className="chip-grid">
        {USER_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={`chip${userType === type ? ' chip--selected' : ''}`}
            onClick={() => setPreferences({ userType: type })}
          >
            {USER_TYPE_LABELS[type]}
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
          onClick={() => navigate('/onboarding/categories')}
        >
          {strings.common.next}
        </button>
      </div>
    </OnboardingLayout>
  );
}
