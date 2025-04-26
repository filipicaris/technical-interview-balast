import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { DailyMedApiClient } from './services/daily-med-client.service';

@Module({
  imports: [HttpModule],
  providers: [DailyMedApiClient],
  exports: [DailyMedApiClient],
})
export class ApiClientsModule {}
