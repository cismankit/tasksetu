import type { TaskTemplate, TaskSearchQuery } from '../types/task';
import { INDIA_NATIONAL_TEMPLATES } from './templates/india-national';
import { MP_REGIONAL_TEMPLATES } from './templates/mp-regional';

export const ALL_TEMPLATES: TaskTemplate[] = [
  ...INDIA_NATIONAL_TEMPLATES,
  ...MP_REGIONAL_TEMPLATES,
];

export function getTemplateById(id: string): TaskTemplate | undefined {
  return ALL_TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesForRegion(regionId: string): TaskTemplate[] {
  if (regionId === 'in-mp') {
    return ALL_TEMPLATES.filter((t) => t.country === 'IN' && (t.state === 'MP' || !t.state));
  }
  if (regionId === 'in') {
    return ALL_TEMPLATES.filter((t) => t.country === 'IN' && !t.state);
  }
  return ALL_TEMPLATES.filter((t) => !t.state);
}

export function searchTemplates(query: TaskSearchQuery): TaskTemplate[] {
  let results = ALL_TEMPLATES;

  if (query.regionId) {
    const regional = getTemplatesForRegion(query.regionId);
    results = regional;
  }

  if (query.category) {
    results = results.filter((t) => t.category === query.category);
  }

  if (query.userType) {
    results = results.filter((t) => t.supportedUserTypes.includes(query.userType!));
  }

  if (query.language) {
    results = results.filter((t) => t.language === query.language);
  }

  if (query.query?.trim()) {
    const q = query.query.toLowerCase();
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q)),
    );
  }

  return results;
}

export function getRegionPacks(regionId: string) {
  const templates = getTemplatesForRegion(regionId);
  return [
    {
      id: `${regionId}-pack`,
      regionId,
      name: regionId === 'in-mp' ? 'Madhya Pradesh Regional Pack' : 'India National Pack',
      description: 'Curated task templates for your region',
      templateIds: templates.map((t) => t.id),
      version: '1.0.0',
    },
  ];
}

export { INDIA_NATIONAL_TEMPLATES, MP_REGIONAL_TEMPLATES };
