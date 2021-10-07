module.exports = {
  extends: ['react-app', 'plugin:cypress/recommended'],
  rules: {
    // indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'cypress/no-unnecessary-waiting': 0,
  },
  env: {
    browser: true,
    es6: true,
  },
  // extends: ['eslint:recommended', 'plugin:react/recommended'],
  // parserOptions: {
  //   ecmaVersion: 12,
  //   sourceType: 'module',
  // },
  plugins: ['react', 'jest', 'cypress'],
  // rules: {
  //   indent: ['error', 2, { SwitchCase: 1 }],
  //   quotes: ['error', 'single'],
  //   semi: ['error', 'never'],
  //   eqeqeq: 'error',
  //   'no-trailing-spaces': 'error',
  //   'object-curly-spacing': ['error', 'always'],
  //   'arrow-spacing': ['error', { before: true, after: true }],
  //   'no-console': 0,
  //   'react/prop-types': 0,
  // },
  // settings: {
  //   react: {
  //     version: 'detect',
  //   },
  // },
}
