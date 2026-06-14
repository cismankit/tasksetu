export type DocumentTypeId =
  | 'aadhaar'
  | 'pan'
  | 'passport'
  | 'driving_license'
  | 'voter_id'
  | 'birth_certificate'
  | 'death_certificate'
  | 'income_certificate'
  | 'caste_certificate'
  | 'domicile_certificate'
  | 'marksheet'
  | 'degree'
  | 'bank_document'
  | 'insurance'
  | 'medical_prescription'
  | 'warranty_invoice'
  | 'rental_agreement'
  | 'property_paper'
  | 'other';

export interface DocumentType {
  id: DocumentTypeId;
  labelKey: string;
  category: 'identity' | 'education' | 'government' | 'financial' | 'medical' | 'property' | 'other';
  supportsExpiry: boolean;
}

export interface Document {
  id: string;
  userId: string;
  familyMemberId?: string;
  name: string;
  documentTypeId: DocumentTypeId;
  storagePath?: string;
  mimeType?: string;
  expiryDate?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentPack {
  id: string;
  userId: string;
  name: string;
  description?: string;
  documentIds: string[];
  templateId?: string;
  familyMemberId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentVaultSummary {
  totalDocuments: number;
  expiringWithin30Days: Document[];
  missingTypes: DocumentTypeId[];
}
