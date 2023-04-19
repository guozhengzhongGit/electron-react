module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
};
