import {
  BadRequestException,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WinstonLogger } from 'src/module/logging/winston-logger.class';
import { XMLParser } from 'fast-xml-parser';
import { catchError, lastValueFrom, timeout } from 'rxjs';

import {
  Spl,
  SplXmlJSON,
  SplXmlJSONSection,
  SplsResponse,
} from '../types/daily-med-api.types';

@Injectable()
export class DailyMedApiClient {
  private baseUrl = 'https://dailymed.nlm.nih.gov/dailymed/services/v2';

  constructor(
    private readonly logger: WinstonLogger,
    private readonly httpService: HttpService,
  ) {
    this.logger.setContext(DailyMedApiClient.name);
  }

  async retrieveDrugInfo(drugName: string): Promise<Spl> {
    const url = `${this.baseUrl}/spls.json?drug_name=${drugName}`;

    const response = await lastValueFrom(
      this.httpService.get<SplsResponse>(url).pipe(
        timeout(20000),
        catchError((error) => {
          throw new PreconditionFailedException(
            'Daily Med API is not available',
          );
        }),
      ),
    );
    if (response.data?.data.length === 0) {
      throw new BadRequestException('No drug found with the specified name');
    } else if (response.data.data.length > 1) {
      throw new BadRequestException(
        'Please, specify the name of the drug. Multiple drugs found with filter',
      );
    }

    return response.data.data[0];
  }

  async retrieveInformationAboutIndication(
    setId: string,
  ): Promise<SplXmlJSONSection> {
    const url = `${this.baseUrl}/spls/${setId}.xml`;

    const response = await lastValueFrom(
      this.httpService.get<string>(url).pipe(
        timeout(20000),
        catchError((error) => {
          throw new PreconditionFailedException(
            'Daily Med API is not available',
          );
        }),
      ),
    );
    const xmlData = response.data;

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const jsonObj = parser.parse(xmlData) as SplXmlJSON;

    // navigate to the section with ID="S1"
    const document = jsonObj.document;
    const components = document.component?.structuredBody?.component;

    const indicationsSection = components.find((c) => c.section?.ID === 'S1');

    if (!indicationsSection) {
      throw new Error('Section with ID="S1" not found');
    }

    return indicationsSection.section;
  }
}
