module.exports = {
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    plugins: ['prettier', 'es5'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js'],
            },
        },
        node: true,
    },
    env: {
        es2017: true,
        node: true,
        jest: true
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                arrowParens: 'always',
                bracketSpacing: false,
                tabWidth: 4,
                trailingComma: 'es5',
                singleQuote: true,
            },
        ],
        'valid-jsdoc': 0,
        'require-jsdoc': 0,
        'new-cap': 0,
        'no-console': 0,
        'max-len': [
            'error',
            {
                code: 120,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
            },
        ],
    },
};
