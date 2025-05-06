import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    name: 'ignore',
    ignores: ['**/node_modules', '**/dist'],
  },
  {
    name: 'load plugins',
    plugins: {
      'check-file': checkFile,
    },
  },
  {
    name: 'common',
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [importPlugin.flatConfigs.recommended, js.configs.recommended],
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
      ],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    name: 'frontend',
    files: ['./frontend/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: '**/tsconfig.json',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['', './public'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    extends: [tseslint.configs.strict, tseslint.configs.stylistic],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
          allowAny: false,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNever: false,
          allowNullish: false,
          allowRegExp: false,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        {
          ignoreStringArrays: true,
        },
      ],
    },
  },
  {
    name: 'backend',
    files: ['./backend/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
      },
    },
  },
  eslintConfigPrettier,
);
