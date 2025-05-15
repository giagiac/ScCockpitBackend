import { ArtCodici } from '../../../../domain/art-codici';

import { ArtCodiciEntity } from '../entities/art-codici.entity';

export class ArtCodiciMapper {
  static toDomain(raw: ArtCodiciEntity): ArtCodici {
    const domainEntity = new ArtCodici();
    domainEntity.COD_SECONDARIO_ART = raw.COD_SECONDARIO_ART;

    domainEntity.TIPO_CODICE = raw.TIPO_CODICE;

    domainEntity.COD_ART = raw.COD_ART;

    return domainEntity;
  }

  static toPersistence(domainEntity: ArtCodici): ArtCodiciEntity {
    const persistenceEntity = new ArtCodiciEntity();
    persistenceEntity.COD_SECONDARIO_ART = domainEntity.COD_SECONDARIO_ART;

    persistenceEntity.TIPO_CODICE = domainEntity.TIPO_CODICE;

    persistenceEntity.COD_ART = domainEntity.COD_ART;

    return persistenceEntity;
  }
}
