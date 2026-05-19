<script setup lang="ts">
import type { BuildState } from '@/core/types';

defineProps<{ build: BuildState }>();
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-2">
    <div>
      <h3 class="font-semibold text-white">Consumables</h3>
      <div class="mt-3 max-h-80 space-y-3 overflow-auto pr-2">
        <article v-for="(item, index) in build.consumables" :key="`${item.id}-${index}`" class="rounded-xl border border-white/10 bg-slate-950/70 p-3">
          <div class="flex items-center justify-between gap-3"><strong>{{ item.label || item.id || `Consumable ${index + 1}` }}</strong><span class="text-xs text-slate-500">{{ item.Enable === false ? 'Disabled' : 'Enabled' }}</span></div>
          <pre class="mt-2 overflow-auto rounded bg-black/30 p-2 text-xs text-slate-300">{{ item.effectlist || item }}</pre>
        </article>
        <p v-if="!build.consumables.length" class="text-sm text-slate-400">This build does not include consumables.</p>
      </div>
    </div>
    <div>
      <h3 class="font-semibold text-white">Support skills and buffs</h3>
      <pre class="mt-3 max-h-80 overflow-auto rounded-xl border border-white/10 bg-slate-950/70 p-3 text-xs text-slate-300">{{ build.supportSkills }}</pre>
    </div>
  </div>
</template>
