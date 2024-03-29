// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    ignorePatterns: ['node_modules', 'dist/**/*', 'webpack.config.js'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react'],
    rules: {
        'no-console': 'warn',
        'react/prop-types': 0,
        'linebreak-style': ['error', 'unix'],
    },
};
