import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiClientsModule } from '../api-clients/api-clients.module';
import { AuthModule } from '../auth/auth.module';
import { Drug } from './entities/drug.entity';
import { DrugsController } from './controllers/drug.controller';
import { DrugsService } from './services/drug.service';

@Module({
  imports: [ApiClientsModule, AuthModule, TypeOrmModule.forFeature([Drug])],
  controllers: [DrugsController],
  providers: [DrugsService],
})
export class DrugsModule {}
