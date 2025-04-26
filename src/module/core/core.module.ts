import { DynamicModule, Module } from '@nestjs/common';

import { IcdMatcherAdapter } from './adapter/icd-matcher.adapter';
import { SettingsAdapter } from './adapter/settings.adapter';

const providers = [SettingsAdapter, IcdMatcherAdapter];

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
