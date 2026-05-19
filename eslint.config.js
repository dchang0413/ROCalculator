import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import vueTs from '@vue/eslint-config-typescript';

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'public/**', 'template/**', 'default_equip/**', 'job_bonus/**', 'job_bonus_3rd/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueTs(),
  {
    languageOptions: { globals: { window: 'readonly', document: 'readonly', localStorage: 'readonly', crypto: 'readonly', structuredClone: 'readonly', Blob: 'readonly', URL: 'readonly', URLSearchParams: 'readonly', btoa: 'readonly', atob: 'readonly', console: 'readonly' } },
    files: ['**/*.{ts,vue,mjs}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/no-mutating-props': 'off'
    }
  }
];
