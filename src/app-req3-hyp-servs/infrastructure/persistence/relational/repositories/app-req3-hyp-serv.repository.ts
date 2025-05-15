import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AppReq3HypServEntity } from '../entities/app-req3-hyp-serv.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AppReq3HypServ } from '../../../../domain/app-req3-hyp-serv';
import { AppReq3HypServRepository } from '../../app-req3-hyp-serv.repository';
import { AppReq3HypServMapper } from '../mappers/app-req3-hyp-serv.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AppReq3HypServRelationalRepository
  implements AppReq3HypServRepository
{
  constructor(
    @InjectRepository(AppReq3HypServEntity)
    private readonly appReq3HypServRepository: Repository<AppReq3HypServEntity>,
  ) {}

  async create(data: AppReq3HypServ): Promise<AppReq3HypServ> {
    const persistenceModel = AppReq3HypServMapper.toPersistence(data);
    const newEntity = await this.appReq3HypServRepository.save(
      this.appReq3HypServRepository.create(persistenceModel),
    );
    return AppReq3HypServMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AppReq3HypServ[]> {
    const entities = await this.appReq3HypServRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AppReq3HypServMapper.toDomain(entity));
  }

  async findById(
    COD_CHIAVE: AppReq3HypServ['COD_CHIAVE'],
  ): Promise<NullableType<AppReq3HypServ>> {
    const entity = await this.appReq3HypServRepository.findOne({
      where: { COD_CHIAVE },
    });

    return entity ? AppReq3HypServMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: AppReq3HypServ['COD_CHIAVE'][],
  ): Promise<AppReq3HypServ[]> {
    const entities = await this.appReq3HypServRepository.find({
      where: { COD_CHIAVE: In(ids) },
    });

    return entities.map((entity) => AppReq3HypServMapper.toDomain(entity));
  }

  async update(
    COD_CHIAVE: AppReq3HypServ['COD_CHIAVE'],
    payload: Partial<AppReq3HypServ>,
  ): Promise<AppReq3HypServ> {
    const entity = await this.appReq3HypServRepository.findOne({
      where: { COD_CHIAVE },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.appReq3HypServRepository.save(
      this.appReq3HypServRepository.create(
        AppReq3HypServMapper.toPersistence({
          ...AppReq3HypServMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AppReq3HypServMapper.toDomain(updatedEntity);
  }

  async remove(COD_CHIAVE: AppReq3HypServ['COD_CHIAVE']): Promise<void> {
    await this.appReq3HypServRepository.delete(COD_CHIAVE);
  }
}
