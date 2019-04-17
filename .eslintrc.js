module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: "module",
      allowImportExportEverywhere: false,
      ecmaFeatures: {
        globalReturn: false,
      },
    },
    settings: {
        react: {
            "version": "detect"
        }
    },
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', "plugin:react/recommended"],
    rules: {
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
    }
};