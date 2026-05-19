import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import App from '@/App.vue';

describe('app shell settings menu', () => {
  it('opens and closes module settings from the floating cog', async () => {
    const wrapper = shallowMount(App);

    expect(wrapper.findComponent({ name: 'ModuleSettings' }).exists()).toBe(false);

    await wrapper.get('button[aria-controls="module-settings-panel"]').trigger('click');
    expect(wrapper.findComponent({ name: 'ModuleSettings' }).exists()).toBe(true);

    await wrapper.get('button[aria-controls="module-settings-panel"]').trigger('click');
    expect(wrapper.findComponent({ name: 'ModuleSettings' }).exists()).toBe(false);
  });
});
