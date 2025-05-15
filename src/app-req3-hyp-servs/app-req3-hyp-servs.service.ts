import { Injectable } from '@nestjs/common';
import { CreateAppReq3HypServDto } from './dto/create-app-req3-hyp-serv.dto';
import { UpdateAppReq3HypServDto } from './dto/update-app-req3-hyp-serv.dto';
import { AppReq3HypServRepository } from './infrastructure/persistence/app-req3-hyp-serv.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AppReq3HypServ } from './domain/app-req3-hyp-serv';

@Injectable()
export class AppReq3HypServsService {
  constructor(
    // Dependencies here
    private readonly appReq3HypServRepository: AppReq3HypServRepository,
  ) {}

  async create(createAppReq3HypServDto: CreateAppReq3HypServDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.appReq3HypServRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      // COD_CHIAVE: createAppReq3HypServDto.COD_CHIAVE,

      NUM_AZIENDA: createAppReq3HypServDto.NUM_AZIENDA,

      COD_REQ3_HYPSERV: createAppReq3HypServDto.COD_REQ3_HYPSERV,

      PROGR: createAppReq3HypServDto.PROGR,

      UTENTE_FROM: createAppReq3HypServDto.UTENTE_FROM,
    });
  }

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.appReq3HypServRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(COD_CHIAVE: AppReq3HypServ['COD_CHIAVE']) {
    return this.appReq3HypServRepository.findById(COD_CHIAVE);
  }

  findByIds(ids: AppReq3HypServ['COD_CHIAVE'][]) {
    return this.appReq3HypServRepository.findByIds(ids);
  }

  async update(
    COD_CHIAVE: AppReq3HypServ['COD_CHIAVE'],

    updateAppReq3HypServDto: UpdateAppReq3HypServDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.appReq3HypServRepository.update(COD_CHIAVE, {
      // Do not remove comment below.
      // <updating-property-payload />
      COD_CHIAVE: updateAppReq3HypServDto.COD_CHIAVE,

      NUM_AZIENDA: updateAppReq3HypServDto.NUM_AZIENDA,

      COD_REQ3_HYPSERV: updateAppReq3HypServDto.COD_REQ3_HYPSERV,

      PROGR: updateAppReq3HypServDto.PROGR,

      UTENTE_FROM: updateAppReq3HypServDto.UTENTE_FROM,
    });
  }

  remove(COD_CHIAVE: AppReq3HypServ['COD_CHIAVE']) {
    return this.appReq3HypServRepository.remove(COD_CHIAVE);
  }
}
