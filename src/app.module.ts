import { Module } from '@nestjs/common';
import { EntriesModule } from './entries/entries.module';
import { CrawlerModule } from './crawler/crawler.module';
import { FilterModule } from './filter/filter.module';
import { UserLogsModule } from './user-logs/user-logs.module';

@Module({
  imports: [EntriesModule, CrawlerModule, FilterModule, UserLogsModule],
})
export class AppModule { }
