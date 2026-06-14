export type PaymentMethod = 'upi' | 'cash' | 'card' | 'bank_transfer' | 'other';

export type ReceiptCategory =
  | 'upi'
  | 'school_fee'
  | 'repair'
  | 'medical'
  | 'grocery'
  | 'rent'
  | 'business'
  | 'subscription'
  | 'travel'
  | 'other';

export interface Receipt {
  id: string;
  userId: string;
  imagePath?: string;
  amount: number;
  currency: string;
  vendor?: string;
  paymentMethod: PaymentMethod;
  category: ReceiptCategory;
  date: string;
  notes?: string;
  relatedTaskId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptSummary {
  totalAmount: number;
  count: number;
  byCategory: Record<ReceiptCategory, number>;
  recentReceipts: Receipt[];
}
