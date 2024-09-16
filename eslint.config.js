import globals from 'globals'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      parser: tsParser,
      globals: globals.browser
    }
  },
  {
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin
    }
  },
  {
    rules: {
      ...tseslint.configs.recommended.rules, // Default rules
      ...prettier.rules, // No conflicts between Prettier and Eslint
      'prettier/prettier': 'error' // Prettier-Fehler als ESLint-Fehler anzeigen
    }
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'public/',
      '.vscode/',
      '.DS_Store',
      '.env',
      'src/test/',
      'src/tests/',
      '*.test.ts',
      '*.test.tsx'
    ]
  } // Don't lint heres
]
