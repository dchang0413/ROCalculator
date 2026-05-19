import { ref, watch, type Ref } from 'vue';

export function useLocalStorageState<T>(key: string, fallback: T): Ref<T> {
  const stored = typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
  const state = ref(stored ? JSON.parse(stored) as T : fallback) as Ref<T>;

  watch(state, (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, { deep: true });

  return state;
}
