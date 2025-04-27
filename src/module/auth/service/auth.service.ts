import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(input: Omit<User, 'id'>): Promise<User> {
    let user = await this.findByUsername(input.username);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );
    user = new User({ ...input, password: hashedPassword });

    return await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { username },
    });
  }

  async login(userName: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(userName);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
