import { Provider } from '@nestjs/common';
import * as Database from 'better-sqlite3';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
const DATABASE_NAME = 'usageLogs.db';

export const DatabaseProvider: Provider = {
  provide: DATABASE_CONNECTION,
  useFactory: () => {
    const db = new Database(DATABASE_NAME);
    db.pragma('journal_mode = WAL');

    db.exec(`
      CREATE TABLE IF NOT EXISTS user_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        filter TEXT NOT NULL,
        numberOfNews INTEGER NOT NULL
      )
    `);

    return db;
  },
};
