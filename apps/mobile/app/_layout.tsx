import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PreferencesProvider } from '@/hooks/usePreferences';
import { StoreProvider } from '@/hooks/useStore';

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <StoreProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding/welcome" />
          <Stack.Screen name="onboarding/language" />
          <Stack.Screen name="onboarding/region" />
          <Stack.Screen name="onboarding/user-type" />
          <Stack.Screen name="(app)" />
        </Stack>
      </StoreProvider>
    </PreferencesProvider>
  );
}
