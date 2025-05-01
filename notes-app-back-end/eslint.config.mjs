import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';



export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
]);

/*
SLint, ia dapat membantu atau membimbing Anda untuk selalu
menuliskan kode JavaScript dengan gaya yang konsisten. Seperti yang Anda tahu, JavaScript tidak memiliki aturan yang baku
untuk gaya penulisan kode, bahkan penggunaan semicolon. Karena itu, terkadang kita jadi tidak konsisten dalam menuliskannya.

*/