module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "semi": ["error", "never", { "beforeStatementContinuationChars": "never" }],
  }
}