import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { Configuration } from '../config/configuration';
import { CoreModule } from './core/core.module';
import { DbModule } from './database/db.module';
import { DrugsModule } from './drug/drug.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => Configuration.getApplicationConfiguration()],
    }),
    CoreModule.forRoot(),
    LoggingModule.forRoot(),
    DbModule.registerAsync(),
    HttpModule,
    DrugsModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
