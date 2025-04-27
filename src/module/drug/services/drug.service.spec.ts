import * as sinon from 'sinon';
import { DailyMedApiClient } from 'src/module/api-clients/services/daily-med-client.service';
import { IcdMatcherAdapter } from 'src/module/core/adapter/icd-matcher.adapter';
import { Repository } from 'typeorm';
import { SplXmlJSONSection } from 'src/module/api-clients/types/daily-med-api.types';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Drug } from '../entities/drug.entity';
import { DrugsService } from './drug.service';

describe('DrugsService', () => {
  let sandbox: sinon.SinonSandbox;
  let service: DrugsService;
  let dailyMedApiClient: sinon.SinonStubbedInstance<DailyMedApiClient>;
  let icdMatcherAdapter: sinon.SinonStubbedInstance<IcdMatcherAdapter>;
  let repository: sinon.SinonStubbedInstance<Repository<Drug>>;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    dailyMedApiClient = sandbox.createStubInstance(DailyMedApiClient);
    icdMatcherAdapter = sandbox.createStubInstance(IcdMatcherAdapter);
    repository = sandbox.createStubInstance(
      Repository,
    ) as unknown as sinon.SinonStubbedInstance<Repository<Drug>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DrugsService,
        { provide: getRepositoryToken(Drug), useValue: repository },
        { provide: DailyMedApiClient, useValue: dailyMedApiClient },
        { provide: IcdMatcherAdapter, useValue: icdMatcherAdapter },
      ],
    }).compile();

    service = module.get<DrugsService>(DrugsService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('scrapInformationAboutDrug', () => {
    it('should scrap and save drug information', async () => {
      dailyMedApiClient.retrieveDrugInfo.resolves({
        published_date: 'published_date',
        setid: 'setid',
        spl_version: 0,
        title: 'title',
      });

      dailyMedApiClient.retrieveInformationAboutIndication.resolves({
        component: [],
      } as SplXmlJSONSection);

      repository.findOneBy.resolves(null);
      repository.save.callsFake(async (entity: Drug) => entity);

      await expect(
        service.scrapInformationAboutDrug('drugName'),
      ).resolves.toBeDefined();
    });
  });
});
