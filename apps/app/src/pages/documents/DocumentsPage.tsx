import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, FolderOpen, Plus, Search } from 'lucide-react';
import {
  DOCUMENT_TYPES,
  summarizeVault,
  type DocumentTypeId,
} from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore, useUserId } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';

const docSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  documentTypeId: z.string().min(1),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
});

type DocForm = z.infer<typeof docSchema>;

export function DocumentsPage() {
  const userId = useUserId();
  const { strings } = useI18n();
  const documents = useAppStore((s) => s.documents);
  const documentPacks = useAppStore((s) => s.documentPacks);
  const addDocument = useAppStore((s) => s.addDocument);
  const addDocumentPack = useAppStore((s) => s.addDocumentPack);
  const deleteDocument = useAppStore((s) => s.deleteDocument);

  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [tab, setTab] = useState<'all' | 'packs'>('all');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DocForm>({
    resolver: zodResolver(docSchema),
    defaultValues: { documentTypeId: 'aadhaar' },
  });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return documents.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.documentTypeId.includes(q) ||
        d.tags.some((t) => t.includes(q)),
    );
  }, [documents, query]);

  const vault = summarizeVault(documents);

  const onSubmit = (data: DocForm) => {
    const doc = addDocument({
      userId,
      name: data.name,
      documentTypeId: data.documentTypeId as DocumentTypeId,
      expiryDate: data.expiryDate || undefined,
      notes: data.notes,
      tags: [],
    });
    reset();
    setShowForm(false);
    if (documents.length >= 2 && documentPacks.length === 0) {
      addDocumentPack({
        userId,
        name: 'My document pack',
        description: 'Auto-created from your vault',
        documentIds: [doc.id, documents[0]?.id].filter(Boolean) as string[],
      });
    }
  };

  const getDocLabel = (typeId: DocumentTypeId) => {
    const key = DOCUMENT_TYPES.find((d) => d.id === typeId)?.labelKey;
    if (!key) return typeId;
    const parts = key.split('.');
    const section = parts[0] as keyof typeof strings;
    const field = parts[1] as keyof (typeof strings)['doc'];
    return (strings[section] as Record<string, string>)?.[field] ?? typeId;
  };

  return (
    <div>
      <PageHeader
        title="Document vault"
        subtitle="Store, search and organize your important documents"
        actions={
          <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Add document
          </button>
        }
      />

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="ts-card stat-card">
          <div className="stat-card__label">Total</div>
          <div className="stat-card__value">{vault.totalDocuments}</div>
        </div>
        <div className="ts-card stat-card">
          <div className="stat-card__label">Expiring soon</div>
          <div className="stat-card__value">{vault.expiringWithin30Days.length}</div>
        </div>
        <div className="ts-card stat-card">
          <div className="stat-card__label">Packs</div>
          <div className="stat-card__value">{documentPacks.length}</div>
        </div>
      </div>

      <div className="ts-tabs" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className={`ts-tab${tab === 'all' ? ' ts-tab--active' : ''}`}
          onClick={() => setTab('all')}
        >
          All documents
        </button>
        <button
          type="button"
          className={`ts-tab${tab === 'packs' ? ' ts-tab--active' : ''}`}
          onClick={() => setTab('packs')}
        >
          Document packs
        </button>
      </div>

      <div className="ts-input-icon" style={{ marginBottom: 16 }}>
        <Search size={16} />
        <input
          className="ts-input"
          placeholder={`${strings.common.search} documents…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="ts-modal__overlay" onClick={() => setShowForm(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal__header">
              <span className="ts-modal__title">Add document</span>
              <button type="button" className="ts-iconbtn" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ts-modal__body form-grid">
                <div className="ts-field">
                  <label className="ts-label">Name</label>
                  <input className={`ts-input${errors.name ? ' ts-input--invalid' : ''}`} {...register('name')} />
                  {errors.name && <span className="ts-error">{errors.name.message}</span>}
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
                  <label className="ts-label">Expiry date (optional)</label>
                  <input type="date" className="ts-input" {...register('expiryDate')} />
                </div>
                <div className="ts-field">
                  <label className="ts-label">Notes</label>
                  <textarea className="ts-textarea" {...register('notes')} />
                </div>
              </div>
              <div className="ts-modal__footer">
                <button type="button" className="ts-btn ts-btn--ghost" onClick={() => setShowForm(false)}>
                  {strings.common.cancel}
                </button>
                <button type="submit" className="ts-btn ts-btn--primary">
                  {strings.common.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {tab === 'all' ? (
        filtered.length === 0 ? (
          <EmptyState
            icon={<FileText size={24} />}
            title="No documents yet"
            description="Add your first document to build a secure local vault."
            actionLabel="Add document"
            onAction={() => setShowForm(true)}
          />
        ) : (
          <div className="list-stack">
            {filtered.map((doc) => (
              <div key={doc.id} className="ts-card list-item">
                <Link to={`/documents/${doc.id}`} style={{ flex: 1, textDecoration: 'none', color: 'inherit' }}>
                  <strong>{doc.name}</strong>
                  <div className="list-item__meta">{getDocLabel(doc.documentTypeId)}</div>
                </Link>
                <button
                  type="button"
                  className="ts-btn ts-btn--ghost ts-btn--sm"
                  onClick={() => deleteDocument(doc.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )
      ) : documentPacks.length === 0 ? (
        <EmptyState
          icon={<FolderOpen size={24} />}
          title="No document packs"
          description="Group documents into packs for scholarships, admissions, or travel."
        />
      ) : (
        <div className="list-stack">
          {documentPacks.map((pack) => (
            <div key={pack.id} className="ts-card ts-card--pad">
              <strong>{pack.name}</strong>
              <p style={{ color: 'var(--ts-text-muted)', marginTop: 6, fontSize: 14 }}>{pack.description}</p>
              <div className="list-item__meta">{pack.documentIds.length} documents</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
