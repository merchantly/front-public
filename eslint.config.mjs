import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          presets: ['@babel/preset-react'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
        // Project-specific globals
        gon: 'readonly',
        global: 'writable',
        process: 'readonly',
        $: 'readonly',
        jQuery: 'readonly',
        mrch: 'writable',
        GeideaApi: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.scss', '.css'],
    },
    rules: {
      // Core ESLint rules (from original .eslintrc)
      semi: ['error', 'always'],
      'space-infix-ops': 'off',
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'max-len': ['warn', 150, 2, { ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true }],
      'no-param-reassign': 'off', // Allow param reassign in legacy code
      'arrow-body-style': 'off',
      'no-underscore-dangle': 'off',
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      }],

      // Relax some rules for legacy codebase compatibility
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      'no-console': 'off', // Allow console in legacy code
      'no-prototype-builtins': 'warn',
      'no-redeclare': 'off', // Allow redeclaring globals like $, gon

      // React rules
      'react/prefer-stateless-function': 'off',
      'react/jsx-filename-extension': 'off',
      'react/forbid-prop-types': 'off',
      'react/prop-types': 'off', // Disable prop-types checking for legacy code
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off', // Not needed with React 18

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import rules
      'import/no-mutable-exports': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off', // Disable for legacy codebase
      'import/extensions': 'off', // Disable for legacy codebase
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'app/bower_components/**',
      '*.min.js',
      'stats.json',
      'storybook-static/**',
      'app/scripts/resources/**', // Ignore generated resources
    ],
  },
];
