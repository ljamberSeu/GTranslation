module.exports = {
  extends: [
    "semistandard",
    "standard"
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-unused-vars": "off",
    indent: ["error", 2],
    "max-len": ["error", { code: 120 }]
  }
};
