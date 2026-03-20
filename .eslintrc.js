module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  // Esta sección aplica reglas específicas SOLO a tus archivos de Cypress
  overrides: [
    {
      files: [
        "**/src/cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
        "**/tests/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      ],
      env: {
        mocha: true,
      },
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        it: "readonly",
        describe: "readonly",
        context: "readonly",
      },
    },
  ],
};
