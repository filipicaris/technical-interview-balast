import { DataSource } from 'typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SettingsAdapter } from '../core/adapter/settings.adapter';

@Module({})
export class DbModule {
  static async registerAsync(
    initializeDatabase = (dataSource: DataSource) => dataSource,
  ): Promise<DynamicModule> {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [SettingsAdapter],
          useFactory: async (settingsAdapter: SettingsAdapter) => {
            const dbConfiguration = settingsAdapter.getDbConfiguration();

            return {
              ...dbConfiguration,
              type: 'postgres',
              autoLoadEntities: true,
              synchronize: false,
              connectTimeoutMS: 10000,
            };
          },
          dataSourceFactory: async (options) => {
            return initializeDatabase(
              await new DataSource(options).initialize(),
            );
          },
        }),
      ],
      providers: [],
      exports: [],
    };
  }
}
