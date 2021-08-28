require('module-alias/register');
const INDENT = 2;
const MAX_CLASSES_PER_FILE = 4;

module.exports = {
  env: { browser: true, node: true, es6: true },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
    extraFileExtensions: [ '.cjs' ]
  },
  parser: './compiler/eslint/parser.cjs',
  plugins: [
    'rulesdir',
    'import',
    'react',
    '@typescript-eslint'
  ],
  settings: {
    'react': { version: 'detect' },
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'for-direction': 'error',
    'getter-return': 'error',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': [ 'error', 'always' ],
    'no-console': [ 'error', { allow: [ 'info', 'warn', 'error' ] } ],
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': [ 'error', { allowEmptyCatch: true } ],
    'no-empty-character-class': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': [ 'error', { enforceForLogicalOperands: true } ],
    'no-extra-parens': [
      'error',
      'all',
      { ignoreJSX: 'multi-line', enforceForNewInMemberExpressions: false, enforceForFunctionPrototypeMethods: false }
    ],
    'no-func-assign': 'error',
    'no-import-assign': 'error',
    'no-inner-declarations': [ 'error', 'both' ],
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': [
      'error',
      { skipStrings: true, skipTemplates: true }
    ],
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'error',
    'no-obj-calls': 'error',
    'no-promise-executor-return': 'error',
    'no-prototype-builtins': 'error',
    'no-regex-spaces': 'error',
    'no-setter-return': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': [ 'error', { enforceForOrderingRelations: true } ],
    'no-unsafe-optional-chaining': [ 'error', { disallowArithmeticOperators: true } ],
    'no-useless-backreference': 'error',
    'require-atomic-updates': 'error',
    'use-isnan': [ 'error', { enforceForIndexOf: true } ],
    'valid-typeof': [ 'error', { requireStringLiterals: true } ],

    'accessor-pairs': [ 'error', { enforceForClassMembers: true } ],
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'curly': [ 'error', 'multi-line' ],
    'default-case': 'error',
    'default-param-last': 'error',
    'dot-location': [ 'error', 'property' ],
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'grouped-accessor-pairs': [ 'error', 'getBeforeSet' ],
    'guard-for-in': 'error',
    'max-classes-per-file': [ 'error', MAX_CLASSES_PER_FILE ],
    'no-alert': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-constructor-return': 'error',
    'no-else-return': [ 'error', { allowElseIf: false } ],
    'no-empty-function': 'error',
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': [
      'error',
      { ignore: [ -1, 0, 1 ], ignoreArrayIndexes: true, ignoreDefaultValues: true }
    ],
    'no-multi-spaces': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-return-assign': [ 'error', 'always' ],
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unused-labels': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-warning-comments': [ 'error', { terms: [ 'TODO', 'FIXME' ], location: 'anywhere' } ],
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': [ 'error', { disallowRedundantWrapping: true } ],
    'radix': [ 'error', 'always' ],
    'require-await': 'error',
    'require-unicode-regexp': 'error',
    'vars-on-top': 'error',
    'wrap-iife': [ 'error', 'outside' ],

    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        varsIgnorePattern: 'React',
        argsIgnorePattern: '_',
        ignoreRestSiblings: true,
        caughtErrors: 'none'
      }
    ],
    'no-use-before-define': 'error',

    'array-bracket-newline': [ 'error', 'consistent' ],
    'array-bracket-spacing': [ 'error', 'always', { singleValue: true, objectsInArrays: true, arraysInArrays: true } ],
    'array-element-newline': [ 'error', 'consistent' ],
    'camelcase': [
      'error',
      { allow: [ 'short_name', 'theme_color', 'background_color', 'start_url' ] }
    ],
    'comma-dangle': [ 'error', 'never' ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'comma-style': [ 'error', 'last' ],
    'computed-property-spacing': [ 'error', 'never' ],
    'consistent-this': [ 'error', 'self' ],
    'eol-last': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    'func-name-matching': [ 'error', { considerPropertyDescriptor: true } ],
    'function-call-argument-newline': [ 'error', 'consistent' ],
    'function-paren-newline': [ 'error', 'consistent' ],
    'indent': [ 'error', INDENT ],
    'jsx-quotes': [ 'error', 'prefer-double' ],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: false,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: false,
        allowClassStart: true,
        allowClassEnd: false,
        allowObjectStart: true,
        allowObjectEnd: false,
        allowArrayStart: true,
        allowArrayEnd: false,
        ignorePattern: 'webpack'
      }
    ],
    'lines-between-class-members': [ 'error', 'always' ],
    'max-depth': [ 'error', { max: 4 } ],
    'max-len': [ 'error', { code: 120 } ],
    'max-nested-callbacks': [ 'error', { max: 4 } ],
    'max-params': [ 'error', { max: 4 } ],
    'max-statements-per-line': 'error',
    'multiline-ternary': [ 'error', 'always-multiline' ],
    'new-cap': [ 'error', { capIsNew: false } ],
    'new-parens': [ 'error', 'always' ],
    'no-array-constructor': 'error',
    'no-lonely-if': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 1, maxBOF: 0 } ],
    'no-new-object': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': [ 'error', 'beside' ],
    'object-curly-newline': [ 'error', { consistent: true } ],
    'object-curly-spacing': [ 'error', 'always', { arraysInObjects: true, objectsInObjects: true } ],
    'one-var': [ 'error', 'never' ],
    'operator-linebreak': [
      'error',
      'none',
      { overrides: {
        '?': 'before',
        ':': 'before',
        '&&': 'before',
        '||': 'before',
        '+': 'before',
        '-': 'before',
        '=': 'after'
      } }
    ],
    'padded-blocks': [ 'error', 'never' ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    'prefer-object-spread': 'error',
    'quote-props': [ 'error', 'consistent-as-needed' ],
    'quotes': [ 'error', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
    'semi': [ 'error', 'always', { omitLastInOneLineBlock: false } ],
    'semi-spacing': 'error',
    'semi-style': [ 'error', 'last' ],
    'space-before-blocks': [ 'error', 'always' ],
    'space-before-function-paren': [ 'error', { anonymous: 'always', named: 'never', asyncArrow: 'always' } ],
    'space-in-parens': [ 'error', 'never' ],
    'space-infix-ops': 'error',
    'space-unary-ops': [ 'error', { words: true, nonwords: false } ],
    'spaced-comment': [ 'error', 'always' ],
    'switch-colon-spacing': 'error',
    'template-tag-spacing': [ 'error', 'never' ],

    'arrow-body-style': [ 'error', 'as-needed' ],
    'arrow-parens': [ 'error', 'always' ],
    'arrow-spacing': [ 'error', { before: true, after: true } ],
    'constructor-super': 'error',
    'generator-star-spacing': [ 'error', { before: false, after: true } ],
    'no-class-assign': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'no-new-symbol': 'error',
    'no-this-before-super': 'error',
    'no-useless-computed-key': [ 'error', { enforceForClassMembers: true } ],
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': [ 'error', { destructuring: 'all', ignoreReadBeforeAssign: true } ],
    'prefer-destructuring': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'require-yield': 'error',
    'rest-spread-spacing': [ 'error', 'never' ],
    'symbol-description': 'error',
    'template-curly-spacing': [ 'error', 'always' ],
    'yield-star-spacing': [ 'error', { before: false, after: true } ]
  },
  overrides: [
    {
      excludedFiles: [ '**/*.d.ts', '**/*.stories.tsx' ],
      files: [ '*.js', '*.jsx', '*.ts', '*.tsx' ],
      rules: {
        'import/export': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-absolute-path': 'error',
        'import/no-amd': 'error',
        'import/no-anonymous-default-export': 'error',
        'import/no-cycle': 'error',
        'import/no-default-export': 'error',
        'import/no-dynamic-require': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-default': 'error',
        'import/no-namespace': 'error',
        'import/no-self-import': 'error',
        'import/no-unused-modules': 'error',
        'import/no-useless-path-segments': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': [
          'error',
          {
            'groups': [ 'builtin', 'external', 'internal', 'index', 'sibling', 'parent', 'type' ],
            'newlines-between': 'always',
            'alphabetize': { order: 'asc', caseInsensitive: true }
          }
        ]
      }
    },
    {
      excludedFiles: [ '**/*.d.ts' ],
      files: [ '*.ts', '*.tsx' ],
      rules: {
        'rulesdir/semi-interface': 'error',
        'rulesdir/progress': 'error'
      }
    },
    {
      files: [ '*.jsx', '*.tsx' ],
      rules: {
        'react/button-has-type': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-render-return-value': 'error',
        'react/no-string-refs': 'error',
        'react/no-this-in-sfc': 'error',
        'react/no-typos': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/no-unsafe': 'error',
        'react/no-unused-state': 'error',
        'react/no-will-update-set-state': 'error',
        'react/react-in-jsx-scope': 'error',
        'react/require-render-return': 'error',
        'react/self-closing-comp': 'error',
        'react/sort-comp': [
          'error',
          {
            order: [
              'static-variables',
              'static-methods',
              'lifecycle',
              'instance-variables',
              'instance-methods',
              'everything-else',
              '/^render.+$/'
            ],
            groups: {
              rendering: [
                'render',
                '/^render.+$/'
              ]
            }
          }
        ],
        'react/state-in-constructor': [ 'error', 'never' ],
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',

        'react/jsx-boolean-value': [ 'error', 'always' ],
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-curly-brace-presence': [ 'error', { props: 'never', children: 'ignore' } ],
        'react/jsx-curly-newline': [ 'error', 'consistent' ],
        'react/jsx-curly-spacing': [ 'error', { when: 'always', children: true } ],
        'react/jsx-equals-spacing': [ 'error', 'never' ],
        'react/jsx-filename-extension': [ 'error', { extensions: [ '.jsx', '.tsx' ] } ],
        'react/jsx-first-prop-new-line': [ 'error', 'multiline-multiprop' ],
        'react/jsx-fragments': [ 'error', 'syntax' ],
        'react/jsx-indent': [ 'error', INDENT, { checkAttributes: true } ],
        'react/jsx-indent-props': [ 'error', INDENT ],
        'react/jsx-key': [ 'error', { checkFragmentShorthand: true } ],
        'react/jsx-max-depth': [ 'error', { max: 10 } ],
        'react/jsx-max-props-per-line': [ 'error', { maximum: 4 } ],
        'react/jsx-no-bind': 'error',
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-constructed-context-values': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-script-url': 'error',
        'react/jsx-no-target-blank': [ 'error', { warnOnSpreadAttributes: true } ],
        'react/jsx-no-undef': [ 'error', { allowGlobals: true } ],
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-tag-spacing': [
          'error',
          { closingSlash: 'never', beforeSelfClosing: 'never', afterOpening: 'never', beforeClosing: 'never' }
        ],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/jsx-wrap-multilines': [
          'error',
          {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line'
          }
        ]
      }
    },
    {
      files: [ '*.ts', '*.tsx' ],
      rules: {
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-const-assign': 'off',
        'no-dupe-args': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-import-assign': 'off',
        'no-new-symbol': 'off',
        'no-obj-calls': 'off',
        'no-setter-return': 'off',
        'no-this-before-super': 'off',
        'no-undef': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'valid-typeof': 'off',

        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [ 'error', { default: 'generic', readonly: 'generic' } ],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          { 'ts-expect-error': 'allow-with-description', 'minimumDescriptionLength': 10 }
        ],
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              String: { message: 'Use string instead', fixWith: 'string' },
              Boolean: { message: 'Use boolean instead', fixWith: 'boolean' },
              Number: { message: 'Use number instead', fixWith: 'number' },
              Object: { message: 'Use Record<string, any> instead', fixWith: 'Record<string, any>' },
              Symbol: { message: 'Use symbol instead', fixWith: 'symbol' }
            }
          }
        ],
        '@typescript-eslint/consistent-indexed-object-style': [ 'error', 'record' ],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }
        ],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { overrides: { constructors: 'off' } }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: { delimiter: 'comma', requireLast: false },
            singleline: { delimiter: 'comma', requireLast: false },
            overrides: { interface: { multiline: { delimiter: 'semi', requireLast: true } } }
          }
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'variable', format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ] }
        ],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': [ 'error', { fixToUnknown: false } ],
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implicit-any-catch': 'error',
        '@typescript-eslint/no-inferrable-types': [
          'error',
          { ignoreParameters: true, ignoreProperties: true }
        ],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-this-alias': [
          'error',
          { allowDestructuring: true, allowedNames: [ 'self' ] }
        ],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false
          }
        ],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/typedef': [
          'error',
          {
            arrowParameter: true,
            parameter: true,
            propertyDeclaration: true
          }
        ],
        '@typescript-eslint/unbound-method': [ 'error', { ignoreStatic: true } ],
        '@typescript-eslint/unified-signatures': 'error',

        'comma-dangle': 'off',
        'comma-spacing': 'off',
        'default-param-last': 'off',
        'func-call-spacing': 'off',
        'indent': 'off',
        'keyword-spacing': 'off',
        'lines-between-class-members': 'off',
        'no-array-constructor': 'off',
        'no-dupe-class-members': 'off',
        'no-duplicate-imports': 'off',
        'no-empty-function': 'off',
        'no-extra-parens': 'off',
        'no-implied-eval': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'off',
        'no-magic-numbers': 'off',
        'no-redeclare': 'off',
        'no-throw-literal': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'quotes': 'off',
        'require-await': 'off',
        'semi': 'off',
        'space-before-function-paren': 'off',
        'space-infix-ops': 'off',

        '@typescript-eslint/comma-dangle': [ 'error', 'never' ],
        '@typescript-eslint/comma-spacing': [ 'error', { before: false, after: true } ],
        '@typescript-eslint/func-call-spacing': [ 'error', 'never' ],
        '@typescript-eslint/indent': [ 'error', INDENT ],
        '@typescript-eslint/keyword-spacing': 'error',
        '@typescript-eslint/lines-between-class-members': [ 'error', 'always' ],
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-duplicate-imports': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-extra-parens': [
          'error',
          'all',
          {
            ignoreJSX: 'multi-line',
            enforceForNewInMemberExpressions: false,
            enforceForFunctionPrototypeMethods: false
          }
        ],
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-invalid-this': [ 'error', { capIsConstructor: false } ],
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-magic-numbers': [
          'error',
          { ignore: [ -1, 0, 1 ], ignoreArrayIndexes: true, ignoreDefaultValues: true }
        ],
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            varsIgnorePattern: 'React',
            argsIgnorePattern: '_',
            ignoreRestSiblings: true,
            caughtErrors: 'none'
          }
        ],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/quotes': [ 'error', 'single', { avoidEscape: true } ],
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/semi': [ 'error', 'always', { omitLastInOneLineBlock: false } ],
        '@typescript-eslint/space-before-function-paren': [
          'error',
          { anonymous: 'always', named: 'never', asyncArrow: 'always' }
        ],
        '@typescript-eslint/space-infix-ops': 'error'
      }
    }
  ]
};
