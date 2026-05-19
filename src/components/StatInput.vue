<script setup lang="ts">
defineProps<{ label: string; modelValue: number; min?: number; max?: number }>();
const emit = defineEmits<{ 'update:modelValue': [value: number] }>();
</script>

<template>
  <label class="block">
    <span class="text-xs font-medium uppercase tracking-wide text-slate-400">{{ label }}</span>
    <input
      class="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
      type="number"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    >
  </label>
</template>
