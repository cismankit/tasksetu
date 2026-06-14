import type { Recommendation, RecommendationContext, RecommendationResult } from '../types/recommendation';
import type { DocumentTypeId } from '../types/document';
import { EXPIRY_WARNING_DAYS } from '../constants/app';
import { getTemplateById } from '../region-engine';

let recommendationCounter = 0;

function nextId(): string {
  recommendationCounter += 1;
  return `rec-${recommendationCounter}`;
}

function hasDoc(docs: DocumentTypeId[], type: DocumentTypeId): boolean {
  return docs.includes(type);
}

function missingDocRecommendation(
  type: DocumentTypeId,
  title: string,
  reason: string,
  score: number,
): Recommendation {
  return {
    id: nextId(),
    type: 'missing_document',
    priority: score >= 80 ? 'high' : 'medium',
    title,
    description: `Add your ${title} to the document vault for faster task completion.`,
    actionLabel: 'Add document',
    documentTypeId: type,
    reason,
    score,
  };
}

function taskRecommendation(
  templateId: string,
  reason: string,
  score: number,
  priority: Recommendation['priority'] = 'medium',
): Recommendation | null {
  const template = getTemplateById(templateId);
  if (!template) return null;
  return {
    id: nextId(),
    type: 'next_task',
    priority,
    title: template.title,
    description: template.description,
    actionLabel: 'Start checklist',
    templateId,
    reason,
    score,
  };
}

export function generateRecommendations(context: RecommendationContext): RecommendationResult {
  const recommendations: Recommendation[] = [];

  // Rule: Student with marksheet but no income certificate → scholarship prep
  if (
    context.userType === 'student' &&
    hasDoc(context.existingDocumentTypes, 'marksheet') &&
    !hasDoc(context.existingDocumentTypes, 'income_certificate')
  ) {
    const rec =
      taskRecommendation(
        context.regionId === 'in-mp' ? 'mp-scholarship-pack' : 'in-student-pack',
        'You have a marksheet but no income certificate — often required for scholarships and admissions.',
        90,
        'high',
      ) ?? missingDocRecommendation(
        'income_certificate',
        'Income Certificate',
        'Required for scholarships and many admission forms.',
        85,
      );
    recommendations.push(rec);
  }

  // Rule: Parent with child profile → school admission pack
  if (context.userType === 'parent' && context.hasChildProfile) {
    const rec = taskRecommendation(
      'in-student-pack',
      'Create a school admission document pack for your child.',
      75,
    );
    if (rec) recommendations.push(rec);
  }

  // Rule: Shopkeeper → monthly UPI receipt summary
  if (context.userType === 'shopkeeper') {
    const rec = taskRecommendation(
      'in-shopkeeper-pack',
      'Set up a monthly UPI receipt summary for your shop records.',
      70,
    );
    if (rec) recommendations.push(rec);
  }

  // Rule: MP region student → exam pack if not completed
  if (
    context.regionId === 'in-mp' &&
    context.userType === 'student' &&
    !context.completedTaskTemplateIds.includes('mp-student-exam-pack')
  ) {
    const rec = taskRecommendation(
      'mp-student-exam-pack',
      'MP students benefit from an exam and admission document pack.',
      65,
    );
    if (rec) recommendations.push(rec);
  }

  // Rule: Missing caste certificate for student in MP with scholarship interest
  if (
    context.regionId === 'in-mp' &&
    context.userType === 'student' &&
    context.topCategories.includes('education') &&
    !hasDoc(context.existingDocumentTypes, 'caste_certificate')
  ) {
    recommendations.push(
      missingDocRecommendation(
        'caste_certificate',
        'Caste Certificate',
        'May be required for category-based scholarships in MP.',
        60,
      ),
    );
  }

  // Rule: Document expiry within 30 days
  for (const deadline of context.upcomingDeadlines) {
    const daysUntil = Math.ceil(
      (new Date(deadline.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    if (daysUntil <= EXPIRY_WARNING_DAYS && daysUntil >= 0) {
      recommendations.push({
        id: nextId(),
        type: 'reminder',
        priority: daysUntil <= 7 ? 'high' : 'medium',
        title: `Renew or review: ${deadline.title}`,
        description: `This item expires in ${daysUntil} day(s).`,
        actionLabel: 'Set reminder',
        reason: 'Document or deadline approaching expiry.',
        score: 95 - daysUntil,
        reminderSuggestion: {
          title: `Review ${deadline.title}`,
          type: 'document_expiry',
          suggestedDaysFromNow: Math.max(1, daysUntil - 3),
          reason: 'Advance notice before expiry',
        },
      });
    }
  }

  // Rule: Farmer → income certificate for schemes
  if (context.userType === 'farmer' && !hasDoc(context.existingDocumentTypes, 'income_certificate')) {
    const rec =
      taskRecommendation(
        context.regionId === 'in-mp' ? 'mp-income-certificate' : 'in-national-document-pack',
        'Income certificate helps with agricultural and welfare scheme applications.',
        55,
      ) ??
      missingDocRecommendation('income_certificate', 'Income Certificate', 'Useful for scheme eligibility.', 50);
    recommendations.push(rec);
  }

  // Rule: Gig worker missing PAN
  if (context.userType === 'gig_worker' && !hasDoc(context.existingDocumentTypes, 'pan')) {
    recommendations.push(
      missingDocRecommendation('pan', 'PAN Card', 'Often required for gig platform payouts and tax records.', 72),
    );
  }

  // Rule: Family manager with no family pack started
  if (
    context.userType === 'family_manager' &&
    context.familyMemberCount > 1 &&
    !context.activeTaskTemplateIds.includes('in-family-pack')
  ) {
    const rec = taskRecommendation(
      'in-family-pack',
      'Organize documents and reminders across your family.',
      68,
    );
    if (rec) recommendations.push(rec);
  }

  // Deduplicate by title, sort by score
  const seen = new Set<string>();
  const unique = recommendations
    .filter((r) => {
      const key = `${r.type}-${r.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return {
    recommendations: unique,
    generatedAt: new Date().toISOString(),
  };
}

export { generateRecommendations as recommend };
