const OFF = 0;
const WARN = 1;
const ERROR = 2;

const reactComponentTypeMessage = {
  message:
    'This type includes the children prop which is generally wrong, instead of using this type, type the props of the component',
};

/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['next', 'prettier'],
  plugins: [
    'simple-import-sort',
    'import',
    '@typescript-eslint',
    '@preconstruct/format-js-tag',
  ],
  settings: {
    next: { rootDir: ['docs/', 'packages/*/'] },
    react: { version: 'detect' },
  },
  rules: {
    '@next/next/no-html-link-for-pages': OFF,
    '@typescript-eslint/consistent-type-imports': WARN,
    curly: [ERROR, 'multi-line'],
    'import/first': ERROR,
    'import/newline-after-import': ERROR,
    'import/no-duplicates': ERROR,
    'import/no-unresolved': ERROR,
    'jsx-quotes': ERROR,
    'no-trailing-spaces': ERROR,
    'no-undef': ERROR,
    'no-unused-expressions': ERROR,
    'object-curly-spacing': [ERROR, 'always'],
    'react-hooks/exhaustive-deps': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react/jsx-boolean-value': WARN,
    'react/jsx-no-undef': ERROR,
    'react/jsx-uses-react': ERROR,
    'react/jsx-uses-vars': ERROR,
    'react/jsx-wrap-multilines': WARN,
    'react/no-did-mount-set-state': WARN,
    'react/no-did-update-set-state': WARN,
    'react/no-unknown-property': WARN,
    'react/react-in-jsx-scope': OFF,
    'react/self-closing-comp': WARN,
    'react/sort-prop-types': WARN,
    semi: ERROR,
    'simple-import-sort/exports': ERROR,
    'simple-import-sort/imports': ERROR,
    strict: OFF,
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        vars: 'all',
      },
    ],
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          '**/__tests__/**/*',
          '**/*test.*',
          '**/tests/**/*',
          '**/build/**/*',
          '**/test-fixtures.*',
        ],
      },
    ],
    quotes: [
      ERROR,
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'no-restricted-syntax': [
      ERROR,
      {
        // Curious why we have this rule?
        // - Enums only work for a subset of use cases that unions of string literals + objects work for and learning one language feature is easier than learning two language features
        // - Enums are a new language feature which have runtime semantics which means they change TypeScript from JS + types to JS + types + extra language features which is harder to teach without clear advantages for this specific feature
        selector: 'TSEnumDeclaration',
        message: 'Use a union of string literals instead of an enum',
      },
    ],
    '@typescript-eslint/ban-types': [
      ERROR,
      {
        extendDefaults: false,
        types: {
          Function:
            '`Function` types are unsafe. Use more specific function types instead. e.g. (arg: number) => string',
          String: {
            message:
              'The `String` type refers to the String object which is probably not what you want, you probably want `string` instead which refers to the string primitive type.',
            fixWith: 'string',
          },
          ComponentType: reactComponentTypeMessage,
          FC: reactComponentTypeMessage,
          SFC: reactComponentTypeMessage,
          'React.ComponentType': reactComponentTypeMessage,
          'React.FC': reactComponentTypeMessage,
          'React.SFC': reactComponentTypeMessage,
        },
      },
    ],
    '@preconstruct/format-js-tag/format': ERROR,
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        // TypeScript already checks for the following things and they conflict with TypeScript
        'import/no-unresolved': OFF,
        'no-undef': OFF,
      },
    },
  ],
};
