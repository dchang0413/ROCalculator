<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BuildState } from '@/core/types';
import { createBuildFromTemplate } from '@/domain/buildFactory';
import { getTemplate, templateMetadata } from '@/data/repository';

const emit = defineEmits<{ load: [build: BuildState] }>();
const selectedClass = ref('');
const selectedFilename = ref(templateMetadata[0]?.filename ?? '');
const query = ref('');

const classes = computed(() => Array.from(new Set(templateMetadata.map((item) => item.class))).sort());
const filtered = computed(() => templateMetadata.filter((item) => {
  const matchesClass = !selectedClass.value || item.class === selectedClass.value;
  const text = `${item.name} ${item.class} ${item.skill} ${item.enemy}`.toLowerCase();
  return matchesClass && text.includes(query.value.toLowerCase());
}));
const selected = computed(() => templateMetadata.find((item) => item.filename === selectedFilename.value));

function loadSelected() {
  const template = getTemplate(selectedFilename.value);
  if (template) emit('load', createBuildFromTemplate(template, selectedFilename.value));
}
</script>

<template>
  <div class="grid gap-5 xl:grid-cols-[1fr_22rem]">
    <div class="space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <label class="block">
          <span class="text-xs font-medium uppercase tracking-wide text-slate-400">Class</span>
          <select v-model="selectedClass" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm">
            <option value="">All classes</option>
            <option v-for="className in classes" :key="className" :value="className">{{ className }}</option>
          </select>
        </label>
        <label class="block md:col-span-2">
          <span class="text-xs font-medium uppercase tracking-wide text-slate-400">Search</span>
          <input v-model="query" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm" placeholder="Search build, skill, enemy, or class">
        </label>
      </div>
      <div class="max-h-96 overflow-auto rounded-xl border border-white/10">
        <button
          v-for="preset in filtered"
          :key="preset.filename"
          class="focus-ring grid w-full gap-1 border-b border-white/10 px-4 py-3 text-left last:border-b-0 hover:bg-white/5"
          :class="preset.filename === selectedFilename ? 'bg-ragnarok-gold/10' : ''"
          type="button"
          @click="selectedFilename = preset.filename"
        >
          <span class="font-semibold text-white">{{ preset.name }}</span>
          <span class="text-sm text-slate-300">{{ preset.class }} · {{ preset.skill }} · {{ preset.enemy }}</span>
          <span class="text-xs text-slate-500">Damage {{ preset.damage }} · DPS {{ preset.dps }}</span>
        </button>
      </div>
    </div>
    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
      <h3 class="font-semibold text-white">Selected preset</h3>
      <dl v-if="selected" class="mt-4 space-y-3 text-sm">
        <div><dt class="text-slate-500">Build</dt><dd>{{ selected.name }}</dd></div>
        <div><dt class="text-slate-500">Class</dt><dd>{{ selected.class }}</dd></div>
        <div><dt class="text-slate-500">Skill</dt><dd>{{ selected.skill }}</dd></div>
        <div><dt class="text-slate-500">Enemy</dt><dd>{{ selected.enemy }}</dd></div>
        <div><dt class="text-slate-500">Updated</dt><dd>{{ new Date(selected.lastupdate).toLocaleDateString() }}</dd></div>
      </dl>
      <button class="focus-ring mt-5 w-full rounded-lg bg-ragnarok-gold px-4 py-2 font-semibold text-slate-950" type="button" @click="loadSelected">Load preset</button>
    </div>
  </div>
</template>
