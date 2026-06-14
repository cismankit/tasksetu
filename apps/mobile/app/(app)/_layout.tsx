import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#F8FAFC' },
        headerTintColor: '#0F172A',
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Stack.Screen name="dashboard" options={{ title: 'TaskSetu' }} />
      <Stack.Screen name="family/add" options={{ title: 'Add family member' }} />
      <Stack.Screen name="documents/index" options={{ title: 'Document vault' }} />
      <Stack.Screen name="documents/add" options={{ title: 'Add document' }} />
      <Stack.Screen name="documents/[id]" options={{ title: 'Document' }} />
      <Stack.Screen name="tasks/index" options={{ title: 'Tasks' }} />
      <Stack.Screen name="tasks/[id]" options={{ title: 'Task checklist' }} />
      <Stack.Screen name="reminders/add" options={{ title: 'Add reminder' }} />
      <Stack.Screen name="status/index" options={{ title: 'Status tracker' }} />
      <Stack.Screen name="status/add" options={{ title: 'Add status tracker' }} />
      <Stack.Screen name="receipts/index" options={{ title: 'Receipts' }} />
      <Stack.Screen name="receipts/add" options={{ title: 'Add receipt' }} />
      <Stack.Screen name="recommendations" options={{ title: 'Recommendations' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
