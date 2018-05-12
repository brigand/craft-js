module.exports = {
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'no-console': 0,
  },
};
