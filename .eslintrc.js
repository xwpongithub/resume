module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-tabs": 0,
    "indent": 0,
    "space-before-function-paren": 0,
    "eol-last": 0,
    "no-unused-vars": 0,
    "no-undef": 0,
    "no-trailing-spaces": 0,
    "space-in-parens":0,
    "object-curly-spacing": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
