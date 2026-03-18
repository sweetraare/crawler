import { Test, TestingModule } from '@nestjs/testing';
import { FilterService } from './filter.service';
import { FilterType } from './dto/filter-query.dto';
import { testNewsList } from '../common/__mocks__/newsList.mock';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterService],
    }).compile();

    service = module.get<FilterService>(FilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 0 when title is empty', () => {
    const testTitle = '';
    expect(service.countWords(testTitle)).toBe(0);
  });

  it('should count only spaced words', () => {
    const testTitle = 'This is - a self-explained example';
    expect(service.countWords(testTitle)).toBe(5);
  });

  it('should count only spaced words', () => {
    const testTitle = 'alex-javier ulloa-arevalo';
    expect(service.countWords(testTitle)).toBe(2);
  });

  it('should return short title news sorted by points', () => {
    const sortedNews = service.filterNews(testNewsList, FilterType.short);
    const shortTitlesIndexes = [2, 1, 0];

    expect(sortedNews.map((n) => n.index)).toEqual(shortTitlesIndexes);
  });

  it('should return long title news sorted by comments', () => {
    const sortedNews = service.filterNews(testNewsList, FilterType.long);
    const shortTitlesIndexes = [4, 3];

    expect(sortedNews.map((n) => n.index)).toEqual(shortTitlesIndexes);
  });
});
