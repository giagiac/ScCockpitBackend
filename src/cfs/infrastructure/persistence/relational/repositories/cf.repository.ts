import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { applicaSort, applicaWhereLike, FilterDto, SortDto } from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Cf } from '../../../../domain/cf';
import { CfDto } from '../../../../dto/cf.dto';
import { CfRepository } from '../../cf.repository';
import { CfEntity, DEFAULT } from '../entities/cf.entity';
import { CfMapper } from '../mappers/cf.mapper';

@Injectable()
export class CfRelationalRepository implements CfRepository {
  constructor(
    @InjectRepository(CfEntity)
    private readonly cfRepository: Repository<CfEntity>,
  ) {}

  async create(data: Cf): Promise<Cf> {
    const persistenceModel = CfMapper.toPersistence(data);
    const newEntity = await this.cfRepository.save(this.cfRepository.create(persistenceModel));
    return CfMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<CfDto>> | null;
    sortOptions?: Array<SortDto<CfDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ cf: Cf[]; count: number }> {
    let entitiesSql;

    if (join == true) {
      entitiesSql = this.cfRepository
        .createQueryBuilder('cf')
        .distinct()
        .innerJoin('cf.cfComm', 'cfComm')

        .leftJoinAndSelect('cf.articoliCostiCf', 'articoliCostiCf')
        .leftJoinAndSelect('articoliCostiCf.artAna', 'artAna')
        .leftJoinAndSelect('artAna.artCosti', 'artCosti')

        .offset((paginationOptions.page - 1) * paginationOptions.limit)
        .limit(paginationOptions.limit);
    } else {
      entitiesSql = this.cfRepository
        .createQueryBuilder('cf')
        .leftJoinAndSelect('cf.articoliCostiCf', 'articoliCostiCf')
        .leftJoinAndSelect('articoliCostiCf.artAna', 'artAna')
        .leftJoinAndSelect('artAna.artCosti', 'artCosti')

        .offset((paginationOptions.page - 1) * paginationOptions.limit)
        .limit(paginationOptions.limit);
    }

    if (filterOptions) {
      applicaWhereLike('cf', entitiesSql, filterOptions);
    }

    if (sortOptions) {
      applicaSort('cf', entitiesSql, sortOptions);
    }

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    let cfEntities: Array<Cf> = entitiesAndCount[0].map((entity) => CfMapper.toDomain(entity));
    let cfCount = entitiesAndCount[1];

    return {
      cf: cfEntities,
      count: cfCount,
    };
  }

  async findById(id: Cf['COD_CF']): Promise<NullableType<Cf>> {
    const entity = await this.cfRepository.findOne({
      where: { COD_CF: id },
    });

    return entity ? CfMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Cf['COD_CF'][]): Promise<Cf[]> {
    const entities = await this.cfRepository.find({
      where: { COD_CF: In(ids) },
    });

    return entities.map((entity) => CfMapper.toDomain(entity));
  }

  async update(id: Cf['COD_CF'], payload: Partial<Cf>): Promise<Cf> {
    const entity = await this.cfRepository.findOne({
      where: { COD_CF: id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.cfRepository.save(
      this.cfRepository.create(
        CfMapper.toPersistence({
          ...CfMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CfMapper.toDomain(updatedEntity);
  }

  async remove(id: Cf['COD_CF']): Promise<void> {
    await this.cfRepository.delete(id);
  }
}
