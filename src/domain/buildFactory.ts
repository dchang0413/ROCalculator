import type { BuildState, BuildTemplate, CharacterStatus } from '@/core/types';
import { classCodeFromFilename, defaultEquipmentByClass } from '@/data/repository';

export const statKeys = ['STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK', 'POW', 'STA', 'WIS', 'SPL', 'CON', 'CRT'] as const;

const defaultStatus: CharacterStatus = {
  BaseLevel: 250,
  JobLevel: 70,
  STR: 1,
  AGI: 1,
  VIT: 1,
  INT: 1,
  DEX: 1,
  LUK: 1,
  POW: 0,
  STA: 0,
  WIS: 0,
  SPL: 0,
  CON: 0,
  CRT: 0,
  Transcendent: true,
};

export function createBlankBuild(): BuildState {
  return {
    id: crypto.randomUUID(),
    name: 'New build',
    className: 'Generic Adventurer',
    status: { ...defaultStatus },
    enemy: {
      Name: 'Training Target',
      Race: 'Formless',
      Size: 'Medium',
      Element: 'Neutral',
      ElementLevel: 1,
      Level: 250,
      DEF: 0,
      MDEF: 0,
      RES: 0,
      MRES: 0,
      GreenAura: 0,
    },
    skill: {
      SkillName: 'Normal Attack',
      SkillPercent: 100,
      EquipSkillAddDamage: 0,
      WeaponMasteryATK: 0,
    },
    equipment: [],
    consumables: [],
    supportSkills: [],
    attributes: {},
    computeAttributes: {},
    updatedAt: new Date().toISOString(),
  };
}

export function createBuildFromTemplate(template: BuildTemplate, filename?: string): BuildState {
  const fallback = createBlankBuild();
  const classCode = classCodeFromFilename(filename);

  return {
    ...fallback,
    id: crypto.randomUUID(),
    name: template.Name || fallback.name,
    className: filename ? classCode : fallback.className,
    templateFilename: filename,
    status: { ...fallback.status, ...template.Status },
    enemy: { ...fallback.enemy, ...template.Enemy, Name: template.EnemyName || template.Enemy?.Name || fallback.enemy.Name },
    skill: {
      ...fallback.skill,
      ...template.SkillOption,
      SkillName: template.SkillName || template.SkillOption?.SkillName || fallback.skill.SkillName,
      SkillPercent: template.SkillOption?.SkillPercent ?? template.Option?.SkillPercent as number | string | undefined ?? fallback.skill.SkillPercent,
    },
    equipment: structuredClone(template.Equip || defaultEquipmentByClass[classCode] || []),
    consumables: structuredClone(template.Consumable || []),
    supportSkills: structuredClone(template.SupportSkill || []),
    attributes: { ...(template.attribute || {}) },
    computeAttributes: { ...(template.computeattribute || {}) },
    referenceDamage: template.Damage || template.SkillDamageAvg,
    referenceDps: template.DamageDPS,
    updatedAt: new Date().toISOString(),
  };
}

export function cloneBuild(build: BuildState): BuildState {
  return structuredClone({ ...build, id: crypto.randomUUID(), updatedAt: new Date().toISOString() });
}
