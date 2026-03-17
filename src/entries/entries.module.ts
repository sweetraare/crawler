import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { CrawlerModule } from 'src/crawler/crawler.module';
import { FilterModule } from 'src/filter/filter.module';

@Module({
  imports: [CrawlerModule, FilterModule],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule { }
