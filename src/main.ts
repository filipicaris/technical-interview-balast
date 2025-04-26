import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './module/app/app.module';
import { ApplicationLogger } from './module/logging';
import { Configuration } from './config/configuration';

async function bootstrap() {
  const logger = ApplicationLogger.create();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });

  Configuration.applyConfiguration(app);
  Configuration.applySwaggerConfiguration(app);

  const port = Configuration.getApplicationConfiguration().port;
  await app.listen(port);

  logger.infoStart(
    `🚀 Swagger Endpoint is running on: http://localhost:${port}/swagger`,
  );
  logger.infoStart(`🚀 `);
}

void bootstrap();
