import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { CrawlerModule } from 'src/crawler/crawler.module';

@Module({
  imports: [CrawlerModule],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule { }
