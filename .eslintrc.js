module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
      modules: true,
    },
    parser: 'typescript-eslint',
  },
  plugins: ['react', 'react-hooks', 'unused-imports', 'jest', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'default-case': 'error',
    'dot-notation': 'error',
    '@typescript-eslint/ban-ts-comment': 0,
    'guard-for-in': 'error',
    'no-caller': 'error',
    'react/react-in-jsx-scope': 0,
    'no-empty-parameters': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/display-name': 0,
    'no-case-declarations': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-shadow': 0,
    'no-empty-pattern': 0,
    'no-var': 'error',
    '@typescript-eslint/no-empty-function': 0,
    'object-curly-spacing': ['error', 'always'],
    radix: 0,
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 0,
    // "react/jsx-indent": ["error", 4],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 3,
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'import/no-relative-parent-imports': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            // Restrict imports from the mobile folder for web
            target: '!(mobile)/**/*',
            from: 'mobile',
            message: 'Import from the mobile folder is restricted',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*test.tsx'],
      extends: ['plugin:jest/recommended'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: true,
      typescript: true,
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
}
