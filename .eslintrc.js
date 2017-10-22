module.exports = {
  plugins: ["node"],
  extends: ["eslint:recommended", "plugin:node/recommended"],
  parser: "babel-eslint",
  rules: {
    semi: ["error", "always"],
    "no-console": 0,
    "node/no-missing-require": ["error", {
      resolvePaths: [__dirname]
    }],
    "node/no-unpublished-require": ["error", {
      "allowModules": ["mock-couch"]
    }]
  },
  env: {
    jest: true
  },
  globals: {
    request: true
  }
};
