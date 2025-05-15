import { AppReq3HypServ } from '../../../../domain/app-req3-hyp-serv';

import { AppReq3HypServEntity } from '../entities/app-req3-hyp-serv.entity';

export class AppReq3HypServMapper {
  static toDomain(raw: AppReq3HypServEntity): AppReq3HypServ {
    const domainEntity = new AppReq3HypServ();
    domainEntity.COD_CHIAVE = raw.COD_CHIAVE;

    domainEntity.NUM_AZIENDA = raw.NUM_AZIENDA;

    domainEntity.COD_REQ3_HYPSERV = raw.COD_REQ3_HYPSERV;

    domainEntity.PROGR = raw.PROGR;

    domainEntity.UTENTE_FROM = raw.UTENTE_FROM;

    // Nuove proprietà
    domainEntity.DATAORA_RICHIESTA = raw.DATAORA_RICHIESTA;
    domainEntity.CHIAVE_ESTERNA = raw.CHIAVE_ESTERNA;
    domainEntity.CAMPO_PARAMETRI = raw.CAMPO_PARAMETRI;
    domainEntity.FLAG_STATUS = raw.FLAG_STATUS;
    domainEntity.DATAORA_INIZIO_ELAB = raw.DATAORA_INIZIO_ELAB;
    domainEntity.UTENTE_ELAB = raw.UTENTE_ELAB;
    domainEntity.DATAORA_FINE_ELAB = raw.DATAORA_FINE_ELAB;
    domainEntity.FLAG_ESITO_ELAB = raw.FLAG_ESITO_ELAB;
    domainEntity.STRINGA_ESITO_ELAB = raw.STRINGA_ESITO_ELAB;

    return domainEntity;
  }

  static toPersistence(domainEntity: AppReq3HypServ): AppReq3HypServEntity {
    const persistenceEntity = new AppReq3HypServEntity();
    persistenceEntity.COD_CHIAVE = domainEntity.COD_CHIAVE;

    persistenceEntity.NUM_AZIENDA = domainEntity.NUM_AZIENDA;

    persistenceEntity.COD_REQ3_HYPSERV = domainEntity.COD_REQ3_HYPSERV;

    persistenceEntity.PROGR = domainEntity.PROGR;

    persistenceEntity.UTENTE_FROM = domainEntity.UTENTE_FROM;

    // Nuove proprietà
    persistenceEntity.DATAORA_RICHIESTA = domainEntity.DATAORA_RICHIESTA;
    persistenceEntity.CHIAVE_ESTERNA = domainEntity.CHIAVE_ESTERNA;
    persistenceEntity.CAMPO_PARAMETRI = domainEntity.CAMPO_PARAMETRI;
    persistenceEntity.FLAG_STATUS = domainEntity.FLAG_STATUS;
    persistenceEntity.DATAORA_INIZIO_ELAB = domainEntity.DATAORA_INIZIO_ELAB;
    persistenceEntity.UTENTE_ELAB = domainEntity.UTENTE_ELAB;
    persistenceEntity.DATAORA_FINE_ELAB = domainEntity.DATAORA_FINE_ELAB;
    persistenceEntity.FLAG_ESITO_ELAB = domainEntity.FLAG_ESITO_ELAB;
    persistenceEntity.STRINGA_ESITO_ELAB = domainEntity.STRINGA_ESITO_ELAB;

    return persistenceEntity;
  }
}
