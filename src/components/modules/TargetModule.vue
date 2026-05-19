<script setup lang="ts">
import StatInput from '@/components/StatInput.vue';
import type { BuildState } from '@/core/types';

defineProps<{ build: BuildState }>();
const races = ['Formless', 'Undead', 'Brute', 'Plant', 'Insect', 'Fish', 'Demon', 'Demi-Human', 'Angel', 'Dragon'];
const sizes = ['Small', 'Medium', 'Large'];
const elements = ['Neutral', 'Water', 'Earth', 'Fire', 'Wind', 'Poison', 'Holy', 'Dark', 'Ghost', 'Undead'];
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-3">
    <label class="block lg:col-span-3">
      <span class="text-xs font-medium uppercase tracking-wide text-slate-400">Target name</span>
      <input v-model="build.enemy.Name" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm">
    </label>
    <label class="block"><span class="text-xs font-medium uppercase tracking-wide text-slate-400">Race</span><select v-model="build.enemy.Race" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"><option v-for="race in races" :key="race">{{ race }}</option></select></label>
    <label class="block"><span class="text-xs font-medium uppercase tracking-wide text-slate-400">Size</span><select v-model="build.enemy.Size" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"><option v-for="size in sizes" :key="size">{{ size }}</option></select></label>
    <label class="block"><span class="text-xs font-medium uppercase tracking-wide text-slate-400">Element</span><select v-model="build.enemy.Element" class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"><option v-for="element in elements" :key="element">{{ element }}</option></select></label>
    <StatInput v-model="build.enemy.Level as number" label="Enemy level" :min="1" :max="999" />
    <StatInput v-model="build.enemy.DEF as number" label="DEF" :min="0" />
    <StatInput v-model="build.enemy.MDEF as number" label="MDEF" :min="0" />
    <StatInput v-model="build.enemy.RES as number" label="RES" :min="0" />
    <StatInput v-model="build.enemy.MRES as number" label="MRES" :min="0" />
    <StatInput v-model="build.enemy.GreenAura as number" label="Green aura" :min="0" :max="5" />
  </div>
</template>
