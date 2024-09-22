import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'path'
import { fileURLToPath } from 'url'
import globals from 'globals'

// Kompatibilitätsmodus für ältere "eslintrc"-basierte Configs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname, // Notwendig für die Verarbeitung von `eslintrc`-basierte Erweiterungen
  recommendedConfig: js.configs.recommended // Füge dies hinzu
})

export default [
  js.configs.recommended, // Standardempfehlungen von ESLint
  {
    files: ['**/*.{js,mjs,cjs,ts}'], // Gilt für alle JS- und TS-Dateien
    languageOptions: {
      parser: tsParser, // TypeScript-Parser verwenden
      globals: {
        ...globals.browser, // Globale Browser-Variablen
        vitest: 'readonly', // Globale Vitest-Variablen
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
      }
    }
  },
  // Kompatibilitätsmodus für `prettier` und andere nicht-Flat-Configs
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:prettier/recommended'),
  {
    plugins: {
      '@typescript-eslint': tseslint // TypeScript ESLint-Plugin
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Empfohlene TypeScript-Regeln
      'prettier/prettier': 'error' // Prettier-Fehler als ESLint-Fehler anzeigen
    }
  },
  {
    ignores: [
      'node_modules/', // Ignoriere Node Modules
      'dist/', // Ignoriere den Dist-Ordner
      'build/', // Ignoriere den Build-Ordner
      'public/', // Ignoriere den Public-Ordner
      '.vscode/', // Ignoriere .vscode Konfigurationen
      '.DS_Store', // Ignoriere macOS-spezifische Dateien
      '.env', // Ignoriere Umgebungsvariablen-Dateien
      'src/tests/', // Ignoriere den Tests-Ordner
      '*.test.ts', // Ignoriere Testdateien
      '*.test.tsx' // Ignoriere Testdateien für TSX
    ]
  } // Ignorierte Pfade und Dateien
]
