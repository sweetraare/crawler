import { Module } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';
import { UserLogsController } from './user-logs.controller';

@Module({
  providers: [UserLogsService],
  exports: [UserLogsService],
  controllers: [UserLogsController],
})
export class UserLogsModule { }
