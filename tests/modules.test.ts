import { describe, expect, it } from 'vitest';
import { createDefaultModuleState, moduleDefinitions } from '@/domain/modules';

describe('module registry', () => {
  it('creates UI state for every registered module', () => {
    const state = createDefaultModuleState();
    expect(Object.keys(state.enabled).sort()).toEqual(moduleDefinitions.map((module) => module.id).sort());
    expect(state.enabled.damage).toBe(true);
  });
});
