<script setup lang="ts">
import type { ModuleDefinition, ModuleUiState } from '@/core/types';

const props = defineProps<{
  id?: string;
  modules: ModuleDefinition[];
  state: ModuleUiState;
}>();

const emit = defineEmits<{ close: []; update: [state: ModuleUiState] }>();

function setEnabled(id: string, value: boolean) {
  emit('update', { ...props.state, enabled: { ...props.state.enabled, [id]: value } });
}

function setExpanded(id: string, value: boolean) {
  emit('update', { ...props.state, expanded: { ...props.state.expanded, [id]: value } });
}

function enableAll() {
  emit('update', {
    enabled: Object.fromEntries(props.modules.map((module) => [module.id, true])),
    expanded: Object.fromEntries(props.modules.map((module) => [module.id, true])),
  });
}

function compactAll() {
  emit('update', {
    enabled: Object.fromEntries(props.modules.map((module) => [module.id, true])),
    expanded: Object.fromEntries(props.modules.map((module) => [module.id, false])),
  });
}
</script>

<template>
  <aside :id="id" class="rounded-2xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl shadow-black/30">
    <div class="flex items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold text-white">Module settings</h2>
        <p class="text-sm text-slate-400">Enable only the blocks you want and choose how each one opens.</p>
      </div>
      <button class="cursor-pointer focus-ring rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300" type="button" @click="emit('close')">Close</button>
    </div>
    <div class="mt-4 flex flex-wrap gap-2">
      <button class="focus-ring rounded-lg bg-ragnarok-gold px-3 py-2 text-sm font-semibold text-slate-950" type="button" @click="enableAll">Open all</button>
      <button class="focus-ring rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200" type="button" @click="compactAll">Compact</button>
    </div>
    <div class="mt-4 grid max-h-[65vh] gap-3 overflow-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
      <label v-for="module in modules" :key="module.id" class="rounded-xl border border-white/10 bg-slate-950/70 p-3">
        <span class="flex items-start gap-3">
          <input class="mt-1 accent-ragnarok-gold" type="checkbox" :checked="state.enabled[module.id]" @change="setEnabled(module.id, ($event.target as HTMLInputElement).checked)">
          <span>
            <span class="block font-medium text-white">{{ module.title }}</span>
            <span class="block text-xs text-slate-400">{{ module.description }}</span>
          </span>
        </span>
        <button class="focus-ring mt-3 rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-300" type="button" @click="setExpanded(module.id, !state.expanded[module.id])">
          {{ state.expanded[module.id] ? 'Start collapsed' : 'Start expanded' }}
        </button>
      </label>
    </div>
  </aside>
</template>
