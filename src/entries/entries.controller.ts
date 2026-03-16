import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from 'src/crawler/crawler.service';

@Controller('entries')
export class EntriesController {
  constructor(private readonly crawlerService: CrawlerService) { }

  @Get()
  async getEntries() {
    return this.crawlerService.fetchEntries();
  }
}
