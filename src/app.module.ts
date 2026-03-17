import { Module } from '@nestjs/common';
import { EntriesModule } from './entries/entries.module';
import { CrawlerModule } from './crawler/crawler.module';
import { FilterModule } from './filter/filter.module';

@Module({
  imports: [EntriesModule, CrawlerModule, FilterModule],
})
export class AppModule { }
