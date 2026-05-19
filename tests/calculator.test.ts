import { describe, expect, it } from 'vitest';
import type { BuildState } from '@/core/types';
import { createBlankBuild } from '@/domain/buildFactory';
import { calculateBuild, safeFormulaNumber, summarizeEquipmentEffects } from '@/domain/calculator';

function sampleBuild(): BuildState {
  const build = createBlankBuild();
  build.status.STR = 120;
  build.status.DEX = 90;
  build.status.POW = 100;
  build.skill.SkillPercent = 500;
  build.skill.EquipSkillAddDamage = 50;
  build.skill.WeaponMasteryATK = 100;
  build.enemy.DEF = 100;
  build.equipment = [{
    equipname: 'Test Sword',
    effectlist: [
      { EffectNumber: 200, EffectType: { id: 'ATK' }, Enable: true },
      { EffectNumber: 25, EffectType: { id: 'AtkPercent' }, Enable: true },
      { EffectNumber: 999, EffectType: { id: 'ATK' }, Enable: false },
    ],
  }];
  return build;
}

describe('calculator domain', () => {
  it('summarizes only enabled numeric equipment effects', () => {
    expect(summarizeEquipmentEffects(sampleBuild().equipment)).toMatchObject({ ATK: 200, AtkPercent: 25 });
  });

  it('evaluates arithmetic-only formulas and rejects legacy symbolic expressions', () => {
    expect(safeFormulaNumber('10 + 5 * 2')).toBe(20);
    expect(safeFormulaNumber('SWEAR>10?70:0')).toBe(0);
  });

  it('calculates a positive transparent damage result', () => {
    const result = calculateBuild(sampleBuild());
    expect(result.averageDamage).toBeGreaterThan(0);
    expect(result.dps).toBeGreaterThan(0);
    expect(result.breakdown.map((step) => step.label)).toContain('Skill percent');
  });
});
