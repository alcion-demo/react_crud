// eslint.config.js
// @ts-nocheck
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        rules: {
            "no-unused-vars": "off",

            // TS版を有効化
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            // import 自体を削除
            "unused-imports/no-unused-imports": "error",

            // 変数は warn（削除はしない）
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            ...reactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
        },
    },

    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            react,
            "react-hooks": reactHooks,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },

    // Prettier と衝突する ESLint ルールを無効化
    prettier,
];
