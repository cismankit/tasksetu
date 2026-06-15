import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Receipt } from 'lucide-react';
import type { PaymentMethod, ReceiptCategory } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore, useUserId } from '@/lib/store';

const schema = z.object({
  amount: z.coerce.number().positive('Amount must be positive'),
  vendor: z.string().optional(),
  paymentMethod: z.string(),
  category: z.string(),
  date: z.string().min(1),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ReceiptsPage() {
  const userId = useUserId();
  const receipts = useAppStore((s) => s.receipts);
  const addReceipt = useAppStore((s) => s.addReceipt);
  const deleteReceipt = useAppStore((s) => s.deleteReceipt);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: 'upi',
      category: 'other',
      date: new Date().toISOString().slice(0, 10),
    },
  });

  const total = useMemo(() => receipts.reduce((sum, r) => sum + r.amount, 0), [receipts]);
  const sorted = [...receipts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const onSubmit = (data: FormData) => {
    addReceipt({
      userId,
      amount: data.amount,
      currency: 'INR',
      vendor: data.vendor,
      paymentMethod: data.paymentMethod as PaymentMethod,
      category: data.category as ReceiptCategory,
      date: new Date(data.date).toISOString(),
      notes: data.notes,
      tags: [],
    });
    reset({ paymentMethod: 'upi', category: 'other', date: new Date().toISOString().slice(0, 10) });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader
        title="Receipt organizer"
        subtitle="Track UPI payments and receipts manually — no bank API"
        actions={
          <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Add receipt
          </button>
        }
      />

      <div className="ts-card stat-card" style={{ marginBottom: 20, maxWidth: 280 }}>
        <div className="stat-card__label">Total tracked</div>
        <div className="stat-card__value">₹{total.toLocaleString('en-IN')}</div>
      </div>

      {showForm && (
        <div className="ts-modal__overlay" onClick={() => setShowForm(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal__header">
              <span className="ts-modal__title">Add receipt</span>
              <button type="button" className="ts-iconbtn" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ts-modal__body form-grid">
                <div className="ts-field">
                  <label className="ts-label">Amount (₹)</label>
                  <input
                    type="number"
                    className={`ts-input${errors.amount ? ' ts-input--invalid' : ''}`}
                    {...register('amount')}
                  />
                  {errors.amount && <span className="ts-error">{errors.amount.message}</span>}
                </div>
                <div className="ts-field">
                  <label className="ts-label">Vendor</label>
                  <input className="ts-input" {...register('vendor')} />
                </div>
                <div className="ts-field">
                  <label className="ts-label">Payment method</label>
                  <select className="ts-select" {...register('paymentMethod')}>
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank_transfer">Bank transfer</option>
                  </select>
                </div>
                <div className="ts-field">
                  <label className="ts-label">Category</label>
                  <select className="ts-select" {...register('category')}>
                    <option value="upi">UPI</option>
                    <option value="school_fee">School fee</option>
                    <option value="medical">Medical</option>
                    <option value="grocery">Grocery</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="ts-field">
                  <label className="ts-label">Date</label>
                  <input type="date" className="ts-input" {...register('date')} />
                </div>
                <div className="ts-field">
                  <label className="ts-label">Notes</label>
                  <textarea className="ts-textarea" {...register('notes')} />
                </div>
              </div>
              <div className="ts-modal__footer">
                <button type="button" className="ts-btn ts-btn--ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn--primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {sorted.length === 0 ? (
        <EmptyState
          icon={<Receipt size={24} />}
          title="No receipts yet"
          description="Log UPI and cash payments to keep your records organized."
          actionLabel="Add receipt"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="list-stack">
          {sorted.map((r) => (
            <div key={r.id} className="ts-card ts-card--pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <strong>₹{r.amount.toLocaleString('en-IN')}</strong>
                  <div className="list-item__meta">
                    {r.vendor ?? r.category} · {r.paymentMethod.toUpperCase()} ·{' '}
                    {new Date(r.date).toLocaleDateString()}
                  </div>
                </div>
                <button
                  type="button"
                  className="ts-btn ts-btn--ghost ts-btn--sm"
                  onClick={() => deleteReceipt(r.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
