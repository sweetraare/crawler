import { Module } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';

@Module({
  providers: [UserLogsService],
  exports: [UserLogsService],
})
export class UserLogsModule { }
