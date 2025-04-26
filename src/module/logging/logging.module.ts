import { DynamicModule, Module } from '@nestjs/common';

import { ApplicationLogger } from './application-logger.class';
import { WinstonAdapter } from './winston.adapter';
import { WinstonLogger } from './winston-logger.class';

@Module({})
export class LoggingModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggingModule,
      providers: [
        {
          provide: WinstonAdapter,
          useFactory: (): WinstonAdapter => {
            return WinstonAdapter.create();
          },
        },

        WinstonLogger,
        ApplicationLogger,
      ],
      exports: [WinstonLogger],
      global: true,
    };
  }
}
