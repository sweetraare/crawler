import { Test, TestingModule } from '@nestjs/testing';
import { FilterService } from './filter.service';
import { New } from 'src/common/interfaces/new.interface';
import { FilterType } from './dto/filter-query.dto';

const testNewsList: New[] = [
  {
    index: 0,
    title: ' one two three four',
    points: 1,
    comments: 1,
  },
  {
    index: 1,
    title: ' uno dos tres',
    points: 20,
    comments: 20,
  },
  {
    index: 2,
    title: 'um dois tres quattro',
    points: 301,
    comments: 303,
  },
  {
    index: 3,
    title: 'a title with more than five words',
    points: 202,
    comments: 201,
  },
  {
    index: 4,
    title: 'un titulo que tiene mas de cinco palabras',
    points: 505,
    comments: 505,
  },
  {
    index: 5,
    title: 'this - is - a breaking-change title',
    points: 605,
    comments: 605,
  },
];

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
