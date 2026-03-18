import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerService } from './crawler.service';
import axios from 'axios';
import { New } from 'src/common/interfaces/new.interface';
import { mockCrawlHTML } from '../common/__mocks__/crawlHTML.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CrawlerService', () => {
  let service: CrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlerService],
    }).compile();

    service = module.get<CrawlerService>(CrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not make real HTTP requests', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockCrawlHTML });
    await service.fetchEntries();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should parse news from HTML', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList.length).toBe(2);
  });

  it('should parse titles correctly', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].title).toEqual('Long long long long text');
    expect(newsList[1].title).toEqual('short title');
  });

  it('should parse index correctly', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].index).toEqual(1);
    expect(newsList[1].index).toEqual(2);
  });

  it('should parse points correctly ', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].points).toEqual(1);
    expect(newsList[1].points).toEqual(20);
  });

  it('should parse comments correctly even when no comments', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].comments).toEqual(0);
    expect(newsList[1].comments).toEqual(4);
  });
});
