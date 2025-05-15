import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AppReq3HypServsService } from './app-req3-hyp-servs.service';
import { CreateAppReq3HypServDto } from './dto/create-app-req3-hyp-serv.dto';
import { UpdateAppReq3HypServDto } from './dto/update-app-req3-hyp-serv.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AppReq3HypServ } from './domain/app-req3-hyp-serv';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAppReq3HypServsDto } from './dto/find-all-app-req3-hyp-servs.dto';

@ApiTags('Appreq3hypservs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'app-req3-hyp-servs',
  version: '1',
})
export class AppReq3HypServsController {
  constructor(private readonly appReq3HypServsService: AppReq3HypServsService) {}

  @Post()
  @ApiCreatedResponse({
    type: AppReq3HypServ,
  })
  create(@Body() createAppReq3HypServDto: CreateAppReq3HypServDto) {
    return this.appReq3HypServsService.create(createAppReq3HypServDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AppReq3HypServ),
  })
  async findAll(@Query() query: FindAllAppReq3HypServsDto): Promise<InfinityPaginationResponseDto<AppReq3HypServ>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.appReq3HypServsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':COD_CHIAVE')
  @ApiParam({
    name: 'COD_CHIAVE',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AppReq3HypServ,
  })
  findById(@Param('COD_CHIAVE') COD_CHIAVE: number) {
    return this.appReq3HypServsService.findById(COD_CHIAVE);
  }

  @Patch(':COD_CHIAVE')
  @ApiParam({
    name: 'COD_CHIAVE',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AppReq3HypServ,
  })
  update(@Param('COD_CHIAVE') COD_CHIAVE: number, @Body() updateAppReq3HypServDto: UpdateAppReq3HypServDto) {
    return this.appReq3HypServsService.update(COD_CHIAVE, updateAppReq3HypServDto);
  }

  @Delete(':COD_CHIAVE')
  @ApiParam({
    name: 'COD_CHIAVE',
    type: String,
    required: true,
  })
  remove(@Param('COD_CHIAVE') COD_CHIAVE: number) {
    return this.appReq3HypServsService.remove(COD_CHIAVE);
  }
}
