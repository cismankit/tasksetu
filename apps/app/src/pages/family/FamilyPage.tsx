import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Users } from 'lucide-react';
import type { UserType } from '@tasksetu/core';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore, useUserId } from '@/lib/store';

const schema = z.object({
  name: z.string().min(1),
  relationship: z.enum(['self', 'spouse', 'child', 'parent', 'sibling', 'other']),
  userType: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function FamilyPage() {
  const userId = useUserId();
  const familyMembers = useAppStore((s) => s.familyMembers);
  const addFamilyMember = useAppStore((s) => s.addFamilyMember);
  const deleteFamilyMember = useAppStore((s) => s.deleteFamilyMember);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { relationship: 'other' },
  });

  const onSubmit = (data: FormData) => {
    addFamilyMember({
      userId,
      profileId: 'profile-1',
      name: data.name,
      relationship: data.relationship,
      userType: data.userType as UserType | undefined,
      notes: data.notes,
    });
    reset({ relationship: 'other' });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader
        title="Family"
        subtitle="Manage profiles for yourself and family members"
        actions={
          <button type="button" className="ts-btn ts-btn--primary ts-btn--sm" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Add member
          </button>
        }
      />

      {showForm && (
        <div className="ts-modal__overlay" onClick={() => setShowForm(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal__header">
              <span className="ts-modal__title">Add family member</span>
              <button type="button" className="ts-iconbtn" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ts-modal__body form-grid">
                <div className="ts-field">
                  <label className="ts-label">Name</label>
                  <input className={`ts-input${errors.name ? ' ts-input--invalid' : ''}`} {...register('name')} />
                </div>
                <div className="ts-field">
                  <label className="ts-label">Relationship</label>
                  <select className="ts-select" {...register('relationship')}>
                    <option value="self">Self</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Other</option>
                  </select>
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

      {familyMembers.length === 0 ? (
        <EmptyState
          icon={<Users size={24} />}
          title="No family profiles"
          description="Add family members to assign documents and tasks."
          actionLabel="Add member"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="grid-2">
          {familyMembers.map((member) => (
            <div key={member.id} className="ts-card ts-card--pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div className="ts-avatar" style={{ width: 44, height: 44 }}>
                    {member.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <strong>{member.name}</strong>
                    <div className="list-item__meta">{member.relationship}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="ts-btn ts-btn--ghost ts-btn--sm"
                  onClick={() => deleteFamilyMember(member.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
