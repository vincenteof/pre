module.exports = {
  "env": { "browser": true, "es6": true, "node": true },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "settings": { "react": { "version": "detect" } },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "env": { "browser": true, "es6": true, "node": true },
      "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaFeatures": { "jsx": true },
        "ecmaVersion": 2018,
        "sourceType": "module",
      },
      "plugins": ["react", "@typescript-eslint"],
      "settings": { "react": { "version": "detect" } }
    }
  ]
}
