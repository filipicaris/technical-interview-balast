import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { BasicGuard } from './guards/basic.guard';
import { PasswordService } from './service/password.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [PasswordService, AuthService, BasicGuard],
  exports: [BasicGuard, AuthService],
})
export class AuthModule {}
