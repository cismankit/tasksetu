import type { Document, DocumentVaultSummary, DocumentTypeId } from '../types/document';
import { DOCUMENT_TYPES } from '../constants/document-types';
import { EXPIRY_WARNING_DAYS } from '../constants/app';

export function findExpiringDocuments(documents: Document[]): Document[] {
  const now = Date.now();
  const threshold = EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000;
  return documents.filter((doc) => {
    if (!doc.expiryDate) return false;
    const expiry = new Date(doc.expiryDate).getTime();
    return expiry > now && expiry - now <= threshold;
  });
}

export function findMissingDocumentTypes(
  documents: Document[],
  required: DocumentTypeId[],
): DocumentTypeId[] {
  const existing = new Set(documents.map((d) => d.documentTypeId));
  return required.filter((type) => !existing.has(type));
}

export function summarizeVault(
  documents: Document[],
  requiredForActiveTasks: DocumentTypeId[] = [],
): DocumentVaultSummary {
  return {
    totalDocuments: documents.length,
    expiringWithin30Days: findExpiringDocuments(documents),
    missingTypes: findMissingDocumentTypes(documents, requiredForActiveTasks),
  };
}

export function getDocumentTypeLabel(typeId: DocumentTypeId): string {
  const docType = DOCUMENT_TYPES.find((d) => d.id === typeId);
  if (!docType) return typeId;
  return docType.labelKey;
}

export function createDocumentPackName(templateTitle: string, memberName?: string): string {
  return memberName ? `${templateTitle} — ${memberName}` : templateTitle;
}
