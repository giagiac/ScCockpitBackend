import { ArticoliCostiCfMapper } from '../../../../../articoli-costi-cf/infrastructure/persistence/relational/mappers/articoli-costi-cf.mapper';
import { CfCommMapper } from '../../../../../cf-comms/infrastructure/persistence/relational/mappers/cf-comm.mapper';
import { Cf } from '../../../../domain/cf';

import { CfEntity } from '../entities/cf.entity';

export class CfMapper {
  static toDomain(raw: CfEntity): Cf {
    const domainEntity = new Cf();
    domainEntity.COD_FISC_CF = raw.COD_FISC_CF;

    domainEntity.P_IVA_CF = raw.P_IVA_CF;

    domainEntity.RAG_SOC_CF_INT = raw.RAG_SOC_CF_INT;

    domainEntity.RAG_SOC_CF = raw.RAG_SOC_CF;

    domainEntity.COD_CF = raw.COD_CF;

    domainEntity.COD_CF = raw.COD_CF;

    domainEntity.PROVINCIA_CF = raw.PROVINCIA_CF;

    domainEntity.COMUNE_CF = raw.COMUNE_CF;

    domainEntity.CAP_CF = raw.CAP_CF;

    domainEntity.INDI_CF = raw.INDI_CF;

    domainEntity.STATO_CF = raw.STATO_CF;

    domainEntity.REGIONE = raw.REGIONE;

    if (raw.cfComm != null) {
      domainEntity.cfComm = [];
      domainEntity.cfComm = raw.cfComm.map((it) => {
        return CfCommMapper.toDomain(it);
      });
    }

    if (raw.articoliCostiCf != null) {
      domainEntity.articoliCostiCf = raw.articoliCostiCf.map((it) => {
        return ArticoliCostiCfMapper.toDomain(it);
      });
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: Cf): CfEntity {
    const persistenceEntity = new CfEntity();
    persistenceEntity.COD_FISC_CF = domainEntity.COD_FISC_CF;

    persistenceEntity.P_IVA_CF = domainEntity.P_IVA_CF;

    persistenceEntity.RAG_SOC_CF_INT = domainEntity.RAG_SOC_CF_INT;

    persistenceEntity.RAG_SOC_CF = domainEntity.RAG_SOC_CF;

    persistenceEntity.COD_CF = domainEntity.COD_CF;

    persistenceEntity.CAP_CF = domainEntity.CAP_CF;

    persistenceEntity.INDI_CF = domainEntity.INDI_CF;

    persistenceEntity.COMUNE_CF = domainEntity.COMUNE_CF;

    persistenceEntity.PROVINCIA_CF = domainEntity.PROVINCIA_CF;

    persistenceEntity.STATO_CF = domainEntity.STATO_CF;

    persistenceEntity.REGIONE = domainEntity.REGIONE;

    return persistenceEntity;
  }
}
