import {
  // common
  Injectable,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArtCodici } from './domain/art-codici';
import { CreateArtCodiciDto } from './dto/create-art-codici.dto';
import { UpdateArtCodiciDto } from './dto/update-art-codici.dto';
import { ArtCodiciRepository } from './infrastructure/persistence/art-codici.repository';

@Injectable()
export class ArtCodicisService {
  constructor(
    // Dependencies here
    private readonly artCodiciRepository: ArtCodiciRepository,
  ) {}

  async create(createArtCodiciDto: CreateArtCodiciDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.artCodiciRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      COD_SECONDARIO_ART: createArtCodiciDto.COD_SECONDARIO_ART,

      TIPO_CODICE: createArtCodiciDto.TIPO_CODICE,

      COD_ART: createArtCodiciDto.COD_ART,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.artCodiciRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART']) {
    return this.artCodiciRepository.findById(COD_SECONDARIO_ART);
  }

  findByIds(ids: ArtCodici['COD_SECONDARIO_ART'][]) {
    return this.artCodiciRepository.findByIds(ids);
  }

  async update(
    COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART'],

    updateArtCodiciDto: UpdateArtCodiciDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.artCodiciRepository.update(COD_SECONDARIO_ART, {
      // Do not remove comment below.
      // <updating-property-payload />
      COD_ART: updateArtCodiciDto.COD_ART,

      TIPO_CODICE: updateArtCodiciDto.TIPO_CODICE,

      COD_SECONDARIO_ART: updateArtCodiciDto.COD_SECONDARIO_ART,
    });
  }

  remove(COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART']) {
    return this.artCodiciRepository.remove(COD_SECONDARIO_ART);
  }
}
