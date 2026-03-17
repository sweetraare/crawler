import { Injectable } from '@nestjs/common';
import { CrawlerService } from '../crawler/crawler.service';
import { FilterQueryDTO } from '../filter/dto/filter-query.dto';
import { FilterService } from '../filter/filter.service';
import { UserLogsService } from 'src/user-logs/user-logs.service';
import { UserLog } from 'src/user-logs/user-logs.model';

@Injectable()
export class EntriesService {
  constructor(
    private readonly crawler: CrawlerService,
    private readonly filter: FilterService,
    private readonly userLogs: UserLogsService,
  ) { }

  async getAllEntries() {
    const news = await this.crawler.fetchEntries();

    const allEntriesLog: UserLog = {
      timestamp: new Date().toUTCString(),
      filter: 'all',
      numberOfNews: news.length,
    };

    this.userLogs.createLog(allEntriesLog);

    return news;
  }

  async getFilteredEntries(filterQuery: FilterQueryDTO) {
    const crawledNews = await this.crawler.fetchEntries();

    const filteredData = this.filter.filterNews(
      crawledNews,
      filterQuery.filter,
    );

    const filteredLog: UserLog = {
      timestamp: new Date().toUTCString(),
      filter: filterQuery.filter,
      numberOfNews: filteredData.length,
    };

    this.userLogs.createLog(filteredLog);

    return filteredData;
  }
}
