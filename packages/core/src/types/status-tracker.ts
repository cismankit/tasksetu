export type StatusTrackerState =
  | 'submitted'
  | 'under_review'
  | 'pending_documents'
  | 'approved'
  | 'rejected'
  | 'on_hold'
  | 'completed'
  | 'unknown';

export interface StatusTracker {
  id: string;
  userId: string;
  taskName: string;
  referenceNumber?: string;
  portalLink?: string;
  currentStatus: StatusTrackerState;
  statusLabel?: string;
  lastCheckedAt?: string;
  nextFollowUpAt?: string;
  notes?: string;
  attachmentIds: string[];
  contactPerson?: string;
  relatedTaskId?: string;
  createdAt: string;
  updatedAt: string;
}
