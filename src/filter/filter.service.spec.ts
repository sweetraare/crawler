import { Test, TestingModule } from '@nestjs/testing';
import { FilterService } from './filter.service';

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
});
