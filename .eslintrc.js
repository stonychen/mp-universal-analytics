module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    mocha: true
  },

  globals: {
    vm: true,
    res: true,
    context: true,
  },

  extends: [
    "plugin:react/recommended",
    'eslint:recommended'
  ],

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
  },

  rules: {

    'no-console': 0,
    'no-unused-vars': [1, {
      "vars": "all",
      "args": 'none',
      "ignoreRestSiblings": false
    }],
    'no-undef': 2,
    'no-var': 2,
    'array-callback-return': 2,
    'class-methods-use-this': 2,
    'no-duplicate-imports': "error"
  },

  overrides: [
    {
      files: ['src/**/*.ts?(x)'],
      rules: {

        /*
         * ------------------------------------------------
         * Possible Errors
         * ------------------------------------------------
         */
        'no-floating-decimal': 0,
        'no-template-curly-in-string': 1,
        'for-direction': 2,
        'getter-return': [
          2,
          {
            allowImplicit: false,
          },
        ],
        'no-await-in-loop': 2,
        'no-console': 0,
        'no-debugger': 1,

        /*
         * ------------------------------------------------
         * Best Practices
         * ------------------------------------------------
         */
        'accessor-pairs': 2,
        'array-callback-return': 0,
        'block-scoped-var': 2,
        'class-methods-use-this': 0,
        'computed-property-spacing': [2, 'never'],
        'default-case': 2,
        'dot-location': [2, 'property'],
        'dot-notation': [
          0,
          {
            allowKeywords: false,
          },
        ],
        eqeqeq: 2,
        'no-div-regex': 2,
        'no-else-return': 2,
        'no-empty-function': 0,
        'no-eq-null': 2,
        'no-eval': 2,
        'no-extend-native': [
          2,
          {
            exceptions: ['Object', 'Promise'],
          },
        ],
        'no-extra-bind': 2,
        'no-implicit-coercion': [
          2,
          {
            boolean: false,
            string: false,
          },
        ],
        'no-invalid-this': 1,
        'no-implied-eval': 2,
        'no-iterator': 2,
        'no-labels': 2,
        'no-loop-func': 2,
        'no-lone-blocks': 2,
        'no-multi-spaces': [
          2,
          {
            ignoreEOLComments: true,
            exceptions: {
              Property: true,
              BinaryExpression: false,
              VariableDeclarator: true,
              ImportDeclaration: true,
            },
          },
        ],
        'no-multi-str': 2,
        'no-new': 2,
        'no-new-func': 2,
        'no-new-wrappers': 2,
        'no-param-reassign': 1,
        'no-proto': 2,
        'no-return-assign': 2,
        'no-return-await': 2,
        'no-sequences': 1,
        'no-throw-literal': 2,
        'no-unmodified-loop-condition': 2,
        'no-unused-expressions': 0,
        'no-useless-call': 2,
        'no-useless-concat': 2,
        'no-useless-return': 2,
        'no-alert': 2,
        'no-script-url': 2,
        radix: 2,
        'require-await': 0,
        'vars-on-top': 2,
        yoda: [0, 'always'],
        'guard-for-in': 2,
        'prefer-destructuring': 0,
        /*
         * ------------------------------------------------
         * Variables
         * ------------------------------------------------
         */
        'no-catch-shadow': 2,
        'no-restricted-globals': 2,
        'no-shadow': 0,
        'no-shadow-restricted-names': 2,
        'no-label-var': 2,
        'no-undef-init': 2,
        'no-undefined': 0,
        'no-use-before-define': [
          2,
          {
            functions: false,
          },
        ],

        /*
         * ------------------------------------------------
         * Stylistic Issues
         * ------------------------------------------------
         */
        'array-bracket-spacing': [2, 'never'],
        'brace-style': [1, '1tbs'],
        camelcase: [
          0,
          {
            properties: 'never',
          },
        ],
        'comma-dangle': [0, 'always-multiline'],
        'comma-style': [2, 'last'],
        'consistent-this': [2, 'self', 'that'],
        'func-call-spacing': [2, 'never'],
        'func-style': [
          2,
          'declaration',
          {
            allowArrowFunctions: true,
          },
        ],
        indent: [1, 2],
        'key-spacing': [
          2,
          {
            beforeColon: false,
            afterColon: true,
            mode: 'strict',
          },
        ],
        'keyword-spacing': [
          2,
          {
            before: true,
            after: true,
          },
        ],
        'line-comment-position': 0,
        'linebreak-style': [0, 'windows'],
        'lines-around-comment': [
          0,
          {
            beforeBlockComment: true,
            beforeLineComment: true,
          },
        ],
        'max-depth': [
          2,
          {
            max: 4,
          },
        ],
        'max-len': [
          1,
          {
            code: 160,
            ignoreUrls: true,
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
          },
        ],
        'max-nested-callbacks': [
          1,
          {
            max: 3,
          },
        ],
        'new-cap': 0,
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-continue': 2,
        'no-lonely-if': 0,
        'no-multiple-empty-lines': [
          1,
          {
            max: 3,
          },
        ],
        'no-nested-ternary': 2,
        'no-new-object': 2,
        'object-curly-newline': [
          1,
          {
            multiline: true,
          },
        ],
        'object-property-newline': 0,
        'one-var': [2, 'never'],
        'one-var-declaration-per-line': [2, 'always'],
        'operator-linebreak': [1, 'after'],
        'padding-line-between-statements': [
          0,
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var'],
          },
        ],
        quotes: [
          2,
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        'require-jsdoc': [
          0,
          {
            require: {
              FunctionDeclaration: true,
              MethodDefinition: false,
              ClassDeclaration: false,
              ArrowFunctionExpression: false,
            },
          },
        ],
        semi: [0, 'always'],
        'semi-spacing': [
          2,
          {
            before: false,
            after: true,
          },
        ],
        'semi-style': [2, 'last'],
        'space-before-blocks': [2, 'always'],
        'spaced-comment': [0],
        'switch-colon-spacing': [
          2,
          {
            after: true,
            before: false,
          },
        ],
        'newline-per-chained-call': 0,

        /*
         * ------------------------------------------------
         * ECMAScript 6
         * ------------------------------------------------
         */

        'arrow-spacing': [
          2,
          {
            before: true,
            after: true,
          },
        ],
        'no-duplicate-imports': 2,
        'no-var': 2,
        'prefer-arrow-callback': [
          1,
          {
            allowNamedFunctions: true,
          },
        ],
        'prefer-const': [
          0,
          {
            destructuring: 'any',
            ignoreReadBeforeAssign: false,
          },
        ],
        'prefer-rest-params': 1,
        'prefer-spread': 1,
        'rest-spread-spacing': [2, 'never'],
        // error; require symbol description
        'symbol-description': 2,
        'no-useless-computed-key': 1,
        'no-useless-constructor': 2,
      },
    },
    {
      files: ['**/*.js?(x)',],
      rules: {

      }
    }
  ],
}
