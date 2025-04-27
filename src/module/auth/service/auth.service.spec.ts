/* eslint-disable @typescript-eslint/unbound-method */
import * as sinon from 'sinon';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { User } from '../entities/user.entity';

describe('AuthService', () => {
  let sandbox: sinon.SinonSandbox;
  let service: AuthService;
  let passwordService: sinon.SinonStubbedInstance<PasswordService>;
  let repository: sinon.SinonStubbedInstance<Repository<User>>;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    passwordService = sandbox.createStubInstance(PasswordService);

    repository = sandbox.createStubInstance(
      Repository,
    ) as unknown as sinon.SinonStubbedInstance<Repository<User>>;
    repository.save.callsFake(async (entity: User) => entity);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: repository },
        { provide: PasswordService, useValue: passwordService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('.createUser', () => {
    it('should create correctly', async () => {
      repository.findOne.resolves(null);
      passwordService.hashPassword.resolves('hashedPassword');

      const input = {
        email: 'email',
        password: 'password',
        username: 'username',
      } as Omit<User, 'id'>;

      await expect(service.createUser(input)).resolves.toBeDefined();

      const expectedEntity = new User({ ...input, password: 'hashedPassword' });
      sinon.assert.calledOnceWithExactly(repository.save, expectedEntity);
    });
  });

  describe('.findByUsername', () => {
    it('should call repository correctly', async () => {
      repository.findOne.resolves(null);

      await expect(service.findByUsername('username')).resolves.toBeNull();

      sinon.assert.calledOnceWithExactly(repository.findOne, {
        where: { username: 'username' },
      });
    });
  });

  describe('.login', () => {
    it('should call repository correctly', async () => {
      const user = new User({
        email: 'email',
        password: 'hashedPassword',
        username: 'username',
      });
      repository.findOne.resolves(user);
      passwordService.comparePassword.resolves(true);

      await expect(service.login('username', 'password')).resolves.toBe(user);

      sinon.assert.calledOnceWithExactly(
        passwordService.comparePassword,
        'password',
        'hashedPassword',
      );
    });
  });
});
