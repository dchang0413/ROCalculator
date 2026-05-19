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

const shared = readUrlShare();
const build = ref<BuildState>(shared?.build ?? createBlankBuild());
const moduleState = ref<ModuleUiState>(shared?.modules ?? readStoredModules());
const savedBuilds = ref<BuildState[]>(readStoredBuilds());

const activeModules = computed(() => moduleDefinitions.filter((module) => moduleState.value.enabled[module.id]));

watch(moduleState, (value) => localStorage.setItem('rocalculator.modules', JSON.stringify(value)), { deep: true });
watch(savedBuilds, (value) => localStorage.setItem('rocalculator.builds', JSON.stringify(value)), { deep: true });
watch(build, (value) => { value.updatedAt = new Date().toISOString(); }, { deep: true });

function readStoredModules() {
  const stored = localStorage.getItem('rocalculator.modules');
  return stored ? { ...createDefaultModuleState(), ...JSON.parse(stored) } as ModuleUiState : createDefaultModuleState();
}

function readStoredBuilds() {
  const stored = localStorage.getItem('rocalculator.builds');
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
      <ModuleSettings :modules="moduleDefinitions" :state="moduleState" @update="moduleState = $event" />

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
