import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Document,
  DocumentPack,
  FamilyMember,
  Receipt,
  Reminder,
  StatusTracker,
  UserPreferences,
  UserTask,
} from '@tasksetu/core';
import { createId, MOCK_USER_ID } from './id';
import { DEFAULT_PREFERENCES } from './preferences';
import { createSeedData } from './seed';
import { SEEDED_KEY, STORE_KEY } from './storage';

export interface AppStore {
  profileName: string;
  preferences: UserPreferences;
  onboardingComplete: boolean;
  familyMembers: FamilyMember[];
  documents: Document[];
  documentPacks: DocumentPack[];
  tasks: UserTask[];
  reminders: Reminder[];
  statusTrackers: StatusTracker[];
  receipts: Receipt[];
  hydrated: boolean;

  setHydrated: (value: boolean) => void;
  setProfileName: (name: string) => void;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFamilyMember: (member: FamilyMember) => void;
  deleteFamilyMember: (id: string) => void;

  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Document;
  updateDocument: (doc: Document) => void;
  deleteDocument: (id: string) => void;

  addDocumentPack: (pack: Omit<DocumentPack, 'id' | 'createdAt' | 'updatedAt'>) => DocumentPack;
  updateDocumentPack: (pack: DocumentPack) => void;
  deleteDocumentPack: (id: string) => void;

  addTask: (task: UserTask) => void;
  updateTask: (task: UserTask) => void;
  deleteTask: (id: string) => void;

  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminder: (id: string) => void;

  addStatusTracker: (tracker: Omit<StatusTracker, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStatusTracker: (tracker: StatusTracker) => void;
  deleteStatusTracker: (id: string) => void;

  addReceipt: (receipt: Omit<Receipt, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReceipt: (receipt: Receipt) => void;
  deleteReceipt: (id: string) => void;

  seedIfNeeded: () => void;
  resetAll: () => void;
}

const now = () => new Date().toISOString();

const initialState = {
  profileName: '',
  preferences: DEFAULT_PREFERENCES,
  onboardingComplete: false,
  familyMembers: [] as FamilyMember[],
  documents: [] as Document[],
  documentPacks: [] as DocumentPack[],
  tasks: [] as UserTask[],
  reminders: [] as Reminder[],
  statusTrackers: [] as StatusTracker[],
  receipts: [] as Receipt[],
  hydrated: false,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,

      setHydrated: (value) => set({ hydrated: value }),

      setProfileName: (name) => set({ profileName: name }),

      setPreferences: (prefs) =>
        set((s) => ({ preferences: { ...s.preferences, ...prefs } })),

      completeOnboarding: () => set({ onboardingComplete: true }),

      resetOnboarding: () =>
        set({
          onboardingComplete: false,
          profileName: '',
          preferences: DEFAULT_PREFERENCES,
        }),

      addFamilyMember: (member) => {
        const ts = now();
        set((s) => ({
          familyMembers: [
            ...s.familyMembers,
            { ...member, id: createId('fm'), createdAt: ts, updatedAt: ts },
          ],
        }));
      },

      updateFamilyMember: (member) =>
        set((s) => ({
          familyMembers: s.familyMembers.map((m) =>
            m.id === member.id ? { ...member, updatedAt: now() } : m,
          ),
        })),

      deleteFamilyMember: (id) =>
        set((s) => ({ familyMembers: s.familyMembers.filter((m) => m.id !== id) })),

      addDocument: (doc) => {
        const ts = now();
        const created = { ...doc, id: createId('doc'), createdAt: ts, updatedAt: ts };
        set((s) => ({ documents: [...s.documents, created] }));
        return created;
      },

      updateDocument: (doc) =>
        set((s) => ({
          documents: s.documents.map((d) =>
            d.id === doc.id ? { ...doc, updatedAt: now() } : d,
          ),
        })),

      deleteDocument: (id) =>
        set((s) => ({
          documents: s.documents.filter((d) => d.id !== id),
          documentPacks: s.documentPacks.map((p) => ({
            ...p,
            documentIds: p.documentIds.filter((did) => did !== id),
          })),
        })),

      addDocumentPack: (pack) => {
        const ts = now();
        const created = { ...pack, id: createId('pack'), createdAt: ts, updatedAt: ts };
        set((s) => ({ documentPacks: [...s.documentPacks, created] }));
        return created;
      },

      updateDocumentPack: (pack) =>
        set((s) => ({
          documentPacks: s.documentPacks.map((p) =>
            p.id === pack.id ? { ...pack, updatedAt: now() } : p,
          ),
        })),

      deleteDocumentPack: (id) =>
        set((s) => ({ documentPacks: s.documentPacks.filter((p) => p.id !== id) })),

      addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),

      updateTask: (task) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === task.id ? task : t)),
        })),

      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      addReminder: (reminder) => {
        const ts = now();
        set((s) => ({
          reminders: [
            ...s.reminders,
            { ...reminder, id: createId('rem'), createdAt: ts, updatedAt: ts },
          ],
        }));
      },

      updateReminder: (reminder) =>
        set((s) => ({
          reminders: s.reminders.map((r) =>
            r.id === reminder.id ? { ...reminder, updatedAt: now() } : r,
          ),
        })),

      deleteReminder: (id) =>
        set((s) => ({ reminders: s.reminders.filter((r) => r.id !== id) })),

      addStatusTracker: (tracker) => {
        const ts = now();
        set((s) => ({
          statusTrackers: [
            ...s.statusTrackers,
            { ...tracker, id: createId('st'), createdAt: ts, updatedAt: ts },
          ],
        }));
      },

      updateStatusTracker: (tracker) =>
        set((s) => ({
          statusTrackers: s.statusTrackers.map((t) =>
            t.id === tracker.id ? { ...tracker, updatedAt: now() } : t,
          ),
        })),

      deleteStatusTracker: (id) =>
        set((s) => ({ statusTrackers: s.statusTrackers.filter((t) => t.id !== id) })),

      addReceipt: (receipt) => {
        const ts = now();
        set((s) => ({
          receipts: [
            ...s.receipts,
            { ...receipt, id: createId('rcpt'), createdAt: ts, updatedAt: ts },
          ],
        }));
      },

      updateReceipt: (receipt) =>
        set((s) => ({
          receipts: s.receipts.map((r) =>
            r.id === receipt.id ? { ...receipt, updatedAt: now() } : r,
          ),
        })),

      deleteReceipt: (id) =>
        set((s) => ({ receipts: s.receipts.filter((r) => r.id !== id) })),

      seedIfNeeded: () => {
        if (localStorage.getItem(SEEDED_KEY)) return;
        const seed = createSeedData();
        set({
          profileName: seed.profileName,
          familyMembers: seed.familyMembers,
          documents: seed.documents,
          documentPacks: seed.documentPacks,
          tasks: seed.tasks,
          reminders: seed.reminders,
          statusTrackers: seed.statusTrackers,
          receipts: seed.receipts,
        });
        localStorage.setItem(SEEDED_KEY, 'true');
      },

      resetAll: () => {
        localStorage.removeItem(SEEDED_KEY);
        set({ ...initialState, hydrated: true });
      },
    }),
    {
      name: STORE_KEY,
      partialize: (state) => ({
        profileName: state.profileName,
        preferences: state.preferences,
        onboardingComplete: state.onboardingComplete,
        familyMembers: state.familyMembers,
        documents: state.documents,
        documentPacks: state.documentPacks,
        tasks: state.tasks,
        reminders: state.reminders,
        statusTrackers: state.statusTrackers,
        receipts: state.receipts,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        state?.seedIfNeeded();
      },
    },
  ),
);

export function useUserId(): string {
  return MOCK_USER_ID;
}
