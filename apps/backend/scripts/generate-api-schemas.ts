import * as path from "node:path";
import * as fs from "node:fs";
import { execSync } from "node:child_process";
import * as dotenv from "dotenv";

// Загрузить .env файл из корня монорепы
const envPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: envPath });

const openApiJsonPath = path.resolve(__dirname, "../../../packages/api/src/schemas/openapi.json");
const apiTypesPath = path.resolve(__dirname, "../../../packages/api/src/schemas/api.ts");

console.log("Generating OpenAPI schema...");

// Убедиться, что директория существует
const schemasDir = path.dirname(openApiJsonPath);
if (!fs.existsSync(schemasDir)) {
    fs.mkdirSync(schemasDir, { recursive: true });
}

// Установить переменную окружения для генерации схемы
const env = {
    ...process.env,
    GENERATE_API_SCHEMA: "true",
    PORT: "3002", // Использовать другой порт для генерации
};

try {
    // Запустить приложение в режиме генерации
    // Приложение создаст openapi.json и завершится с exit(0)
    execSync(`ts-node --project tsconfig.json src/main.ts`, {
        stdio: "inherit",
        cwd: path.resolve(__dirname, ".."),
        env,
    });
} catch (error: any) {
    // Проверить, был ли создан файл (приложение завершится с exit(0))
    if (error.status === 0 && fs.existsSync(openApiJsonPath)) {
        console.log("OpenAPI schema generated successfully");
    } else if (!fs.existsSync(openApiJsonPath)) {
        console.error("Failed to generate OpenAPI schema");
        console.error("Error:", error.message);
        console.error("\nMake sure:");
        console.error("1. Backend dependencies are installed (npm install)");
        console.error("2. Backend can start without errors");
        console.error("3. Swagger is properly configured");
        process.exit(1);
    }
}

// Проверить, что файл создан
if (!fs.existsSync(openApiJsonPath)) {
    console.error(`OpenAPI schema file not found at ${openApiJsonPath}`);
    console.error("Make sure the backend application can start and generate the schema");
    process.exit(1);
}

console.log("Generating TypeScript types from OpenAPI schema...");

// Использовать openapi-typescript для генерации типов
try {
    execSync(`npx openapi-typescript ${openApiJsonPath} -o ${apiTypesPath}`, {
        stdio: "inherit",
    });
    console.log(`TypeScript types generated at ${apiTypesPath}`);
} catch (error) {
    console.error("Failed to generate TypeScript types from OpenAPI schema");
    console.error("Make sure openapi-typescript is installed");
    throw error;
}
