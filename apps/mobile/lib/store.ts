import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  Document,
  FamilyMember,
  Receipt,
  Reminder,
  StatusTracker,
  UserTask,
} from '@tasksetu/core';

const STORE_KEY = '@tasksetu/local_store';

export interface LocalStore {
  familyMembers: FamilyMember[];
  documents: Document[];
  tasks: UserTask[];
  reminders: Reminder[];
  statusTrackers: StatusTracker[];
  receipts: Receipt[];
}

const EMPTY_STORE: LocalStore = {
  familyMembers: [],
  documents: [],
  tasks: [],
  reminders: [],
  statusTrackers: [],
  receipts: [],
};

export async function loadStore(): Promise<LocalStore> {
  const raw = await AsyncStorage.getItem(STORE_KEY);
  if (!raw) return { ...EMPTY_STORE };
  return { ...EMPTY_STORE, ...JSON.parse(raw) };
}

export async function saveStore(store: LocalStore): Promise<void> {
  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
