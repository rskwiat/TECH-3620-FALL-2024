import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'no-console': ['warn'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-process-env': ['error'],
      'react/prop-types': ['warn']
    }
  }
];
