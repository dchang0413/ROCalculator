<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BuildState } from '@/core/types';
import { summarizeEquipmentEffects } from '@/domain/calculator';

defineProps<{ build: BuildState }>();
const query = ref('');
const effectSummary = computed(() => (build: BuildState) => summarizeEquipmentEffects(build.equipment));
</script>

<template>
  <div class="space-y-5">
    <label class="block">
      <span class="text-xs font-medium uppercase tracking-wide text-slate-400">Filter equipment</span>
      <input v-model="query" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm" placeholder="Search by slot, item name, or id">
    </label>
    <div class="grid gap-4 xl:grid-cols-[1fr_22rem]">
      <div class="grid gap-3 md:grid-cols-2">
        <article
          v-for="(item, index) in build.equipment.filter((entry) => `${entry.label} ${entry.equipname} ${entry.itemid}`.toLowerCase().includes(query.toLowerCase()))"
          :key="`${item.id}-${item.itemid}-${index}`"
          class="rounded-xl border border-white/10 bg-slate-950/70 p-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div><h3 class="font-semibold text-white">{{ item.equipname || 'Empty slot' }}</h3><p class="text-sm text-slate-400">{{ item.label || item.id }} · Item {{ item.itemid || 'none' }}</p></div>
            <span class="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">+{{ item.refinelevel || item.weapon?.refinelevel || 0 }}</span>
          </div>
          <details class="mt-3">
            <summary class="cursor-pointer text-sm text-ragnarok-gold">Effects and combos</summary>
            <pre class="mt-2 max-h-56 overflow-auto rounded bg-black/30 p-2 text-xs text-slate-300">{{ { effects: item.effectlist, combos: item.combolist, weapon: item.weapon } }}</pre>
          </details>
        </article>
      </div>
      <aside class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
        <h3 class="font-semibold text-white">Equipment summary</h3>
        <p class="mt-2 text-sm text-slate-400">Enabled numeric effects are summarized for quick auditing.</p>
        <pre class="mt-3 max-h-96 overflow-auto rounded bg-black/30 p-3 text-xs text-slate-300">{{ effectSummary(build) }}</pre>
      </aside>
    </div>
  </div>
</template>
