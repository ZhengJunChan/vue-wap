// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // 设置4个空格
        'indent': ['error', 4],
        // 使用分号
        'semi': ['error', 'always'],
        // allow async-await
        'generator-star-spacing': 0,
        // 允许空格和tab混用
        'no-mixed-spaces-and-tabs': ["error", "smart-tabs"],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 允许在空行使用空白符
        'no-trailing-spaces': ['error', {
            'skipBlankLines': true
        }],
        // 函数()前的空格
        'space-before-function-paren': ['error', {
            'anonymous': 'always', //  function () { // ... }
            'named': 'never', // function foo() { // ... }
            'asyncArrow': 'always' // async (a) => await a
        }]

        // "camelcase": 2,
        // "curly": 2,
        // "brace-style": [2, "1tbs"],
        // "quotes": [2, "single"],
        // "semi": [2, "always"],
        // "space-in-brackets": [2, "never"],
        // "space-infix-ops": 2,
    }
}
