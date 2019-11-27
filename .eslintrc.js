module.exports = {
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off'
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
