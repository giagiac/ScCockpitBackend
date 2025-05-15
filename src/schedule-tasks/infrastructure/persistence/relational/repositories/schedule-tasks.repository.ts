import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { AppReq3HypServEntity } from '../../../../../app-req3-hyp-servs/infrastructure/persistence/relational/entities/app-req3-hyp-serv.entity';
import { CfEntity } from '../../../../../cfs/infrastructure/persistence/relational/entities/cf.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ScheduleTasks } from '../../../../domain/schedule-tasks';
import { ScheduleTasksRepository } from '../../schedule-tasks.repository';
import {
  APP_REQ3_HYPSERV_TIPO_RICHIESTA,
  ScheduleTasksEntity,
  separator,
  TIPO_ERRORI_SYNC,
} from '../entities/schedule-tasks.entity';
import { ScheduleTasksMapper } from '../mappers/schedule-tasks.mapper';

import csv from 'csvtojson';

const appReqTestataDefaultParams = [
  'tv_table=ORD_FOR',
  separator,
  'tv_row_head.COD_CF=',
  '',
  separator, // 1
  'tv_row_head.COD_CAUS_DOC=',
  '',
  separator,
  // 'tv_row_head.DATA_DOC=', '', separator,
];

const appReqRigaDefaultParams = [
  '*',
  separator,
  'V2',
  separator,
  'tv_row_riga.COD_ART=',
  '',
  separator, // 8
  'tv_row_riga.QUANT_RIGA=',
  '',
  separator, // 11
];

@Injectable()
export class ScheduleTasksRelationalRepository
  implements ScheduleTasksRepository
{
  constructor(
    @InjectRepository(ScheduleTasksEntity)
    private readonly scheduleTasksRepository: Repository<ScheduleTasksEntity>,
  ) {}

  async create(data: ScheduleTasks): Promise<ScheduleTasks> {
    const persistenceModel = ScheduleTasksMapper.toPersistence(data);
    const newEntity = await this.scheduleTasksRepository.save(
      this.scheduleTasksRepository.create(persistenceModel),
    );
    return ScheduleTasksMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ScheduleTasks[]> {
    const entities = await this.scheduleTasksRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ScheduleTasksMapper.toDomain(entity));
  }

  async findById(
    id: ScheduleTasks['id'],
  ): Promise<NullableType<ScheduleTasks>> {
    const entity = await this.scheduleTasksRepository.findOne({
      where: { id },
    });

    return entity ? ScheduleTasksMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ScheduleTasks['id'][]): Promise<ScheduleTasks[]> {
    const entities = await this.scheduleTasksRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ScheduleTasksMapper.toDomain(entity));
  }

  async update(
    id: ScheduleTasks['id'],
    payload: Partial<ScheduleTasks>,
  ): Promise<ScheduleTasks> {
    const entity = await this.scheduleTasksRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.scheduleTasksRepository.save(
      this.scheduleTasksRepository.create(
        ScheduleTasksMapper.toPersistence({
          ...ScheduleTasksMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ScheduleTasksMapper.toDomain(updatedEntity);
  }

  async remove(id: ScheduleTasks['id']): Promise<void> {
    await this.scheduleTasksRepository.delete(id);
  }

  // -------------------------------------------------------------

  cfSedePrincipale: CfEntity;

  async findAllEsec(id: ScheduleTasks['id'] | null): Promise<any> {
    this.GeneroOrdFor(this.scheduleTasksRepository.manager);
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ----------------------------- Genera il componente per il costo chilometrico --------------------------------------
  // -------------------------------------------------------------------------------------------------------------------

  async ReadFileSystem() {
    // Convert a csv file with csvtojson
    const jsonArrayObj = await csv().fromFile(csvFilePath);
    console.log(jsonArrayObj)
  }

  async GeneroOrdFor(manager: EntityManager) {
    const max = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .select('MAX(PROGR) + 1', 'maxProgr')
      .getRawOne();

    const componente = this.makeComponentiOffFor();

    const righeArray: Array<string> = [];

    for (const element of righe) {
      righeArray.push(
        ...this.makeComponentiOffForRiga(element.COD_ART, element.QUANT_RIGA),
      );
    }

    const righeText = righeArray.join('');

    const result = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .insert()
      .into(AppReq3HypServEntity)
      .values([
        {
          UTENTE_FROM: process.env.SCCOCKPIT_LIVE_ORDERS_UTENTE_FROM || '',
          PROGR: max?.maxProgr || 1,
          CHIAVE_ESTERNA: crypto.randomUUID(),
          NUM_AZIENDA: Number(
            process.env.SCCOCKPIT_LIVE_ORDERS_AZIENDA_ID || '',
          ),
          DATAORA_RICHIESTA: new Date(),
          COD_REQ3_HYPSERV: APP_REQ3_HYPSERV_TIPO_RICHIESTA.DOCUMENTI,
          CAMPO_PARAMETRI: componente,
        },
      ])
      .execute();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------- Genera km liberi ---------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------

  private makeComponentiOffFor(): string {
    const copyAppReq3Text = [...appReqTestataDefaultParams];

    copyAppReq3Text[3] = process.env.SCCOCKPIT_LIVE_ORDERS_CF_CLI || '';
    copyAppReq3Text[6] = process.env.SCCOCKPIT_LIVE_ORDERS_COD_CAUS_DOC || '';

    return copyAppReq3Text.join('');
  }

  private makeComponentiOffForRiga(
    COD_ART: string,
    QUANT: string,
  ): Array<string> {
    const copyAppReq3Text = [...appReqRigaDefaultParams];

    copyAppReq3Text[5] = COD_ART;
    copyAppReq3Text[8] = QUANT;

    return copyAppReq3Text;
  }

  // -----------------------------------------------------------------------

  async SalvoConErroreEsecuzione(
    tipo: TIPO_ERRORI_SYNC,
    manager: EntityManager,
    id: string,
  ) {}
}
