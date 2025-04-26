import { DailyMedApiClient } from 'src/module/api-clients/services/daily-med-client.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drug } from '../entities/drug.entity';
import { IcdMatcherAdapter } from 'src/module/core/adapter/icd-matcher.adapter';

@Injectable()
export class DrugsService {
  constructor(
    private readonly dailyMedApiClient: DailyMedApiClient,
    private readonly icdMatcherAdapter: IcdMatcherAdapter,

    @InjectRepository(Drug)
    private readonly drugRepository: Repository<Drug>,
  ) {}

  async scrapInformationAboutDrug(drugName: string) {
    const info = await this.dailyMedApiClient.retrieveDrugInfo(drugName);
    const indications =
      await this.dailyMedApiClient.retrieveInformationAboutIndication(
        info.setid,
      );

    let drug = await this.drugRepository.findOneBy({ id: info.setid });
    if (!drug) {
      drug = new Drug(info);
    }
    drug.setIndications(indications, this.icdMatcherAdapter);

    return await this.drugRepository.save(drug);
  }

  async findById(id: string) {
    return await this.drugRepository.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.drugRepository.delete(id);
  }
}
