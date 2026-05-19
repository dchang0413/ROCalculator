export type NumericMap = Record<string, number>;

export interface EffectType {
  id: string;
  label?: string;
}

export interface EffectRecord {
  EffectNumber: number | string;
  EffectType: EffectType;
  Enable?: boolean;
}

export interface ComboRecord {
  equipname?: string;
  itemid_every?: number[];
  itemid_any?: number[];
  effectlist?: EffectRecord[];
}

export interface EquipmentRecord {
  id?: string;
  itemid?: number;
  label?: string;
  equipname?: string;
  refinelevel?: number;
  grade?: { id?: number; label?: string };
  effectlist?: EffectRecord[];
  combolist?: ComboRecord[];
  weapon?: Record<string, unknown>;
  availableEnchants?: unknown[];
}

export interface CharacterStatus {
  BaseLevel: number;
  JobLevel: number;
  STR: number;
  AGI: number;
  VIT: number;
  INT: number;
  DEX: number;
  LUK: number;
  POW: number;
  STA: number;
  WIS: number;
  SPL: number;
  CON: number;
  CRT: number;
  Transcendent?: boolean;
}

export interface EnemyStatus {
  Name?: string;
  Race?: string;
  Size?: string;
  Element?: string;
  ElementLevel?: number;
  Level?: number;
  DEF?: number;
  MDEF?: number;
  RES?: number;
  MRES?: number;
  GreenAura?: number;
  [key: string]: unknown;
}

export interface SkillOption {
  SkillName?: string;
  SkillPercent?: number | string;
  EquipSkillAddDamage?: number | string;
  WeaponMasteryATK?: number | string;
  [key: string]: unknown;
}

export interface ConsumableRecord {
  id?: string;
  label?: string;
  effectlist?: EffectRecord[];
  Enable?: boolean;
  [key: string]: unknown;
}

export interface BuildTemplate {
  Name?: string;
  Equip?: EquipmentRecord[];
  Weapon?: Record<string, unknown>;
  SubWeapon?: Record<string, unknown>;
  Status?: Partial<CharacterStatus>;
  JobStatus?: number[];
  SkillName?: string;
  Skill?: Record<string, unknown>;
  SkillOption?: SkillOption;
  Option?: Record<string, unknown>;
  EnemyName?: string;
  Enemy?: EnemyStatus;
  Consumable?: ConsumableRecord[];
  SupportSkill?: unknown[];
  Damage?: string | number;
  DamageDPS?: string | number;
  NormalAttackDPS?: string | number;
  SkillDamageAvg?: string | number;
  attribute?: NumericMap;
  computeattribute?: NumericMap;
}

export interface TemplateMetadata {
  filename: string;
  name: string;
  level: number;
  class: string;
  skill: string;
  enemy: string;
  damage: string;
  dps: string;
  lastupdate: string;
}

export interface BuildState {
  id: string;
  name: string;
  className: string;
  templateFilename?: string;
  status: CharacterStatus;
  enemy: EnemyStatus;
  skill: SkillOption;
  equipment: EquipmentRecord[];
  consumables: ConsumableRecord[];
  supportSkills: unknown[];
  attributes: NumericMap;
  computeAttributes: NumericMap;
  referenceDamage?: string | number;
  referenceDps?: string | number;
  updatedAt: string;
}

export interface ModuleDefinition {
  id: string;
  title: string;
  description: string;
  defaultEnabled: boolean;
  defaultExpanded: boolean;
}

export interface ModuleUiState {
  enabled: Record<string, boolean>;
  expanded: Record<string, boolean>;
}

export interface CalculationBreakdown {
  label: string;
  value: string;
  note?: string;
}

export interface CalculationResult {
  averageDamage: number;
  dps: number;
  normalAttackDps: number;
  hitCount: number;
  castTime: number;
  afterCastDelay: number;
  attackDelay: number;
  breakdown: CalculationBreakdown[];
}
