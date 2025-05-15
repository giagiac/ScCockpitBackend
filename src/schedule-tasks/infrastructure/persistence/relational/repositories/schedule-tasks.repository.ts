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

import Client from 'ssh2-sftp-client';

interface FileRemote {
  nomeFile: string;
  dataModificata: Date;
  contenuto: string;
  jsonArrayObj: Array<RigheCsv>
}

interface RigheCsv {
  'Plo Id': string;
  'Source Location Id': string; // Può essere una stringa vuota
  'Destination Location Id': string;
  'Account Id': number;
  'Plo Status': string; // Potrebbe essere un tipo più specifico (es. "approved" | "pending" | "rejected") se i valori sono limitati
  'Create Date': string; // ISO 8601 datetime string o formato simile, trattato come string
  'Publish Date': string; // Come sopra
  'Confirm Date': string; // Può essere una stringa vuota
  'Export Date': string; // Come sopra
  'Order Type': string;
  'Delivery Type': string;
  'Plo Line Id': number;
  'Item Id': string;
  'Requested Quantity': number;
  'Unit Price': number;
  'Total Price': number;
  Reference: string; // Può essere una stringa vuota
  'Dms Location Id': number;
  'Franchise Code': string;
  CustomerOrderReference: string;
}

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

  async trigger(id: ScheduleTasks['id'] | null): Promise<any> {
    this.GeneroOrdFor(this.scheduleTasksRepository.manager);
    // await this.ConvertCsvToJson();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------

  async ReadSftpRemote(sftpConfig, remotePath): Promise<Array<FileRemote>> {
    const sftp = new Client();
    const filesData: Array<FileRemote> = [];

    try {
      await sftp.connect(sftpConfig);
      console.log('Connessione SFTP stabilita.');

      const list = await sftp.list(remotePath);
      console.log(
        `Trovati ${list.length} file nella cartella remota: ${remotePath}`,
      );

      for (const fileInfo of list) {
        if (fileInfo.type === '-') {
          // Considera solo i file (non le directory)
          const remoteFilePath = `${remotePath}/${fileInfo.name}`;
          console.log(`Elaborazione del file: ${remoteFilePath}`);

          try {
            const fileContent = await sftp.get(remoteFilePath);
            const utf8Content = fileContent.toString('utf8');
            filesData.push({
              nomeFile: fileInfo.name,
              dataModificata: new Date(fileInfo.modifyTime * 1000), // Converti timestamp Unix in oggetto Date
              contenuto: utf8Content,
              jsonArrayObj: []
            });
            console.log(`File "${fileInfo.name}" letto con successo.`);
          } catch (err) {
            console.error(
              `Errore durante la lettura del file "${fileInfo.name}":`,
              err,
            );
          }
        }
      }
    } catch (err) {
      console.error(
        "Errore durante la connessione SFTP o l'elenco dei file:",
        err,
      );
    } finally {
      await sftp.end();
      console.log('Connessione SFTP chiusa.');
    }

    return filesData;
  }

  async ConvertCsvToJson(): Promise<Array<FileRemote>> {
    const sftpConfig = {
      host: process.env.SCCOCKPIT_HOST,
      port: process.env.SCCOCKPIT_PORT, // Opzionale, default è 21
      user: process.env.SCCOCKPIT_USER,
      password: process.env.SCCOCKPIT_PASSWORD,
      //   secure: true, // true per FTPS
      //   // secureOptions: { ... } // Opzioni per FTPS
      //   pollInterval: 10000, // Controlla ogni 10 secondi
      //   onError: (error) => {
      //     // Qui puoi implementare una logica per gestire gli errori di connessione,
      //     // ad esempio inviare una notifica via email.
      //     console.error('Si è verificato un errore FTP critico:', error);
      //   },
      // Se usi una chiave privata invece della password:
      // privateKey: require('fs').readFileSync('/percorso/alla/tua/chiave_privata.ppk')
    };

    const remoteFolderPath = process.env.SCCOCKPIT_LIVE_ORDERS || '/tmp'; // <- se non definito almeno non legge dalla root di linux

    try {
      const arrResult = await this.ReadSftpRemote(sftpConfig, remoteFolderPath);

      console.log('\n--- Dati dei file elaborati ---');
      const result = arrResult.map(async (datiFile, index) => {
        console.log(`\nFile #${index + 1}:`);
        console.log(`  Nome: ${datiFile.nomeFile}`);
        console.log(`  Data Modifica: ${datiFile.dataModificata.toLocaleString()}`);
        console.log(`  Contenuto (primi 50 caratteri...): ${datiFile.contenuto.substring(0, 50)}...`);

        const jsonArrayObj = await csv({
          delimiter: '|',
          trim: true,
          checkType: true, // Converte automaticamente i tipi (es. stringhe numeriche in numeri)
          // Puoi aggiungere altre opzioni qui se necessario, ad esempio:
          noheader: false, // se il CSV ha una riga di intestazione (default)
          // headers: ['colonna1', 'colonna2'] // se il CSV non ha intestazioni e vuoi specificarle
        }).fromString(datiFile.contenuto);

        // console.log(jsonArrayObj);
        return {
          contenuto: datiFile.contenuto,
          dataModificata: datiFile.dataModificata,
          nomeFile: datiFile.nomeFile,
          jsonArrayObj
        } as FileRemote;
      });

      return await Promise.all(result);
    } catch (err) {
      console.error("Si è verificato un errore durante l'elaborazione:", err);
    }

    return [];
  }

  async GeneroOrdFor(manager: EntityManager) {
    const max = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .select('MAX(PROGR) + 1', 'maxProgr')
      .getRawOne();

    const componente = this.makeComponentiOffFor();

    const righeArray: Array<any> = await this.ConvertCsvToJson();

    console.log(righeArray);

    // for (const element of righeArray) {
    //   righeArray.push(
    //     ...this.makeComponentiOffForRiga(element.COD_ART, element.QUANT_RIGA),
    //   );
    // }

    // const righeText = righeArray.join('');

    // const result = await manager
    //   .getRepository(AppReq3HypServEntity)
    //   .createQueryBuilder()
    //   .insert()
    //   .into(AppReq3HypServEntity)
    //   .values([
    //     {
    //       UTENTE_FROM: process.env.SCCOCKPIT_LIVE_ORDERS_UTENTE_FROM || '',
    //       PROGR: max?.maxProgr || 1,
    //       CHIAVE_ESTERNA: crypto.randomUUID(),
    //       NUM_AZIENDA: Number(
    //         process.env.SCCOCKPIT_LIVE_ORDERS_AZIENDA_ID || '',
    //       ),
    //       DATAORA_RICHIESTA: new Date(),
    //       COD_REQ3_HYPSERV: APP_REQ3_HYPSERV_TIPO_RICHIESTA.DOCUMENTI,
    //       CAMPO_PARAMETRI: componente,
    //     },
    //   ])
    //   .execute();
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
