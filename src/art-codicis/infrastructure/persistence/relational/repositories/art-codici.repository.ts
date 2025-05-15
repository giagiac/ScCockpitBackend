import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ArtCodici } from '../../../../domain/art-codici';
import { ArtCodiciRepository } from '../../art-codici.repository';
import { ArtCodiciEntity } from '../entities/art-codici.entity';
import { ArtCodiciMapper } from '../mappers/art-codici.mapper';

@Injectable()
export class ArtCodiciRelationalRepository implements ArtCodiciRepository {
  constructor(
    @InjectRepository(ArtCodiciEntity)
    private readonly artCodiciRepository: Repository<ArtCodiciEntity>,
  ) {}

  async create(data: ArtCodici): Promise<ArtCodici> {
    const persistenceModel = ArtCodiciMapper.toPersistence(data);
    const newEntity = await this.artCodiciRepository.save(
      this.artCodiciRepository.create(persistenceModel),
    );
    return ArtCodiciMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ArtCodici[]> {
    const entities = await this.artCodiciRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ArtCodiciMapper.toDomain(entity));
  }

  async findById(COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART']): Promise<NullableType<ArtCodici>> {
    const entity = await this.artCodiciRepository.findOne({
      where: { COD_SECONDARIO_ART: COD_SECONDARIO_ART },
    });

    return entity ? ArtCodiciMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ArtCodici['COD_SECONDARIO_ART'][]): Promise<ArtCodici[]> {
    const entities = await this.artCodiciRepository.find({
      where: { COD_SECONDARIO_ART: In(ids) },
    });

    return entities.map((entity) => ArtCodiciMapper.toDomain(entity));
  }

  async update(
    COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART'],
    payload: Partial<ArtCodici>,
  ): Promise<ArtCodici> {
    const entity = await this.artCodiciRepository.findOne({
      where: { COD_SECONDARIO_ART },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.artCodiciRepository.save(
      this.artCodiciRepository.create(
        ArtCodiciMapper.toPersistence({
          ...ArtCodiciMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ArtCodiciMapper.toDomain(updatedEntity);
  }

  async remove(COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART']): Promise<void> {
    await this.artCodiciRepository.delete(COD_SECONDARIO_ART);
  }
}
