import type { ModuleDefinition, ModuleUiState } from '@/core/types';

export const moduleDefinitions: ModuleDefinition[] = [
  { id: 'presets', title: 'Presets', description: 'Load published build presets and compare the saved reference numbers.', defaultEnabled: true, defaultExpanded: true },
  { id: 'character', title: 'Character Status', description: 'Manage class context, levels, primary stats, trait stats, and job bonuses.', defaultEnabled: true, defaultExpanded: true },
  { id: 'target', title: 'Target / Enemy', description: 'Tune the enemy race, size, element, defensive stats, and green aura.', defaultEnabled: true, defaultExpanded: false },
  { id: 'consumables', title: 'Consumables & Buffs', description: 'Inspect consumable effects and support skills that are saved with builds.', defaultEnabled: true, defaultExpanded: false },
  { id: 'skills', title: 'Skill', description: 'Select and adjust the active skill, skill percent, mastery attack, and skill modifiers.', defaultEnabled: true, defaultExpanded: true },
  { id: 'equipment', title: 'Equipment', description: 'Review equipment, cards, enchants, refine levels, effects, and combo information.', defaultEnabled: true, defaultExpanded: false },
  { id: 'damage', title: 'Damage Calculation', description: 'See the modern calculation estimate and the original preset reference side by side.', defaultEnabled: true, defaultExpanded: true },
  { id: 'casting', title: 'Casting & Delay', description: 'Review cast time, global cooldown, after-cast delay, and attack-delay estimates.', defaultEnabled: true, defaultExpanded: false },
  { id: 'saves', title: 'Save / Load', description: 'Persist builds locally, export JSON, import JSON, and share the build through the URL.', defaultEnabled: true, defaultExpanded: false },
  { id: 'faq', title: 'FAQ / How to use', description: 'In-app help for common workflows and calculator concepts.', defaultEnabled: true, defaultExpanded: false },
];

export function createDefaultModuleState(): ModuleUiState {
  return {
    enabled: Object.fromEntries(moduleDefinitions.map((module) => [module.id, module.defaultEnabled])),
    expanded: Object.fromEntries(moduleDefinitions.map((module) => [module.id, module.defaultExpanded])),
  };
}
