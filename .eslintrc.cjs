module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:eslint-plugin/recommended',
    'prettier',
    'plugin:tailwindcss/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser'
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: [
    'react-hooks',
    'prettier',
    'simple-import-sort',
    'import',
    'unused-imports',
    '@typescript-eslint',
    'sort-keys-fix',
    'typescript-sort-keys',
    'perfectionist'
  ],
  rules: {
    'no-unused-vars': [
      'off',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
    'perfectionist/sort-interfaces': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: ['id', 'multiline', 'unknown'],
        'custom-groups': {
          id: 'id'
        }
      }
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        'custom-groups': { callback: 'on*' },
        groups: ['multiline', 'unknown', 'shorthand', 'callback']
      }
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        type: 'natural',
        order: 'asc'
      }
    ],
    'perfectionist/sort-classes': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: [
          'index-signature',
          'static-property',
          'private-property',
          'property',
          'constructor',
          'static-method',
          'private-method',
          'method'
        ]
      }
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        'partition-by-comment': 'Part:**',
        groups: ['id', 'unknown'],
        'custom-groups': {
          id: 'id'
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'error',
    'react/display-name': 'off',
    'react/no-unknown-property': 'error',
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'none'
      }
    ],
    // or
    'comma-dangle': [
      'error'
    ],
    'typescript-sort-keys/string-enum': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'eslint-plugin/prefer-message-ids': 'off',
    'eslint-plugin/prefer-object-rule': 'off',
    'eslint-plugin/require-meta-type': 'off',
    'eslint-plugin/require-meta-schema': 'off'
  }
};
