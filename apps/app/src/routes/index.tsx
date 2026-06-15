import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { AppShell } from '@/components/layout/AppShell';
import { WelcomePage } from '@/pages/onboarding/WelcomePage';
import { LanguagePage } from '@/pages/onboarding/LanguagePage';
import { RegionPage } from '@/pages/onboarding/RegionPage';
import { UserTypePage } from '@/pages/onboarding/UserTypePage';
import { CategoriesPage } from '@/pages/onboarding/CategoriesPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { TasksPage } from '@/pages/tasks/TasksPage';
import { TaskDetailPage } from '@/pages/tasks/TaskDetailPage';
import { DocumentsPage } from '@/pages/documents/DocumentsPage';
import { DocumentDetailPage } from '@/pages/documents/DocumentDetailPage';
import { RemindersPage } from '@/pages/reminders/RemindersPage';
import { StatusPage } from '@/pages/status/StatusPage';
import { ReceiptsPage } from '@/pages/receipts/ReceiptsPage';
import { FamilyPage } from '@/pages/family/FamilyPage';
import { RecommendationsPage } from '@/pages/recommendations/RecommendationsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);
  const hydrated = useAppStore((s) => s.hydrated);
  if (!hydrated) {
    return (
      <div className="onboarding">
        <div className="ts-card ts-card--pad onboarding__card">
          <p>Loading TaskSetu…</p>
        </div>
      </div>
    );
  }
  if (!onboardingComplete) return <Navigate to="/onboarding/welcome" replace />;
  return children;
}

function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);
  const hydrated = useAppStore((s) => s.hydrated);
  if (!hydrated) return null;
  if (onboardingComplete) return <Navigate to="/dashboard" replace />;
  return children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/onboarding/welcome"
        element={
          <OnboardingGuard>
            <WelcomePage />
          </OnboardingGuard>
        }
      />
      <Route
        path="/onboarding/language"
        element={
          <OnboardingGuard>
            <LanguagePage />
          </OnboardingGuard>
        }
      />
      <Route
        path="/onboarding/region"
        element={
          <OnboardingGuard>
            <RegionPage />
          </OnboardingGuard>
        }
      />
      <Route
        path="/onboarding/user-type"
        element={
          <OnboardingGuard>
            <UserTypePage />
          </OnboardingGuard>
        }
      />
      <Route
        path="/onboarding/categories"
        element={
          <OnboardingGuard>
            <CategoriesPage />
          </OnboardingGuard>
        }
      />

      <Route
        element={
          <RequireOnboarding>
            <AppShell />
          </RequireOnboarding>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/receipts" element={<ReceiptsPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
