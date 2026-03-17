import { Injectable } from '@nestjs/common';
import { CrawlerService } from '../crawler/crawler.service';
import { FilterQueryDTO } from '../filter/dto/filter-query.dto';
import { FilterService } from '../filter/filter.service';

@Injectable()
export class EntriesService {
  constructor(
    private readonly crawler: CrawlerService,
    private readonly filter: FilterService,
  ) { }

  async getAllEntries() {
    return this.crawler.fetchEntries();
  }

  async getFilteredEntries(filterQuery: FilterQueryDTO) {
    const crawledNews = await this.crawler.fetchEntries();

    const filteredData = this.filter.filterNews(
      crawledNews,
      filterQuery.filter,
    );

    return filteredData;
  }
}
