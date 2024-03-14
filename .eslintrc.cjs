module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'netlify/**/*',
    'tailwind.config.ts',
    'postcss.config.js'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/jsx-runtime'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.node.json'
    ],
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
  }
};
