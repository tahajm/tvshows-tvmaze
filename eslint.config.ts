import globals from 'globals';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import vueA11y from 'eslint-plugin-vuejs-accessibility';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfigWithVueTs(
  { ignores: ['dist/**'] },
  { languageOptions: { globals: globals.browser } },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  vueA11y.configs['flat/recommended'],
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/no-unused-refs': 'error',
      'vue/no-template-shadow': 'error',
    },
  },
  eslintConfigPrettier,
);
