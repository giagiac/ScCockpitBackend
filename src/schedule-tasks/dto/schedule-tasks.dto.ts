import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ScheduleTasksDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
