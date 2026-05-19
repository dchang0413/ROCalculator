import type { BuildTemplate, EquipmentRecord, TemplateMetadata } from '@/core/types';

const templateModules = import.meta.glob('../../template/**/*.json', { eager: true, import: 'default' });
const defaultEquipmentModules = import.meta.glob('../../default_equip/*.json', { eager: true, import: 'default' });
const jobBonusModules = import.meta.glob('../../job_bonus/*.json', { eager: true, import: 'default' });
const thirdJobBonusModules = import.meta.glob('../../job_bonus_3rd/*.json', { eager: true, import: 'default' });

function normalizeTemplatePath(path: string) {
  return path.replace('../../template/', '').replaceAll('/', '\\');
}

function keyFromJsonPath(path: string) {
  return path.split('/').pop()?.replace('.json', '') ?? '';
}

export const templateMetadata = ((templateModules['../../template/metadata.json'] ?? []) as TemplateMetadata[])
  .slice()
  .sort((first, second) => first.class.localeCompare(second.class) || first.name.localeCompare(second.name));

export const templatesByFilename = Object.fromEntries(
  Object.entries(templateModules)
    .filter(([path]) => !path.endsWith('/metadata.json'))
    .map(([path, value]) => [normalizeTemplatePath(path), value as BuildTemplate]),
) as Record<string, BuildTemplate>;

export const defaultEquipmentByClass = Object.fromEntries(
  Object.entries(defaultEquipmentModules).map(([path, value]) => [keyFromJsonPath(path), value as EquipmentRecord[]]),
) as Record<string, EquipmentRecord[]>;

export const jobBonusByClass = Object.fromEntries(
  Object.entries(jobBonusModules).map(([path, value]) => [keyFromJsonPath(path), value as Record<string, number[]>]),
) as Record<string, Record<string, number[]>>;

export const thirdJobBonusByClass = Object.fromEntries(
  Object.entries(thirdJobBonusModules).map(([path, value]) => [keyFromJsonPath(path), value as Record<string, number[]>]),
) as Record<string, Record<string, number[]>>;

export function getTemplate(filename: string) {
  return templatesByFilename[filename];
}

export function classCodeFromFilename(filename?: string) {
  return filename?.split('\\')[0] ?? 'GEN';
}

export const classOptions = Array.from(new Set(templateMetadata.map((item) => item.class))).sort();
