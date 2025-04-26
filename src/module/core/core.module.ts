import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SettingsAdapter } from './adapter/settings.adapter';

const providers = [SettingsAdapter];

@Module({})
export class CoreModule {
  static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
