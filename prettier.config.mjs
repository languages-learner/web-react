/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
    plugins: ["prettier-plugin-tailwindcss"],
    bracketSpacing: true,
    tabWidth: 4,
    printWidth: 100,
    trailingComma: "all",
    overrides: [
        {
            files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
            options: {
                parser: "typescript",
            },
        },
        {
            files: ["*.md", "*.json", "*.yaml", "*.yml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
    endOfLine: "lf",
    tailwindConfig: "./packages/tailwind/tailwind.config.js",
};
