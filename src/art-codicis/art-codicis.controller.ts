import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArtCodicisService } from './art-codicis.service';
import { CreateArtCodiciDto } from './dto/create-art-codici.dto';
import { UpdateArtCodiciDto } from './dto/update-art-codici.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArtCodici } from './domain/art-codici';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllArtCodicisDto } from './dto/find-all-art-codicis.dto';

@ApiTags('Artcodicis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'art-codicis',
  version: '1',
})
export class ArtCodicisController {
  constructor(private readonly artCodicisService: ArtCodicisService) {}

  @Post()
  @ApiCreatedResponse({
    type: ArtCodici,
  })
  create(@Body() createArtCodiciDto: CreateArtCodiciDto) {
    return this.artCodicisService.create(createArtCodiciDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ArtCodici),
  })
  async findAll(
    @Query() query: FindAllArtCodicisDto,
  ): Promise<InfinityPaginationResponseDto<ArtCodici>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.artCodicisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ArtCodici,
  })
  findById(@Param('id') id: string) {
    return this.artCodicisService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ArtCodici,
  })
  update(
    @Param('id') id: string,
    @Body() updateArtCodiciDto: UpdateArtCodiciDto,
  ) {
    return this.artCodicisService.update(id, updateArtCodiciDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.artCodicisService.remove(id);
  }
}
