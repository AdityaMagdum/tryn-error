module.exports = {
    "extends": [
        "@niceltd/eslint-config-cxone"
    ],
    "parserOptions": {
        "project": "./tsconfig.eslint.json",
        "sourceType": "module"
    },
    "overrides": [
        {
            "files": ["*.ts"],
            "rules": {
                "import/named": "off",
                "import/no-unresolved": "off"
            }
        }
    ]
};


