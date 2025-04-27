import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserInput {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
