module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  globals: {
    JSX: true,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.ts'] }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'no-restricted-exports': 'off',
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
