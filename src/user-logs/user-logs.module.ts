import { Module } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';
import { UserLogsController } from './user-logs.controller';
import { DatabaseProvider } from './database.provider';

@Module({
  providers: [UserLogsService, DatabaseProvider],
  exports: [UserLogsService],
  controllers: [UserLogsController],
})
export class UserLogsModule { }
