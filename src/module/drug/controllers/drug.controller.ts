import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DrugsService } from '../services/drug.service';
import { RetrieveNewDrugIndicationInput } from './inputs/retrieve-new-drug-indication.input';
import { BasicGuard } from 'src/module/auth/guards/basic.guard';

@ApiTags('Drug')
@ApiBasicAuth()
@UseGuards(BasicGuard)
@Controller({ path: 'drugs', version: '1' })
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Post('sync')
  @ApiOperation({ summary: 'Find information for drug name and create drug' })
  @ApiCreatedResponse()
  async retrieveNewDrugIndication(
    @Body() input: RetrieveNewDrugIndicationInput,
  ) {
    return await this.drugsService.scrapInformationAboutDrug(input.drugName);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find drug' })
  @ApiOkResponse()
  async search(@Param('id') id: string) {
    return await this.drugsService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove drug' })
  @ApiOkResponse()
  async delete(@Param('id') id: string) {
    return await this.drugsService.delete(id);
  }
}
