import type { DocumentType } from '../types/document';

export const DOCUMENT_TYPES: DocumentType[] = [
  { id: 'aadhaar', labelKey: 'doc.aadhaar', category: 'identity', supportsExpiry: false },
  { id: 'pan', labelKey: 'doc.pan', category: 'identity', supportsExpiry: false },
  { id: 'passport', labelKey: 'doc.passport', category: 'identity', supportsExpiry: true },
  { id: 'driving_license', labelKey: 'doc.driving_license', category: 'identity', supportsExpiry: true },
  { id: 'voter_id', labelKey: 'doc.voter_id', category: 'identity', supportsExpiry: false },
  { id: 'birth_certificate', labelKey: 'doc.birth_certificate', category: 'government', supportsExpiry: false },
  { id: 'death_certificate', labelKey: 'doc.death_certificate', category: 'government', supportsExpiry: false },
  { id: 'income_certificate', labelKey: 'doc.income_certificate', category: 'government', supportsExpiry: true },
  { id: 'caste_certificate', labelKey: 'doc.caste_certificate', category: 'government', supportsExpiry: true },
  { id: 'domicile_certificate', labelKey: 'doc.domicile_certificate', category: 'government', supportsExpiry: true },
  { id: 'marksheet', labelKey: 'doc.marksheet', category: 'education', supportsExpiry: false },
  { id: 'degree', labelKey: 'doc.degree', category: 'education', supportsExpiry: false },
  { id: 'bank_document', labelKey: 'doc.bank_document', category: 'financial', supportsExpiry: false },
  { id: 'insurance', labelKey: 'doc.insurance', category: 'financial', supportsExpiry: true },
  { id: 'medical_prescription', labelKey: 'doc.medical_prescription', category: 'medical', supportsExpiry: false },
  { id: 'warranty_invoice', labelKey: 'doc.warranty_invoice', category: 'other', supportsExpiry: true },
  { id: 'rental_agreement', labelKey: 'doc.rental_agreement', category: 'property', supportsExpiry: true },
  { id: 'property_paper', labelKey: 'doc.property_paper', category: 'property', supportsExpiry: false },
  { id: 'other', labelKey: 'doc.other', category: 'other', supportsExpiry: false },
];

export function getDocumentType(id: string): DocumentType | undefined {
  return DOCUMENT_TYPES.find((d) => d.id === id);
}
