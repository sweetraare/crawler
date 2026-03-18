import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { CrawlerModule } from '../crawler/crawler.module';
import { FilterModule } from '../filter/filter.module';
import { UserLogsModule } from '../user-logs/user-logs.module';

@Module({
  imports: [CrawlerModule, FilterModule, UserLogsModule],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
