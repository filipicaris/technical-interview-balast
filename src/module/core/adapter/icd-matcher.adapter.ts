import * as fs from 'fs';
import * as path from 'path';
import { Injectable, OnModuleInit } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const Fuse = require('fuse.js');

interface ICDEntry {
  code: string;
  description: string;
}

@Injectable()
export class IcdMatcherAdapter implements OnModuleInit {
  private fuse: Fuse<ICDEntry>;

  constructor() {}

  onModuleInit() {
    const rawData = fs.readFileSync(
      path.join(__dirname, '../resources/icd10cm_codes_2023.txt'),
      'utf8',
    );

    const icdEntries: ICDEntry[] = rawData
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => {
        const [code, ...descriptionParts] = line.split(/\s+/);
        return {
          code: code.trim(),
          description: descriptionParts.join(' ').trim(),
        };
      });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.fuse = new Fuse(icdEntries, {
      keys: ['description'],
      threshold: 0.03,
    });
  }

  findICDCode(description: string): ICDEntry | null {
    const result = this.fuse.search(description);
    if (result.length > 0) {
      return (result[0] as unknown as { item: ICDEntry }).item;
    }
    return null;
  }
}
