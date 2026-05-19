import type { BuildState, CalculationResult, EffectRecord, EquipmentRecord, NumericMap } from '@/core/types';
import { statKeys } from '@/domain/buildFactory';

const percentageEffects = new Set(['AtkPercent', 'MatkPercent', 'SkillDamage', 'RaceAtkPercent', 'SizeAtkPercent', 'ElementalAtkPercent', 'MonsterAtkPercent']);
const additiveEffects = new Set(['ATK', 'Atk', 'MATK', 'Matk', 'POW', 'SPL', 'CON', 'CRT', 'STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK', 'PATK', 'SMATK']);

function toNumber(value: unknown, fallback = 0) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const cleaned = value.replaceAll(',', '').trim();
    const parsed = Number(cleaned);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function safeFormulaNumber(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;
  const direct = toNumber(value, Number.NaN);
  if (Number.isFinite(direct)) return direct;

  // Formula support is intentionally conservative; non-numeric legacy formulas are kept visible but not executed.
  const arithmeticOnly = value.replace(/\s+/g, '');
  if (/^[\d()+\-*/%.]+$/.test(arithmeticOnly)) {
    const result = Function(`"use strict"; return (${arithmeticOnly});`)();
    return Number.isFinite(result) ? Number(result) : 0;
  }
  return 0;
}

function flattenEffects(equipment: EquipmentRecord[]) {
  const effects: EffectRecord[] = [];
  for (const item of equipment) {
    effects.push(...(item.effectlist || []));
    for (const combo of item.combolist || []) {
      effects.push(...(combo.effectlist || []));
    }
  }
  return effects.filter((effect) => effect.Enable !== false);
}

export function summarizeEquipmentEffects(equipment: EquipmentRecord[]) {
  const summary: NumericMap = {};
  for (const effect of flattenEffects(equipment)) {
    const id = effect.EffectType?.id;
    if (!id) continue;
    summary[id] = (summary[id] || 0) + safeFormulaNumber(effect.EffectNumber);
  }
  return summary;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}

export function calculateBuild(build: BuildState): CalculationResult {
  const equipmentEffects = summarizeEquipmentEffects(build.equipment);
  const attrs = { ...equipmentEffects, ...build.attributes, ...build.computeAttributes };
  const status = build.status;
  const skillPercent = toNumber(build.skill.SkillPercent, 100);
  const masteryAttack = toNumber(build.skill.WeaponMasteryATK, 0);
  const enemyDefense = Math.max(0, toNumber(build.enemy.DEF) + toNumber(build.enemy.RES));
  const greenAura = Math.max(0, toNumber(build.enemy.GreenAura));

  const baseStatAttack = status.STR * 2 + status.DEX + Math.floor(status.LUK / 3) + status.POW * 5 + status.CON * 2;
  const equipmentAttack = additiveEffectsArray(attrs).reduce((sum, key) => sum + toNumber(attrs[key]), 0);
  const rawAttack = Math.max(1, baseStatAttack + equipmentAttack + masteryAttack + toNumber(attrs.StatusATK));
  const percentBonus = percentageEffectsArray(attrs).reduce((sum, key) => sum + toNumber(attrs[key]), 0);
  const skillBonus = toNumber(build.skill.EquipSkillAddDamage) + percentBonus;
  const defenseMultiplier = 4000 / (4000 + enemyDefense * Math.max(0, 1 - toNumber(attrs.BYPASSDEF) / 100));
  const auraMultiplier = Math.pow(0.1, greenAura);
  const hitCount = Math.max(1, Math.round(toNumber((build.skill as Record<string, unknown>).hitnumber, 1)));
  const averageDamage = rawAttack * (skillPercent / 100) * (1 + skillBonus / 100) * defenseMultiplier * auraMultiplier * hitCount;

  const castTime = Math.max(0, 1 - (status.DEX * 2 + status.INT) / 530 - toNumber(attrs.VariableCastPercent) / 100);
  const afterCastDelay = Math.max(0.05, 1 - toNumber(attrs.GCDPercent) / 100 - toNumber(attrs.GCD) / 100);
  const attackDelay = Math.max(0.14, 2 - (status.AGI + status.DEX / 4) / 190 - toNumber(attrs.ASPD) / 100);
  const cycleTime = Math.max(0.14, castTime + afterCastDelay);
  const dps = averageDamage / cycleTime;
  const normalAttackDps = rawAttack / attackDelay;

  return {
    averageDamage,
    dps,
    normalAttackDps,
    hitCount,
    castTime,
    afterCastDelay,
    attackDelay,
    breakdown: [
      { label: 'Base stat attack', value: formatNumber(baseStatAttack), note: 'STR, DEX, LUK, POW, and CON contribution.' },
      { label: 'Equipment and attribute attack', value: formatNumber(equipmentAttack), note: 'Enabled numeric equipment effects and imported attribute bonuses.' },
      { label: 'Skill percent', value: `${formatNumber(skillPercent)}%` },
      { label: 'Skill and damage bonuses', value: `${formatNumber(skillBonus)}%` },
      { label: 'Defense multiplier', value: `${(defenseMultiplier * 100).toFixed(2)}%` },
      { label: 'Green aura multiplier', value: `${(auraMultiplier * 100).toFixed(4)}%` },
    ],
  };
}

function additiveEffectsArray(attrs: NumericMap) {
  return Object.keys(attrs).filter((key) => additiveEffects.has(key));
}

function percentageEffectsArray(attrs: NumericMap) {
  return Object.keys(attrs).filter((key) => percentageEffects.has(key) || key.endsWith('Percent'));
}

export { safeFormulaNumber, statKeys };
