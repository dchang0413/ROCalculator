<script setup lang="ts">
import { ref } from 'vue';
import type { BuildState, ModuleUiState } from '@/core/types';
import { cloneBuild } from '@/domain/buildFactory';
import { updateUrlShare } from '@/domain/share';

const props = defineProps<{
  build: BuildState;
  modules: ModuleUiState;
  savedBuilds: BuildState[];
}>();
const emit = defineEmits<{ save: [build: BuildState]; load: [build: BuildState]; remove: [id: string] }>();
const importText = ref('');

function downloadCurrent() {
  const blob = new Blob([JSON.stringify(props.build, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${props.build.name.replace(/\W+/g, '_') || 'ro-build'}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importBuild() {
  const parsed = JSON.parse(importText.value) as BuildState;
  emit('load', { ...parsed, id: parsed.id || crypto.randomUUID(), updatedAt: new Date().toISOString() });
  importText.value = '';
}

function shareUrl() {
  updateUrlShare({ build: props.build, modules: props.modules });
}
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-2">
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        <button class="focus-ring rounded-lg bg-ragnarok-gold px-4 py-2 font-semibold text-slate-950" type="button" @click="emit('save', cloneBuild(build))">Save locally</button>
        <button class="focus-ring rounded-lg border border-white/10 px-4 py-2" type="button" @click="downloadCurrent">Download JSON</button>
        <button class="focus-ring rounded-lg border border-white/10 px-4 py-2" type="button" @click="shareUrl">Write share URL</button>
      </div>
      <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
        <h3 class="font-semibold text-white">Local builds</h3>
        <div class="mt-3 space-y-2">
          <article v-for="saved in savedBuilds" :key="saved.id" class="flex items-center justify-between gap-3 rounded-lg bg-white/5 p-3">
            <div><strong>{{ saved.name }}</strong><p class="text-xs text-slate-500">{{ new Date(saved.updatedAt).toLocaleString() }}</p></div>
            <div class="flex gap-2"><button class="focus-ring rounded border border-white/10 px-3 py-1 text-sm" type="button" @click="emit('load', saved)">Load</button><button class="focus-ring rounded border border-red-400/30 px-3 py-1 text-sm text-red-200" type="button" @click="emit('remove', saved.id)">Delete</button></div>
          </article>
          <p v-if="!savedBuilds.length" class="text-sm text-slate-400">No local saves yet.</p>
        </div>
      </div>
    </div>
    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
      <h3 class="font-semibold text-white">Import build JSON</h3>
      <textarea v-model="importText" class="focus-ring mt-3 h-64 w-full rounded-lg border border-white/10 bg-slate-950 p-3 font-mono text-xs" placeholder="Paste an exported build JSON here." />
      <button class="focus-ring mt-3 rounded-lg bg-white px-4 py-2 font-semibold text-slate-950 disabled:opacity-40" type="button" :disabled="!importText" @click="importBuild">Import JSON</button>
    </div>
  </div>
</template>
