import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RetrieveNewDrugIndicationInput {
  @ApiProperty()
  @IsString()
  drugName: string;
}
