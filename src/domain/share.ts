import type { BuildState, ModuleUiState } from '@/core/types';

export interface SharePayload {
  build: BuildState;
  modules: ModuleUiState;
}

export function encodeSharePayload(payload: SharePayload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}

export function decodeSharePayload(encoded: string): SharePayload | undefined {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded))) as SharePayload;
  } catch {
    return undefined;
  }
}

export function updateUrlShare(payload: SharePayload) {
  const params = new URLSearchParams(window.location.search);
  params.set('build', encodeSharePayload(payload));
  const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
  window.history.replaceState(null, '', url);
}

export function readUrlShare() {
  const encoded = new URLSearchParams(window.location.search).get('build');
  return encoded ? decodeSharePayload(encoded) : undefined;
}
