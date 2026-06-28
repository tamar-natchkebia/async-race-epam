/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh'],
  settings: {
    react: { version: '19.2.6' },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',

    // 'void promise()' is the standard idiom for intentionally not awaiting
    // a promise (e.g. firing an async handler from a useEffect/onClick).
    // Airbnb bans `void` outright; this option permits it as a statement
    // only, so `void x` as an *expression* is still flagged.
    'no-void': ['error', { allowAsStatement: true }],

    // Redux Toolkit's createSlice reducers are required to mutate `state`
    // directly — it's wrapped in Immer under the hood, so this is safe and
    // is RTK's documented API, not an accidental side effect. Airbnb's
    // blanket no-param-reassign would otherwise flag every reducer.
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],

    // defaultProps is deprecated for function components; default values
    // via destructured parameters (the TS-idiomatic approach used here)
    // serve the same purpose.
    'react/require-default-props': 'off',
  },
};
