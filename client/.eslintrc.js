module.exports = {
  extends: ['react-app'],
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
  },
  env: {
    browser: true,
    es6: true,
    'cypress/globals': true,
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
