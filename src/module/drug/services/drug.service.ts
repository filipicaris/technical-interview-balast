import { DailyMedApiClient } from 'src/module/api-clients/services/daily-med-client.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drug } from '../entities/drug.entity';

@Injectable()
export class DrugsService {
  constructor(
    private readonly dailyMedApiClient: DailyMedApiClient,

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
    drug.indications = indications;

    return await this.drugRepository.save(drug);
  }

  async findById(id: string) {
    return await this.drugRepository.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.drugRepository.delete(id);
  }
}
