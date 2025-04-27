import * as sinon from 'sinon';
import { AxiosHeaders, AxiosResponse } from 'axios';
import {
  BadRequestException,
  PreconditionFailedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonLogger } from 'src/module/logging/winston-logger.class';
import { of, throwError } from 'rxjs';

import { DailyMedApiClient } from './daily-med-client.service';
import { Spl } from '../types/daily-med-api.types';

describe('DailyMedApiClient', () => {
  let sandbox: sinon.SinonSandbox;
  let client: DailyMedApiClient;
  let httpService: sinon.SinonStubbedInstance<HttpService>;
  let logger: sinon.SinonStubbedInstance<WinstonLogger>;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    httpService = sandbox.createStubInstance(HttpService);
    logger = sandbox.createStubInstance(WinstonLogger);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyMedApiClient,
        { provide: HttpService, useValue: httpService },
        { provide: WinstonLogger, useValue: logger },
      ],
    }).compile();

    client = module.get<DailyMedApiClient>(DailyMedApiClient);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('retrieveSetId', () => {
    let mockedAxiosResponse: AxiosResponse;

    beforeEach(() => {
      mockedAxiosResponse = {
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: new AxiosHeaders() },
      };
    });

    it('should throw if api fails', async () => {
      const errorResponse = { response: { data: 'error' } };
      httpService.get.returns(throwError(() => errorResponse));

      await expect(() => client.retrieveDrugInfo('Test Drug')).rejects.toThrow(
        new PreconditionFailedException('Daily Med API is not available'),
      );
    });

    it('should throw if api finds no drug', async () => {
      mockedAxiosResponse.data = { data: [] };
      httpService.get.returns(of(mockedAxiosResponse));

      await expect(client.retrieveDrugInfo('Test Drug')).rejects.toThrow(
        new BadRequestException('No drug found with the specified name'),
      );
    });

    it('should throw if api finds multiple drug', async () => {
      mockedAxiosResponse.data = { data: [{} as Spl, {} as Spl] };
      httpService.get.returns(of(mockedAxiosResponse));
      await expect(client.retrieveDrugInfo('Test Drug')).rejects.toThrow(
        new BadRequestException(
          'Please, specify the name of the drug. Multiple drugs found with filter',
        ),
      );
    });

    it('should return the setid for the drug', async () => {
      mockedAxiosResponse.data = {
        data: [
          {
            published_date: 'published_date',
            setid: 'setid',
            spl_version: 1,
            title: 'title',
          } as Spl,
        ],
      };
      httpService.get.returns(of(mockedAxiosResponse));

      await expect(client.retrieveDrugInfo('Test Drug')).resolves.toBeDefined();
    });
  });
});
