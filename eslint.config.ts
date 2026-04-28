import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import vueA11y from 'eslint-plugin-vuejs-accessibility';
import globals from 'globals';

export default defineConfigWithVueTs(
  { ignores: ['dist/**'] },
  { languageOptions: { globals: globals.browser } },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  vueA11y.configs['flat/recommended'],
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/no-unused-refs': 'error',
      'vue/no-template-shadow': 'error',
      'vue/attribute-hyphenation': 'warn',
      'vue/attributes-order': 'warn',
    },
  },
  eslintConfigPrettier,
);
