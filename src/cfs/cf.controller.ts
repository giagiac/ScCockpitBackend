import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPaginationQueryBuilder } from '../utils/infinity-pagination';
import { CfService } from './cf.service';
import { Cf } from './domain/cf';
import { CreateCfDto } from './dto/create-cf.dto';
import { FindAllCfDto } from './dto/find-all-cf.dto';

@ApiTags('Cf')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'cf',
  version: '1',
})
export class CfController {
  constructor(private readonly cfsService: CfService) {}

  @Post()
  @ApiCreatedResponse({
    type: Cf,
  })
  create(@Body() createCfDto: CreateCfDto) {
    return this.cfsService.create(createCfDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Cf),
  })
  async findAll(
    @Query() query: FindAllCfDto,
  ): Promise<InfinityPaginationResponseDto<Cf>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const filters = query.filters;
    const sort = query.sort;
    const join =
      query.othersFilters != null &&
      query.othersFilters.findIndex(
        (it) => it.key == 'join' && it.value == 'true',
      ) > -1;

    const { cf, count } = await this.cfsService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
      filterOptions: filters,
      sortOptions: sort,
      join,
    });

    return infinityPaginationQueryBuilder(cf, count);
  }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: Cf,
  // })
  // findById(@Param('id') id: string) {
  //   return this.cfsService.findById(id);
  // }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: Cf,
  // })
  // update(@Param('id') id: string, @Body() updateCfDto: UpdateCfDto) {
  //   return this.cfsService.update(id, updateCfDto);
  // }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.cfsService.remove(id);
  // }
}
