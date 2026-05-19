<script setup lang="ts">
import StatInput from '@/components/StatInput.vue';
import type { BuildState } from '@/core/types';

defineProps<{ build: BuildState }>();
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-[1fr_24rem]">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block md:col-span-2">
        <span class="text-xs font-medium uppercase tracking-wide text-slate-400">Selected skill</span>
        <input v-model="build.skill.SkillName" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm">
      </label>
      <StatInput v-model="build.skill.SkillPercent as number" label="Skill percent" :min="0" />
      <StatInput v-model="build.skill.EquipSkillAddDamage as number" label="Equipment skill modifier %" />
      <StatInput v-model="build.skill.WeaponMasteryATK as number" label="Mastery ATK" />
    </div>
    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
      <h3 class="font-semibold text-white">Raw skill settings</h3>
      <p class="mt-2 text-sm text-slate-400">Non-numeric legacy fields are preserved here so old build files still round-trip safely.</p>
      <pre class="mt-3 max-h-64 overflow-auto rounded-lg bg-black/30 p-3 text-xs text-slate-300">{{ build.skill }}</pre>
    </div>
  </div>
</template>
