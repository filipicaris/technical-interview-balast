import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Spl } from 'src/module/api-clients/types/daily-med-api.types';

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
}
