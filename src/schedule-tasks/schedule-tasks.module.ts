import { Logger, Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { RelationalScheduleTasksPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ScheduleTasksController } from './schedule-tasks.controller';
import { ScheduleTasksService } from './schedule-tasks.service';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalScheduleTasksPersistenceModule
  : RelationalScheduleTasksPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [ScheduleTasksController],
  providers: [ScheduleTasksService, Logger],
  exports: [ScheduleTasksService, infrastructurePersistenceModule],
})
export class ScheduleTasksModule {}
