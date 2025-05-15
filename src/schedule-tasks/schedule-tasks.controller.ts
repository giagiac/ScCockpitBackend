import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { ScheduleTasks } from './domain/schedule-tasks';
import { CreateScheduleTasksDto } from './dto/create-schedule-tasks.dto';
import { FindAllScheduleTasksDto } from './dto/find-all-schedule-tasks.dto';
import { UpdateScheduleTasksDto } from './dto/update-schedule-tasks.dto';
import { ScheduleTasksService } from './schedule-tasks.service';

@ApiTags('Scheduletasks')
// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'schedule-tasks',
  version: '1',
})
export class ScheduleTasksController {
  constructor(private readonly scheduleTasksService: ScheduleTasksService) {}

  @Post()
  @ApiCreatedResponse({
    type: ScheduleTasks,
  })
  create(@Body() createScheduleTasksDto: CreateScheduleTasksDto) {
    return this.scheduleTasksService.create(createScheduleTasksDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ScheduleTasks),
  })
  async findAll(@Query() query: FindAllScheduleTasksDto): Promise<InfinityPaginationResponseDto<ScheduleTasks>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.scheduleTasksService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('trigger')
  @ApiOkResponse()
  async trigger(): Promise<any> {
    return await this.scheduleTasksService.trigger();
  }

  @Get('find-all-esec-by-id/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ScheduleTasks, // Consider changing the return type of findAllEsecById to Promise<ScheduleTasks> or adjust this type
  })
  async findAllEsecById(@Param('id') id: string): Promise<any> {
    return await this.scheduleTasksService.findAllEsecById(id);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ScheduleTasks,
  })
  findById(@Param('id') id: string) {
    return this.scheduleTasksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ScheduleTasks,
  })
  update(@Param('id') id: string, @Body() updateScheduleTasksDto: UpdateScheduleTasksDto) {
    return this.scheduleTasksService.update(id, updateScheduleTasksDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.scheduleTasksService.remove(id);
  }
}
