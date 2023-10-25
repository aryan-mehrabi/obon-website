module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:typescript-sort-keys/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals",
    "airbnb",
  ],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["**/*.{ts,tsx}"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    },
    {
      files: "*.json",
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/sort-keys": "error",
      },
      extends: ["plugin:jsonc/recommended-with-json"],
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "simple-import-sort",
    "typescript-sort-keys",
  ],
  root: true,
  rules: {
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    quotes: ["error", "double", { avoidEscape: true }],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "linebreak-style": "off",
    "no-unused-vars": ["error", { varsIgnorePattern: "[_]" }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
