import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleTasksRepository } from '../schedule-tasks.repository';
import { ScheduleTasksEntity } from './entities/schedule-tasks.entity';
import { ScheduleTasksRelationalRepository } from './repositories/schedule-tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleTasksEntity]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: ScheduleTasksRepository,
      useClass: ScheduleTasksRelationalRepository,
    },
  ],
  exports: [ScheduleTasksRepository],
})
export class RelationalScheduleTasksPersistenceModule {}
