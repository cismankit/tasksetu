import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DOCUMENT_TYPES, type DocumentTypeId } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';

const schema = z.object({
  name: z.string().min(1),
  documentTypeId: z.string(),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { strings } = useI18n();
  const documents = useAppStore((s) => s.documents);
  const updateDocument = useAppStore((s) => s.updateDocument);
  const deleteDocument = useAppStore((s) => s.deleteDocument);
  const doc = documents.find((d) => d.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: doc
      ? {
          name: doc.name,
          documentTypeId: doc.documentTypeId,
          expiryDate: doc.expiryDate?.slice(0, 10) ?? '',
          notes: doc.notes ?? '',
        }
      : undefined,
  });

  if (!doc) {
    return (
      <div>
        <PageHeader title="Document not found" />
        <Link to="/documents" className="ts-btn ts-btn--ghost">
          Back
        </Link>
      </div>
    );
  }

  const getDocLabel = (typeId: DocumentTypeId) => {
    const key = DOCUMENT_TYPES.find((d) => d.id === typeId)?.labelKey;
    if (!key) return typeId;
    const parts = key.split('.');
    return (strings.doc as Record<string, string>)[parts[1]] ?? typeId;
  };

  const onSubmit = (data: FormData) => {
    updateDocument({
      ...doc,
      name: data.name,
      documentTypeId: data.documentTypeId as DocumentTypeId,
      expiryDate: data.expiryDate || undefined,
      notes: data.notes,
    });
  };

  return (
    <div>
      <PageHeader
        title={doc.name}
        subtitle={getDocLabel(doc.documentTypeId)}
        actions={
          <button
            type="button"
            className="ts-btn ts-btn--danger ts-btn--sm"
            onClick={() => {
              deleteDocument(doc.id);
              navigate('/documents');
            }}
          >
            Delete
          </button>
        }
      />

      <form className="ts-card ts-card--pad form-grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="ts-field">
          <label className="ts-label">Name</label>
          <input className={`ts-input${errors.name ? ' ts-input--invalid' : ''}`} {...register('name')} />
        </div>
        <div className="ts-field">
          <label className="ts-label">Type</label>
          <select className="ts-select" {...register('documentTypeId')}>
            {DOCUMENT_TYPES.map((dt) => (
              <option key={dt.id} value={dt.id}>
                {getDocLabel(dt.id)}
              </option>
            ))}
          </select>
        </div>
        <div className="ts-field">
          <label className="ts-label">Expiry date</label>
          <input type="date" className="ts-input" {...register('expiryDate')} />
        </div>
        <div className="ts-field">
          <label className="ts-label">Notes</label>
          <textarea className="ts-textarea" {...register('notes')} />
        </div>
        <div className="form-actions">
          <Link to="/documents" className="ts-btn ts-btn--ghost">
            {strings.common.back}
          </Link>
          <button type="submit" className="ts-btn ts-btn--primary">
            {strings.common.save}
          </button>
        </div>
      </form>
    </div>
  );
}
