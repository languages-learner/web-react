import rootConfig from "../../eslint.config.mjs";

export default [
    ...rootConfig,
    {
        files: ["scripts/**/*.js"],
        languageOptions: {
            // Явно убираем parserOptions.project, чтобы отключить TypeScript парсер
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                // Не указываем project, чтобы файл не требовался в tsconfig
            },
        },
        rules: {
            // Отключить TypeScript-специфичные правила для JS файлов
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/no-require-imports": "off",
        },
    },
];
