import { Controller, Get, Query } from '@nestjs/common';
import { FilterQueryDTO } from '../filter/dto/filter-query.dto';
import { EntriesService } from './entries.service';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entries: EntriesService) {}

  @Get()
  async getFilteredEntry(@Query() query: FilterQueryDTO) {
    return this.entries.getFilteredEntries(query);
  }

  @Get('/all')
  async getAllEntries() {
    return this.entries.getAllEntries();
  }
}
