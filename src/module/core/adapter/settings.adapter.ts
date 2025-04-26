import { ConfigService } from '@nestjs/config';
import { DatabaseConfiguration } from 'src/module/database/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsAdapter {
  constructor(private readonly configService: ConfigService) {}

  getDbConfiguration() {
    return this.configService.get<DatabaseConfiguration>('db');
  }
}
