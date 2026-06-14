import type { UserTask, TaskTemplate, TaskStep } from '../types/task';
import { getTemplateById } from '../region-engine';

export function createTaskFromTemplate(
  templateId: string,
  userId: string,
  options?: { familyMemberId?: string; dueDate?: string },
): UserTask | null {
  const template = getTemplateById(templateId);
  if (!template) return null;

  const now = new Date().toISOString();
  const steps = template.steps.map((step: TaskStep) => ({
    ...step,
    completed: false,
  }));

  return {
    id: `task-${Date.now()}`,
    userId,
    templateId,
    familyMemberId: options?.familyMemberId,
    title: template.title,
    description: template.description,
    status: 'not_started',
    category: template.category,
    steps,
    requiredDocuments: [...template.requiredDocuments],
    officialLink: template.officialLink,
    dueDate: options?.dueDate,
    createdAt: now,
    updatedAt: now,
  };
}

export function completeTaskStep(task: UserTask, stepId: string): UserTask {
  const steps = task.steps.map((s) =>
    s.id === stepId ? { ...s, completed: true, completedAt: new Date().toISOString() } : s,
  );
  const allDone = steps.every((s) => s.completed || s.isOptional);
  return {
    ...task,
    steps,
    status: allDone ? 'completed' : 'in_progress',
    updatedAt: new Date().toISOString(),
  };
}

export function getTaskProgress(task: UserTask): { completed: number; total: number; percent: number } {
  const required = task.steps.filter((s) => !s.isOptional);
  const completed = required.filter((s) => s.completed).length;
  const total = required.length;
  return {
    completed,
    total,
    percent: total === 0 ? 100 : Math.round((completed / total) * 100),
  };
}

export function buildWhatsAppShareMessage(task: UserTask, template?: TaskTemplate): string {
  const docs = task.requiredDocuments.join(', ');
  const pendingSteps = task.steps.filter((s) => !s.completed).map((s) => s.title);
  const lines = [
    `Hi — TaskSetu checklist: ${task.title}`,
    '',
    docs ? `Documents needed: ${docs}` : '',
    pendingSteps.length ? `Pending steps:\n${pendingSteps.map((s) => `• ${s}`).join('\n')}` : '',
    template?.officialLink ? `Official link: ${template.officialLink}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}
