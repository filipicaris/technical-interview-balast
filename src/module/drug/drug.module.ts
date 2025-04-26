import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiClientsModule } from '../api-clients/api-clients.module';
import { Drug } from './entities/drug.entity';
import { DrugsController } from './controllers/drug.controller';
import { DrugsService } from './services/drug.service';

@Module({
  imports: [ApiClientsModule, TypeOrmModule.forFeature([Drug])],
  controllers: [DrugsController],
  providers: [DrugsService],
})
export class DrugsModule {}
