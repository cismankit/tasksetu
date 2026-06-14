import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type {
  Document,
  FamilyMember,
  Receipt,
  Reminder,
  StatusTracker,
  UserTask,
} from '@tasksetu/core';
import { createId, loadStore, saveStore, type LocalStore } from '@/lib/store';

interface StoreContextValue extends LocalStore {
  loading: boolean;
  refresh: () => Promise<void>;
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Document>;
  getDocument: (id: string) => Document | undefined;
  addTask: (task: UserTask) => Promise<void>;
  updateTask: (task: UserTask) => Promise<void>;
  getTask: (id: string) => UserTask | undefined;
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  addStatusTracker: (
    tracker: Omit<StatusTracker, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<void>;
  addReceipt: (receipt: Omit<Receipt, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const StoreContext = createContext<StoreContextValue | null>(null);
export const MOCK_USER_ID = 'local-user';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<LocalStore>({
    familyMembers: [],
    documents: [],
    tasks: [],
    reminders: [],
    statusTrackers: [],
    receipts: [],
  });
  const [loading, setLoading] = useState(true);

  const persist = useCallback(async (updater: (prev: LocalStore) => LocalStore) => {
    let nextStore: LocalStore = store;
    setStore((prev) => {
      nextStore = updater(prev);
      return nextStore;
    });
    await saveStore(nextStore);
  }, [store]);

  const refresh = useCallback(async () => {
    const data = await loadStore();
    setStore(data);
  }, []);

  useEffect(() => {
    loadStore().then((data) => {
      setStore(data);
      setLoading(false);
    });
  }, []);

  const addFamilyMember = useCallback(
    async (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      await persist((prev) => ({
        ...prev,
        familyMembers: [...prev.familyMembers, { ...member, id: createId('fm'), createdAt: now, updatedAt: now }],
      }));
    },
    [persist],
  );

  const addDocument = useCallback(
    async (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      let created: Document | null = null;
      await persist((prev) => {
        created = { ...doc, id: createId('doc'), createdAt: now, updatedAt: now };
        return { ...prev, documents: [...prev.documents, created] };
      });
      return created!;
    },
    [persist],
  );

  const getDocument = useCallback((id: string) => store.documents.find((d) => d.id === id), [store.documents]);

  const addTask = useCallback(
    async (task: UserTask) => {
      await persist((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
    },
    [persist],
  );

  const updateTask = useCallback(
    async (task: UserTask) => {
      await persist((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === task.id ? task : t)),
      }));
    },
    [persist],
  );

  const getTask = useCallback((id: string) => store.tasks.find((t) => t.id === id), [store.tasks]);

  const addReminder = useCallback(
    async (reminder: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      await persist((prev) => ({
        ...prev,
        reminders: [...prev.reminders, { ...reminder, id: createId('rem'), createdAt: now, updatedAt: now }],
      }));
    },
    [persist],
  );

  const addStatusTracker = useCallback(
    async (tracker: Omit<StatusTracker, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      await persist((prev) => ({
        ...prev,
        statusTrackers: [
          ...prev.statusTrackers,
          { ...tracker, id: createId('st'), createdAt: now, updatedAt: now },
        ],
      }));
    },
    [persist],
  );

  const addReceipt = useCallback(
    async (receipt: Omit<Receipt, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      await persist((prev) => ({
        ...prev,
        receipts: [...prev.receipts, { ...receipt, id: createId('rcpt'), createdAt: now, updatedAt: now }],
      }));
    },
    [persist],
  );

  const value = useMemo(
    () => ({
      ...store,
      loading,
      refresh,
      addFamilyMember,
      addDocument,
      getDocument,
      addTask,
      updateTask,
      getTask,
      addReminder,
      addStatusTracker,
      addReceipt,
    }),
    [
      store,
      loading,
      refresh,
      addFamilyMember,
      addDocument,
      getDocument,
      addTask,
      updateTask,
      getTask,
      addReminder,
      addStatusTracker,
      addReceipt,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
