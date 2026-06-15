interface OnboardingStepsProps {
  current: number;
  total?: number;
}

export function OnboardingSteps({ current, total = 5 }: OnboardingStepsProps) {
  return (
    <div className="onboarding__steps">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`onboarding__step${i < current ? ' onboarding__step--done' : ''}${i === current ? ' onboarding__step--active' : ''}`}
        />
      ))}
    </div>
  );
}

export function OnboardingLayout({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div className="onboarding">
      <div className="ts-card ts-card--pad onboarding__card">
        <OnboardingSteps current={step} />
        {children}
      </div>
    </div>
  );
}
