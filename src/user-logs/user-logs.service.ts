import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserLog } from './user-logs.model';
import { DATABASE_CONNECTION } from './database.provider';
import * as Database from 'better-sqlite3';

@Injectable()
export class UserLogsService {
  private readonly logger = new Logger(UserLogsService.name);

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database.Database,
  ) { }

  createLog(log: UserLog) {
    const insert = this.db.prepare(
      'INSERT INTO user_logs(timestamp, filter, numberOFNews) values(@timestamp, @filter, @numberOfNews)',
    );

    insert.run(log);
  }

  getAllLogs() {
    const getStatement = this.db
      .prepare<[], UserLog>('SELECT * FROM user_logs')
      .all();

    return getStatement;
  }
}
