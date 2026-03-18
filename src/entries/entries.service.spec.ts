import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { CrawlerService } from '../crawler/crawler.service';
import { FilterService } from '../filter/filter.service';
import { UserLogsService } from '../user-logs/user-logs.service';
import { FilterType } from '../filter/dto/filter-query.dto';

describe('EntriesService', () => {
  let service: EntriesService;
  let crawlerService: CrawlerService;
  let filterService: FilterService;
  let userLogsService: UserLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        {
          provide: CrawlerService,
          useValue: { fetchEntries: jest.fn().mockResolvedValue([]) },
        },
        {
          provide: FilterService,
          useValue: { filterNews: jest.fn().mockReturnValue([]) },
        },
        {
          provide: UserLogsService,
          useValue: { createLog: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
    userLogsService = module.get<UserLogsService>(UserLogsService);
    crawlerService = module.get<CrawlerService>(CrawlerService);
    filterService = module.get<FilterService>(FilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create log when all entries are requested', async () => {
    await service.getAllEntries();
    expect(userLogsService.createLog).toHaveBeenCalledTimes(1);
  });

  it('should create log when short entries are requested', async () => {
    await service.getFilteredEntries({ filter: FilterType.short });
    expect(userLogsService.createLog).toHaveBeenCalledTimes(1);
  });

  it('should create log when long entries are requested', async () => {
    await service.getFilteredEntries({ filter: FilterType.long });
    expect(userLogsService.createLog).toHaveBeenCalledTimes(1);
  });

  it('should fetch all entries', async () => {
    await service.getAllEntries();
    expect(crawlerService.fetchEntries).toHaveBeenCalledTimes(1);
  });

  it('should fetch filter entries', async () => {
    await service.getFilteredEntries({ filter: FilterType.long });
    expect(crawlerService.fetchEntries).toHaveBeenCalledTimes(1);
    expect(filterService.filterNews).toHaveBeenCalledTimes(1);
  });
});
