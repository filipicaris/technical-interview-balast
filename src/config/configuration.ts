import * as env from 'env-var';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

export class Configuration {
  static getApplicationConfiguration() {
    return {
      port: env.get('PORT').default('3000').asPortNumber(),
      corsOrigin: env.get('CORS_ORIGIN').default('*').asString(),
      db: {
        connection: 'postgres',
        logging: env.get('TYPEORM_LOGGING').default('false').asBool(),
        host: env.get('TYPEORM_HOST').required().asString(),
        port: env.get('TYPEORM_PORT').required().asPortNumber(),
        database: env.get('TYPEORM_DATABASE').required().asString(),
        username: env.get('TYPEORM_USERNAME').required().asString(),
        password: env.get('TYPEORM_PASSWORD').required().asString(),
      },
    };
  }

  static applyConfiguration(application: NestExpressApplication) {
    application.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      }),
    );
    application.enableVersioning();
    application.enableCors();
    application.disable('x-powered-by');
  }

  static applySwaggerConfiguration(application: NestExpressApplication) {
    const documentBuilder = new DocumentBuilder()
      .setTitle('Technical Interview')
      .addBasicAuth();

    const document = SwaggerModule.createDocument(
      application,
      documentBuilder.build(),
    );

    SwaggerModule.setup('swagger', application, document);
  }
}
