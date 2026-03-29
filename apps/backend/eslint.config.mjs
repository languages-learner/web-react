import rootConfig from "../../eslint.config.mjs";

export default [
    ...rootConfig,
    {
        files: ["**/*.ts"],
        rules: {
            // Отключаем правило, которое требует strictNullChecks, так как мы его включили
            // но могут быть места, где нужно явно проверять на null/undefined
            "@typescript-eslint/no-unnecessary-condition": "off",
        },
    },
];
