import { Test, TestingModule } from '@nestjs/testing';
import { UserLogsService } from './user-logs.service';
import { DATABASE_CONNECTION } from './database.provider';
import { FilterType } from '../filter/dto/filter-query.dto';
import { UserLog } from './user-logs.model';
import { mockDb } from '../common/__mocks__/db.mock';

describe('UserLogsService', () => {
  let service: UserLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserLogsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<UserLogsService>(UserLogsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLog', () => {
    it('should insert a log into the database', () => {
      const log: UserLog = {
        timestamp: new Date().toUTCString(),
        filter: FilterType.long,
        numberOfNews: 10,
      };

      service.createLog(log);

      expect(mockDb.prepare).toHaveBeenCalled();

      expect(mockDb.run).toHaveBeenCalledWith(log);
    });
  });

  describe('getAllLogs', () => {
    it('should return all logs from the database', () => {
      const fakeLogs: UserLog[] = [
        {
          timestamp: new Date().toUTCString(),
          filter: FilterType.short,
          numberOfNews: 1,
        },
      ];

      mockDb.all.mockReturnValue(fakeLogs);

      const result = service.getAllLogs();

      expect(mockDb.prepare).toHaveBeenCalledTimes(1);

      expect(mockDb.all).toHaveBeenCalled();
      expect(result).toEqual(fakeLogs);
    });
  });
});
