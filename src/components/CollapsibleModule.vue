<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
  description: string;
  expanded: boolean;
}>();

const emit = defineEmits<{ toggle: [id: string] }>();
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl shadow-black/20">
    <button
      class="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/5"
      type="button"
      :aria-expanded="expanded"
      @click="emit('toggle', id)"
    >
      <span>
        <span class="block text-lg font-semibold text-white">{{ title }}</span>
        <span class="mt-1 block text-sm text-slate-400">{{ description }}</span>
      </span>
      <span class="rounded-full border border-white/10 px-3 py-1 text-sm text-ragnarok-gold">
        {{ expanded ? 'Collapse' : 'Expand' }}
      </span>
    </button>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-show="expanded" class="border-t border-white/10 p-5">
        <slot />
      </div>
    </Transition>
  </section>
</template>
