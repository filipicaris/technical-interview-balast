import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IcdMatcherAdapter } from 'src/module/core/adapter/icd-matcher.adapter';
import {
  Spl,
  SplXmlJSONSection,
} from 'src/module/api-clients/types/daily-med-api.types';

@Entity('drugs')
export class Drug {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'version', nullable: false })
  version: number;

  @Column({ name: 'published_date', nullable: false })
  publishedDate: string;

  @Column({ name: 'indications', type: 'jsonb' })
  indications?: Record<string, unknown>;

  constructor(input: Spl) {
    this.id = input?.setid;
    this.title = input?.title;
    this.version = input?.spl_version;
    this.publishedDate = input?.published_date;
  }

  setIndications(
    input: SplXmlJSONSection,
    icdMatcherAdapter: IcdMatcherAdapter,
  ) {
    const indicatedFor = input.component
      .filter(({ section }) => !!section.title)
      .map(({ section }) => {
        const sickness = section.title.replace(/^\d+\.\d+\t/, '');
        return {
          sickness,
          text: section.text,
          cdi: icdMatcherAdapter.findICDCode(sickness),
        };
      });

    this.indications = {
      indicatedFor,
    };
  }
}
