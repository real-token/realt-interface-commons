// require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  // extends: ["@toruslabs/eslint-config-typescript"],
  // parser: "babel-eslint",
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["*.config.js", ".eslintrc.js", "*.config.mjs"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
    project: "./tsconfig.json",
    requireConfigFile: false,
  },
  "rules": {
    // disable the rule for all files
    "@typescript-eslint/no-explicit-any": "off"
  },
  "overrides": [
    { 
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/no-explicit-any": ["off"]
      }
    }
  ]
};