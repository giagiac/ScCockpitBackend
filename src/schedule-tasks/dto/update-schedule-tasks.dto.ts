// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateScheduleTasksDto } from './create-schedule-tasks.dto';

export class UpdateScheduleTasksDto extends PartialType(CreateScheduleTasksDto) {}
