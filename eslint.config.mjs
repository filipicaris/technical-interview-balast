import globals from 'globals';
import js from '@eslint/js';
import path from 'node:path';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/migrations'],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
      },

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.eslint.json'],

        tsconfigRootDir: '.',
      },
    },

    rules: {
      curly: ['error', 'all'],
      '@typescript-eslint/await-thenable': 'error',
      'no-void': 'off',
      'no-return-await': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/require-await': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'no-param-reassign': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-use-before-define': 'off',
      'max-classes-per-file': 'off',
      'no-shadow': 'off',
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'no-process-env': 'error',
      'import/order': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
