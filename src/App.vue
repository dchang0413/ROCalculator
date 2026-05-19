<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import CollapsibleModule from '@/components/CollapsibleModule.vue';
import ModuleSettings from '@/components/ModuleSettings.vue';
import CastingModule from '@/components/modules/CastingModule.vue';
import CharacterModule from '@/components/modules/CharacterModule.vue';
import ConsumablesModule from '@/components/modules/ConsumablesModule.vue';
import DamageModule from '@/components/modules/DamageModule.vue';
import EquipmentModule from '@/components/modules/EquipmentModule.vue';
import FaqModule from '@/components/modules/FaqModule.vue';
import PresetsModule from '@/components/modules/PresetsModule.vue';
import SavesModule from '@/components/modules/SavesModule.vue';
import SkillModule from '@/components/modules/SkillModule.vue';
import TargetModule from '@/components/modules/TargetModule.vue';
import type { BuildState, ModuleUiState } from '@/core/types';
import { createBlankBuild } from '@/domain/buildFactory';
import { createDefaultModuleState, moduleDefinitions } from '@/domain/modules';
import { readUrlShare } from '@/domain/share';

const storage = resolveStorage();
const shared = readUrlShare();
const build = ref<BuildState>(shared?.build ?? createBlankBuild());
const moduleState = ref<ModuleUiState>(shared?.modules ?? readStoredModules());
const savedBuilds = ref<BuildState[]>(readStoredBuilds());
const isSettingsOpen = ref(false);

const activeModules = computed(() => moduleDefinitions.filter((module) => moduleState.value.enabled[module.id]));

watch(moduleState, (value) => {
  storage?.setItem('rocalculator.modules', JSON.stringify(value));
}, { deep: true });
watch(savedBuilds, (value) => {
  storage?.setItem('rocalculator.builds', JSON.stringify(value));
}, { deep: true });
watch(build, (value) => { value.updatedAt = new Date().toISOString(); }, { deep: true });

function resolveStorage() {
  if (typeof globalThis.localStorage?.getItem !== 'function' || typeof globalThis.localStorage?.setItem !== 'function') {
    return undefined;
  }
  return globalThis.localStorage;
}

function readStoredModules() {
  const stored = storage?.getItem('rocalculator.modules');
  return stored ? { ...createDefaultModuleState(), ...JSON.parse(stored) } as ModuleUiState : createDefaultModuleState();
}

function readStoredBuilds() {
  const stored = storage?.getItem('rocalculator.builds');
  return stored ? JSON.parse(stored) as BuildState[] : [];
}

function loadBuild(nextBuild: BuildState) {
  build.value = structuredClone(nextBuild);
}

function saveBuild(nextBuild: BuildState) {
  savedBuilds.value = [nextBuild, ...savedBuilds.value.filter((item) => item.id !== nextBuild.id)].slice(0, 25);
}

function removeBuild(id: string) {
  savedBuilds.value = savedBuilds.value.filter((item) => item.id !== id);
}

function toggleModule(id: string) {
  moduleState.value.expanded[id] = !moduleState.value.expanded[id];
}
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(246,195,95,0.16),_transparent_34rem),linear-gradient(180deg,#020617,#0f172a)]">
    <button
      aria-controls="module-settings-panel"
      :aria-expanded="isSettingsOpen"
      class="cursor-pointer focus-ring fixed right-4 top-4 z-50 rounded-full border border-white/20 bg-slate-900/85 p-2 text-slate-200 shadow-lg shadow-black/30 transition hover:bg-slate-800"
      type="button"
      @click="isSettingsOpen = !isSettingsOpen"
    >
      <span class="sr-only">Toggle module settings</span>
      <svg aria-hidden="true" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.542-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.542-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.542.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.542.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    </button>

    <transition name="fade-slide">
      <div v-if="isSettingsOpen" class="fixed inset-0 z-40 bg-slate-950/45 px-4 py-20 sm:px-6" @click.self="isSettingsOpen = false">
        <div class="mx-auto max-w-5xl">
          <ModuleSettings id="module-settings-panel" :modules="moduleDefinitions" :state="moduleState" @close="isSettingsOpen = false" @update="moduleState = $event" />
        </div>
      </div>
    </transition>

    <header class="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.35em] text-ragnarok-gold">iRO Wiki Calculator</p>
        <div class="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 class="text-4xl font-black tracking-tight text-white sm:text-5xl">RO Calculator, rebuilt</h1>
            <p class="mt-3 max-w-3xl text-slate-300">A Vue 3 + Vite + TypeScript application with Tailwind CSS v4, modular collapsible blocks, local saves, URL sharing, preserved preset data, and a deployment-ready GitHub Pages build.</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <div class="text-slate-500">Current build</div>
            <strong class="block text-lg text-white">{{ build.name }}</strong>
            <span>{{ build.skill.SkillName }} vs {{ build.enemy.Name }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <CollapsibleModule
        v-for="module in activeModules"
        :id="module.id"
        :key="module.id"
        :title="module.title"
        :description="module.description"
        :expanded="moduleState.expanded[module.id]"
        @toggle="toggleModule"
      >
        <PresetsModule v-if="module.id === 'presets'" @load="loadBuild" />
        <CharacterModule v-else-if="module.id === 'character'" :build="build" />
        <TargetModule v-else-if="module.id === 'target'" :build="build" />
        <ConsumablesModule v-else-if="module.id === 'consumables'" :build="build" />
        <SkillModule v-else-if="module.id === 'skills'" :build="build" />
        <EquipmentModule v-else-if="module.id === 'equipment'" :build="build" />
        <DamageModule v-else-if="module.id === 'damage'" :build="build" />
        <CastingModule v-else-if="module.id === 'casting'" :build="build" />
        <SavesModule v-else-if="module.id === 'saves'" :build="build" :modules="moduleState" :saved-builds="savedBuilds" @save="saveBuild" @load="loadBuild" @remove="removeBuild" />
        <FaqModule v-else-if="module.id === 'faq'" />
      </CollapsibleModule>
    </main>
  </div>
</template>
