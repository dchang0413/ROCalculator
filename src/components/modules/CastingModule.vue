<script setup lang="ts">
import { computed } from 'vue';
import type { BuildState } from '@/core/types';
import { calculateBuild } from '@/domain/calculator';

const props = defineProps<{ build: BuildState }>();
const result = computed(() => calculateBuild(props.build));
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4"><span class="text-sm text-slate-400">Variable cast estimate</span><strong class="mt-1 block text-2xl text-white">{{ result.castTime.toFixed(3) }}s</strong></div>
    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4"><span class="text-sm text-slate-400">After-cast / GCD estimate</span><strong class="mt-1 block text-2xl text-white">{{ result.afterCastDelay.toFixed(3) }}s</strong></div>
    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4"><span class="text-sm text-slate-400">Attack delay estimate</span><strong class="mt-1 block text-2xl text-white">{{ result.attackDelay.toFixed(3) }}s</strong></div>
  </div>
</template>
