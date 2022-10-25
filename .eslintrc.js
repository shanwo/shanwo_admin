module.exports = {
  root: true,
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    'standard/object-curly-even-spacing': [2, 'either'],
    'standard/array-bracket-even-spacing': [2, 'either'],
    'standard/computed-property-even-spacing': [2, 'even'],
    'standard/no-callback-literal': [2, ['cb', 'callback']],
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false,
      },
    ],
  
    "no-undef": "off",
    camelcase: "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
