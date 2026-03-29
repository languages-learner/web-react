import path from "node:path";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module";

async function bootstrap() {
    // Загрузить .env файл из корня монорепы
    dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false,
        }),
    );

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle("Languages Learner API")
        .setDescription("API for Languages Learner application")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    // Export OpenAPI schema if GENERATE_API_SCHEMA env var is set
    if (process.env.GENERATE_API_SCHEMA === "true") {
        const fs = await import("node:fs");
        const openApiPath = path.resolve(
            __dirname,
            "../../../packages/api/src/schemas/openapi.json",
        );
        // Ensure directory exists
        const openApiDir = path.dirname(openApiPath);
        if (!fs.existsSync(openApiDir)) {
            fs.mkdirSync(openApiDir, { recursive: true });
        }
        fs.writeFileSync(openApiPath, JSON.stringify(document, null, 2), "utf-8");
        console.log(`OpenAPI schema exported to ${openApiPath}`);
        await app.close();
        process.exit(0);
    }

    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Backend server started at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
