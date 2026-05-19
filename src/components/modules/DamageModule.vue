<script setup lang="ts">
import { computed } from 'vue';
import type { BuildState } from '@/core/types';
import { calculateBuild, formatNumber } from '@/domain/calculator';

const props = defineProps<{ build: BuildState }>();
const result = computed(() => calculateBuild(props.build));
</script>

<template>
  <div class="space-y-5">
    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-xl border border-ragnarok-gold/30 bg-ragnarok-gold/10 p-4"><span class="text-sm text-ragnarok-gold">Estimated damage</span><strong class="mt-1 block text-2xl text-white">{{ formatNumber(result.averageDamage) }}</strong></div>
      <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4"><span class="text-sm text-slate-400">Estimated DPS</span><strong class="mt-1 block text-2xl text-white">{{ formatNumber(result.dps) }}</strong></div>
      <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4"><span class="text-sm text-slate-400">Normal attack DPS</span><strong class="mt-1 block text-2xl text-white">{{ formatNumber(result.normalAttackDps) }}</strong></div>
    </div>
    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
      <h3 class="font-semibold text-white">Preset reference</h3>
      <p class="mt-2 text-sm text-slate-400">When a preset contains original calculated numbers, they remain visible as the authoritative legacy reference while the new engine is evolved.</p>
      <div class="mt-3 grid gap-3 md:grid-cols-2"><div>Damage: <strong>{{ build.referenceDamage || 'Not available' }}</strong></div><div>DPS: <strong>{{ build.referenceDps || 'Not available' }}</strong></div></div>
    </div>
    <div class="overflow-hidden rounded-xl border border-white/10">
      <table class="w-full text-left text-sm">
        <thead class="bg-white/5 text-slate-400"><tr><th class="px-4 py-3">Step</th><th class="px-4 py-3">Value</th><th class="px-4 py-3">Note</th></tr></thead>
        <tbody>
          <tr v-for="step in result.breakdown" :key="step.label" class="border-t border-white/10"><td class="px-4 py-3 font-medium text-white">{{ step.label }}</td><td class="px-4 py-3">{{ step.value }}</td><td class="px-4 py-3 text-slate-400">{{ step.note }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
