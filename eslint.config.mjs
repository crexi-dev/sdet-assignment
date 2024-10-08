/* eslint-disable @typescript-eslint/naming-convention */
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "plugin:import/errors",
            "plugin:import/warnings",
            "plugin:import/typescript",
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended",
            "prettier",
            "plugin:prettier/recommended"
        )
    ),
    {
        plugins: {
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
            prettier: fixupPluginRules(prettier),
            "unused-imports": unusedImports,
            jsdoc,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
                ...globals.jest,
                describe: true,
                it: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
                beforeAll: true,
                afterAll: true,
            },

            parser: tsParser,
            ecmaVersion: 6,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    generators: true,
                    experimentalObjectRestSpread: true,
                },
            },
        },

        settings: {
            "import/ignore": ["node_modules", "\\.(json|css|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$"],

            "import/extensions": [".js"],

            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },

        rules: {
            "comma-dangle": ["error", "always-multiline"],
            "no-debugger": "warn",
            "no-console": "off",
            "no-alert": "warn",
            "no-empty": "error",
            "no-extra-semi": "error",
            quotes: [2, "double", "avoid-escape"],
            semi: "error",
            curly: "error",
            "valid-jsdoc": "off",
            "space-unary-ops": "error",
            "block-scoped-var": "error",
            "consistent-return": "off",
            "dot-notation": "error",
            "one-var-declaration-per-line": "error",
            "no-trailing-spaces": "error",
            "constructor-super": "error",
            "no-var": "error",
            "import/no-named-as-default": "off",
            "no-prototype-builtins": "off",
            "no-case-declarations": "off",
            "no-useless-escape": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/member-delimiter-style": "off",
            "@typescript-eslint/ban-types": "off",

            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "variable",
                    format: ["camelCase", "StrictPascalCase"],
                },
                {
                    selector: "interface",
                    format: ["PascalCase"],
                },
                {
                    selector: "function",
                    format: ["camelCase", "StrictPascalCase"],
                },
            ],

            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/ban-ts-ignore": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/prefer-as-const": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-namespace": "off",
            "unused-imports/no-unused-imports": "error",

            "unused-imports/no-unused-vars": [
                "off",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            "prettier/prettier": [
                "error",
                {},
                {
                    usePrettierrc: true,
                },
            ],

            "max-lines": [
                "warn",
                {
                    max: 750,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],

            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-duplicate-enum-values": "warn",
            "no-undef": "error",
        },
    },
    {
        files: ["**/*.json"],

        rules: {
            "comma-dangle": "off",
            semi: "off",
        },
    },
    {
        files: ["**/*.js"],

        rules: {
            "@typescript-eslint/no-var-requires": "off",
        },
    },
    {
        files: [
            "config/**/env/*.ts",
            "**/*.mock.ts",
            "**/*.mockData.ts",
            "**/*.mock-data.ts",
            "**/*.data.ts",
            "**/*.mocks.ts",
            "**/*data.ts",
            "**/*.js",
            "**/legacy/**",
            "**/*-legacy/**",
        ],

        rules: {
            "max-lines": "off",
            "@typescript-eslint/naming-convention": "off",
        },
    },
    {
        files: ["constants/**/*.ts", "**/*.js"],

        rules: {
            "@typescript-eslint/naming-convention": "off",
        },
    },
    {
        files: ["**/*.js"],

        rules: {
            "jsdoc/check-access": 1,
            "jsdoc/check-alignment": 1,
            "jsdoc/check-param-names": 1,
            "jsdoc/check-property-names": 1,
            "jsdoc/check-syntax": 1,
            "jsdoc/check-tag-names": 1,
            "jsdoc/check-types": 1,
            "jsdoc/check-values": 1,
            "jsdoc/empty-tags": 1,
            "jsdoc/implements-on-classes": 1,
            "jsdoc/multiline-blocks": 1,
            "jsdoc/no-bad-blocks": 1,
            "jsdoc/no-multi-asterisks": 1,
            "jsdoc/no-undefined-types": 1,
            "jsdoc/require-jsdoc": 1,
            "jsdoc/require-param": 1,
            "jsdoc/require-property": 1,
            "jsdoc/require-property-description": 1,
            "jsdoc/require-property-name": 1,
            "jsdoc/require-property-type": 1,
            "jsdoc/require-returns-check": 1,
            "jsdoc/require-returns-type": 1,
            "jsdoc/require-yields-check": 1,
            "jsdoc/sort-tags": 1,
            "jsdoc/tag-lines": 1,
            "jsdoc/valid-types": 1,
        },
    },
];
