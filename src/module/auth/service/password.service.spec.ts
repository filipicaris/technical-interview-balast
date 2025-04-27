/* eslint-disable @typescript-eslint/unbound-method */
import * as sinon from 'sinon';
import { Test, TestingModule } from '@nestjs/testing';

import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let sandbox: sinon.SinonSandbox;
  let service: PasswordService;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create and validate hash correctly', async () => {
    const hash = await service.hashPassword('password');

    expect(hash).toBeDefined();
    expect(hash).not.toBe('password');

    await expect(service.comparePassword('password', hash)).resolves.toBe(true);
    await expect(service.comparePassword('newPassword', hash)).resolves.toBe(
      false,
    );
  });
});
