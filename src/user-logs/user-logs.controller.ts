import { Controller, Get } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';

@Controller('user-logs')
export class UserLogsController {
  constructor(private readonly userLogsService: UserLogsService) { }

  @Get()
  getAllLogs() {
    return this.userLogsService.getAllLogs();
  }
}
