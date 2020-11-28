module.exports = {
    parser: 'vue-eslint-parser',
    env: {
        es6: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 6,
        sourceType: 'module',
    },
    extends: ['prettier/vue', 'plugin:prettier/recommended'],
    plugins: ['vue', 'prettier', 'html'],
    rules: {
        'prettier/prettier': 'error',
    },
};
