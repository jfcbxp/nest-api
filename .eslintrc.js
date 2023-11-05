module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'object-curly-newline': [
      'warn',
      {
        'ObjectExpression': { 'consistent': true, 'multiline': true },
        'ObjectPattern': { 'consistent': true, 'multiline': true },
        'ImportDeclaration': 'never',
        'ExportDeclaration': { 'multiline': true, 'minProperties': 3 }
      }
    ],
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-restricted-syntax': 'off',
    'import/no-unresolved': 'warn',
    'prefer-destructuring': ['error', { array: false, object: true }],
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'no-useless-constructor': 'warn',
    'arrow-body-style': 'off',
    camelcase: 'off',
  },
};
