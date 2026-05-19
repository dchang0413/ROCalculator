<script setup lang="ts">
import { computed } from 'vue';
import StatInput from '@/components/StatInput.vue';
import type { BuildState } from '@/core/types';
import { classCodeFromFilename, jobBonusByClass, thirdJobBonusByClass } from '@/data/repository';
import { statKeys } from '@/domain/buildFactory';

const props = defineProps<{ build: BuildState }>();

const jobBonus = computed(() => {
  const code = classCodeFromFilename(props.build.templateFilename);
  const regular = jobBonusByClass[code]?.[String(props.build.status.JobLevel)] || [];
  const third = thirdJobBonusByClass[code]?.[String(Math.min(props.build.status.JobLevel, 70))] || [];
  return { regular, third };
});
</script>

<template>
  <div class="space-y-5">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-xs font-medium uppercase tracking-wide text-slate-400">Build name</span>
        <input v-model="build.name" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm">
      </label>
      <StatInput v-model="build.status.BaseLevel" label="Base level" :min="1" :max="275" />
      <StatInput v-model="build.status.JobLevel" label="Job level" :min="1" :max="70" />
    </div>
    <div>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-400">Base stats and trait stats</h3>
      <div class="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <StatInput v-for="key in statKeys" :key="key" v-model="build.status[key]" :label="key" :min="0" :max="key.length === 3 ? 130 : 500" />
      </div>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
        <h3 class="font-semibold text-white">Expanded status</h3>
        <p class="mt-2 text-sm text-slate-400">The current build keeps raw template attributes intact while the modern estimate reads stats and numeric effects.</p>
        <pre class="mt-3 max-h-48 overflow-auto rounded-lg bg-black/30 p-3 text-xs text-slate-300">{{ build.attributes }}</pre>
      </div>
      <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
        <h3 class="font-semibold text-white">Job bonus</h3>
        <p class="mt-2 text-sm text-slate-400">Regular and third-job bonus tables are loaded from the preserved data files for the selected class.</p>
        <div class="mt-3 grid gap-3 text-sm md:grid-cols-2">
          <div><span class="text-slate-500">Regular</span><pre class="mt-1 rounded bg-black/30 p-2">{{ jobBonus.regular }}</pre></div>
          <div><span class="text-slate-500">Third / extended</span><pre class="mt-1 rounded bg-black/30 p-2">{{ jobBonus.third }}</pre></div>
        </div>
      </div>
    </div>
  </div>
</template>
