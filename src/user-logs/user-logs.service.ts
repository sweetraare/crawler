import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as Database from 'better-sqlite3';
import { UserLog } from './user-logs.model';

@Injectable()
export class UserLogsService implements OnModuleInit {
  private db: Database.Database;
  private readonly logger = new Logger(UserLogsService.name);

  onModuleInit() {
    this.db = new Database('usageLogs.db');
    this.db.pragma('journal_mode = WAL');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        filter TEXT NOT NULL,
        numberOfNews INTEGER NOT NULL
      )
    `);

    this.logger.log('DB ON boy!');
  }

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
