module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["@iuap"],
  env: {
    node: true,
    browser: true
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
