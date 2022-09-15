module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'prettier/react'
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true
  },
  settings: {
    react: {
      version: '16.9'
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'markdown',
    'react',
    'babel',
    'jest',
    '@typescript-eslint',
    'react-hooks',
    'unicorn',
    'simple-import-sort',
    'import'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 2
      }
    }
  ],
  rules: {
    'no-console': [
      'warn',
      { allow: ['clear', 'info', 'error', 'dir', 'trace', 'warn'] }
    ],
    'no-use-before-define': 0,
    'no-shadow': 0,
    'no-undef': 0,
    'no-redeclare': 0,

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          // Side effect imports.
          ['^\\u0000']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false }
    ],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    'react/static-property-placement': 0,
    'react/no-find-dom-node': 0,
    'react/no-unused-prop-types': 0,
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks
    // 'react-hooks/exhaustive-deps': 1,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-for': 0,

    'consistent-return': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'no-unused-vars': 0,
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,

    'jest/no-test-callback': 0,
    'jest/expect-expect': 0,

    'unicorn/better-regex': 2,
    'unicorn/prefer-trim-start-end': 2,
    'unicorn/expiring-todo-comments': 2,
    'unicorn/no-abusive-eslint-disable': 2,
    semi: ['warn', 'never'],
    'comma-dangle': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    'jsx-quotes': ['warn', 'prefer-single'],
    quotes: ['warn', 'single'],
    'import/no-webpack-loader-syntax': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'react/no-array-index-key': 0,
    'react/no-unescaped-entities': 0,
    camelcase: 0,
    'jsx-a11y/no-autofocus': 0,
    'jest/valid-title': 0
  },
  globals: {
    gtag: true
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false
  }
}
