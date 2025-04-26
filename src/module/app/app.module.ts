import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { Configuration } from '../../config/configuration';
import { CoreModule } from '../core/core.module';
import { DbModule } from '../database/db.module';
import { DrugsModule } from '../drug/drug.module';
import { LoggingModule } from '../logging/logging.module';

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
  ],
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: CompanyCustomerNumberInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: ExpressLoggingInterceptor },
    // { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
