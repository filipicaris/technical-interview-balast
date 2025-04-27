import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserInput } from './inputs/create-user.input';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users')
  @ApiOperation({ summary: 'create a new user' })
  @ApiCreatedResponse()
  async createUser(@Body() input: CreateUserInput) {
    return await this.authService.createUser(input);
  }
}
