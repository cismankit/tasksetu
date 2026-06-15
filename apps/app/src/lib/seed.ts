import {
  createTaskFromTemplate,
  type Document,
  type DocumentPack,
  type FamilyMember,
  type Receipt,
  type Reminder,
  type StatusTracker,
  type UserTask,
} from '@tasksetu/core';
import { createId, MOCK_USER_ID } from './id';

function iso(daysFromNow = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString();
}

export interface SeedData {
  profileName: string;
  familyMembers: FamilyMember[];
  documents: Document[];
  documentPacks: DocumentPack[];
  tasks: UserTask[];
  reminders: Reminder[];
  statusTrackers: StatusTracker[];
  receipts: Receipt[];
}

export function createSeedData(): SeedData {
  const now = iso();
  const userId = MOCK_USER_ID;

  const familyMembers: FamilyMember[] = [
    {
      id: createId('fm'),
      userId,
      profileId: 'profile-1',
      name: 'Priya Sharma',
      relationship: 'self',
      userType: 'student',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createId('fm'),
      userId,
      profileId: 'profile-1',
      name: 'Rahul Sharma',
      relationship: 'parent',
      userType: 'professional',
      createdAt: now,
      updatedAt: now,
    },
  ];

  const documents: Document[] = [
    {
      id: createId('doc'),
      userId,
      familyMemberId: familyMembers[0].id,
      name: 'Class 12 Marksheet',
      documentTypeId: 'marksheet',
      tags: ['education', '2024'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createId('doc'),
      userId,
      familyMemberId: familyMembers[0].id,
      name: 'Aadhaar Card',
      documentTypeId: 'aadhaar',
      tags: ['identity'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createId('doc'),
      userId,
      name: 'Passport',
      documentTypeId: 'passport',
      expiryDate: iso(25),
      tags: ['travel'],
      createdAt: now,
      updatedAt: now,
    },
  ];

  const scholarshipTask =
    createTaskFromTemplate('mp-scholarship-pack', userId, {
      familyMemberId: familyMembers[0].id,
    }) ?? createTaskFromTemplate('in-student-pack', userId)!;

  scholarshipTask.status = 'in_progress';
  if (scholarshipTask.steps[0]) {
    scholarshipTask.steps[0].completed = true;
    scholarshipTask.steps[0].completedAt = now;
  }

  const tasks: UserTask[] = [scholarshipTask];

  const reminders: Reminder[] = [
    {
      id: createId('rem'),
      userId,
      title: 'Renew passport before expiry',
      type: 'document_expiry',
      scheduledAt: iso(20),
      status: 'scheduled',
      relatedDocumentId: documents[2].id,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createId('rem'),
      userId,
      title: 'Follow up on scholarship application',
      type: 'follow_up',
      scheduledAt: iso(5),
      status: 'scheduled',
      relatedTaskId: scholarshipTask.id,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const statusTrackers: StatusTracker[] = [
    {
      id: createId('st'),
      userId,
      taskName: 'MP Scholarship Portal Application',
      referenceNumber: 'MPSCH-2024-88421',
      portalLink: 'https://scholarshipportal.mp.gov.in',
      currentStatus: 'under_review',
      statusLabel: 'Under review by district office',
      lastCheckedAt: iso(-2),
      nextFollowUpAt: iso(7),
      notes: 'Submitted all documents on 10 Jan',
      attachmentIds: [documents[0].id],
      relatedTaskId: scholarshipTask.id,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const receipts: Receipt[] = [
    {
      id: createId('rcpt'),
      userId,
      amount: 450,
      currency: 'INR',
      vendor: 'Stationery World',
      paymentMethod: 'upi',
      category: 'school_fee',
      date: iso(-3),
      notes: 'Exam form photocopies',
      tags: ['education'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createId('rcpt'),
      userId,
      amount: 1200,
      currency: 'INR',
      vendor: 'MedPlus Pharmacy',
      paymentMethod: 'upi',
      category: 'medical',
      date: iso(-10),
      tags: ['health'],
      createdAt: now,
      updatedAt: now,
    },
  ];

  const documentPacks: DocumentPack[] = [
    {
      id: createId('pack'),
      userId,
      name: 'Scholarship Application Pack',
      description: 'Documents needed for MP state scholarship',
      documentIds: [documents[0].id, documents[1].id],
      templateId: 'mp-scholarship-pack',
      familyMemberId: familyMembers[0].id,
      createdAt: now,
      updatedAt: now,
    },
  ];

  return {
    profileName: 'Priya Sharma',
    familyMembers,
    documents,
    documentPacks,
    tasks,
    reminders,
    statusTrackers,
    receipts,
  };
}
