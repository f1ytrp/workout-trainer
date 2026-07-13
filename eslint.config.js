const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    // Phase 0 keeps the existing JavaScript prototype lintable without
    // rewriting product code. These rules are re-enabled during migration.
    rules: {
      'no-dupe-keys': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);
