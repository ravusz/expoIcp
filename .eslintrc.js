// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react-native"],
  rules: {
    "prettier/prettier": ["error", { useTabs: false, tabWidth: 2 }],
    "react-native/no-unused-styles": "error",
    indent: ["error", 2],
    "no-console": ["error"],
  },
};
